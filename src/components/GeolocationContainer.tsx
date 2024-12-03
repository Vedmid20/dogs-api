import { useEffect, useState } from 'react'

import Geolocation from './Geolocation'

const GeolocationContainer = () => {
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [sum, setSum] = useState<number | null>(null)

  const handleMouseMove = (
    { clientX, clientY }: { clientX: number, clientY: number }
  ) => {
    setLatitude(clientX)
    setLongitude(clientY)
  }

  useEffect(function() {
    setSum(latitude && longitude && latitude + longitude || null)
  }, [latitude, longitude])

  return <div onMouseMove={handleMouseMove}><Geolocation latitude={latitude} longitude={longitude} sum={sum} /></div>
}

export default GeolocationContainer
