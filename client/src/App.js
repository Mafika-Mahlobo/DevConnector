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

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  
  useEffect(() => {
    if (localStorage.token) setAuthToken(localStorage.token);
    dispatch(loadUser());
  }, [dispatch]);

  
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
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/create-profile' element={<CreateProfile />} />
          </Route>
        </Routes>
      </section>
    </Fragment>
  </Router>
)
};
export default App;
