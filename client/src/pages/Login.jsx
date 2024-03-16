import {useUserContext} from "../context/UserContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import LoginComponet from "@/components/custtomComponets/LoginComponet.jsx";

function Login() {
    const { user,token } = useUserContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (token){
            navigate(`/${user.role}`)
        }
    }, [navigate, token, user]);

    return (
        <>
            <LoginComponet />
        </>
    );
}

export default Login;