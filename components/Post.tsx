import Link from 'next/link'

export type PostProps = {
  content: string
  createdAt: string
  id: string
  published: boolean
  title: string
  updatedAt: string
  userId: string
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const slug = post.title.toLowerCase().replace(/\s/g, '-')

  return (
    <Link
      href={{
        pathname: '/post/[id]',
        query: { id: post.id, title: slug },
      }}
    >
      <a>
        <h2>{post.title}</h2>
        <small>{post.updatedAt}</small>
        <article>{post.content}</article>
        <style jsx>{`
          a {
            text-decoration: none;
            color: inherit;
            padding: 1.5em;
            display: block;
          }
          h2 {
            margin-top: 0;
          }
        `}</style>
      </a>
    </Link>
  )
}

export default Post
