import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const isUser = localStorage.getItem('user')
 
    return (isUser ? 
         <Outlet />
        : <Navigate to="/login" replace />
    )
}

export default RequireAuth
