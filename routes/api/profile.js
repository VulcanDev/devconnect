const express = require('express');
const router = express.Router();

// @router  GET api/profile/t
// @desc    Tests profile route
// @access  Public
router.get('/t', (req, res) => res.json({ m: 'Profile success' }));

module.exports = router;
