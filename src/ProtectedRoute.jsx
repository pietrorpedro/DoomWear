import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function ProtectedRoute() {
    const {user, loading} = useAuth();

    if (loading) return <></>;

    return user ? <Outlet/> : <Navigate to={"/auth"}/>
}