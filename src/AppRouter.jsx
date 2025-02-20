import { BrowserRouter, Route, Routes } from "react-router-dom"

import Header from "./components/Header"
import Auth from "./pages/Auth"
import Cart from "./pages/Cart"
import Category from "./pages/Category"
import Delivery from "./pages/Delivery"
import Details from "./pages/Details"
import Home from "./pages/Home"
import Payment from "./pages/Payment"
import Profile from "./pages/Profile"
import Search from "./pages/Search"
import ProtectedRoute from "./ProtectedRoute"

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/details/:id" element={<Details/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/category/:category" element={<Category/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/profile" element={<Profile/>}/>
                </Route>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/delivery" element={<Delivery/>}/>
                    <Route path="/payment" element={<Payment/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}