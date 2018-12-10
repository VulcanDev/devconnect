const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @router  GET api/profile
// @desc    Returns current profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @router  GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json();
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @router  GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

// @router  GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

// @router  POST api/profile
// @desc    Creates or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { body } = req;

    // Validate
    const { errors, isValid } = validateProfileInput(body);
    if (!isValid) return res.status(400).json(errors);

    const profileFields = {
      user: req.user.id,
      social: {}
    };

    // Insert profile data from body to profileFields
    for (let p in body) {
      if (!(p === 'skills' || p === 'social')) profileFields[p] = body[p];
      if (p === 'skills' && p !== 'undefined')
        profileFields[p] = body.skills.split(',');
      if (
        // Send social properties into the social object in profileFields
        p === 'twitter' ||
        p === 'facebook' ||
        p === 'instagram' ||
        p === 'linkedin' ||
        p === 'youtube'
      )
        profileFields.social[p] = body[p];
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Edit profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create profile
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @router  POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Validate
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {};

      for (let p in req.body) {
        newExp[p] = req.body[p];
      }

      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @router  POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Validate
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {};

      for (let p in req.body) {
        newEdu[p] = req.body[p];
      }

      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @router  DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      profile.experience.splice(removeIndex, 1);
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json(err));
    });
  }
);

// @router  DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      profile.education.splice(removeIndex, 1);
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json(err));
    });
  }
);

// @router  DELETE api/profile/
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findByIdAndRemove(req.user.id, () => {
        res.json({ success: true });
      });
    });
  }
);

module.exports = router;
