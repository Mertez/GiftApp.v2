import React, { useContext, useState, useEffect } from "react";
import { ScrollView, RefreshControl, View } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { ProductsList } from "../../products/components/products-list.component";
// import { ProductsContext } from "../../../services/products/products.context";
// import { CategoriesContext } from "../../../services/categories/categories.context";
import { Spacer } from "../../../components/spacer/spacer.component";
import { host, height, width, bannerHeight } from "../../../utils/env";
import { HomeHeaderBanner } from "../../../components/banner/banners.component";
//import { Loading, SafeArea, LoadingContainer } from "../components/market.styles";
//import { GiftCardsContext } from "../../../services/giftcards/giftcards.context";
import { PiggyBank } from "../../../components/piggyBank/piggyBank.component";
import { WishesContext } from "../../../services/wishes/wishes.context";

const BannerContainer = styled.View`
    width: 100%;
    height: ${bannerHeight}px;
`

export const WishesScreen = ({ navigation }) => {
    // const { isLoading: isCategoriesLoading, categories, error: categoriesError } = useContext(CategoriesContext);
    // const { isLoading: isGiftCardsLoading, giftCards, error: giftcardError } = useContext(GiftCardsContext);
    // const { isLoading: isProductsHotByBrandsLoading, deals: deals, error: brandProductsError, onGetProducts } = useContext(ProductsContext);
    //const [showItems, setShowItems] = useState('');

    const {
        isLoading,
        error,
        wishes,
        search: onSearch,
        keyword,

        onGetPiggyBank,
        piggyBank,
    } = useContext(WishesContext);

    const [refreshing, setRefreshing] = React.useState(false);

    // useEffect(() => {
    //     onGetDealBrands();
    // }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // setTimeout(() => {
        //     setRefreshing(false);
        // }, 2000);
    }, []);

    return (
        <>

            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <BannerContainer>
                    <HomeHeaderBanner userBanners={[`samsung1.jpg`, `walmart1.jpg`, `amazonsmile.jpg`]} />
                </BannerContainer>
                <PiggyBank variant={"full"} refreshing={refreshing} onRefreshingFinished={() => setRefreshing(false)} />


                <Spacer position="bottom" size="xxl" />
            </ScrollView>
        </>
    )
}