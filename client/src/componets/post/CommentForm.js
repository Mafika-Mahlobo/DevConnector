import React, { useState } from 'react';
import { addComment } from '../../state/posts';
import { useDispatch } from 'react-redux';


const CommentForm = ({ id }) => {
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();


  return (
    <div className="post-form">
            <div className="bg-primary p">
              <h3>Leave a comment</h3>
            </div>
            <form className="form my-1" onSubmit={(e) => {
                e.preventDefault()
                dispatch(addComment({ postId: id, body: comment}));
                setComment('');
            }}>
              <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Coment..."
                required
                value={comment}
                onChange={(e => setComment(e.target.value))}
              ></textarea>
              <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
          </div>
  )
}

export default CommentForm
