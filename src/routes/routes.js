import React from "react"
import { BrowserRouter } from "react-router-dom"
import LoginRoutes from "./LoginRoutes"
import HomeRoutes from "./HomeRoutes"
import RegisterRoutes from "./RegisterRoutes"
import AddRoutes from "./AddRoutes"

export default function Routes() {
  return (
    <BrowserRouter>
      <AddRoutes />
      <HomeRoutes />
      <LoginRoutes />
      <RegisterRoutes />
    </BrowserRouter>
  )
}
