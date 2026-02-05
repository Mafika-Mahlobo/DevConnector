import React, { Fragment } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../state/posts';
import { Link } from 'react-router-dom';


const PostItem = ({post, showItems}) => {
    const dispatch = useDispatch();
    const { _id, text, name, avatar, user, likes, comments, date } = post;
    const { isAuthenticated, user: currentUser } = useSelector(state => state.auth);
    
  return (

    <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
              {text}
            </p>
             <p className="post-date">
                Posted on {moment(date).format('DD-MM-YYYY')}
            </p>
            
            {showItems === true && 
                <Fragment>
                                <button onClick={() => {
                              dispatch(addLike(_id));
                          }}
                          
                          type="button" className="btn btn-light">
                            <i className="fas fa-thumbs-up"></i>{' '}
                            {likes.length > 0 &&
                              <span>{likes.length}</span>
                            }
                          </button>
                          <button onClick={() => {
                              dispatch(removeLike(_id));
                          }} 
                          type="button" className="btn btn-light">
                            <i className="fas fa-thumbs-down"></i>
                          </button>
                          <Link to={`/post/${_id}`} className="btn btn-primary">{' '}
                            Discussion {comments.length > 0 && 
                              <span className='comment-count'>{comments.length}</span>
                            }
                          </Link>
                          {isAuthenticated && user === currentUser._id &&
                              <button onClick={() => {
                                  dispatch(deletePost(_id));
                              }}  
                                  type="button"
                                  className="btn btn-danger"
                              >
                                  <i className="fas fa-times"></i>
                              </button>
                          }
                </Fragment>
            }
            
          </div>
        </div>
  )
}

export default PostItem
