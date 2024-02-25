import { SERVER_URL } from '../constants/server'

const loginUser = async userData => {
  try {
    const response = await fetch(SERVER_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(userData)
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

const registerUser = async userData => {
  try {
    const response = await fetch(SERVER_URL + '/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(userData)
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

const authService = {
  loginUser,
  registerUser
}

export default authService
