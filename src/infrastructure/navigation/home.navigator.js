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
import { MarketScreen } from "../../features/markets/screens/market.screen";
import { CameraScreen } from "../../features/settings/screens/camera.screen";
import { MainAppFeature } from "../../components/animations/mainappfeature.component";


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
                options={({ route }) => ({ title: 'Amazon 🛍️', headerShown: isAndroid })}
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
            <homesStack.Screen
                options={{
                    header: () => null,
                }}
                name="Market"
                component={MarketScreen}
            />
            <homesStack.Screen name="Camera" component={CameraScreen} options={({ route }) => ({ title: `Profile Photo` })} />
            <homesStack.Screen name="MainAppFeature" component={MainAppFeature} options={{ headerShown: true, title: 'Future option' }} />
        </homesStack.Navigator>
    );
};
