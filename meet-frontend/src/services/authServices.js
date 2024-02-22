export const loginUser = async userData => {
  try {
    const response = await fetch('http://127.0.0.1:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(userData)
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error logging in user:', error)
  }
}
