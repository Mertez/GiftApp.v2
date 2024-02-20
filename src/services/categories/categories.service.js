import { authGet, authPost, get, post } from '../../infrastructure/data/apiCalls';
import ApiRoutes from '../../infrastructure/data/apiRoutes';

//const liveHost = 'https://dummyjson.com';


export const getAllCategoriesRequest = async () => {
    return new Promise((resolve, reject) => {
        const categories = get(ApiRoutes.getAllCategories);
        if (!categories) { reject("No Category found!"); }
        else { resolve(categories); }
    })
};


// export const getAllCategoriesRequest = () => {
//     return fetch(`${liveHost}/products/categories`).then((res) => { return res.json(); });
// };

// const Capitalize = (str) => {
//     str = str.replace("-", " ");
//     return str.charAt(0).toUpperCase() + str.slice(1);
// }
// const makeCat = (name) => {
//     return {
//         name: Capitalize(name),
//         code: name,
//         icon: `https://robohash.org/${name}`,
//     }
// }

export const getAllCategoriesTransform = (result) => {
    //console.log("getAllCategoriesTransform", result);
    //const formattedResponse = result.map(makeCat);
    return result;
};