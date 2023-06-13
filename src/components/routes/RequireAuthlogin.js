import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequireAuthlogin = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const token=localStorage.getItem('token');
    console.log("heeeey",token);
    const role=localStorage.getItem('role');
    
    return (

        token? (role==='2'?<Navigate to="/user" state={{ from: location }} replace />:<Navigate to="/admin" state={{ from: location }} replace />) :<Outlet />
                 
               
    );
}


export default RequireAuthlogin;