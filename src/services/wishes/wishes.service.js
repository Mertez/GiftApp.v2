import camelize from "camelize";
import { host, useMock } from "../../utils/env";
import { authGet, authPost, get, post } from '../../infrastructure/data/apiCalls';
import ApiRoutes from '../../infrastructure/data/apiRoutes';



export const getPiggyBankRequest = async () => {
    //console.log(ApiRoutes.getPiggyBank);
    return new Promise((resolve, reject) => {
        const piggyBank = authGet(ApiRoutes.getPiggyBank);
        //console.log("ok");
        if (!piggyBank) { reject("No piggyBank found!"); }
        else { resolve(piggyBank); }
    })
};


export const getPiggyBankTransform = (result) => {
    return { result };
};


export const getWishListsRequest = async () => {
    //console.log(ApiRoutes.getPiggyBank);
    return new Promise((resolve, reject) => {
        const wishList = authGet(ApiRoutes.getWishLists);
        //console.log("ok");
        if (!wishList) { reject("No wishList found!"); }
        else { resolve(wishList); }
    })
};


export const getWishListsTransform = (result) => {
    return { result };
};

export const getMyWishListsRequest = async (getListOnly) => {
    //console.log(ApiRoutes.getPiggyBank);
    return new Promise((resolve, reject) => {
        const wishList = authGet(ApiRoutes.getMyWishLists(getListOnly));
        //console.log("ok");
        if (!wishList) { reject("No wishList found!"); }
        else { resolve(wishList); }
    })
};


export const getMyWishListsTransform = (result) => {
    //console.log(result);
    return { result };
};


export const createWishListRequest = async (name, icon) => {
    var body = {
        "name": name,
        "icon": icon
    }
    //console.log(ApiRoutes.getPiggyBank);
    return new Promise((resolve, reject) => {
        const wishList = authPost(ApiRoutes.createWishList, body);
        //console.log("ok");
        if (!wishList) { reject("No wishList found!"); }
        else { resolve(wishList); }
    })
};


export const createWishListTransform = (result) => {
    return { result };
};


export const updateWishListRequest = async (id, name) => {
    var body = {
        "name": name
    }
    //console.log(ApiRoutes.getPiggyBank);
    return new Promise((resolve, reject) => {
        const result = authPost(ApiRoutes.updateWishList(id), body);
        //console.log("ok");
        if (!result) { reject("No wishList found!"); }
        else { resolve(result); }
    })
};


export const updateWishListTransform = (result) => {
    return { result };
};


export const deleteWishListRequest = async (id) => {

    //console.log(ApiRoutes.getPiggyBank);
    return new Promise((resolve, reject) => {
        const result = authPost(ApiRoutes.deleteWishList(id));
        //console.log("ok");
        if (!result) { reject("No wishList found!"); }
        else { resolve(result); }
    })
};


export const deleteWishListTransform = (result) => {
    return { result };
};



export const getWishesRequest = async (userId, wishlistId) => {
    //console.log(ApiRoutes.getPiggyBank);
    return new Promise((resolve, reject) => {
        const wishes = authGet(ApiRoutes.getWishes(userId, wishlistId));
        //console.log("ok");
        if (!wishes) { reject("No wishList found!"); }
        else { resolve(wishes); }
    })
};


export const getWishesTransform = (result) => {
    return { result };
};


export const createWishRequest = async (name, productId, currentPrice, amazonAsin, sourceUrl, sourceImageUrl, wishlistId, isAGift) => {
    var body = {
        "name": name,
        "productId": productId,
        "currentPrice": currentPrice,
        "amazonAsin": amazonAsin,
        "sourceUrl": sourceUrl,
        "sourceImageUrl": sourceImageUrl,
        "wishlistId": wishlistId,
        "isAGift": isAGift
    }
    //console.log(ApiRoutes.getPiggyBank);
    return new Promise((resolve, reject) => {
        const result = authPost(ApiRoutes.createWish, body);
        //console.log("ok");
        if (!result) { reject("No wish found!"); }
        else { resolve(result); }
    })
};


export const createWishTransform = (result) => {
    return { result };
};


export const updateWishRequest = async (id, name, productId, currentPrice, amazonAsin, sourceUrl, sourceImageUrl, wishlistId, isAGift) => {
    var body = {
        "id": id,
        "name": name,
        "productId": productId,
        "currentPrice": currentPrice,
        "amazonAsin": amazonAsin,
        "sourceUrl": sourceUrl,
        "sourceImageUrl": sourceImageUrl,
        "wishlistId": wishlistId,
        "isAGift": isAGift
    }
    //console.log(ApiRoutes.getPiggyBank);
    return new Promise((resolve, reject) => {
        const result = authPost(ApiRoutes.updateWish(id), body);
        //console.log("ok");
        if (!result) { reject("No wish found!"); }
        else { resolve(result); }
    })
};


export const updateWishTransform = (result) => {
    return { result };
};


export const deleteWishRequest = async (id) => {

    //console.log(ApiRoutes.getPiggyBank);
    return new Promise((resolve, reject) => {
        const result = authPost(ApiRoutes.deleteWish(id));
        //console.log("ok");
        if (!result) { reject("No wish found!"); }
        else { resolve(result); }
    })
};


export const deleteWishTransform = (result) => {
    return { result };
};

