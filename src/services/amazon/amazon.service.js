import { authGet, authPost, get, post } from '../../infrastructure/data/apiCalls';
import ApiRoutes from '../../infrastructure/data/apiRoutes';

//const liveHost = 'https://dummyjson.com';


export const getAsinDataRequest = async (asin) => {
    return new Promise((resolve, reject) => {
        const data = get(ApiRoutes.getAmazonAsinData(asin));
        if (!data) { reject("Product info not found!"); }
        else { resolve(data); }
    })
};


export const getAsinDataTransform = (result) => {
    //console.log("getAllCategoriesTransform", result);
    //const formattedResponse = result.map(makeCat);
    //return JSON.parse(result);
    return result;
};