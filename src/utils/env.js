import React, { useContext, useState, useEffect, useRef } from "react";
import { Dimensions, Platform, LogBox } from 'react-native';

//const localHost = true ? `http://192.168.2.104:5000/api` : `https://partially-mint-grizzly.ngrok-free.app/api`;
const localHost = false ? `http://localhost:5000/api` : `https://partially-mint-grizzly.ngrok-free.app/api`;
const globalHost = `https://giftapp.techschau.de/api`;
//const localRequests = true ? localHost : globalHost;
const delay = ms => new Promise(res => setTimeout(res, ms));

export const asinDataKey = 'C3094239F63243DBA2505340DF56F4D6';
export const asinDataTestMode = false;
export const useFirebaseAuthentication = false;
export const host = false ? localHost : globalHost;
export const isAndroid = (Platform.OS === "android");
export const isDevelopment = process.env.NODE_ENV === "development";
//export const host = isDevelopment ? localHost : liveHost;
export const useMock = "true";
export const appVersion = 1;
export const { width, height } = Dimensions.get('window');
export const bannerHeight = Math.round(width / 2.95);
export const blackMenu = false;

export function WidthPercent(percent, fix = 0) { return Math.round(width * percent / 100) + fix; }
export function HeightPercent(percent, fix = 0) { return Math.round(height * percent / 100) + fix; }
export function GetNWords(text, n) { return text.split(' ').slice(0, n).join(' '); }
export const formatCurrency = (amount) => { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', }).format(amount); };

export function IgnoreWarnings() {
    LogBox.ignoreLogs([`AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage`]);
    LogBox.ignoreLogs([`Require cycle: src\\infrastructure\\navigation\\gifts.navigator.js -> src\\features\\gifts\\screens\\gifts.screen.js -> src\\features\\products\\components\\products-hot-bar.component.js -> src\\infrastructure\\navigation\\gifts.navigator.js`]);
    LogBox.ignoreLogs([`Require cycle: src\\features\\products\\components\\products-hot-bar.component.js -> src\\infrastructure\\navigation\\gifts.navigator.js -> src\\features\\gifts\\screens\\gifts.screen.js -> src\\features\\products\\components\\products-hot-bar.component.js`]);
    //LogBox.ignoreLogs([`Stack Navigator: 'headerMode' is moved to 'options'. Moved it to 'screenOptions' to keep current behavior.\r\n\r\nSee https://reactnavigation.org/docs/stack-navigator/#headermode for more details.`]);
    //LogBox.ignoreLogs([`Found screens with the same name nested inside one another. Check:\r\nMarket, Market > Market\r\nThis can cause confusing behavior during navigation. Consider using unique names for each screen instead.`]);
    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreAllLogs();
}