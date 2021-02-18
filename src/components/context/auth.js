import React, { createContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { auth } from "../../firebase/Firebase";

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
    const [userState, setUserState] = useState(null);
    const [authPending, setAuthPending] = useState(true);

    const signIn = (username, password) => {
        return auth.signInWithEmailAndPassword(username, password);
    }

    const signInWithGoogle = () => {
        //google sign-in method must be enabled on firebase console to use the provider
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(googleProvider).then((res) => {
            const userInfo = (({ email, displayName, phoneNumber, photoURL }) => ({ email, displayName, phoneNumber, photoURL }))(object);
            // localStorage.setItem('user',userInfo);
            setUserState(userInfo);
        }).catch((error) => console.log(error.message))
    }

    const signUp = (username, password) => {
        return auth.createUserWithEmailAndPassword(username, password);
    }

    const signOut = () => auth.signOut();

    useEffect(() => {
        return auth.onAuthStateChanged((userAuth) => {
            setUserState(userAuth);
            setAuthPending(false);
        })
    }, [])

    if (authPending) {
        return (
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh"
            }}
            >
                <div>Authentication in progress</div>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{
            signIn: signIn,
            signInWithGoogle: signInWithGoogle,
            signUp: signUp,
            signOut: signOut,
            userState: userState
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}