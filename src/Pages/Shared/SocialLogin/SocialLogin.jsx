import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";


const SocialLogin = () => {
    const {googleSingIn} = useContext(AuthContext)

    const handelGoogleSingIn= ()=>{
        googleSingIn()
        .then(result => {
            console.log(result.user);
        })
        .catch(error => {
            console.log(error.message);
        })
    }
    return (
        <div className="flex flex-col w-full border-opacity-50 ">
            <div className="divider">OR</div>
           <div className="text-center">
           <button onClick={handelGoogleSingIn} className="btn btn-circle ">
                G
            </button>
           </div>
        </div>
    );
};

export default SocialLogin;