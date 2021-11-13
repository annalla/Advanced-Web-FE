import React from "react"
import { BrowserRouter } from "react-router-dom"
import LoginRoutes from "./LoginRoutes"
import HomeRoutes from "./HomeRoutes"
import RegisterRoutes from "./RegisterRoutes"

export default function Routes() {
  return (
    <BrowserRouter>
      <HomeRoutes />
      <LoginRoutes />
      <RegisterRoutes />
    </BrowserRouter>
  )
}
