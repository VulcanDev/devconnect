import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getProfiles } from '../../actions/profileActions';

import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;

    return (
      <div className='profiles'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='display-4 text-center'>Developer Profiles</h1>
              <p className='lead text-center'>
                Browse and connect with developers
              </p>
              {profiles === null || loading ? (
                <Spinner />
              ) : profiles.length > 0 ? (
                profiles.map(profile => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4>No profiles found...</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
