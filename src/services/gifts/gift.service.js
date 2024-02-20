import camelize from "camelize";
import { host, useMock } from "../../utils/env";

export const giftsRequest = (location) => {

    //console.log("location", location);
    return fetch(
        `${host}/placesNearby?location=${location}&mock=${useMock}`
    ).then((res) => { return res.json(); });
}


const ICONS = {
    lodging: "bed",
    gift: "food",
    cafe: "cafe"
};

export const giftsTransform = ({ results = [] }) => {
    //console.log("giftsTransform", results);
    const mappedResults = results.map((gift) => {
        //gift.photos = ["https://lotipoints.com/wp-content/uploads/2021/03/loti-sultanahmet.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/loti1-1-copy.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/lotiz-3.jpg"];

        return {
            ...gift,
            //photoz: ["https://lotipoints.com/wp-content/uploads/2020/11/DSC03947.jpg", "https://lotipoints.com/wp-content/uploads/2021/03/loti-sultanahmet.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/loti1-1-copy.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/lotiz-3.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/IMG_2331.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/IMG_2322.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/IMG_2316.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/IMG_2258.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/DSC04139.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/DSC04081.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/DSC03989.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/DSC03981.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/DSC03973.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/DSC03947.jpg", "https://lotipoints.com/wp-content/uploads/2021/03/loti-sultanahmet.jpg"],
            address: gift.vicinity,
            isOpenNow: gift.opening_hours && gift.opening_hours.open_now,
            isClosedTemporarily: gift.business_status === "CLOSED_TEMPORARILY",
            openingHours: null,
            icon: "bed", //ICONS[gift.icon.replace("https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/","").replace("-71.png","")],
            //rating: 4.9,
        }
    });
    //console.log("mappedResults", mappedResults);
    return camelize(mappedResults);
}

// giftsRequest()
//     .then(giftsTransform)
//     .then(transformedResponse => {
//         console.log("giftservice.transformedResponse", transformedResponse);
//     })
//     .catch((err) => { console.log("Error:", err); });
