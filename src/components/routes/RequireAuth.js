import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const role=localStorage.getItem('role');
    console.log("heeeey",role);
    const rolet= role=== '2';
    console.log("tessssst",rolet);
   console.log('test logiiiiiiiin',auth?.user)
    return (

        rolet? <Outlet />
                : <Navigate to="/unauthorized" state={{ from: location }} replace />
               
    );
}


export default RequireAuth;