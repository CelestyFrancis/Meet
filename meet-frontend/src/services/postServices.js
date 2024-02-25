import { SERVER_URL } from '../constants/server'

const createPost = async post => {
  try {
    const response = await fetch(SERVER_URL + '/post/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('token')
      },
      mode: 'cors',
      body: JSON.stringify(post)
    })
    if (response.status != 200) {
      const data = await response.json()
      throw new Error(data.message)
    }
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

const getAllPosts = async () => {
  try {
    const response = await fetch(SERVER_URL + '/post/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('token')
      },
      mode: 'cors'
    })

    if (response.status != 200) {
      const data = await response.json()
      throw new Error(data.message)
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

const getUserPosts = async () => {
  try {
    const response = await fetch(SERVER_URL + '/post/get_my_post', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('token')
      },
      mode: 'cors'
    })

    if (response.status != 200) {
      const data = await response.json()
      throw new Error(data.message)
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}
const postService = {
  createPost,
  getAllPosts,
  getUserPosts
}

export default postService
