import React, {Fragment, useEffect} from 'react';
import Spinner from '../layouts/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPost } from '../../state/posts';
import PostItem from '../posts/PostItem';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

const Post = () => {
    const dispatch = useDispatch();
    const { loading, post } = useSelector(state => state.post);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [dispatch, id]);

  return (
    <Fragment>
        {loading || post === null ? <Spinner /> : 
            <Fragment>
                <Link to='/posts' className='btn'>Back to posts</Link>
                <PostItem post={post} postItems={false} />
                <CommentForm id={id} />        
                <div className='comments'>
                    { post.comments.map(comment => (
                        <CommentItem key={comment._id} comment={comment} postId={id} />
                    ))}
                </div>
            </Fragment>
        }
     </Fragment>
  )
}

export default Post
