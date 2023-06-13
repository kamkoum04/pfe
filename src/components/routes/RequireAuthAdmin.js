import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequireAuthAdmin = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const role=localStorage.getItem('role');
    console.log("heeeey",role);
    const rolet= role=== '1';
    console.log("tessssst",rolet);
   
    return (

        rolet? <Outlet />
            : auth?.user
                ? <Navigate to="/" state={{ from: location }} replace />
                : <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
}


export default RequireAuthAdmin;