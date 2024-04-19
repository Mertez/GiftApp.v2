import React, { useState, useContext } from "react";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { ActivityIndicator } from "react-native-paper";
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
import { BlurView } from "expo-blur";
import { Row } from "../../gifts/components/gift-info-card.styles";
import { standardcolors } from "../../../infrastructure/theme/colors";

export const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const { onRegister, isLoading, error } = useContext(AuthenticationContext);
    return (
        <AccountBackground>
            <AccountCover />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"} // "padding" is usually suitable for iOS, "height" or undefined for Android
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
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
                            <Spacer size="sm">
                                <AuthInput
                                    label="Repeat Password"
                                    value={repeatedPassword}
                                    textContentType="password"
                                    secureTextEntry
                                    autoCapitalize="none"
                                    onChangeText={(p) => setRepeatedPassword(p)}
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
                                        icon="email"
                                        mode="contained"
                                        onPress={() => onRegister(email, password, repeatedPassword)}
                                    >
                                        Register
                                    </AuthButton>
                                ) : (
                                    <ActivityIndicator animating={true} color={standardcolors.blue300} />
                                )}
                            </Spacer>
                        </AccountContainer>

                    </BlurView>
                    <Spacer size="sm">
                        <AuthButton mode="contained" icon="keyboard-backspace" onPress={() => navigation.goBack()} style={{ backgroundColor: 'transparent' }}>
                            Back
                        </AuthButton>
                    </Spacer>
                </ScrollView>

            </KeyboardAvoidingView>

        </AccountBackground>
    );
};