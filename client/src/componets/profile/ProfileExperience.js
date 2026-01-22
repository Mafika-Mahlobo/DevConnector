import moment from 'moment';
import React from 'react'

const ProfileExperience = ({ experience }) => {
    const {company, title, location, current, to, from, description} = experience;
  return (
    <div>
      <h3 className='text-dark'>{company}</h3>
      <p>
        {moment(from).format("YYYY/MM/DD")} - {to ? moment(to).format("YYYY/MM/DD") : 'NOW'}
      </p>
      <p>
        <strong>Position: </strong> {title}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  )
}

export default ProfileExperience
