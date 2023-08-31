import { useEffect } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

const usePageKick = () => {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status == "unauthenticated") router.replace("/login")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return status
}

export default usePageKick
