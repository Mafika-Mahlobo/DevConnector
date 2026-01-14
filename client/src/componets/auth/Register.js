import React, { Fragment, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, clearAlert } from '../../state/alert';
import { ALERT_DANGER } from '../../state/types';
import { registerUser, clearAuthErrors } from '../../state/auth';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { errors, isAuthenticated } = useSelector(state => state.auth);
    const dispatcher = useDispatch()

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

    const { name, email, password, password2 } = formData;

    if (isAuthenticated) {
        return (<Navigate to="/dashboard" />);
    }

    const onchange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onsubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            dispatcher(setAlert({msg: 'Passowrds do not match', alertType: ALERT_DANGER}));
            setTimeout(() => {
                dispatcher(clearAlert());
            }, 3000);
        } 
        else {
            dispatcher(registerUser({name, email, password})); 
        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onsubmit(e)}>
                <div className="form-group">
                <input type="text" 
                placeholder="Name" 
                name="name" 
                required 
                value={name} 
                onChange={e => onchange(e)}
                />
                </div>
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
                    required
                    value={password} 
                    onChange={e => onchange(e)}
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    minLength="6"
                    required
                    value={password2} 
                    onChange={e => onchange(e)}
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
        </p>
        </Fragment>
    );
};

export default Register;
