import React, { Fragment } from 'react'
import  moment from 'moment';
import { deleteEducation } from '../../state/profile';
import { useDispatch } from 'react-redux';

const Education = ({education}) => {

    const dispatch = useDispatch();

    const educations = education.map(edu => {
       return (
       <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className='hide-sm'>{edu.degree}</td>
            <td>
                {moment(edu.from).format('YYYY/MM/DD')} - {' '}
                {
                    edu.to === null ? ('Now') : moment(edu.to).format('YYYY/MM/DD')
                }
            </td>
            <td>
                <button onClick={() => dispatch(deleteEducation(edu._id))} className='btn btn-danger'>Delete</button>
            </td>
        </tr>
        )
    })

  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
            <tr>
                <th>School</th>
                <th className='hide-sm'>degree</th>
                <th className='hide-sm'>Years</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            { educations }
        </tbody>
      </table>
    </Fragment>
  )
}

export default Education
