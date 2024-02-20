import React from "react";
import { Text, View } from "react-native";
import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack";
import { HomeScreen } from "../../features/home/screens/home.screen";
import { CategoryProductsScreen } from "../../features/categories/screens/category-products.screen";
import { ProductDetailScreen } from "../../features/products/screens/product-detail.screen";
import { isAndroid } from "../../utils/env";
import { CategoriesAmazon } from "../../features/categories/screens/categories-amz.screen";
import { GiftAddConfirm } from "../../features/gifts/screens/gift-add-confirm.screen";


const homesStack = createStackNavigator();

export const HomesNavigator = () => {
    return (
        <homesStack.Navigator
            screenOptions={isAndroid ? {
                ...TransitionPresets.ScaleFromCenterAndroid,
                headerShown: true,
            } : {
                ...TransitionPresets.ModalPresentationIOS,
                headerShown: true,
            }}
        >
            <homesStack.Screen
                name="home"
                options={{ title: 'Home 🏠', headerShown: false }}
                component={HomeScreen}
            />
            <homesStack.Screen
                options={({ route }) => ({ title: `${route.params.categoryName} Gifts`, headerShown: true })}
                name="categoryProductStack"
                component={CategoryProductsScreen}
            />
            <homesStack.Screen
                options={({ route }) => ({ title: '🛍️', headerShown: isAndroid })}
                name="categoryAmazonStack"
                component={CategoriesAmazon}
            />
            <homesStack.Screen
                options={{ title: 'Back to AMZ', headerShown: true }}
                name="giftAddConfirmStack"
                component={GiftAddConfirm}
            />
            <homesStack.Screen
                options={({ route }) => ({ title: `${route.params.product.name}` })}
                name="productDetailStack"
                component={ProductDetailScreen}
            // options={{
            //     header: ({ navigation }) => (
            //         <Header {...{ navigation }} backScreen={giftsMain} />
            //     ),
            // }}
            />
        </homesStack.Navigator>
    );
};
