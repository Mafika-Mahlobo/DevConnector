import React, { Fragment, useEffect } from 'react';
import Spinner from '../layouts/Spinner';
import { getCurrentProfile } from '../../state/profile';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
        Has
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
