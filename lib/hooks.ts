import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { User } from '.prisma/client'

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => ({ user: data?.currentUser || null }))

type HookProps = {
  redirectIfFound?: boolean
  redirectTo?: string
}

const useUser = ({ redirectTo, redirectIfFound }: HookProps = {}): User | null => {
  const { data, error } = useSWR('/api/user/user', fetcher)

  const user = data?.user
  const finished = Boolean(data)
  const hasUser = Boolean(user)

  useEffect(() => {
    if (!redirectTo || !finished) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo)
    }
  }, [redirectTo, redirectIfFound, finished, hasUser])

  return error ? null : user
}

export default useUser
