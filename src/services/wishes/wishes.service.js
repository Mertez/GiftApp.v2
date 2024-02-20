import camelize from "camelize";
import { host, useMock } from "../../utils/env";
import { authGet, authPost, get, post } from '../../infrastructure/data/apiCalls';
import ApiRoutes from '../../infrastructure/data/apiRoutes';


export const getPiggyBankRequest = async () => {
    //console.log(ApiRoutes.getPiggyBank);
    return new Promise((resolve, reject) => {
        const piggyBank = authGet(ApiRoutes.getPiggyBank);
        console.log("ok");
        if (!piggyBank) { reject("No piggyBank found!"); }
        else { resolve(piggyBank); }
    })
};


export const getPiggyBankTransform = (result) => {
    return { result };
};