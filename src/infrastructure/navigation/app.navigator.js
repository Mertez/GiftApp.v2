import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Image, TouchableOpacity, Button } from "react-native";
import { Text } from "../../components/typography/text.component";
import { standardcolors } from "../theme/colors";
// import { SettingsNavigator } from "./settings.navigator";
//import { WishlistScreen } from "../../features/map/screens/wishlist.screen";
// import { CheckoutNavigator } from "./checkout.navigator";

import { WishesContextProvider } from "../../services/wishes/wishes.context";
import { ProductsContextProvider } from "../../services/products/products.context";
import { CategoriesContextProvider } from "../../services/categories/categories.context";
import { GiftCardsContextProvider } from "../../services/giftcards/giftcards.context";
import { GiftsContextProvider } from "../../services/gifts/gifts.context";
import { AmazonContextProvider } from "../../services/amazon/amazon.context";
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
import { WidthPercent as W, HeightPercent } from "../../utils/env";
import { simpleHaptic } from "../../utils/haptic";



const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Home: "home-outline",
    Gift: "gift-outline",
    WishList: "list-outline",
    Market: "cart-outline",
    Settings: "settings-outline",
    Map: "map-outline",
};

const TAB_NAMES = {
    Home: "Home",
    Gift: "Gifts",
    WishList: "Wish List",
    Market: "Market",
    Settings: "Settings",
    Map: "Map",
};

const backColor = blackMenu ? 'black' : standardcolors.t100;
const menuForecolors = ["white", "black"];
const iconSize = W(15);
var styles = StyleSheet.create({
    shadow: {
        shadowColor: standardcolors.black,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.5,
        elevation: 5,
    },
    transShadow: {},
    botIcons: {},
    botView: { alignContent: 'center', alignSelf: 'center', width: W(10) }
});

const CustomTabBarButton = (props) => {
    //console.log(props.accessibilityState.selected);

    var btn = props.accessibilityState.selected ? require("../../../assets/redsp2.png") : require("../../../assets/redsp2n.png");
    var circle = props.accessibilityState.selected ? backColor : standardcolors.transparent;

    styles = StyleSheet.create({
        transShadow: {
            top: -15,
            justifyContent: 'center',
            alignItems: 'center',
            width: W(18),
            height: W(18),
            borderRadius: W(10),
            marginRight: W(.35),
            marginLeft: W(.36),
            backgroundColor: circle,
            shadowColor: standardcolors.red,
            shadowOffset: {
                width: 0,
                height: 0
            },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
        },
        botIcons: {
            left: 16,
            top: props.accessibilityState.selected ? W(6) : 20,
            fontSize: props.accessibilityState.selected ? 32 : 22,
            color: props.accessibilityState.selected ? menuForecolors[0] : menuForecolors[1],
            alignSelf: 'center',
        },
        botText: {
            left: 15,
            top: props.accessibilityState.selected ? 7 : 20,
            fontSize: props.accessibilityState.selected ? 32 : 12,
            //fontSize: 10,
            color: props.accessibilityState.selected ? menuForecolors[0] : menuForecolors[1],
            opacity: props.accessibilityState.selected ? 0 : 1,
            alignSelf: 'center',
            //backgroundColor: '#f00',
            width: W(15),
            alignContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        }
    })


    return (
        <View
            style={styles.transShadow}
        >
            <TouchableOpacity style={{


            }}
                onPress={props.onPress}
            >
                <View style={{
                    width: iconSize,
                    height: iconSize,
                    borderRadius: W(10),
                    //backgroundColor: textColor(props.accessibilityState.selected),
                    margin: 0,
                    ...props.accessibilityState.selected ? styles.shadow : null,
                }}

                >
                    <Image source={btn} style={{
                        width: iconSize,
                        height: iconSize,
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
                "bottom": isAndroid ? 10 : W(5),
                "left": W(3),
                "right": W(3),
                "elevation": 0,
                "borderRadius": W(3),
                "height": W(12),
                backgroundColor: backColor,
                ...styles.shadow
            },
            null
        ],
        tabBarIcon: ({ size, color }) => (
            <Ionicons name={iconName} size={size} color={color} />
        ),
    };
};


const textVariant = (focused) => {
    return focused ? 'button' : 'caption';
}

export const AppNavigator = ({ route }) => {
    const navigation = useNavigation();
    //console.log("Navigation:", navigation);
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
                    <GiftsContextProvider>
                        <GiftCardsContextProvider>
                            <AmazonContextProvider>
                                {/* <Button title="Update Data" onPress={() => updatePhotoStatus(true)} /> */}
                                <Search
                                    updatePhoto={isPhotoChanged} updateData={updatePhotoStatus}
                                    isFavouritesToggled={isToggled}
                                    onFavouritesToggle={() => setIsToggled(!isToggled)}
                                    navigation={navigation}
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
                                            <View style={styles.botView}>
                                                <Ionicons name={TAB_ICON["Gift"]} style={styles.botIcons} />
                                                <Text variant={textVariant(focused)} style={styles.botText}>{TAB_NAMES["Gift"]}</Text>
                                            </View>
                                        ),
                                        tabBarButton: (props, focused) => <CustomTabBarButton
                                            onPress={simpleHaptic()}
                                            {...props}
                                        //isFocused={focused} 
                                        />
                                    }} />
                                    <Tab.Screen name="WishList" component={WishlistsNavigator} options={{
                                        tabBarIcon: ({ focused }) => (
                                            <View style={styles.botView}>
                                                <Ionicons name={TAB_ICON["WishList"]} style={styles.botIcons} />
                                                <Text variant={textVariant(focused)} style={styles.botText}>{TAB_NAMES["WishList"]}</Text>
                                            </View>
                                        ),
                                        tabBarButton: (props, focused) => <CustomTabBarButton
                                            onPress={simpleHaptic()}
                                            {...props}
                                        //isFocused={focused} 
                                        />
                                    }} />
                                    <Tab.Screen name="Home" component={HomesNavigator} options={{
                                        tabBarIcon: ({ focused }) => (
                                            <View style={styles.botView}>
                                                <Ionicons name={TAB_ICON["Home"]} style={styles.botIcons} />
                                                <Text variant={textVariant(focused)} style={styles.botText}>{TAB_NAMES["Home"]}</Text>
                                            </View>
                                        ),
                                        tabBarButton: (props, focused) => <CustomTabBarButton
                                            onPress={simpleHaptic()}
                                            {...props}
                                        //isFocused={focused} 
                                        />
                                    }} />
                                    <Tab.Screen name="Markets" component={MarketsNavigator} options={{
                                        tabBarIcon: ({ focused }) => (
                                            <View style={styles.botView}>
                                                <Ionicons name={TAB_ICON["Market"]} style={styles.botIcons} />
                                                <Text variant={textVariant(focused)} style={styles.botText}>{TAB_NAMES["Market"]}</Text>
                                            </View>
                                        ),
                                        tabBarButton: (props, focused) => <CustomTabBarButton
                                            onPress={simpleHaptic()}
                                            {...props}
                                        //isFocused={focused} 
                                        />
                                    }} />
                                    <Tab.Screen name="Settings" component={SettingsNavigator} options={{
                                        //tabBarBadge: `${isDevelopment ? "D" : "P"}${appVersion}`,
                                        tabBarIcon: ({ focused }) => (
                                            <View style={styles.botView}>
                                                <Ionicons name={TAB_ICON["Settings"]} style={styles.botIcons} />
                                                <Text variant={textVariant(focused)} style={styles.botText}>{TAB_NAMES["Settings"]}</Text>
                                            </View>
                                        ),
                                        tabBarButton: (props, focused) => <CustomTabBarButton
                                            onPress={simpleHaptic()}
                                            {...props}
                                        //isFocused={focused} 
                                        //onPhotoUpdated={() => alert("oh")}
                                        />
                                    }} />


                                    {/* <Tab.Screen name="Settings" component={SettingsNavigator}/> */}
                                </Tab.Navigator>
                            </AmazonContextProvider>
                        </GiftCardsContextProvider>
                    </GiftsContextProvider>
                </ProductsContextProvider>
            </CategoriesContextProvider>
        </WishesContextProvider>
        // </FavouritesContextProvider>
    )
}
