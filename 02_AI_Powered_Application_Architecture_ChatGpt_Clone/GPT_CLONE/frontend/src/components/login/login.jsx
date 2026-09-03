import React from 'react'

function login() {
  return (
    <div className="login-container">
      <h1 className="login-title">LogIn</h1>
      <form className="login-form">
        <div className="login-form-group">
          <label htmlFor="email" >Email</label>
          <input type="email" id="email" />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

export default login
