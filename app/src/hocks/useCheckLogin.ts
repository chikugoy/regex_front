import {useContext, useEffect} from "react"
import {onAuthStateChanged} from "firebase/auth"
import {auth} from "../firebase/firebase"
import {setUserContext} from "../userProvider"

export const useCheckLogin = () => {
  const useSetUserContext = () => useContext(setUserContext)
  const setUser = useSetUserContext()

  const checkLogin = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken(true)
        const newUser = {
          ...user,
          accessToken: token
        } as IUser
        setUser(newUser)

      } else {
        setUser({} as IUser)
      }
    })
  }

  useEffect(() => {
    (async () => {
      await checkLogin()
    })()
  }, [])
}