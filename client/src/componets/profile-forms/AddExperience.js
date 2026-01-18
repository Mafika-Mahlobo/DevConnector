import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addExperience,  clearProfileErrors} from '../../state/profile';
import { Link } from 'react-router-dom';
import { setAlert, clearAlert } from '../../state/alert';
import { ALERT_DANGER } from '../../state/types'


const AddExperience = () => {
    const [formData, setFormData] = useState({
        title: '', 
        company: '', 
        location: '', 
        from: '', 
        to: '', 
        current: false, 
        description: '' 
    });

    const [toDateDisabled, toogleDisabled] = useState(false);

    const { title, 
            company, 
            location, 
            from, 
            to, 
            current, 
            description 
        } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const dispatch = useDispatch();
    const { errors } = useSelector(state => state.profile);

    //Invoke alert reducers
        useEffect(() => {
            if (errors?.errors) {
                errors.errors.forEach(error => {
                    dispatch(setAlert({msg: error.msg, alertType: ALERT_DANGER}));
                });
    
                //clcear auth errors
                dispatch(clearProfileErrors());
    
                //clear alerts
                setTimeout(() => {
                    dispatch(clearAlert());
                }, 3000);

                
            }
        }, [errors]);

  return (
    <Fragment>
        <h1 class="large text-primary">
            Add An Experience
        </h1>
        <p class="lead">
            <i class="fas fa-code-branch"></i> Add any developer/programming
            positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form class="form" onSubmit={e => {
            e.preventDefault();
            dispatch(addExperience(formData));
        }}>
            <div class="form-group">
            <input type="text" placeholder="* Job Title" name="title" required value={title} onChange={(e) => onChange(e)}/>
            </div>
            <div class="form-group">
            <input type="text" placeholder="* Company" name="company" required value={company}  onChange={(e) => onChange(e)}/>
            </div>
            <div class="form-group">
            <input type="text" placeholder="Location" name="location" value={location} onChange={(e) => onChange(e)} />
            </div>
            <div class="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" value={from} onChange={(e) => onChange(e)} />
            </div>
            <div class="form-group">
            <p><input type="checkbox" name="current" value={current} checked={current} 
                onChange={(e) => {
                    setFormData({...formData, current: !current});
                    toogleDisabled(!current)
                }}
            /> {' '}Current Job</p>
            </div>
            <div class="form-group">
            <h4>To Date</h4>
            <input type="date" name="to" value={to} onChange={(e) => onChange(e)} disabled={toDateDisabled ? 'disabled': ''}/>
            </div>
            <div class="form-group">
            <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Job Description"
                value={description}
                onChange={(e) => onChange(e)}
            ></textarea>
            </div>
            <input type="submit" class="btn btn-primary my-1" />
            <Link class="btn btn-light my-1" to="/dashboard">Go Back</Link>
        </form>
    </Fragment>
  )
}

export default AddExperience
