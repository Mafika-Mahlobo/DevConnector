import moment from 'moment';
import React from 'react'

const ProfileEducation = ({ education }) => {
    const {school, degree, fieldofstudy, current, to, from, description} = education;
  return (
    <div>
      <h3 className='text-dark'>{school}</h3>
      <p>
        {moment(from).format("YYYY/MM/DD")} - {to ? moment(to).format("YYYY/MM/DD") : 'NOW'}
      </p>
      <p>
        <strong>Degree: </strong> {degree}
      </p>
      <p>
        <strong>Field of study: </strong> {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  )
}

export default ProfileEducation;
