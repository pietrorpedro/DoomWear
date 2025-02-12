import { BrowserRouter, Route, Routes } from "react-router-dom"

import Header from "./components/Header"
import Auth from "./pages/Auth"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import ProtectedRoute from "./ProtectedRoute"

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/profile" element={<Profile/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}