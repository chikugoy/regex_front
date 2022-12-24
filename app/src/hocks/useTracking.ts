import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import ReactGA from "react-ga4"

export const useTracking = () => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.initialize(String(process.env.REACT_APP_GOOGLE_TRACKING_ID) || '')
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    })
  }, [location])
}