import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
  }

  onSubmit = e => {
    e.preventDefault();
    const profileData = { handle: this.state.handle.toLowerCase() };

    for (let prop in this.state) {
      if (
        !(
          prop === 'displaysocialInputs' ||
          prop === 'handle' ||
          prop === 'errors'
        )
      )
        profileData[prop] = this.state[prop];
    }

    this.props.createProfile(profileData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    const options = [
      { label: '* Select Profile Status', value: '0' },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Quality Assurance', value: 'Quality Assurance' },
      { label: 'UX Developer', value: 'UX Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className='create-profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Create Your Profile</h1>
              <p className='lead text-center'>
                Let's get some information to make your profile stand out
              </p>
              <small className='d-block pb-3'>* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder='* Profile Handle'
                  name='handle'
                  value={this.state.handle.toLowerCase()}
                  onChange={this.onChange}
                  error={errors.handle}
                  info='A unique handle for your profile URL. Your full name, company name, and nickname. Lowercase only.'
                />
                <SelectListGroup
                  name='status'
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info='An idea of where your are at in your carrer'
                />
                <TextFieldGroup
                  placeholder='Company'
                  name='company'
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info='Where do you work?'
                />
                <TextFieldGroup
                  placeholder='Website'
                  name='website'
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info='Your personal or company website'
                />
                <TextFieldGroup
                  placeholder='Location'
                  name='location'
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info='City & province/state (eg. Toronto, ON)'
                />
                <TextFieldGroup
                  placeholder='Skills'
                  name='skills'
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info='Please use comma separated values (eg. HTML,CSS,JavaScript,Node)'
                />
                <TextFieldGroup
                  placeholder='Github Username'
                  name='githubusername'
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info='Put your GitHub username here if you want your latest repos and a link to your profile'
                />
                <TextAreaFieldGroup
                  placeholder='A short bio about yourself'
                  name='bio'
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info='Tell us a little about yourself'
                />

                <div className='mb-3'>
                  <button
                    type='button'
                    onClick={() =>
                      this.setState({
                        displaySocialInputs: !this.state.displaySocialInputs
                      })
                    }
                    className='btn btn-light'
                  >
                    Add Social Network Links
                  </button>
                  <span className='text-muted'>Optional</span>
                </div>
                {this.state.displaySocialInputs && (
                  <div>
                    <InputGroup
                      placeholder='Twitter Handle'
                      name='twitter'
                      icon='fab fa-twitter'
                      value={this.state.twitter}
                      onChange={this.onChange}
                      error={errors.twitter}
                      info='https://www.twitter.com/<YourHandle>'
                    />
                    <InputGroup
                      placeholder='Facebook URL'
                      name='facebook'
                      icon='fab fa-facebook'
                      value={this.state.facebook}
                      onChange={this.onChange}
                      error={errors.facebook}
                      info='Please enter the full URL to your profile'
                    />
                    <InputGroup
                      placeholder='Instagram Handle'
                      name='instagram'
                      icon='fab fa-instagram'
                      value={this.state.instagram}
                      onChange={this.onChange}
                      error={errors.instagram}
                      info='https://www.instragram.com/<YourHandle>'
                    />
                    <InputGroup
                      placeholder='LinkedIn Handle'
                      name='linkedin'
                      icon='fab fa-linkedin'
                      value={this.state.linkedin}
                      onChange={this.onChange}
                      error={errors.linkedin}
                      info='https://wwww.linkedin.com/in/<yourhandle>'
                    />
                    <InputGroup
                      placeholder='Youtube URL'
                      name='youtube'
                      icon='fab fa-youtube'
                      value={this.state.youtube}
                      onChange={this.onChange}
                      error={errors.youtube}
                      info='Please enter the full URL to your channel'
                    />
                  </div>
                )}
                <input
                  type='submit'
                  value='Submit'
                  className='btn btn-info btn-block mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
