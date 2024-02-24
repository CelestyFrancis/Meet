const createPost = async post => {
  try {
    const response = await fetch('http://127.0.0.1:5000/post/create', {
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

const getPosts = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/post/get', {
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
  getPosts
}

export default postService
