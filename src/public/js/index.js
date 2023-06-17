/* eslint-disable no-unused-vars */
// Logout User

async function logout () {
  const response = await fetch('/api/session/logout', {
    method: 'DELETE'
  })
  if (response.redirected) {
    window.location.href = response.url
  }
}
