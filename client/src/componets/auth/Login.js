import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loginUser, clearAuthErrors } from '../../state/auth';
import { useSelector, useDispatch } from 'react-redux';
import { ALERT_DANGER } from '../../state/types';
import { Navigate } from 'react-router-dom';
import { setAlert, clearAlert } from '../../state/alert';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password} = formData;
    const { errors, isAuthenticated } = useSelector(state => state.auth);
    const dispatcher = useDispatch();

    //Invoke alert reducers
    useEffect(() => {
        if (errors?.errors) {
            errors.errors.forEach(error => {
                dispatcher(setAlert({msg: error.msg, alertType: ALERT_DANGER}));
            });

            //clcear auth errors
            dispatcher(clearAuthErrors());

            //clear alerts
            setTimeout(() => {
                dispatcher(clearAlert());
            }, 3000);
        }
    }, [errors, dispatcher]);

    const onchange = e => setFormData({...formData, [e.target.name]: e.target.value});

    
    if (isAuthenticated) {
        return (<Navigate to="/dashboard" />);
    }

    const onsubmit = async (e) => {
        e.preventDefault();
        dispatcher(loginUser({email, password}));
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <form className="form" onSubmit={e => onsubmit(e)}>
                <div className="form-group">
                <input type="email" 
                placeholder="Email Address" 
                name="email" 
                value={email} 
                onChange={e => onchange(e)}
                />
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                >
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    // required
                    value={password} 
                    onChange={e => onchange(e)}
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Sign In" />
        </form>
        <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
        </Fragment>
    );
}

export default Login
