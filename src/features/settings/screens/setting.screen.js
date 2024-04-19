import React, { Component, useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { List, Avatar } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { colors } from "../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../services/authentication/authectication.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { host } from "../../../utils/env";
import { MainAppFeature } from "../../../components/animations/mainappfeature.component";

const TransparentSafeArea = styled(View)`
  background-color: transparent;
`;
const SettingsBackground = styled.ImageBackground.attrs({
    source: require("../../../../assets/settings.jpg"),
})`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.spaces[3]};
  background-color: rgba(213, 203, 186, 0.6);
`;
const AvatarContainer = styled.View`
  align-items: center;
`;

const AvatarImage = styled(Avatar.Image)`
  width: 40px;
  height: 40px;
  right: 15px;
  top: 20px;
  position: absolute;
  //background-color:red;
  border:1px solid gray;
  border-radius: 50%;
`


export const SettingScreen = ({ navigation, route }) => {
    const { onLogout, user } = useContext(AuthenticationContext);
    const [photo, setPhoto] = useState(null);
    //console.log("settings screen:", route);

    const getProfilePicture = async () => {
        const photoUri = await AsyncStorage.getItem(`${user.userId}-photo`);
        //console.log(photoUri);
        //setPhoto(photoUri);
        setPhoto(`${host}/images/users/${user?.userId ?? 'null'}.jpg?time=${new Date().toLocaleString()}`);
    }

    // useEffect(() => {
    //     getProfilePicture();
    // }, []);

    useFocusEffect(
        React.useCallback(() => {
            getProfilePicture();
            //navigation.addListener('focus', () => alert('Screen was focused'));
        }, [user])
    );

    return (
        <SettingsBackground>
            <TransparentSafeArea>
                <ScrollView style={{ marginBottom: 90 }} nestedScrollEnabled={true}>
                    <AvatarContainer>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Camera", { 'updatePhoto': 0 })}
                        >
                            {!photo &&
                                // <Avatar.Icon
                                //     size={120}
                                //     icon="human"
                                //     backgroundColor={colors.brand.muted}
                                //     margin={20} />
                                <Avatar.Image
                                    size={120}
                                    source={{ uri: `${host}/images/users/${user?.userId ?? 'null'}.jpg?time=${new Date().toLocaleString()}` }}
                                    backgroundColor={colors.ui.tertiary}
                                    margin={20}
                                />}
                            {photo &&
                                <Avatar.Image
                                    size={120}
                                    source={{ uri: photo }}
                                    backgroundColor={colors.brand.muted}
                                    margin={20}
                                />}
                        </TouchableOpacity>
                        <Spacer position="bottom" size="lg">
                            <Text variant="label">{user.email}</Text>
                        </Spacer>
                    </AvatarContainer>

                    <List.Section>
                        <SettingsItem
                            title="Favourites"
                            description="View your favourites"
                            left={(props) => (
                                <List.Icon {...props} color={colors.ui.error} icon="heart" />
                            )}
                            onPress={() => navigation.navigate('MainAppFeature', { extraDescription: 'Market products can be listed as favourites too.' })}
                        />
                        <Spacer />
                        <SettingsItem
                            title="Payment"
                            left={(props) => (
                                <List.Icon {...props} color={colors.ui.secondary} icon="cart" />
                            )}
                            onPress={() => navigation.navigate('MainAppFeature', { extraDescription: 'Payments log will be seen here.' })}

                        />
                        <Spacer />
                        <SettingsItem
                            title="Past Orders"
                            left={(props) => (
                                <List.Icon
                                    {...props}
                                    color={colors.ui.secondary}
                                    icon="history"
                                />
                            )}
                            onPress={() => navigation.navigate('MainAppFeature', { extraDescription: 'Orders log will be seen here.' })}
                        />
                        <Spacer />
                        <SettingsItem
                            title="Logout"
                            left={(props) => (
                                <List.Icon {...props} color={colors.ui.secondary} icon="door" />
                            )}
                            onPress={onLogout}
                        />
                    </List.Section>
                </ScrollView>
            </TransparentSafeArea>
        </SettingsBackground>
    );
};