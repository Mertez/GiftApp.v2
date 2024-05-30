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
import { HomeHeaderBanner } from "../../../components/banner/banners.component";
import { Loading, SafeArea, LoadingContainer } from "../components/market.styles";
import { productTypeEnum } from "../../../infrastructure/models/enums";
import { CategoriesCol } from "../../categories/components/categories-col.component";
import { GiftCardsContext } from "../../../services/giftcards/giftcards.context";
import { GiftCardsCol } from "../../giftcards/components/giftcards-col.component";
import { standardcolors } from "../../../infrastructure/theme/colors";
import { CategoriesBar } from "../../categories/components/categories-bar.component";
import { brandList } from "../shoplogos";



export const ShopsScreen = ({ navigation, route }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

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
                <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{selectedBrand.Name}</Text>
                        <Text style={styles.modalDescription}>{selectedBrand.Description}</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(selectedBrand.Url)}>
                            <Text style={styles.modalLink}>Visit {selectedBrand.Name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
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
        borderRadius: 40,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    name: {
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Inter_500Medium',
    },
    modalDescription: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Inter_400Regular',
    },
    modalLink: {
        fontSize: 16,
        color: 'blue',
        fontFamily: 'Inter_500Medium',
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
        fontFamily: 'Inter_500Medium',
    },
});

