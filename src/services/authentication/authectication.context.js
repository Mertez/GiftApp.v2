import React, { createContext, useState, useRef, useEffect } from "react";
import { serverRegisterRequest, serverLoginRequest, serverRefreshTokenRequest } from "./authentication.service";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [currentActivity, setCurrentActivity] = useState('---');
    //const auth = useRef(getAuth()).current;

    const setLoggedInUser = async (u) => {

        //console.log("setLoggedInUser", u);
        // return;

        if (u == null) {
            setUser(null);

            await AsyncStorage.removeItem(`TOKEN`);
            await AsyncStorage.removeItem(`USERID`);
            await AsyncStorage.removeItem(`REFRESH_TOKEN`);
            await AsyncStorage.removeItem(`USER`);

            return;
        }


        //setCurrentActivity('user set');
        //console.log(`TOKEN (setLoggedInUser):`, u.token);

        await AsyncStorage.setItem(`TOKEN`, u.token);
        await AsyncStorage.setItem(`USERID`, u.userId);
        await AsyncStorage.setItem(`REFRESH_TOKEN`, u.refreshToken);
        await AsyncStorage.setItem(`USER`, JSON.stringify(u));
        setUser(u);

    }

    useEffect(() => {
        async function tryLoginByRefreshToken() {

            //await delay(5000);
            await onRefreshToken();
        }

        setIsLoading(true);
        //setCurrentActivity('tryLoginByRefreshToken');
        tryLoginByRefreshToken();
    }, []);


    const onLogin = async (email, password) => {
        console.log("xxxxxxxxxxxxxxxxxxxxxxx onLogin");
        setIsLoading(true);

        await serverLoginRequest(email, password)
            //.then(serverLoginTransform)
            .then((result) => {
                console.log("serverLoginRequest", result);
                setError(null);
                setLoggedInUser(result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from Authentication.Context:", err);
            });

        setIsLoading(false);
    };

    const onRefreshToken = async () => {


        var token = await AsyncStorage.getItem(`TOKEN`);
        var userId = await AsyncStorage.getItem(`USERID`);
        var refreshToken = await AsyncStorage.getItem(`REFRESH_TOKEN`);

        if (token == null || userId == null || refreshToken == null) {
            await setLoggedInUser(null);
            setIsLoading(false);
            //setCurrentActivity('token == null');
            return;
        }


        //setCurrentActivity('serverRefreshTokenRequest start');
        await serverRefreshTokenRequest(userId, token, refreshToken)
            //.then(serverLoginTransform)
            .then((result) => {
                //console.log(`******* serverRefreshTokenRequest SUCCESS *******`, token, userId, refreshToken, result);
                setError(null);
                setLoggedInUser(result);
            })
            .catch((err) => {
                setLoggedInUser(null);
                setError(err);
                console.error("Error from serverRefreshTokenRequest:", err);
            });

        //setCurrentActivity('onRefreshToken Finished');
        setIsLoading(false);
    };


    const onLogout = () => {
        setIsLoading(true);

        setLoggedInUser(null);

        setIsLoading(false);
    };

    const onRegister = (email, password, repeatedPassword) => {
        setIsLoading(true);
        //console.log(email);
        if (password !== repeatedPassword) {
            setError("Error: Passwords do not match");
            return;
        }

        //console.log(u);
        var u = serverRegisterRequest(email, password, '');
        // setIsLoading(false);
        //setUser(u);
        setLoggedInUser(u);

        setIsLoading(false);

    };



    return (
        <AuthenticationContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                isLoading,
                error,
                currentActivity,
                onLogin,
                onRegister,
                onLogout,
                onRefreshToken,
            }}
        >{children}</AuthenticationContext.Provider>
    )
}