import React from "react";
import { SettingScreen } from "../../features/settings/screens/setting.screen";
import { FavouritesScreen } from "../../features/settings/screens/favourites.screen";
import { CameraScreen } from "../../features/settings/screens/camera.screen";
import { Text } from "../../components/typography/text.component";
import { createStackNavigator, CardStyleInterpolators, TransitionPresets, } from "@react-navigation/stack";
import { WishesScreen } from "../../features/wishes/screens/wishes.screen";
import { WishItemsScreen } from "../../features/wishes/screens/wishItems.screen";
import { isAndroid } from "../../utils/env";
import { MainAppFeature } from "../../components/animations/mainappfeature.component";
import { CategoriesAmazon } from "../../features/categories/screens/categories-amz.screen";
import { PaymentComponent } from "../../features/payment/components/payment.component";

const WishlistsStack = createStackNavigator();

export const WishlistsNavigator = ({ route, navigation }) => {
    return (
        <WishlistsStack.Navigator
            //headerMode="screen"
            screenOptions={
                isAndroid ? {
                    ...TransitionPresets.ScaleFromCenterAndroid,
                    headerShown: true,
                } : {
                    ...TransitionPresets.ModalPresentationIOS,
                    headerShown: true,
                }
                //     {
                //     cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                //     headerMode: "screen"
                // }
            }
        >
            <WishlistsStack.Screen
                options={{
                    header: () => null,
                }}
                name="Wishlists"
                component={WishesScreen}
            />
            <WishlistsStack.Screen
                options={{
                    header: () => null,
                }}
                name="WishItems"
                component={WishItemsScreen}
            />
            {/* <WishlistsStack.Screen name="Favourites" component={FavouritesScreen} /> */}

            <WishlistsStack.Screen name="Camera" component={CameraScreen} options={({ route }) => ({ title: `Profile Photo` })} />
            <WishlistsStack.Screen
                //options={({ route }) => ({ title: `${route.params.categoryName} Amazon` })}
                options={{ title: 'Amazon 🛍️', headerShown: isAndroid }}
                name="categoryAmazonStack"
                component={CategoriesAmazon}
            />
            <WishlistsStack.Screen name="MainAppFeature" component={MainAppFeature} options={{ headerShown: true, title: 'Future option' }} />
            <WishlistsStack.Screen
                options={({ route }) => ({ title: `Payment` })}
                name="CreditCardPaymentStack"
                component={PaymentComponent} />
        </WishlistsStack.Navigator>
    );
};