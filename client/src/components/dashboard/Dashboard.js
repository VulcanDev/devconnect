import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';

import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = e => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    return (
      <div className='dashboard'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='display-4'>Dashboard</h1>
              {profile === null || loading ? (
                <Spinner />
              ) : Object.keys(profile).length > 0 ? (
                <div>
                  <p className='lead text-muted'>
                    Welcome{' '}
                    <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                  </p>
                  <ProfileActions />
                  <Experience experience={profile.experience} />
                  <Education education={profile.education} />
                  <div stlye={{ marginBottom: '60px' }} />
                  <button
                    onClick={this.onDeleteClick}
                    className='btn btn-danger'
                  >
                    Delete My Account
                  </button>
                </div>
              ) : (
                <div>
                  <p className='lead text-muted'>Welcome {user.name}</p>
                  <p>
                    You have not yet setup a profile, please add some info to
                    create one
                  </p>
                  <Link to='/create-profile' className='btn btn-lg btn-info'>
                    Create Profile
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

Dashboard.proptypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
