import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Image, TouchableOpacity, Button } from "react-native";
import { Text } from "../../components/typography/text.component";
import { standardcolors } from "../theme/colors";
// import { SettingsNavigator } from "./settings.navigator";
//import { WishlistScreen } from "../../features/map/screens/wishlist.screen";
// import { CheckoutNavigator } from "./checkout.navigator";
// import { CartContextProvider } from "../../services/cart/cart.context";
//import { giftsContextProvider } from "../../services/gifts/gifts.context";
import { ProductsContextProvider } from "../../services/products/products.context";
import { CategoriesContextProvider } from "../../services/categories/categories.context";
import { GiftCardsContextProvider } from "../../services/giftcards/giftcards.context";
// import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { theme } from "../theme";
import { isDevelopment, appVersion, isAndroid } from "../../utils/env";
import { WishlistsNavigator } from "./wishlists.navigator";
import { MarketsNavigator } from "./markets.navigator";
import { GiftsNavigator } from "./gifts.navigator";
import { HomesNavigator } from "./home.navigator";
import { SettingsNavigator } from "./settings.navigator";
import styled from "styled-components/native";
import { blackMenu } from "../../utils/env";
import { Search } from "../../components/search/search.component";
import { WishesContextProvider } from "../../services/wishes/wishes.context";



const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Home: "home-outline",
    Gift: "gift-outline",
    WishList: "list-outline",
    Market: "cart-outline",
    Settings: "settings-outline",
    Map: "map-outline",
};


const CustomTabBarButton = (props) => {
    //console.log(props.accessibilityState.selected);

    var btn = props.accessibilityState.selected ? require("../../../assets/redsp2.png") : require("../../../assets/redsp2b.png");

    return (
        <View
            style={styles.transShadow}
        >
            <TouchableOpacity style={{


            }}
                onPress={props.onPress}
            >
                <View style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    //backgroundColor: textColor(props.accessibilityState.selected),
                    margin: 10,
                    ...props.accessibilityState.selected ? styles.shadow : null,
                }}

                >
                    <Image source={btn} style={{
                        width: 70,
                        height: 70,
                        position: "absolute"
                    }} />
                    {props.children}</View>
            </TouchableOpacity></View>
    )
}


const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];

    return {
        headerShown: false,
        "tabBarActiveTintColor": theme.colors.brand.primary,
        "tabBarInactiveTintColor": theme.colors.brand.muted,
        "tabBarShowLabel": false,
        "tabBarStyle": [
            {
                "display": "flex",
                "position": "absolute",
                "bottom": isAndroid ? 10 : -10,
                "left": 10,
                "right": 10,
                "elevation": 0,
                "borderRadius": 15,
                "height": 70,
                backgroundColor: blackMenu ? "black" : "white",
                ...styles.shadow
            },
            null
        ],
        tabBarIcon: ({ size, color }) => (
            <Ionicons name={iconName} size={size} color={color} />
        ),
    };
};

const fontSize = (focused) => {
    return focused ? 28 : 25;
}

const textColor = (focused, home = false) => {
    if (home) return "white";
    return focused ? '#e32f45' : '#748c94';
}

const textVariant = (focused) => {
    return focused ? 'button' : 'caption';
}

export const AppNavigator = (route) => {

    const [isToggled, setIsToggled] = useState(false);
    const [isPhotoChanged, setIsPhotoChanged] = useState(false);

    const updatePhotoStatus = newData => {
        setIsPhotoChanged(newData);
    };
    //console.log("Navigator:", route);

    return (


        // <FavouritesContextProvider>
        <WishesContextProvider>
            <CategoriesContextProvider>
                <ProductsContextProvider>
                    <GiftCardsContextProvider>
                        {/* <Button title="Update Data" onPress={() => updatePhotoStatus(true)} /> */}
                        <Search
                            updatePhoto={isPhotoChanged} updateData={updatePhotoStatus}
                            isFavouritesToggled={isToggled}
                            onFavouritesToggle={() => setIsToggled(!isToggled)}
                        />
                        <Tab.Navigator screenOptions={createScreenOptions}
                            initialRouteName="Home"
                            screenListeners={{
                                state: (e) => {
                                    // Do something with the state
                                    //console.log('app state changed', e.data);
                                },
                            }}
                        >

                            <Tab.Screen name="Gift" component={GiftsNavigator} options={{
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ alignContent: 'center', alignSelf: 'center', width: 100 }}>
                                        <Ionicons name={TAB_ICON["Gift"]} size={fontSize(focused)} color={textColor(focused)} style={{ alignSelf: 'center', ...focused ? styles.shadow : null }} />
                                        <Text variant={textVariant(focused)} style={{ alignSelf: 'center', color: textColor(focused) }}>Gift</Text>
                                    </View>
                                )
                            }} />
                            <Tab.Screen name="WishList" component={WishlistsNavigator} options={{
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ alignContent: 'center', alignSelf: 'center', width: 100 }}>
                                        <Ionicons name={TAB_ICON["WishList"]} size={fontSize(focused)} color={textColor(focused)} style={{ alignSelf: 'center', ...focused ? styles.shadow : null }} />
                                        <Text variant={textVariant(focused)} style={{ alignSelf: 'center', color: textColor(focused) }}>WishList</Text>
                                    </View>
                                )
                            }} />
                            <Tab.Screen name="Home" component={HomesNavigator} options={{
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ alignContent: 'center', alignSelf: 'center', width: 100 }}>
                                        <Ionicons name={TAB_ICON["Home"]} size={fontSize(focused)} color={textColor(!focused, true)} style={{ alignSelf: 'center', opacity: .9, ...focused ? styles.shadow : null }} />
                                        {/* <Text variant={textVariant(focused)} style={{ alignSelf: 'center', color: textColor(focused) }}>Home</Text> */}
                                    </View>
                                ),
                                tabBarButton: (props, focused) => <CustomTabBarButton {...props}
                                //isFocused={focused} 
                                />
                            }} />
                            <Tab.Screen name="Markets" component={MarketsNavigator} options={{
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ alignContent: 'center', alignSelf: 'center', width: 100 }}>
                                        <Ionicons name={TAB_ICON["Market"]} size={fontSize(focused)} color={textColor(focused, false)} style={{ alignSelf: 'center', ...focused ? styles.shadow : null }} />
                                        <Text variant={textVariant(focused)} style={{ alignSelf: 'center', color: textColor(focused) }}>Market</Text>
                                    </View>
                                )
                            }} />
                            <Tab.Screen name="Settings" component={SettingsNavigator} options={{
                                tabBarBadge: `${isDevelopment ? "D" : "P"}${appVersion}`,
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ alignContent: 'center', alignSelf: 'center', width: 100 }}>
                                        <Ionicons name={TAB_ICON["Settings"]} size={fontSize(focused)} color={textColor(focused)} style={{ alignSelf: 'center', ...focused ? styles.shadow : null }} />
                                        <Text variant={textVariant(focused)} style={{ alignSelf: 'center', color: textColor(focused) }}>Settings</Text>
                                    </View>
                                )

                            }}
                            //onPhotoUpdated={() => alert("oh")}
                            />
                            {/* <Tab.Screen name="Settings" component={SettingsNavigator}/> */}
                        </Tab.Navigator>
                    </GiftCardsContextProvider>
                </ProductsContextProvider>
            </CategoriesContextProvider>
        </WishesContextProvider>
        // </FavouritesContextProvider>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: standardcolors.black,
        shadowOffset: {
            width: 0,
            height: 7
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.5,
        elevation: 5,
    },
    transShadow: {
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: blackMenu ? 'black' : 'white',
        shadowColor: standardcolors.transparent,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
})