import './App.css';
import { Fragment } from 'react/jsx-runtime';
import Navbar from './componets/layouts/Navbar';
import Landing from './componets/layouts/Landing';
import Register from './componets/auth/Register';
import Login from './componets/auth/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { setAuthToken } from './state/utils/setAuthToken';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './state/auth';
import Dashboard from './componets/dashboard/Dashboard';
import PrivateRoute from './componets/routing/PrivateRoute';
import CreateProfile from './componets/profile-forms/CreateProfile';
import Alerts from './componets/layouts/Alerts';
import EditProfile from './componets/profile-forms/EditProfile';
import AddExperience from './componets/profile-forms/AddExperience';
import AddEducation from './componets/profile-forms/AddEducation';
import Profiles from './componets/profiles/Profiles';
import { clearAlert } from './state/alert';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const alerts = useSelector(state => state.alert);
  
  useEffect(() => {
    if (localStorage.token) setAuthToken(localStorage.token);
    dispatch(loadUser());
  }, [dispatch]);

  
  useEffect(() => {
    if (alerts.length !== 0) {
       setTimeout(() => {
        dispatch(clearAlert());
       }, 3000);
    }
  }, [alerts, dispatch])

  
  return (
  <Router>
    <Fragment>
      <Navbar />
      <Routes>
        <Route exact path='/' element={isAuthenticated ? <Navigate to="/dashboard" /> : <Landing />} />
      </Routes>
      <section className='container'>
      <Alerts />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profiles' element={<Profiles />} />
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/create-profile' element={<CreateProfile />} />
            <Route path='/edit-profile' element={<EditProfile />} />
            <Route path='/add-experience' element={<AddExperience />} />
            <Route path='/add-education' element={<AddEducation />} />
          </Route>
        </Routes>
      </section>
    </Fragment>
  </Router>
)
};
export default App;
