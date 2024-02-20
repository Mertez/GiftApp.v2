import React, { useRef, useState } from "react";
import { SafeAreaView, View, Text, Button } from "react-native";
import Wizard, { WizardRef } from "react-native-wizard";
import styled from "styled-components";
import { width } from "../../utils/env";
import { Button as Btn, TextInput } from "react-native-paper";
import { Text as Txt } from "../typography/text.component"
import { Spacer } from "../spacer/spacer.component";
import { Row, GiftFormButton } from "../../features/gifts/components/gift-screen.styles";

const StepContainer = styled.View`
    width: ${width}px;
    height: auto;
    background-color: #fcfcfc;
    flex: 1;
    padding: 20px;
    margin-top:30px
`



export const ProductGiftWizard = () => {


    const [step1Answer, setStep1Answer] = useState(null);
    const [step2Answer, setStep2Answer] = useState(null);


    const Step1 = () => (

        <StepContainer>
            <Txt variant="title">Who do you want to buy this gift for?</Txt>
            <Spacer position='top' size='sm' />
            <Row>
                <GiftFormButton icon="account" mode="contained" onPress={() => { setStep1Answer('Myselft'); wizard.current.goTo(1); }}>
                    Myselft
                </GiftFormButton>
                <GiftFormButton icon="account-group" mode="contained" onPress={() => { setStep1Answer('Others'); wizard.current.goTo(1); }}>
                    Others
                </GiftFormButton>
            </Row>

        </StepContainer>);

    const Step2 = () => (

        <StepContainer>
            <Txt variant="title">Are you willing to share this gift public or preffer to keep it as private?</Txt>
            <Spacer position='top' size='sm' />
            <Row>
                <GiftFormButton icon="wifi-strength-1-lock" mode="contained" onPress={() => { setStep2Answer('Private'); wizard.current.goTo(2); }}>
                    Private
                </GiftFormButton>
                <GiftFormButton icon="wifi-strength-4" mode="contained" onPress={() => { setStep2Answer('Public'); wizard.current.goTo(2); }}>
                    Public
                </GiftFormButton>
            </Row>

        </StepContainer>);

    const wizard = useRef(null);
    const [isFirstStep, setIsFirstStep] = useState(true);
    const [isLastStep, setIsLastStep] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const stepList = [
        {
            content: <Step1 />,
        },
        {
            content: <Step2 />,
        },
        {
            content: <StepContainer ><Text>x</Text></StepContainer>,
        },
        {
            content: <StepContainer ><Text>x</Text></StepContainer>,
        },
    ]

    return (
        <View>
            <SafeAreaView style={{ backgroundColor: "#FFF" }}>
                <Row>
                    <GiftFormButton disabled={isFirstStep} icon="camera" mode="contained" onPress={() => wizard.current.prev()}>
                        Previous
                    </GiftFormButton>

                    <GiftFormButton disabled={isLastStep} icon="camera" mode="contained" onPress={() => wizard.current.next()}>
                        Next
                    </GiftFormButton>
                </Row>
            </SafeAreaView>
            <View style={{
                //flexDirection: "column",
                alignItems: "center", justifyContent: "center", flex: 1
            }}>
                <Wizard
                    ref={wizard}
                    steps={stepList}
                    isFirstStep={val => setIsFirstStep(val)}
                    isLastStep={val => setIsLastStep(val)}
                    onNext={() => {
                        //console.log("Next Step Called")
                    }}
                    onPrev={() => {
                        //console.log("Previous Step Called")
                    }}
                    currentStep={({ currentStep, isLastStep, isFirstStep }) => {
                        setCurrentStep(currentStep)
                    }}
                />
                <View style={{
                    flexDirection: "row",
                    margin: 18
                }}>
                    {stepList.map((val, index) => (
                        <View
                            key={"step-indicator-" + index}
                            style={{
                                width: 30,
                                marginHorizontal: 6,
                                height: 30,
                                borderRadius: 15,
                                backgroundColor: index === currentStep ? "#fc0" : "#000",
                                alignContent: 'center',
                                alignItems: 'center',

                            }}
                        ><Text>{currentStep + 1}</Text></View>
                    ))}
                </View>
            </View>
        </View>
    )
}