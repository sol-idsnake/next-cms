import Link from 'next/link'
import React from 'react'

const Form = ({ isLogin, errorMessage, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <label htmlFor="username">
      <span>Username</span>
      <input type="text" name="username" id="username" required />
    </label>
    <label htmlFor="password">
      <span>Password</span>
      <input type="password" name="password" id="password" required />
    </label>
    {!isLogin && (
      <label htmlFor="rpassword">
        <span>Repeat password</span>
        <input type="password" name="rpassword" id="rpassword" required />
      </label>
    )}

    <div className="submit">
      {isLogin ? (
        <>
          <Link href="/signup">
            <a>I don&apos;t have an account</a>
          </Link>
          <button type="submit">Login</button>
        </>
      ) : (
        <>
          <Link href="/login">
            <a>I already have an account</a>
          </Link>
          <button type="submit">Signup</button>
        </>
      )}
    </div>

    {errorMessage && <p className="error">{errorMessage}</p>}

    <style jsx>{`
      form,
      label {
        display: flex;
        flex-flow: column;
      }
      label > span {
        font-weight: 600;
      }
      input {
        border-radius: 4px;
        border: 1px solid #ccc;
        margin: 0.3rem 0 1rem;
        padding: 8px;
      }
      .submit {
        align-items: center;
        display: flex;
        justify-content: space-between;
      }
      .submit > a {
        text-decoration: none;
      }
      .submit > button {
        background: #fff;
        border-radius: 4px;
        border: 1px solid #ccc;
        cursor: pointer;
        padding: 0.5rem 1rem;
      }
      .submit > button:hover {
        border-color: #888;
      }
      .error {
        color: brown;
        margin: 1rem 0 0;
      }
    `}</style>
  </form>
)

export default Form
