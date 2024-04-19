import React, { useState } from "react";
import CreditCardForm, { Button, FormModel } from 'rn-credit-card';
import LottieView from 'lottie-react-native';
import { FormProvider, useForm } from 'react-hook-form'
import {
    View, Text, Image,
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { height } from "../../../utils/env";
import styled, { ThemeProvider } from "styled-components/native";

const LottieCheckLogo = styled(LottieView)`
  height:140px;
  width: 140px;
  margin: auto auto;
  opacity: 1;
`

export const PaymentComponent = ({ route, navigation }) => {

    //console.log(route);
    //console.log(navigation);

    const [paymentFinished, setPaymentFinished] = useState(false);

    const formMethods = useForm({
        // to trigger the validation on the blur event
        mode: 'onBlur',
        defaultValues: {
            holderName: 'Mori Mortazavi',
            cardNumber: '4111 1111 1111 1111',
            expiration: '12/25',
            cvv: '',
        },
    })
    const { handleSubmit, formState } = formMethods

    function onSubmit(model) {
        //Alert.alert('Success: ' + JSON.stringify(model, null, 2));
        setPaymentFinished(true);


    }

    return (
        <ScrollView nestedScrollEnabled={true}>
            {(!paymentFinished) && (

                <FormProvider {...formMethods}>
                    <View style={styles.container}>
                        <KeyboardAvoidingView
                            style={styles.avoider}
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        >
                            <CreditCardForm
                                LottieView={LottieView}
                                horizontalStart
                                overrides={{
                                    labelText: {
                                        marginTop: 16,
                                    },
                                }}
                            />
                        </KeyboardAvoidingView>
                        {formState.isValid && (
                            <>
                                <Button
                                    style={styles.button}
                                    title={'Confirm Payment'}
                                    onPress={handleSubmit(onSubmit)}
                                />

                            </>

                        )}
                    </View>
                </FormProvider>
            )}
            {(paymentFinished) && (

                <>
                    <LottieCheckLogo
                        key="animation"
                        autoPlay
                        loop
                        resizeMode="cover"
                        source={require("../../../../assets/anims/85185-checkmark.json")}
                    />
                    <Button
                        style={styles.button}
                        title={'Payment Successful'}
                        onPress={() => { navigation.goBack(); }}
                    />
                </>


            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 650,
        backgroundColor: '#fff',
        marginBottom: 100
    },
    avoider: {
        flex: 1,
        padding: 36,
    },
    button: {
        margin: 36,
        marginTop: 20,

    },
})


