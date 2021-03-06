import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='card card-body bg-info text-white mb-3'>
            <div className='row'>
              <div className='col-4 col-md-3 m-auto'>
                <img
                  src={profile.user.avatar}
                  alt={profile.user.name}
                  className='rounded-circle'
                />
              </div>
            </div>
            <div className='text-center'>
              <h1 className='display-4 text-center'>{profile.user.name}</h1>
              <p className='lead text-center'>
                {profile.status} {profile.company && 'at ' + profile.company}
              </p>
              {profile.location && <p>{profile.location}</p>}
              <p>
                {profile.website && (
                  <a className='text-white p-2' href={profile.website}>
                    <i className='fas fa-globe fa-2x' />
                  </a>
                )}
                {profile.social.twitter && (
                  <a
                    className='text-white p-2'
                    href={`https://www.twitter.com/${profile.social.twitter}`}
                  >
                    <i className='fab fa-twitter fa-2x' />
                  </a>
                )}
                {profile.social.facebook && (
                  <a className='text-white p-2' href={profile.social.facebook}>
                    <i className='fab fa-facebook fa-2x' />
                  </a>
                )}
                {profile.social.instagram && (
                  <a
                    className='text-white p-2'
                    href={`https://www.instagram.com/${
                      profile.social.instagram
                    }`}
                  >
                    <i className='fab fa-instagram fa-2x' />
                  </a>
                )}
                {profile.social.linkedin && (
                  <a
                    className='text-white p-2'
                    href={`https://www.linkedin.com/in/${
                      profile.social.linkedin
                    }`}
                  >
                    <i className='fab fa-linkedin fa-2x' />
                  </a>
                )}
                {profile.social.youtube && (
                  <a className='text-white p-2' href={profile.social.youtube}>
                    <i className='fab fa-youtube fa-2x' />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileHeader;
