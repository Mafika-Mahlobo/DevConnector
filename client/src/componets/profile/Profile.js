import React, { Fragment, useEffect } from 'react';
import { clearProfileErrors, clearRepos, getProfileById } from '../../state/profile';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { Link, useParams } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = () => {
    const { loading, profile } = useSelector(state => state.profile);
    const { isAuthenticated, loading: authLoading, user } = useSelector(state => state.auth);
    const { id } = useParams()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfileById(id))
    },[dispatch, id]);

  return (
    <Fragment>
      {profile === null || loading ? <Spinner /> : <Fragment>
            <Link to='/profiles' className='btn btn-light'>Back To Profiles</Link>
        </Fragment>}
        {isAuthenticated && authLoading === false && user._id === id && (<Link to='/edit-profile' className='btn btn-dark'>
            Edit Profile
        </Link>) }

        {profile !== null && !loading &&
        <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
                <h2 className='primary-text'>Experience</h2>
                {profile.experience.length > 0 ? (<Fragment>
                    {profile.experience.map(experience => (
                        <ProfileExperience key={experience._id} experience={experience} />
                    ))}
                </Fragment>): (<h4>No experience credentials</h4>)}
            </div>
            <div className='profile-edu bg-white p-2'>
                <h2 className='primary-text'>Education</h2>
                {profile.education.length > 0 ? (<Fragment>
                    {profile.education.map(education => (
                       <ProfileEducation key={education._id} education={education} />
                    ))}
                </Fragment>): (<h4>No educatioin credentials</h4>)}
            </div>

            {profile.githubusername && (
                <ProfileGithub />
            )}
        </div>}
    </Fragment>
  )
}

export default Profile
