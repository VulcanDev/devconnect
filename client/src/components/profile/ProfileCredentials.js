import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class ProfileCredentials extends Component {
  render() {
    const { experience, education } = this.props;
    
    return (
      <div className='row'>
        <div className='col-md-6'>
          <h3 className='text-center text-info'>Experience</h3>
          <ul className='list-group'>
            {experience.length > 0  ? (
              experience.map((exp, index) => (
                <li key={index} className='list-group-item'>
                  <h4>{exp.company}</h4>
                  <Moment format='YYYY/MM/DD'>{exp.from}</Moment>
                  {' - '}
                  {exp.to === null ? (
                    'Now'
                  ) : (
                    <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                  )}
                  <p>
                    <strong>Position: </strong> {exp.title}
                  </p>
                  {exp.location && (
                    <p>
                      <strong>Location: </strong> {exp.location}
                    </p>
                  )}
                  {exp.description && (
                    <p>
                      <strong>Description: </strong> {exp.description}
                    </p>
                  )}
                </li>
              ))
            ) : (
              <li className='list-group-item text-center'>
                <p>No experience provided</p>
              </li>
            )}
          </ul>
        </div>
        <div className='col-md-6'>
          <h3 className='text-center text-info'>Education</h3>
          <ul className='list-group'>
            {education.length > 0 ? (
              education.map((edu, index) => (
                <li key={index} className='list-group-item'>
                  <h4>{edu.school}</h4>
                  <Moment format='YYYY/MM/DD'>{edu.from}</Moment>
                  {' - '}
                  {edu.to === null ? (
                    'Now'
                  ) : (
                    <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                  )}
                  <p>
                    <strong>Degree: </strong> {edu.degree}
                  </p>
                  <p>
                    <strong>Field of Study: </strong> {edu.fieldofstudy}
                  </p>
                  {edu.description && (
                    <p>
                      <strong>Description: </strong> {edu.description}
                    </p>
                  )}
                </li>
              ))
            ) : (
              <li className='list-group-item text-center'>
                <p>No education provided</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

ProfileCredentials.propTypes = {
  experience: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired
};

export default ProfileCredentials;
