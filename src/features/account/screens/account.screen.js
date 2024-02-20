import React, { useEffect, useContext } from "react";
import { BlurView } from "expo-blur";
import { AuthenticationContext } from "../../../services/authentication/authectication.context";
import {
    AccountBackground,
    AccountContainer,
    AccountCover,
    AuthButton,
    Title,
    AnimationWrapper,
    LogoImg,
    Lottie
} from "../components/account.styles";
import { ScrollView, View, StyleSheet, Image } from 'react-native';

export const AccountScreen = ({ navigation }) => {

    const { onLogin, error, isLoading, currentActivity } = useContext(AuthenticationContext);

    const SelectAction = () => {

        if (isLoading) {
            return <>
                <LogoImg source={require("../../../../assets/icon.png")} />
            </>
        } else {
            return (

                <>
                    <LogoImg source={require("../../../../assets/icon.png")} />
                    <AuthButton
                        icon="lock-open-outline"
                        mode="contained"
                        onPress={() => navigation.navigate("Login")}
                    >
                        Login
                    </AuthButton>
                    {/* <Spacer size="lg"> */}
                    <AuthButton
                        icon="email"
                        mode="contained"
                        onPress={() => navigation.navigate("Register")}
                    >
                        Register
                    </AuthButton>
                    {/* </Spacer> */}
                </>

            )
        }

    }


    return (

        <View style={[styles.container, StyleSheet.absoluteFill]}>

            <AccountBackground style={[styles.image, StyleSheet.absoluteFill]} />
            <AccountCover />
            <AnimationWrapper>
                <Lottie
                    key="animation"
                    autoPlay
                    loop
                    resizeMode="cover"
                    source={require("../../../../assets/anims/gifts.json")}
                />
            </AnimationWrapper>
            <ScrollView contentContainerStyle={{ flex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <BlurView intensity={20} style={{ width: 300 }}>

                    <AccountContainer style={{ alignContent: 'center' }}>
                        <SelectAction />
                    </AccountContainer>
                </BlurView>
            </ScrollView>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute', top: 0, left: 0, bottom: 0, right: 0,
    },
});