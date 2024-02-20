import React, { useState } from "react";

import { authGet, authPost, get, post } from '../../infrastructure/data/apiCalls';
import ApiRoutes from '../../infrastructure/data/apiRoutes';

export const serverLoginRequest = async (email, password) => {

    var body = {
        "email": email,
        "password": password
    };

    return new Promise((resolve, reject) => {
        const data = post(ApiRoutes.login, body);
        //console.log("serverLoginRequest", data);
        if (!data) { reject("error!"); }
        else { resolve(data); }
    })
};

export const serverRefreshTokenRequest = async (userId, token, refreshToken) => {

    var body = {
        "userId": userId,
        "token": token,
        "refreshToken": refreshToken
    };

    return new Promise((resolve, reject) => {
        //console.log("serverRefreshTokenRequest start");
        const data = post(ApiRoutes.refreshToken, body);
        //console.log("serverRefreshTokenRequest", data);
        if (!data) { reject("error!"); }
        else { resolve(data); }
    })
};


export const serverRegisterRequest = async (email, password, uid) => {

    var body = {
        "email": email,
        "password": password,
        "id": uid,
        "countryId": 1,
        "firstName": "",
        "lastName": ""
    };
    //console.log(body, ApiRoutes.register);

    return new Promise((resolve, reject) => {
        const data = post(ApiRoutes.register, body);
        //console.log("serverRegisterRequest", data);
        if (!data) { reject("error!"); }
        else { resolve(data); }
    })
};