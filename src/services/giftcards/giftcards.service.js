import camelize from "camelize";
import { host, useMock } from "../../utils/env";
import { authGet, authPost, get, post } from '../../infrastructure/data/apiCalls';
import ApiRoutes from '../../infrastructure/data/apiRoutes';

//const allGiftCards =
// [
//     { name: "Amazon $100", platform: "Amazon", price: 100, photo: require("../../../assets/gcs/amazon100.png") },
//     { name: "Amazon $50", platform: "Amazon", price: 50, photo: require("../../../assets/gcs/amazon50.png") },
//     { name: "iTunes $15", platform: "iTunes", price: 15, photo: require("../../../assets/gcs/itunes15.png") },
//     { name: "iTunes $30", platform: "iTunes", price: 30, photo: require("../../../assets/gcs/itunes30.png") },
//     { name: "iTunes $50", platform: "iTunes", price: 50, photo: require("../../../assets/gcs/itunes50.png") },
//     { name: "Netflix $20", platform: "Netflix", price: 20, photo: require("../../../assets/gcs/netflix20.png") },
//     { name: "Netflix $30", platform: "Netflix", price: 30, photo: require("../../../assets/gcs/netflix30.png") },
//     { name: "Razer $10", platform: "Razer", price: 10, photo: require("../../../assets/gcs/razer10.png") }, ,
//     { name: "Steam $20", platform: "Steam", price: 20, photo: require("../../../assets/gcs/steam20.png") },
//     { name: "XBOX $10", platform: "XBOX", price: 10, photo: require("../../../assets/gcs/xbox10.png") },
//     { name: "XBOX 12 Months", platform: "XBOX", price: 100, photo: require("../../../assets/gcs/xbox12m.png") },
//     { name: "XBOX 1 Month", platform: "XBOX", price: 10, photo: require("../../../assets/gcs/xbox1m.png") },
//     { name: "XBOX $20", platform: "XBOX", price: 20, photo: require("../../../assets/gcs/xbox20.png") },
//     { name: "XBOX 3 Months", platform: "XBOX", price: 25, photo: require("../../../assets/gcs/xbox3m.png") },
// ];

// const allGiftCards = async () => {
//     var data = await get(ApiRoutes.getAllGiftCards);
//     //console.log(data);
//     //if (data.success) {
//     // setRooms(data.response);
//     // setIndicator(false);
//     // setLoaded(true);
//     //}
//     return data;
// }

// fetch(
//     `http://192.168.2.104:5106/api/Products/GetByCategory/1`
// ).then((res) => { return res.json(); });


export const getAllGiftCardsRequest = async () => {
    return new Promise((resolve, reject) => {
        const giftCards = get(ApiRoutes.getGiftCards);
        if (!giftCards) { reject("Gift Card Not found!"); }
        else { resolve(giftCards); }
    })
};


export const getAllGiftCardsTransform = (result) => {
    //console.log("getAllGiftCardsTransform", result);
    //const formattedResponse = result.map(makeCat);
    return result;
};