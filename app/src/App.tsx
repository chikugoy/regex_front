import React, {FC} from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Ruby} from "./pages/ruby"
import {UserProvider} from "./userProvider"
import {useTracking} from "./hocks/useTracking"
import {useCheckLogin} from "./hocks/useCheckLogin"

const ApplicationRoute: FC<{children: JSX.Element}> = ({ children }) => {
  useTracking()
  useCheckLogin()
  return children
}

export const App = () => {
  return (
    <React.StrictMode>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path={`/`} element={
              <ApplicationRoute>
                <Ruby />
              </ApplicationRoute>
            } />
            <Route path={`/ruby/`} element={
              <ApplicationRoute>
                <Ruby />
              </ApplicationRoute>
            } />
            {/*<Route path="*" element={<NotFound />} />*/}
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </React.StrictMode>
  )
}
