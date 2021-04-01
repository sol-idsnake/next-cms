import { format } from 'date-fns'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import { User } from '.prisma/client'
import Layout from '../components/Layout'
import useUser from '../lib/hooks'

const Profile = () => {
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const user: User = useUser()
  const emailConfirmed = user?.emailConfirmed

  // console.log(emailConfirmed, 'user')

  useEffect(() => {
    if (user === null) {
      Router.push('/')
    }

    if (user && user.email) {
      setEmail(user.email)
    }
  }, [user])

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      email: e.currentTarget.email.value,
    }

    try {
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.status === 200) {
        Router.push({ pathname: '/profile' })
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }

  const memberSince = (user && format(new Date(user.createdAt), 'MMM, yyyy')) || 'n/a'

  return (
    <Layout>
      {user && (
        <>
          <div>
            <p>
              Profile: <strong>{user.username}</strong>
            </p>
            <p>Member since: {memberSince}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="email">
              Email
            </label>
            {!emailConfirmed && <span className="notConfirmed">Email not verified</span>}
            <input
              id="email"
              name="email"
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="What's your email?"
              type="email"
              value={email}
            />

            <section className="submit">
              <button type="submit">Save</button>
            </section>

            {errorMsg && <p className="error">{errorMsg}</p>}
          </form>
        </>
      )}
      <style jsx>{`
        div {
          display: flex;
          justify-content: space-between;
          margin-bottom: 3em;
        }
        span {
          border: 1px solid #ab3f3f;
          border-radius: 5px;
          color: #ab3f3f;
          font-size: 12px;
          padding: 0.1em 0.5em 0.2em;
          text-align: right;
        }
        form {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          margin: 0 auto;
          max-width: 20rem;
        }
        label {
          flex: 1;
        }
        label > span {
          font-weight: 600;
        }
        input {
          border-radius: 4px;
          border: 1px solid #ccc;
          flex: 1 0 100%;
          margin: 0.5rem 0 1rem;
          padding: 8px;
        }
        .submit {
          align-items: center;
          display: flex;
          justify-content: flex-end;
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
    </Layout>
  )
}

export default Profile
