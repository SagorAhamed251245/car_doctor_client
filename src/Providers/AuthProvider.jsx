import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../Firebase/firebase.config";

export const AuthContext = createContext()
const auth = getAuth(app)


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword( auth , email , password)
    }
    const singInUser =(email, password)=> {
        setLoading(true)
        return signInWithEmailAndPassword(auth , email , password)
    }
    const googleSingIn =  () => {
        setLoading(true)
                return signInWithPopup(auth, googleProvider)

    }

    const logout = ()=> {
        setLoading(true)
        
        return signOut(auth)
    }
    
 useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser)
        setLoading(false)
        console.log(currentUser)
        if(currentUser && currentUser.email){
            const loggedUser = {
                email: currentUser.email
            }
            fetch('http://localhost:5000/jwt', {
                method: 'POST', 
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(loggedUser)
            })
            .then(res => res.json())
            .then(data => {
                console.log('jwt response', data);
                // Warning: Local storage is not the best (second best place) to store access token
                localStorage.setItem('car-access-token', data.token);
            })
        }
        else{
            localStorage.removeItem('car-access-token');
        }
    })
    return () => {
    return unsubscribe()
    }
 },[])
   
    const authInfo = {
        user,
        loading,
        createUser,
        singInUser,
        logout,
        googleSingIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;