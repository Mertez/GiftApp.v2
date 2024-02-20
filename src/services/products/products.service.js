import camelize from "camelize";
import { host, useMock } from "../../utils/env";
import { authGet, authPost, get, post } from '../../infrastructure/data/apiCalls';
import ApiRoutes from '../../infrastructure/data/apiRoutes';

// const liveHost = 'https://dummyjson.com/products';


export const getProductBrandsRequest = async (productType, hot, special, categoryId) => {
    return new Promise((resolve, reject) => {
        const brands = get(ApiRoutes.getProductBrands(productType, hot, special, categoryId));
        if (!brands) { reject("No product Brands found!"); }
        else { resolve(brands); }
    })
};


export const getProductBrandsTransform = (result) => {
    //console.log("locationTransform", result);
    // const formattedResponse = camelize(result);
    // const { products = {} } = formattedResponse;
    return { result };
};

export const getProductsRequest = async (productType, hot, special, categoryId, brandId) => {
    return new Promise((resolve, reject) => {
        var url = ApiRoutes.getProducts(productType, hot, special, categoryId, brandId);
        //console.log("getProductsRequest", url);
        const products = get(url);
        //console.log("getProductsRequest", productType, hot, special, categoryId, brandId, ApiRoutes.getProducts(productType, hot, special, categoryId, brandId), products);
        if (!products) { reject("No products found!"); }
        else { resolve(products); }
    })
};


export const getProductsTransform = (result) => {
    //console.log("locationTransform", result);
    // const formattedResponse = camelize(result);
    // const { products = {} } = formattedResponse;
    return { result };
};



export const getProductsHotRequest = () => {
    return new Promise((resolve, reject) => {
        const productHots = get(ApiRoutes.getProductsHot);
        if (!productHots) { reject("No hot products found!"); }
        else { resolve(productHots); }
    })
};

export const getProductsHotTransform = (result) => {
    //console.log("locationTransform", result);
    // const formattedResponse = camelize(result);
    // const { products = {} } = formattedResponse;
    return { result };
};


export const getProductsHotByCategoryRequest = async (categoryId) => {
    return new Promise((resolve, reject) => {
        const products = get(ApiRoutes.getProductsHotByCategory(categoryId));
        if (!products) { reject("No products found in this category!"); }
        else { resolve(products); }
    })
};


export const getProductsHotByCategoryTransform = (result) => {
    //console.log("locationTransform", result);
    // const formattedResponse = camelize(result);
    // const { products = {} } = formattedResponse;
    return { result };
};


export const getProductsHotByBrandRequest = (brandId) => {
    //console.log("getProductsHotByBrandRequest", brandId, ApiRoutes.getProductsHotByBrand(brandId));
    return new Promise((resolve, reject) => {
        const productsHot = get(ApiRoutes.getProductsHotByBrand(brandId));
        if (!productsHot) { reject("No product deals found in this category!"); }
        else { resolve(productsHot); }
    })
};

export const getProductsHotByBrandTransform = (result) => {
    //console.log("locationTransform", result);
    // const formattedResponse = camelize(result);
    // const { products = {} } = formattedResponse;
    return { result };
};


export const searchProductsRequest = (q) => {
    return fetch(`${liveHost}/search?q=${q}`).then((res) => { return res.json(); });
};

export const searchProductsTransform = (result) => {
    //console.log("locationTransform", result);
    const formattedResponse = camelize(result);
    const { products = {} } = formattedResponse;
    return { products };
};



export const getSingleProductsRequest = (productId) => {
    return fetch(`${liveHost}/${productId}`).then((res) => { return res.json(); });
};

export const getSingleProductsTransform = (result) => {
    //console.log("locationTransform", result);
    const formattedResponse = camelize(result);
    const { product } = formattedResponse;
    return { product };
};
