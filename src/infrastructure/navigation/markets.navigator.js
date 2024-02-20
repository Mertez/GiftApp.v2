import React from "react";
import { SettingScreen } from "../../features/settings/screens/setting.screen";
import { FavouritesScreen } from "../../features/settings/screens/favourites.screen";
import { CameraScreen } from "../../features/settings/screens/camera.screen";
import { Text } from "../../components/typography/text.component";
import { isAndroid } from "../../utils/env";
import {
    TransitionPresets,
    createStackNavigator,
    CardStyleInterpolators,
} from "@react-navigation/stack";
import { MarketScreen } from "../../features/markets/screens/market.screen";
import { CategoryProductsScreen } from "../../features/categories/screens/category-products.screen";
import { CategoriesAmazon } from "../../features/categories/screens/categories-amz.screen";
import { ProductDetailScreen } from "../../features/products/screens/product-detail.screen";

const MarketsStack = createStackNavigator();

export const MarketsNavigator = ({ route, navigation }) => {
    return (
        <MarketsStack.Navigator
            //headerMode="screen"
            screenOptions={isAndroid ? {
                ...TransitionPresets.ScaleFromCenterAndroid,
                headerShown: true,
                headerMode: "screen"
            } : {
                ...TransitionPresets.ModalPresentationIOS,
                headerShown: true,
                headerMode: "screen"
            }}
        >
            <MarketsStack.Screen
                options={{
                    header: () => null,
                }}
                name="Market"
                component={MarketScreen}
            />
            <MarketsStack.Screen
                options={({ route }) => ({ title: `${route.params.categoryName} Gifts`, headerShown: true })}
                name="categoryProductStack"
                component={CategoryProductsScreen}
            />
            <MarketsStack.Screen
                options={({ route }) => ({ title: '🛍️', headerShown: isAndroid })}
                name="categoryAmazonStack"
                component={CategoriesAmazon}
            />
            <MarketsStack.Screen
                options={({ route }) => ({ title: `${route.params.product.name}` })}
                name="productDetailStack"
                component={ProductDetailScreen}
            // options={{
            //     header: ({ navigation }) => (
            //         <Header {...{ navigation }} backScreen={giftsMain} />
            //     ),
            // }}
            />
            <MarketsStack.Screen name="Favourites" component={FavouritesScreen} />
            <MarketsStack.Screen name="Camera" component={CameraScreen} />
        </MarketsStack.Navigator>
    );
};