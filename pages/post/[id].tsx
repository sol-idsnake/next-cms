import React from 'react'
import { GetServerSideProps } from 'next'
import { PostProps } from '../../components/Post'
import 'normalize.css'

const Post: React.FC<PostProps> = (props) => {
  const post = props

  return (
    <section>
      <main>
        <div>{post.title}</div>
        <small>{post.updatedAt}</small>
        <article>{post.content}</article>
      </main>
      <style jsx>{`
        section {
          align-items: center;
          display: flex;
          flex-direction: column;
        }

        main {
          max-width: 1000px;
        }
      `}</style>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3000/api/post/${context.params.id}`)
  const data = await res.json()

  return { props: { ...data } }
}

export default Post
