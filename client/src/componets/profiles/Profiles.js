import React, { Fragment, useEffect } from 'react';
import { getProfiles } from '../../state/profile';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../layouts/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = () => {
    const dispatch = useDispatch();
    const { profiles, loading } = useSelector(state => state.profile);
   
    useEffect(() => {
        dispatch(getProfiles());
    }, [dispatch])
  
    return (
    <Fragment>
    {loading ? <Spinner /> : <Fragment>
        <h1 className='larg text-primary'>Delelopers</h1>
        <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse and connect with Developers
        </p>
        <div className='profiles'>
        {profiles.length > 0 ? (
            profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile}/>
            ))
        ) : 
        <h4>No profiles found</h4>}
        </div>
    </Fragment>}
    </Fragment>)
}

export default Profiles
