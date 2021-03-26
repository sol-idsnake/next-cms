import { GetServerSideProps } from 'next'
import 'normalize.css'
import React from 'react'
import Header from '../components/Header'
import Post, { PostProps } from '../components/Post'
import { useUser } from '../lib/hooks'

console.clear()

type Props = {
  posts: PostProps[]
}

const Index: React.FC<Props> = (props) => {
  const { posts } = props
  const user = useUser()

  console.log(user, 'user')

  if (!posts) return <div>Loading...</div>

  return (
    <>
      <Header />

      <aside>
        {user && (
          <>
            <p>Currently logged in as:</p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </>
        )}
      </aside>
      <main>
        <ul>
          {posts &&
            posts.map((post) => (
              <li key={post.id}>
                <Post post={post} />
              </li>
            ))}
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
          li {
            border: 1px solid rgba(128, 128, 128, 0.5);
            border-radius: 5px;
          }
        `}</style>
      </main>
    </>
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
