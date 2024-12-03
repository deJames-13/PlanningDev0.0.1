import { CSpinner, useColorModes } from '@coreui/react'
import React, { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index'
import './scss/style.scss'


const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('dashboard-theme')
  const { name: storedTheme } = useSelector((state) => state.theme)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }
    setColorMode(storedTheme)
  }, [])

  const Fallback = () => {
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    )
  }

  return (
    <React.StrictMode>
      <Suspense fallback={<Fallback />}>
        <RouterProvider router={router} fallbackElement={<Fallback />} />
      </Suspense>
    </React.StrictMode>
  )
}

export default App
