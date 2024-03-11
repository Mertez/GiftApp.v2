import { host } from "../../utils/env";
// import App from "../../../App";
// const host = App.host;
import { productTypeEnum } from "../models/enums";

function getProductsUrl(productType, hot, special, categoryId, brandId) { return `${host}/Products/GetProducts?productType=${productType}${hot >= 0 ? "&hot=" + hot : ""}${special >= 0 ? "&special=" + special : ""}${categoryId > 0 ? "&categoryId=" + categoryId : ""}${brandId != '' ? "&brandId=" + brandId : ""}`; }
const getProductsBase = getProductsUrl(productTypeEnum.Product, -1, -1, -1, "");
const getGiftCardsBase = getProductsUrl(productTypeEnum.GiftCard, -1, -1, -1, "");
const getOnlineDealsBase = getProductsUrl(productTypeEnum.OnlineDeals, -1, -1, -1, "");



module.exports = {

    appVersion: `${host}/appVersion`,

    register: `${host}/account/register`,
    login: `${host}/account/login`,
    tokenLogin: `${host}/account/tokenLogin`,
    refreshToken: `${host}/account/refreshToken`,
    getPiggyBank: `${host}/account/getPiggyBank`,

    getMyInfo: `${host}/account/getMyInfo`,
    changeName: `${host}/account/changeName`,
    changePassword: `${host}/account/changePassword`,

    getPersonToBuyGiftCategories: (personDescription) => `${host}/Chat/Answer?question=${personDescription}`,

    getProducts: (productType, hot, special, categoryId, brandId) => `${host}/Products/GetProducts?productType=${productType}${hot >= 0 ? "&hot=" + hot : ""}${special >= 0 ? "&special=" + special : ""}${categoryId > 0 ? "&categoryId=" + categoryId : ""}${brandId != '' ? "&brandId=" + brandId : ""}`,
    getProductsHot: getProductsUrl(productTypeEnum.Product, 1, -1, -1, ''),
    getProductsSpecial: getProductsUrl(productTypeEnum.Product, -1, 1, -1, ''),

    getProductsHotByCategory: (categoryId) => getProductsUrl(productTypeEnum.Product, -1, -1, categoryId, ''),
    getProductsSpecialByCategory: (categoryId) => getProductsUrl(productTypeEnum.Product, -1, -1, categoryId, ''),

    getProductsByBrand: (brandId) => getProductsUrl(productTypeEnum.Product, -1, -1, -1, brandId),
    getProductsHotByBrand: (brandId) => getProductsUrl(productTypeEnum.Product, 1, -1, -1, brandId),
    getProductsSpecialByBrand: (brandId) => getProductsUrl(productTypeEnum.Product, -1, 1, -1, brandId),

    getProductsByBrandCategory: (brandId, categoryId) => getProductsUrl(productTypeEnum.Product, -1, -1, categoryId, brandId),
    getProductsHotByBrandCategory: (brandId, categoryId) => getProductsUrl(productTypeEnum.Product, 1, -1, categoryId, brandId),
    getProductsSpecialByBrandCategory: (brandId, categoryId) => getProductsUrl(productTypeEnum.Product, -1, 1, categoryId, brandId),
    getProductsHotSpecialByBrandCategory: (brandId, categoryId) => getProductsUrl(productTypeEnum.Product, 1, 1, categoryId, brandId),


    getProductBrands: (productType, hot, special, categoryId) => `${host}/Products/GetProductBrands?productType=${productType}${hot >= 0 ? "&hot=" + hot : ""}${special >= 0 ? "&special=" + special : ""}${categoryId > 0 ? "&categoryId=" + categoryId : ""}`,

    getGiftCards: `${getGiftCardsBase}`, //getProductsHotByCategory(1)
    getGiftCardsHot: `${getGiftCardsBase}&hot=1`,
    getGiftCardsSpecial: `${getGiftCardsBase}&special=1`,


    getOnlineDeals: `${getOnlineDealsBase}`,
    getOnlineDealsHot: `${getOnlineDealsBase}&hot=1`,
    getOnlineDealsSpecial: `${getOnlineDealsBase}&spacial=1`,

    getAllCategories: `${host}/Categories/GetCategories`,

    uploadUserPicture: `${host}/images/UploadUserPicture`,

}