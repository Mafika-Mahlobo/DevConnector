import React, { Fragment } from 'react'

const ProfileAbout = ({ profile }) => {
    const { bio, user, skills } = profile;
  return (

    <div class="profile-about bg-light p-2">
        {bio && <Fragment>
                <h2 className="text-primary">{user.name.split(" ")[0]}'s Bio</h2>
                <p>
                    {bio}
                </p>
          <div class="line"></div>
            </Fragment>}
          <h2 class="text-primary">Skill Set</h2>
          <div class="skills">
            {skills && skills.map(skill => (
                <div class="p-1"><i class="fa fa-check"></i>{' '}{skill}</div>
            ))}
          </div>
        </div>
  )

  
}

export default ProfileAbout
