import React, { useContext, useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity, Image, FlatList, Modal, Linking } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { ProductsList } from "../../products/components/products-list.component";
import { ProductsContext } from "../../../services/products/products.context";
import { CategoriesContext } from "../../../services/categories/categories.context";
import { BrandBar } from "../components/brands.bar.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { host, height, width, bannerHeight } from "../../../utils/env";
import { BlurView } from "expo-blur";
import { brandList } from "../shoplogos";



export const ShopsScreen = ({ navigation, route }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    // useEffect(() => {
    //     console.log(isModalVisible, selectedBrand);
    // }, [isModalVisible]);

    const toggleModal = (brand) => {
        setSelectedBrand(brand);
        setModalVisible(!isModalVisible);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => toggleModal(item)}>
            <View style={styles.logoContainer}>
                <Image source={item.LogoFile} style={styles.logo} resizeMode="contain" />
            </View>
            <Text style={styles.name}>{item.Name}</Text>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <FlatList
                data={brandList}
                renderItem={renderItem}
                keyExtractor={(item) => item.Name}
                numColumns={3}
            />
            {selectedBrand && (
                <Modal transparent={true} animationType="fade" isVisible={true} onBackdropPress={() => setModalVisible(false)} backdropOpacity={0.5} >
                    <BlurView intensity={50} style={StyleSheet.absoluteFill}>
                        <View style={styles.modalContent}>
                            <Image source={selectedBrand.LogoFile} style={styles.logoOpen} resizeMode="contain" />
                            {/* <Text style={styles.modalTitle}>{selectedBrand.Name}</Text> */}
                            <Text style={styles.modalDescription}>{selectedBrand.Description}</Text>
                            <TouchableOpacity onPress={() => Linking.openURL(selectedBrand.Url)}>
                                <Text style={styles.modalLink}>Visit {selectedBrand.Name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => toggleModal()} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                </Modal>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    item: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 0,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    logoOpen: {
        marginTop: 150,
        width: '30%',
        height: '30%',
    },
    name: {
        marginTop: 10,
        textAlign: 'center',
        //fontFamily: 'Inter_400Regular',
    },
    modalContent: {
        backgroundColor: 'transparent',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        //fontFamily: 'Inter_500Medium',
    },
    modalDescription: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
        color: 'black',
        //fontFamily: 'Inter_400Regular',
    },
    modalLink: {
        fontSize: 16,
        color: 'blue',
        //fontFamily: 'Inter_500Medium',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        fontSize: 16,
        color: 'black',
        //fontFamily: 'Inter_500Medium',
    },
});

