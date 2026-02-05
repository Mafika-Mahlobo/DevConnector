import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../state/posts';


const CommentItem = ({ comment, postId }) => {
    const { _id, text, avatar, name, user, date } = comment;
    const { user: authUser, loading } = useSelector(state => state.auth);
    const dispatch = useDispatch();

  return (
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{ name }</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
              {text}
            </p>
             <p className="post-date">
                Posted on {moment(date).format('DD-MM-YYYY')}
            </p>
            {!loading && user === authUser._id && (
                <button className='btn btn-danger' onClick={() => {
                    dispatch(deleteComment({postId: postId, commentId: _id}));
                }}>
                    <i className='fas fa-times'></i>
                </button>
            )}
          </div>
        </div>
  )
}

export default CommentItem
