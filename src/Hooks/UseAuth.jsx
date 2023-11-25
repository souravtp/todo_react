import { useContext } from "react";
import { AuthenticationContext } from "../Store/AuthenticationProvider";


const useAuth = () => {
    return useContext(AuthenticationContext);
}

export default useAuth;