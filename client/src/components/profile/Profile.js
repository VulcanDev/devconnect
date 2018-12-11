import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getProfileByHandle } from '../../actions/profileActions';
import { getProfileById } from '../../actions/profileActions';

import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCredentials from './ProfileCredentials';
import ProfileGitHub from './ProfileGitHub';
import Spinner from '../common/Spinner';

class Profile extends Component {
  componentDidMount() {
    const { handle } = this.props.match.params;
    const { id } = this.props.match.params;

    if (handle) this.props.getProfileByHandle(handle);
    if (id) this.props.getProfileById(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { profile, loading } = this.props.profile;

    return (
      <div className='profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              {profile === null || loading ? (
                <Spinner />
              ) : (
                <div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <Link
                        to='/profiles'
                        className='btn btn-light mb-3 float-left'
                      >
                        Back to Profiles
                      </Link>
                    </div>
                    <div className='col-md-6' />
                  </div>
                  <ProfileHeader profile={profile} />
                  <ProfileAbout profile={profile} />
                  <ProfileCredentials
                    education={profile.education}
                    experience={profile.experience}
                  />
                  {profile.githubusername && (
                    <ProfileGitHub username={profile.githubusername} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle, getProfileById }
)(Profile);
