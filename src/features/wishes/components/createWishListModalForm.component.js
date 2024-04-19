import React, { useContext, useState, useEffect } from 'react';
import { Modal, View, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { HeightPercent, WidthPercent, height } from '../../../utils/env';
import { Text } from '../../../components/typography/text.component';
import { TextInput, overlay } from 'react-native-paper';
import styled from "styled-components/native";
import { standardcolors } from '../../../infrastructure/theme/colors';
import { BuyAGiftButton } from '../../gifts/components/gift-screen.styles';
import { Row } from '../../gifts/components/gift-screen.styles';
// import ButtonX from '../../../components/controls/Button';
// import { ButtonY } from '../../../components/button/button.component';
import { WishesContext } from '../../../services/wishes/wishes.context';
import ImageSelector from './ImageSelector.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { WishListIconNames } from './wishlist-iconset.component';

const WishlistNameInput = styled(TextInput)`
    width: ${WidthPercent(50, 30)}px;
    margin: 20px 10px;
    `

const BackBlur = styled(BlurView)`
    position: fixed;
    width: ${WidthPercent(100)}px;
    height: ${2 * HeightPercent(100)}px;
    background-color: transparent;
    top:-${HeightPercent(100)}px;
    left:0;
    z-index: 99999999;
    
`
const BackBlur2 = styled(BlurView)`
    padding:0;
    margin:0;
    background-color:transparent
`

const window = Dimensions.get('window');

const CreateWishListModalForm = (props) => {



    const getRandomImage = (array) => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    };

    const [name, setName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState(() => getRandomImage(WishListIconNames));

    const { isOpen, onClose, onSubmit } = props;



    const handleOkClick = () => {
        //alert(name);
        onSubmit(name, selectedIcon); // Pass the name back to the parent component
        onClose(); // Close the modal

    };


    if (!isOpen) {
        return null; // Don't render the modal if it's not open
    }

    state = {
        selectedIcon: null,
    };

    handleIconPress = (item) => {
        setSelectedIcon(item);
    };

    return (
        <View>
            <BackBlur intensity={0} />
            <Modal
                animationType="slide"

                transparent={true}
                visible={isOpen}
                onRequestClose={onClose}
            ><KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"} // "padding" is usually suitable for iOS, "height" or undefined for Android
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
                    <BackBlur2 intensity={30} >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text variant="title" style={{ color: standardcolors.white }}>Enter the new Wishlist name</Text>
                                <WishlistNameInput
                                    onChangeText={setName}
                                    value={name}
                                />
                                <ImageSelector wishListIconNames={WishListIconNames} onIconPress={this.handleIconPress} />
                                {/* {selectedIcon && (
                                    <Text>Selected Icon ID: {selectedIcon}</Text>
                                )} */}
                                <Spacer position='top' size='md' />
                                <Row>
                                    <BuyAGiftButton mode="contained" onPress={onClose} ><Text>Cancel ❌</Text></BuyAGiftButton>
                                    <BuyAGiftButton mode="contained" onPress={handleOkClick} ><Text>Ok, Create 👌🏻</Text></BuyAGiftButton>
                                </Row>
                                {/* <Row>
                                <ButtonX mode="contained" onPress={onClose} variant="selected" ><Text>Cancel ❌</Text></ButtonX>
                                <ButtonX mode="contained" onPress={handleOkClick} Text="Ok, Create 👌🏻" ><Text>Ok, Create 👌🏻</Text></ButtonX>
                            </Row>
                            <Row>
                                <ButtonY mode="contained" onPress={onClose} variant="selected"></ButtonY>
                                <ButtonY mode="contained" onPress={handleOkClick}  ></ButtonY>
                            </Row> */}
                            </View>
                        </View>
                    </BackBlur2>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    fullScreen: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: window.width,
        height: window.height,
        backgroundColor: standardcolors.violetblue66,

    },
    centeredView: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 200,

    },
    modalView: {
        margin: 0,
        backgroundColor: '#4446',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 3,
            height: 7,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: HeightPercent(60),
    },
    modalText: {
        marginBottom: 15,

        textAlign: 'center',
    }
});



export default CreateWishListModalForm;