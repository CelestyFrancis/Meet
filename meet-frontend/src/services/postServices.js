import postStorage from '../data/postStorage'

const createPost = async post => postStorage.createPost(post)

const getAllPosts = async () => ({ posts: postStorage.getPosts() })

const getUserPosts = async authorId => ({ posts: postStorage.getUserPosts(authorId) })

const editPost = async (id, updates) => postStorage.updatePost(id, updates)

const deletePost = async id => postStorage.removePost(id)

const postService = { createPost, getAllPosts, getUserPosts, editPost, deletePost }

export default postService
