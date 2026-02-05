import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { clearPost, getPosts } from '../../state/posts';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = () => {
    const dispatch = useDispatch();
    const { loading, posts } = useSelector(state => state.post);


    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

     useEffect(() => {
        dispatch(clearPost())
    }, [dispatch]);

  return (
    loading ? <Spinner /> : <Fragment>
        <h1 className='large text-primary'>Posts</h1>
        <p className='lead'>
            <i className='fas fa-user' /> Welcome to the community
        </p>
        <PostForm />
        <div className='posts'>
            {posts.map(post => (
                <PostItem key={post._id} post={post} showItems={true}/>
            ))}
        </div>
    </Fragment>
  )
}

export default Posts
