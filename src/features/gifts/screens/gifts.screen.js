import React, { useContext, useState, useRef, useEffect, createRef } from "react";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { StyleSheet, View, ScrollView, Image, Modal, Styles, Pressable, Switch, findNodeHandle, InteractionManager, TouchableOpacity as ButtonX } from "react-native";
import styled from "styled-components/native";
import { Search } from "../components/search.component";
import { giftInfoCard } from "../components/gift-info-card.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { giftsContext } from "../../../services/gifts/gifts.context";
//import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { standardcolors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.component";
import { CategoriesContext } from "../../../services/categories/categories.context";
import { ProductsContext } from "../../../services/products/products.context";
import { ProductsHotBar } from "../../products/components/products-hot-bar.component";
import { SafeArea } from "../../home/components/home.styles";
import { giftList, Row, Col, LoadingContainer, BuyAGiftButton, BuyAGiftSection, Space50, BuyAGiftIcon, Lottie, BuyAGiftIconS } from "../components/gift-screen.styles";
import { CategoriesCol } from "../../categories/components/categories-col.component";
import CurrencyInput from 'react-native-currency-input';
import { WidthPercent } from "../../../utils/env";
import { BlurView } from "expo-blur";

const InputCurrency = styled(CurrencyInput)`
        font-size: 20px;
        border: 1px solid purple;
        border-radious: 10px;
        padding: 8px 10px 10px 10px;
        background-color: white;
    `

const EMailInput = styled(TextInput)`
        font-size: 17px;
        border: 1px solid purple;
        //border-radious: 10px;
        padding: 0px 10px;
        background-color: white;
        margin-bottom: 20px;
    `


export const GiftsScreen = ({ navigation }) => {

    useEffect(() => {

        onGetProductsHot();
    }, []);

    const { isLoading: isCategoriesLoading, categories, error: categoriesError } = useContext(CategoriesContext);
    const { isLoading: isProductHotsLoading, productHots: productHots, error: productHotsError, onGetProductsHot } = useContext(ProductsContext);
    const [isToggled, setIsToggled] = useState(false);
    const [giftStep, setGiftStep] = useState(0);
    const [giftAmount, setGiftAmount] = useState(0);
    const [email, setEmail] = useState("");
    const [giftCode, setGiftCode] = useState("");

    const [step0Answer, setStep0Answer] = useState(null);
    const [step1Answer, setStep1Answer] = useState(null);
    const [step2Answer, setStep2Answer] = useState(null);
    const [step3Answer, setStep3Answer] = useState(null);
    const [step1AddGiftType, setStep1AddGiftType] = useState("NoGiftCode");
    const [modalVisible, setModalVisible] = useState(false);


    const showDialog = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleDelete = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        setModalVisible(false);
    };

    const scrollViewRef = useRef();
    var Step0, Step1, Step2, Step3 = '';


    if (giftStep >= 0) {

        Step0 = (
            <>
                <Spacer size="md" position="top" />

                <View style={{ alignContent: 'center', alignItems: 'center' }}><Text variant="title" color={standardcolors.black} style={{ color: standardcolors.black }}>What do you want to send as a gift?</Text></View>
                <Row>
                    <Space50>
                        <BuyAGiftButton mode="contained" color={step0Answer === "Send Money" ? "white" : null} onPress={() => { setStep0Answer("Buy a product"); console.log("Step0:", "Buy a product"); setGiftStep(1); setStep1Answer(''); }} >
                            <Row>
                                <BuyAGiftIcon source={require("../../../../assets/buyagift.png")} resizeMode="contain" />
                                <Col><Text variant="button" style={{ color: step0Answer === "Send Money" ? "#000" : "#fff" }}>Buy a gift 🎁</Text><Text variant="caption">For yourself or any other</Text></Col>
                            </Row>
                        </BuyAGiftButton>
                    </Space50>

                    <Space50>
                        <BuyAGiftButton mode="contained" color={step0Answer === "Buy a product" ? "white" : null} onPress={() => { setStep0Answer("Send Money"); console.log("Step0:", "Send Money"); setGiftStep(1); setStep1Answer(''); }} >
                            <Row>
                                <BuyAGiftIcon source={require("../../../../assets/money.png")} resizeMode="contain" />
                                <Col><Text variant="button" style={{ color: step0Answer === "Buy a product" ? "#000" : "#fff" }}>Send money 💵</Text><Text variant="caption">To yourself or any other</Text></Col>
                            </Row>
                        </BuyAGiftButton>
                    </Space50>

                </Row>
            </>
        )
    }

    if (giftStep >= 1) {


        Step1 = (
            <>
                <Spacer size="md" position="top" />
                <View style={{ alignContent: 'center', alignItems: 'center' }}><Text variant="title" color={standardcolors.black} style={{ color: standardcolors.black }}>Who do you want to buy this gift for?</Text></View>
                <Row>
                    <Space50>
                        <BuyAGiftButton mode="contained" color={step1Answer === "to others" ? "white" : null} onPress={() => { setStep1Answer("to yourself"); console.log("Step1:", "to yourself"); setGiftStep(2); setStep2Answer(''); }} >
                            <Row>
                                <BuyAGiftIcon source={require("../../../../assets/myself.png")} resizeMode="contain" />
                                <Col><Text variant="label" style={{ color: step1Answer === "to others" ? "#000" : "#fff" }}>To yourself 🧑‍🦰</Text><Text variant="caption">.................</Text></Col>
                            </Row>
                        </BuyAGiftButton>
                    </Space50>

                    <Space50>
                        <BuyAGiftButton mode="contained" color={step1Answer === "to yourself" ? "white" : null} onPress={() => { setStep1Answer("to others"); console.log("Step1:", "to others"); setGiftStep(1); setStep2Answer(''); }} >
                            <Row>
                                <BuyAGiftIcon source={require("../../../../assets/group.png")} resizeMode="contain" />
                                <Col><Text variant="label" style={{ color: step1Answer === "to yourself" ? "#000" : "#fff" }}>To others 🧑‍🤝‍🧑</Text><Text variant="caption">.................</Text></Col>
                            </Row>
                        </BuyAGiftButton>
                    </Space50>

                </Row>
                <View style={{ opacity: 0, backgroundColor: 'blue' }}>
                    <Modal
                        //presentationStyle="fullScreen"
                        animationType="slide"
                        transparent={true}

                        visible={modalVisible}
                        onRequestClose={() => {
                            //Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>

                        <View style={styles.container}>

                            <Image source={require('../../../../assets/people3.jpg')} style={[styles.image, StyleSheet.absoluteFill]} />
                            {/* <View style={{ backgroundColor: '#FF000088', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} ></View> */}
                            <BlurView intensity={30} >

                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>


                                        <Text style={styles.modalText}>Select receiver!</Text>


                                        <Row>
                                            <Space50>
                                                <BuyAGiftButton mode="contained" color={step1AddGiftType === "NoGiftCode" ? "white" : null} onPress={() => { setStep1AddGiftType("WithGiftCode"); console.log("Step2:", "Public"); setGiftStep(3); }} >
                                                    <Row>
                                                        <BuyAGiftIconS source={require("../../../../assets/nogiftcode.png")} resizeMode="contain" />
                                                        {/* <Col> */}
                                                        <Text variant="label" style={{ color: step1AddGiftType === "NoGiftCode" ? "#000" : "#fff", marginTop: 10 }}>New gift</Text>
                                                        {/* <Text variant="caption">Gift opened before</Text> */}
                                                        {/* </Col> */}
                                                    </Row>
                                                </BuyAGiftButton>
                                            </Space50>
                                            <Space50>
                                                <BuyAGiftButton mode="contained" color={step1AddGiftType === "WithGiftCode" ? "white" : null} onPress={() => { setStep1AddGiftType("NoGiftCode"); console.log("Step2:", "privately"); setGiftStep(3); }} >
                                                    <Row>
                                                        <BuyAGiftIconS source={require("../../../../assets/withcode.png")} resizeMode="contain" />
                                                        {/* <Col> */}
                                                        <Text variant="label" style={{ color: step1AddGiftType === "WithGiftCode" ? "#000" : "#fff", marginTop: 10 }}>Add to a gift</Text>
                                                        {/* <Text variant="caption">No one else added a gift</Text> */}
                                                        {/* </Col> */}

                                                    </Row>
                                                </BuyAGiftButton>
                                            </Space50>
                                        </Row>

                                        <View style={{ height: 100, marginBottom: 20, padding: 0 }}>

                                            {(step1AddGiftType == "WithGiftCode") &&
                                                <>
                                                    <Text variant="label" style={{ color: 'black', marginBottom: 10 }}>Please enter gift code:</Text>
                                                    <EMailInput style={{ width: WidthPercent(100, -100) }}
                                                        label="Gift Code"
                                                        onChangeText={(u) => giftCode(u)}
                                                        textContentType="number"
                                                        keyboardType="number-pad"
                                                    />
                                                </>
                                            }
                                            {(step1AddGiftType == "NoGiftCode") &&
                                                <>
                                                    <Text variant="label" style={{ color: 'black', marginBottom: 10 }}>Please enter receiver email:</Text>
                                                    <EMailInput style={{ width: WidthPercent(100, -100) }}
                                                        label="E-mail"
                                                        //value={email}
                                                        onChangeText={(u) => setEmail(u)}
                                                        textContentType="emailAddress"
                                                        keyboardType="email-address"
                                                    />
                                                </>
                                            }
                                        </View>



                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => setModalVisible(!modalVisible)}>
                                            <Text style={styles.textStyle}>Hide Modal</Text>
                                        </Pressable>
                                    </View>
                                </View>

                            </BlurView>

                            {/* <ScrollView contentContainerStyle={{ flex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>

                            </ScrollView> */}
                        </View>


                    </Modal>


                </View>

                {/* <Dialog.Container visible={visible}>
                    <Dialog.Title>Account delete</Dialog.Title>
                    <Dialog.Description>


                    </Dialog.Description>
                    <Dialog.CodeInput ></Dialog.CodeInput >
                    <Dialog.Button label="Cancel" onPress={handleCancel} />
                    <Dialog.Button label="Delete" onPress={handleDelete} />
                </Dialog.Container> */}

                <Button title="Show dialog" onPress={showDialog} style={{ color: '#880099' }} >XXX</Button>

                {(step1Answer == "to others") && (<>

                    <Row>

                        <Space50>
                            <BuyAGiftButton mode="contained" color={step1AddGiftType === "NoGiftCode" ? "white" : null} onPress={() => { setStep1AddGiftType("WithGiftCode"); console.log("Step2:", "Public"); setGiftStep(3); }} >
                                <Row>
                                    <BuyAGiftIcon source={require("../../../../assets/nogiftcode.png")} resizeMode="contain" />
                                    <Col><Text variant="label" style={{ color: step1AddGiftType === "NoGiftCode" ? "#000" : "#fff" }}>New gift</Text><Text variant="caption">Gift opened before</Text></Col>
                                </Row>
                            </BuyAGiftButton>
                        </Space50>

                        <Space50>
                            <BuyAGiftButton mode="contained" color={step1AddGiftType === "WithGiftCode" ? "white" : null} onPress={() => { setStep1AddGiftType("NoGiftCode"); console.log("Step2:", "privately"); setGiftStep(3); }} >
                                <Row>
                                    <BuyAGiftIcon source={require("../../../../assets/withcode.png")} resizeMode="contain" />
                                    <Col><Text variant="label" style={{ color: step1AddGiftType === "WithGiftCode" ? "#000" : "#fff" }}>Add to a gift</Text><Text variant="caption">No one else added a gift</Text></Col>

                                </Row>

                            </BuyAGiftButton>

                        </Space50>

                    </Row>



                </>)}
            </>
        )
    }

    if (giftStep >= 2) {
        Step2 = (
            <>
                <Spacer size="md" position="top" />
                <View style={{ alignContent: 'center', alignItems: 'center' }}><Text variant="title" color={standardcolors.black} style={{ color: standardcolors.black }}>Who do you want to buy this gift for?</Text></View>
                <Row>
                    <Space50>
                        <BuyAGiftButton mode="contained" color={step2Answer === "privately" ? "white" : null} onPress={() => { setStep2Answer("public"); console.log("Step2:", "Public"); setGiftStep(3); }} >
                            <Row>
                                <BuyAGiftIcon source={require("../../../../assets/boxopened.png")} resizeMode="contain" />
                                <Col><Text variant="label" style={{ color: step2Answer === "privately" ? "#000" : "#fff" }}>Public</Text><Text variant="caption">Open to your contact</Text></Col>
                            </Row>
                        </BuyAGiftButton>
                    </Space50>

                    <Space50>
                        <BuyAGiftButton mode="contained" color={step2Answer === "public" ? "white" : null} onPress={() => { setStep2Answer("privately"); console.log("Step2:", "privately"); setGiftStep(3); }} >
                            <Row>
                                <BuyAGiftIcon source={require("../../../../assets/boxclosed.png")} resizeMode="contain" />
                                <Col><Text variant="label" style={{ color: step2Answer === "public" ? "#000" : "#fff" }}>Private</Text><Text variant="caption">Close to all</Text></Col>
                            </Row>
                        </BuyAGiftButton>
                    </Space50>

                </Row>
            </>
        )
    }

    if (giftStep >= 3) {
        if (step0Answer == "Send Money") {
            // navigation.navigate("CreditCardPaymentStack")
            Step3 = (
                <View style={{ marginBottom: 150, }}>

                    <View style={{ padding: 20 }}>
                        <Text variant="title">Please enter amount:  </Text>

                        <InputCurrency value={giftAmount} onChangeValue={setGiftAmount}

                            minValue="0"
                            prefix="💲"
                            delimiter="."
                            separator=","
                            precision={0} />

                        <BuyAGiftButton mode="contained" onPress={() => { navigation.navigate("CreditCardPaymentStack", { giftAmount, email }) }} style={{ marginTop: 20, marginLeft: 0, marginRight: 0 }}>

                            <Row>
                                <BuyAGiftIcon source={require("../../../../assets/coin-1.png")} resizeMode="contain" />
                                <Col>
                                    <Text variant="label" style={{ color: '#fff' }}>Continue to enter payment section</Text>
                                    <Text variant="caption">After pressing this button, credit card payment will open</Text>
                                </Col>
                            </Row>


                        </BuyAGiftButton>


                    </View>
                </View>
            )

        } else {

            Step3 = (
                <>

                    <View style={{ alignContent: 'center', alignItems: 'center' }}><Text variant="title">{`You are going to ${step0Answer} ${step1Answer} ${step2Answer}`}</Text></View>
                    <BuyAGiftButton mode="contained" onPress={() => { navigation.navigate("CreditCardPaymentStack") }} >
                        <Row>
                            <BuyAGiftIcon source={require("../../../../assets/amlogo.png")} resizeMode="contain" />
                            <BuyAGiftIcon source={require("../../../../assets/iconw.png")} resizeMode="contain" />
                            <Col><Text variant="label">Select your product</Text><Text variant="caption">From WishApp or Amazon</Text></Col>
                        </Row>
                    </BuyAGiftButton>
                    <Spacer size="md" position="top" />

                    {
                        categoriesError && (
                            <Spacer position="left" size="large">
                                <Text variant="error">Something went wrong retrieving the categories</Text>
                            </Spacer>
                        )
                    }

                    {
                        !categoriesError && (
                            <>
                                <CategoriesCol
                                    categories={categories}
                                    onNavigate={navigation.navigate}
                                    navigation={navigation}
                                    variant="col2"
                                    variantCover="col2Cover"
                                />
                            </>

                        )
                    }
                </>
            )
        }
    }

    return (
        <SafeArea>

            <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >

                {(isProductHotsLoading) ? (
                    <LoadingContainer>
                        <ActivityIndicator size={50} animating={true} color={standardcolors.aliceblue} />
                    </LoadingContainer>
                ) : <></>}


                {productHotsError && (
                    <Spacer position="left" size="large">
                        <Text variant="error">Something went wrong retrieving the hot products</Text>
                    </Spacer>
                )}
                {!productHotsError && (
                    <>
                        <ProductsHotBar
                            products={productHots && productHots.result}
                            onNavigate={navigation.navigate}
                        />
                    </>
                )}

                {/* 
                {(giftStep >= 0) && (
                    <Step0AndAbove />
                )}
                {(giftStep >= 1) && (
                    <Step1AndAbove />
                )}
                {(giftStep >= 2) && (
                    <Step2AndAbove />
                )}
                {(giftStep >= 3) && (
                    <>{Step3}</>
                )} */}

                <>{Step0}{Step1}{Step2}{Step3}</>


                {(giftStep === 0) && (
                    <Lottie
                        key="animation"
                        autoPlay
                        loop
                        resizeMode="cover"
                        source={require("../../../../assets/anims/116772-presents.json")}
                    />
                )}
                <Spacer position='bottom' size='xxl' />
            </ScrollView>
        </SafeArea>
    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#fffa',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'black',
    },
    container: {
        flex: 1,
        //backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 1
    }
});

// const Step0AndAbove = () => {
//     return (
//         <>
//             <Spacer size="md" position="top" />
//             {/* <Button mode="contained" onPress={() => console.log('Pressed')}>
//                             <View style={{ backgroundColor: 'yellow' }}>
//                                 <BuyAGiftIcon style={{ marginRight: 10 }} source={require("../../../../assets/buyagift.png")} resizeMode="contain" />
//                                 <Text variant="label">Contained</Text>
//                                 <Text variant="label">Contained</Text>
//                             </View>
//                             <BuyAGiftIcon style={{ marginRight: 10 }} source={require("../../../../assets/buyagift.png")} resizeMode="contain" />
//                             <Text variant="label">Contained</Text>
//                             <Text variant="label">Contained</Text>
//                         </Button> */}
//             <View style={{ alignContent: 'center', alignItems: 'center' }}><Text variant="title" color={standardcolors.black} style={{ color: standardcolors.black }}>What do you want to send as a gift?</Text></View>
//             <Row>
//                 <Space50>
//                     <BuyAGiftButton mode="contained" color={step0Answer === "Send Money" ? "white" : null} onPress={() => { setStep0Answer("Buy a product"); console.log("Step0:", "Buy a product"); setGiftStep(1); setStep1Answer(''); }} >
//                         <Row>
//                             <BuyAGiftIcon source={require("../../../../assets/buyagift.png")} resizeMode="contain" />
//                             <Col><Text variant="button">Buy a gift 🎁</Text><Text variant="caption">For yourself or any other</Text></Col>
//                         </Row>
//                     </BuyAGiftButton>
//                 </Space50>

//                 <Space50>
//                     <BuyAGiftButton mode="contained" color={step0Answer === "Buy a product" ? "white" : null} onPress={() => { setStep0Answer("Send Money"); console.log("Step0:", "Send Money"); setGiftStep(1); setStep1Answer(''); }} >
//                         <Row>
//                             <BuyAGiftIcon source={require("../../../../assets/money.png")} resizeMode="contain" />
//                             <Col><Text variant="button">Send money 💵</Text><Text variant="caption">To yourself or any other</Text></Col>
//                         </Row>
//                     </BuyAGiftButton>
//                 </Space50>

//             </Row>
//         </>
//     )
// }

// const Step1AndAbove = () => {
//     return (
//         <>
//             <Spacer size="md" position="top" />
//             <View style={{ alignContent: 'center', alignItems: 'center' }}><Text variant="title" color={standardcolors.black} style={{ color: standardcolors.black }}>Who do you want to buy this gift for?</Text></View>
//             <Row>
//                 <Space50>
//                     <BuyAGiftButton mode="contained" color={step1Answer === "to others" ? "white" : null} onPress={() => { setStep1Answer("to yourself"); console.log("Step1:", "to yourself"); setGiftStep(2); setStep2Answer(''); }} >
//                         <Row>
//                             <BuyAGiftIcon source={require("../../../../assets/myself.png")} resizeMode="contain" />
//                             <Col><Text variant="label" color={standardcolors.black} style={{ color: standardcolors.black }}>To yourself 🧑‍🦰</Text><Text variant="caption">.................</Text></Col>
//                         </Row>
//                     </BuyAGiftButton>
//                 </Space50>

//                 <Space50>
//                     <BuyAGiftButton mode="contained" color={step1Answer === "to yourself" ? "white" : null} onPress={() => { setStep1Answer("to others"); console.log("Step1:", "to others"); setGiftStep(2); setStep2Answer(''); }} >
//                         <Row>
//                             <BuyAGiftIcon source={require("../../../../assets/group.png")} resizeMode="contain" />
//                             <Col><Text variant="label" color={standardcolors.white} style={{ color: standardcolors.black }}>To others 🧑‍🤝‍🧑</Text><Text variant="caption">.................</Text></Col>
//                         </Row>
//                     </BuyAGiftButton>
//                 </Space50>

//             </Row>
//         </>
//     )
// }

// const Step2AndAbove = () => {
//     return (
//         <>
//             <Spacer size="md" position="top" />
//             <View style={{ alignContent: 'center', alignItems: 'center' }}><Text variant="title" color={standardcolors.black} style={{ color: standardcolors.black }}>Who do you want to buy this gift for?</Text></View>
//             <Row>
//                 <Space50>
//                     <BuyAGiftButton mode="contained" color={step2Answer === "privately" ? "white" : null} onPress={() => { setStep2Answer("public"); console.log("Step2:", "Public"); setGiftStep(3); }} >
//                         <Row>
//                             <BuyAGiftIcon source={require("../../../../assets/boxopened.png")} resizeMode="contain" />
//                             <Col><Text variant="label" color={standardcolors.black} style={{ color: standardcolors.black }}>Public</Text><Text variant="caption">Open to your contact</Text></Col>
//                         </Row>
//                     </BuyAGiftButton>
//                 </Space50>

//                 <Space50>
//                     <BuyAGiftButton mode="contained" color={step2Answer === "public" ? "white" : null} onPress={() => { setStep2Answer("privately"); console.log("Step2:", "privately"); setGiftStep(3); }} >
//                         <Row>
//                             <BuyAGiftIcon source={require("../../../../assets/boxclosed.png")} resizeMode="contain" />
//                             <Col><Text variant="label" color={standardcolors.black} style={{ color: standardcolors.black }}>Private</Text><Text variant="caption">Close to all</Text></Col>
//                         </Row>
//                     </BuyAGiftButton>
//                 </Space50>

//             </Row>
//         </>
//     )
// }

// const Step3AndAbove = () => {

//     if (step0Answer == "Send Money") {
//         // navigation.navigate("CreditCardPaymentStack")
//         return (
//             <View style={{ marginBottom: 150, }}>
//                 <View style={{ padding: 20 }}>
//                     <Text variant="title">Please enter amount: </Text>
//                     <Row>
//                         <Dolor>💲</Dolor><DolorInput keyboardType='number-pad'
//                             onChangeText={(text) => setGiftAmount(text)}
//                             // value='0'
//                             maxLength={10} />
//                     </Row>


//                     {/* <InputCurrency value={giftAmount} onChangeValue={onChangedAmount}

//                             minValue="0"
//                             prefix="$"
//                             delimiter="."
//                             separator=","
//                             precision={0} /> */}

//                     <BuyAGiftButton mode="contained" onPress={() => { navigation.navigate("CreditCardPaymentStack") }} style={{ marginTop: 20, marginLeft: 0, marginRight: 0 }}>

//                         <Row>
//                             <BuyAGiftIcon source={require("../../../../assets/coin-1.png")} resizeMode="contain" />
//                             <Col>
//                                 <Text variant="label" style={{ color: '#fff' }}>Continue to payment section</Text>
//                                 <Text variant="caption">After pressing this button, credit card payment will open</Text>
//                             </Col>
//                         </Row>


//                     </BuyAGiftButton>
//                 </View>
//             </View>
//         )

//     } else {

//         return (
//             <>

//                 <View style={{ alignContent: 'center', alignItems: 'center' }}><Text variant="title">{`You are going to ${step0Answer} ${step1Answer} ${step2Answer}`}</Text></View>
//                 <BuyAGiftButton mode="contained" onPress={() => { navigation.navigate("CreditCardPaymentStack") }} >
//                     <Row>
//                         <BuyAGiftIcon source={require("../../../../assets/amlogo.png")} resizeMode="contain" />
//                         <BuyAGiftIcon source={require("../../../../assets/iconw.png")} resizeMode="contain" />
//                         <Col><Text variant="label">Select your product</Text><Text variant="caption">From WishApp or Amazon</Text></Col>
//                     </Row>
//                 </BuyAGiftButton>
//                 <Spacer size="md" position="top" />

//                 {
//                     categoriesError && (
//                         <Spacer position="left" size="large">
//                             <Text variant="error">Something went wrong retrieving the categories</Text>
//                         </Spacer>
//                     )
//                 }

//                 {
//                     !categoriesError && (
//                         <>
//                             <CategoriesCol
//                                 categories={categories}
//                                 onNavigate={navigation.navigate}
//                                 navigation={navigation}
//                                 variant="col2"
//                                 variantCover="col2Cover"
//                             />
//                         </>

//                     )
//                 }
//             </>
//         )

//     }

// }