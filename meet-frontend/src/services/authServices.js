const loginUser = async userData => {
  try {
    const response = await fetch('http://127.0.0.1:5000/auth/login', {
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
  loginUser
}

export default authService
