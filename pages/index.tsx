import { GetServerSideProps } from 'next'
import Link from 'next/link'
import 'normalize.css'
import React from 'react'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import useUser from '../lib/hooks'

type Props = {
  posts: PostProps[]
}

const Index: React.FC<Props> = (props) => {
  const { posts } = props
  const user = useUser()

  return (
    <Layout>
      {user && (
        <aside>
          <p>Currently logged in as:</p>
          <pre>{JSON.stringify(user.username, null, 2)}</pre>
        </aside>
      )}
      <main>
        <ul>
          {
            !posts && <li>Loading...</li> // if the database is n/a
          }
          {posts &&
            posts.map((post) => (
              <li key={post.id}>
                <Post post={post} />
              </li>
            ))}
          {!posts.length && (
            <li className="no-content">
              <p>Nothing here yet..</p>
              {user && <Link href="/create">Create your first post</Link>}
              {!user && (
                <p>
                  <Link href="/login">Login</Link> to create your first post
                </p>
              )}
            </li>
          )}
        </ul>
        <style jsx>{`
          ul {
            display: flex;
            gap: 50px;
            justify-content: center;
            list-style: none;
            margin: 4em 0 0;
            padding: 0;
          }
          li:not(.no-content) {
            border: 1px solid rgba(128, 128, 128, 0.5);
            border-radius: 5px;
          }
          .no-content {
            text-align: center;
          }
        `}</style>
      </main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/post')
    const posts = await res.json()

    return {
      props: { posts },
    }
  } catch (error) {
    return {
      props: {},
    }
  }
}

export default Index
