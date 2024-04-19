import React, { useState, useContext } from "react";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import {
    AccountBackground,
    AccountCover,
    AccountContainer,
    AuthButton,
    AuthInput,
    ErrorContainer,
    Title,
    LogoImg,
} from "../components/account.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authectication.context";
import { Image } from "react-native";
import { IgnoreWarnings } from "../../../utils/env";
import { BlurView } from "expo-blur";
import { Row } from "../../gifts/components/gift-info-card.styles";
import { standardcolors } from "../../../infrastructure/theme/colors";
import { simpleHaptic } from "../../../utils/haptic";


export const LoginScreen = ({ navigation }) => {

    IgnoreWarnings();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { onLogin, error, isLoading } = useContext(AuthenticationContext);
    const logo = require("../../../../assets/icon.png");
    return (
        <View style={[styles.container, StyleSheet.absoluteFill]}>
            <AccountBackground style={[styles.image, StyleSheet.absoluteFill]}>
                <AccountCover />
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"} // "padding" is usually suitable for iOS, "height" or undefined for Android
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                >

                    <Image source={{ logo }} style={{ zIndex: 99999, position: "absolute", top: 200, left: 100, overflow: 'hidden' }} />
                    <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ flex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <BlurView intensity={20}>

                            <AccountContainer>
                                <LogoImg source={require("../../../../assets/icon.png")} />
                                <AuthInput
                                    label="E-mail"
                                    value={email}
                                    textContentType="emailAddress"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={(u) => setEmail(u)}
                                />
                                <Spacer size="sm">
                                    <AuthInput
                                        label="Password"
                                        value={password}
                                        textContentType="password"
                                        secureTextEntry
                                        autoCapitalize="none"
                                        onChangeText={(p) => setPassword(p)}
                                    />
                                </Spacer>
                                {error && (
                                    <ErrorContainer size="sm">
                                        <Text variant="error">{error}</Text>
                                    </ErrorContainer>
                                )}
                                <Spacer size="sm">
                                    {!isLoading ? (
                                        <AuthButton style={{ backgroundColor: 'purple' }}
                                            icon="lock-open-outline"
                                            mode="contained"
                                            onPress={() => {
                                                onLogin(email, password);
                                                simpleHaptic();
                                            }}
                                        >
                                            Login
                                        </AuthButton>

                                    ) : (

                                        <ActivityIndicator animating={true} color={standardcolors.blue300} />
                                    )}
                                </Spacer>
                            </AccountContainer>


                            {/* <AccountContainer style={{ alignContent: 'center' }}>
                            <SelectAction />
                        </AccountContainer> */}
                        </BlurView>
                        <Spacer size="sm">
                            <AuthButton mode="contained" icon="keyboard-backspace" onPress={() => {
                                navigation.goBack();
                                simpleHaptic();
                            }} style={{ backgroundColor: 'transparent' }}>
                                Back
                            </AuthButton>
                        </Spacer>
                    </ScrollView>
                </KeyboardAvoidingView>
            </AccountBackground>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
});