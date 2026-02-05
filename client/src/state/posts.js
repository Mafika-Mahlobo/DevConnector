import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setAlert } from "./alert";
import { ALERT_DANGER, ALERT_SUCCESS } from "./types";

const initialState =  {
    posts: [],
    post: null,
    loading: false,
    errors: null,
};

//Add post
export const addPost = createAsyncThunk(
    "post/add",
    async (FormData, thunkAPI) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            const res = await axios.post('/api/posts', FormData, config);
            thunkAPI.dispatch(setAlert({msg: "Post added", alertType: ALERT_SUCCESS}));
            return res.data;

        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

//Get posts
export const getPosts = createAsyncThunk(
    "posts/get",
    async (__, thunkAPI) => {
        try {
            const res = await axios.get('/api/posts');
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

//Get post
export const getPost = createAsyncThunk(
    "post/get",
    async (id, thunkAPI) => {
        try {
            const res = await axios.get(`/api/posts/${id}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

//Delete post
export const deletePost = createAsyncThunk(
    "post/delete",
    async (postId, thunkAPI) => {
        try {
            await axios.delete(`/api/posts/${postId}`);
            thunkAPI.dispatch(setAlert({msg: "Post deleted", alertType: ALERT_SUCCESS}));
            return {id: postId};

        } catch (error) {
            thunkAPI.dispatch(setAlert({msg: error.response.data.msg, alertType: ALERT_DANGER}));
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

//Add comment
export const addComment = createAsyncThunk(
    "comment/add",
    async (commentData, thunkAPI) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            const res = await axios.post(`/api/posts/comment/${commentData.postId}`, {text: commentData.body}, config);
            thunkAPI.dispatch(setAlert({msg: "Comment added", alertType: ALERT_SUCCESS}));
            return res.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

//Delete comment
export const deleteComment = createAsyncThunk(
    "comment/delete",
    async (commentData, thunkAPI) => {
        try {
    
            await axios.delete(`/api/posts/comment/${commentData.postId}/${commentData.commentId}`);
            thunkAPI.dispatch(setAlert({msg: "Comment Deleted", alertType: ALERT_SUCCESS}));
            return {id: commentData.commentId};

        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Add like
export const addLike = createAsyncThunk(
    "like/add",
    async (postId, thunkAPI) => {
        try {
           const res = await axios.put(`/api/posts/like/${postId}`);
           return {id: postId, likes: res.data};
        } catch (error) {
            thunkAPI.dispatch(setAlert({msg: error.response.data.msg, alertType: ALERT_DANGER}));
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Remove like
export const removeLike = createAsyncThunk(
    "like/remove",
    async (postId, thunkAPI) => {
        try {

           const res = await axios.put(`/api/posts/unlike/${postId}`);
           return {id: postId, likes: res.data};

        } catch (error) {
            thunkAPI.dispatch(setAlert({msg: error.response.data.msg, alertType: ALERT_DANGER}));
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        clearPost: (state) => {
            state.post = null;
        }
    },
    extraReducers: (builder) => {
        //All posts
        builder.addCase(getPosts.pending, (state) => {
            state.loading = true;
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        })
        .addCase(getPosts.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        })

        //single post by ID
        .addCase(getPost.pending, (state) => {
            state.loading = true;
        })
        .addCase(getPost.fulfilled, (state, action) => {
            state.loading = false;
            state.post = action.payload;
        })
        .addCase(getPost.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        })

        //add post
        .addCase(addPost.fulfilled, (state, action) => {
            state.posts.push(action.payload);
        })
        .addCase(addPost.rejected, (state, action) => {
            state.errors = action.payload;
        })

        //Delete post
        .addCase(deletePost.fulfilled, (state, action) => {
            const id = action.payload.id;
            state.posts = state.posts.filter(post => post._id !== id);
        })
        .addCase(deletePost.rejected, (state, action) => {
            state.errors = action.payload;
        })

        //add comment
        .addCase(addComment.fulfilled, (state, action) => {
            state.post.comments = action.payload;
        })
        .addCase(addComment.rejected, (state, action) => {
            state.errors = action.payload;
        })

        //Delete comment
        .addCase(deleteComment.fulfilled, (state, action) => {
            const id = action.payload.id;
            state.post.comments = state.post.comments.filter(comment => comment._id !== id);
        })


        //Add like
        .addCase(addLike.fulfilled, (state, action) => {
            const { id, likes } = action.payload;

            const post = state.posts.find(post => post._id === id);
            if (post) post.likes = likes;
            state.loading = false;
        })
        .addCase(addLike.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        })


        //Remove like
        .addCase(removeLike.fulfilled, (state, action) => {
            const { id, likes } = action.payload;

            const post = state.posts.find(post => post._id === id);
            if (post) post.likes = likes;
            state.loading = false;
        })
         .addCase(removeLike.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        })
    }
});

export default postSlice.reducer;
export const { clearPost } = postSlice.actions;