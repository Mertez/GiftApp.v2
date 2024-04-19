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
import { Search } from "../../components/search/search.component";
import { MainAppFeature } from "../../components/animations/mainappfeature.component";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({ route, navigation }) => {
    //console.log("settings route:", route);
    return (
        <SettingsStack.Navigator
            screenListeners={{
                state: (e) => {
                    // Do something with the state
                    //console.log('state changed', e.data.state.routes[0].params);
                },
            }}

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
            <SettingsStack.Screen
                options={{
                    header: () => null,
                }}
                name="Setting"
                component={SettingScreen}
            //onPhotoUpdated={() => alert("oh")}
            // listeners={{
            //     onPhotoUpdated: (e) => {
            //         // Prevent default action
            //         //e.preventDefault();
            //         alert("oh");
            //     },
            // }}

            />
            <SettingsStack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
            <SettingsStack.Screen name="MainAppFeature" component={MainAppFeature} options={{ headerShown: true, title: 'Future option' }} />
        </SettingsStack.Navigator>
    );
};