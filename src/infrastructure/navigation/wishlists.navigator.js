import React from "react";
import { SettingScreen } from "../../features/settings/screens/setting.screen";
import { FavouritesScreen } from "../../features/settings/screens/favourites.screen";
import { CameraScreen } from "../../features/settings/screens/camera.screen";
import { Text } from "../../components/typography/text.component";

import {
    createStackNavigator,
    CardStyleInterpolators,
} from "@react-navigation/stack";
import { WishesScreen } from "../../features/wishes/screens/wishes.screen";

const WishlistsStack = createStackNavigator();

export const WishlistsNavigator = ({ route, navigation }) => {
    return (
        <WishlistsStack.Navigator
            //headerMode="screen"
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerMode: "screen"
            }}
        >
            <WishlistsStack.Screen
                options={{
                    header: () => null,
                }}
                name="Wishlists"
                component={WishesScreen}
            />
            <WishlistsStack.Screen name="Favourites" component={FavouritesScreen} />
            <WishlistsStack.Screen name="Camera" component={CameraScreen} />
        </WishlistsStack.Navigator>
    );
};