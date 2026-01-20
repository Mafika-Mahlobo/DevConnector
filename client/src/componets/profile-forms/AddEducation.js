import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEducation,  clearProfileErrors} from '../../state/profile';
import { Link } from 'react-router-dom';
import { setAlert, clearAlert } from '../../state/alert';
import { ALERT_DANGER } from '../../state/types'


const AddEducation = () => {
    const [formData, setFormData] = useState({
        school: '', 
        degree: '', 
        fieldofstudy: '', 
        from: '', 
        to: '', 
        current: false, 
        description: ''
    });

    const [toDateDisabled, toogleDisabled] = useState(false);

    const { 
        school, 
        degree, 
        fieldofstudy, 
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
        <h1 className="large text-primary">
            Add Education
        </h1>
        <p className="lead">
            <i className="fas fa-code-branch"></i> Add any shool or bootcamp you attended in the past
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={e => {
            e.preventDefault();
            dispatch(addEducation(formData));
        }}>
            <div className="form-group">
            <input type="text" placeholder="* School or Bootcamp" name="school" required value={school} onChange={(e) => onChange(e)}/>
            </div>
            <div className="form-group">
            <input type="text" placeholder="* Degree" name="degree" required value={degree}  onChange={(e) => onChange(e)}/>
            </div>
            <div className="form-group">
            <input type="text" placeholder="Field of stydy" name="fieldofstudy" value={fieldofstudy} onChange={(e) => onChange(e)} />
            </div>
            <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" value={from} onChange={(e) => onChange(e)} />
            </div>
            <div className="form-group">
            <p><input type="checkbox" name="current" value={current} checked={current} 
                onChange={(e) => {
                    setFormData({...formData, current: !current});
                    toogleDisabled(!current)
                }}
            /> {' '}Current</p>
            </div>
            <div className="form-group">
            <h4>To Date</h4>
            <input type="date" name="to" value={to} onChange={(e) => onChange(e)} disabled={toDateDisabled ? 'disabled': ''}/>
            </div>
            <div className="form-group">
            <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Degree or Bootcamp"
                value={description}
                onChange={(e) => onChange(e)}
            ></textarea>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
        </form>
    </Fragment>
  )
}

export default AddEducation;
