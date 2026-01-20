import React, { Fragment, useEffect } from 'react';
import Spinner from '../layouts/Spinner';
import { getCurrentProfile } from '../../state/profile';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { deleteAccount } from '../../state/profile';

const Dashboard = () => {

  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(getCurrentProfile());
  }, [dispatcher]);

  const {loading, profile} = useSelector(state => state.profile);
  const { user } = useSelector(state => state.auth);

  return (
    loading && profile === null ? <Spinner /> : <Fragment>
      <h1 className='larg text-primary'>Dashboard</h1>
      <p className='lead'><i className='fas fa-user' />{'  '}Welcome { user && user.name }</p>
      { profile !== null ? 
      <Fragment>
        <DashboardActions />
        <Experience experience={profile.experience} />
        <Education education={profile.education} />
        <div className='my-2'>
            <button onClick={() => dispatcher(deleteAccount())} className='btn btn-danger'>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
        </div>
      </Fragment> : 
      <Fragment>
        <p>You have not yet setup a profile. Please add some info</p>
        <Link to="/create-profile" className='btn btn-primary my-1'>
          Create a profile
        </Link>
      </Fragment>}
    </Fragment>
  )
}

export default Dashboard
