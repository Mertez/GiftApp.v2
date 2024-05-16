import React, { useContext, useState, useEffect } from "react";
import { ScrollView, RefreshControl, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { host, height, width, bannerHeight } from "../../../utils/env";
import { HomeHeaderBanner } from "../../../components/banner/banners.component";
import { PiggyBank } from "../../../components/piggyBank/piggyBank.component";
import { WishesContext } from "../../../services/wishes/wishes.context";
import CreateWishListModalForm from "../components/createWishListModalForm.component";
import { CompactWishListInfo } from "../components/compact-wishlist-info.component";
import { BuyAGiftButton, BuyAGiftIcon } from "../../gifts/components/gift-screen.styles";
import { Row, Col } from "../../gifts/components/gift-screen.styles";
import { WishLists } from "../components/wishlists.component";
import { AnimatedLoading } from "../../../components/animations/loading.component";

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
        isLoading: isLoadingWish,
        error,
        wishes,
        search: onSearch,
        keyword,

        onGetPiggyBank,
        piggyBank,

        onGetWishLists,
        wishLists,

        onGetMyWishLists,
        myWishLists,

        onCreateWishList,
        onUpdateWishList,
        onDeleteWishList,
    } = useContext(WishesContext);

    const [refreshing, setRefreshing] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateWishList = (name, icon) => {
        //console.log('Creating wishlist with name:', name); 
        // Implement the logic to create a folder here 
        //console.log("handleCreateWishList", name);
        onCreateWishList(name, icon);
        onGetMyWishLists(false);
    };

    useEffect(() => {
        //onGetDealBrands();
        onGetMyWishLists(false);
        //console.log("myWishLists:", myWishLists);
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        onGetMyWishLists(false);
        // setTimeout(() => {
        //     setRefreshing(false);
        // }, 2000);
    }, []);

    const condition = true;

    return (
        <>



            <ScrollView nestedScrollEnabled={true}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>


                <BannerContainer>
                    <HomeHeaderBanner
                    //userBanners={[`samsung1.jpg`, `walmart1.jpg`, `amazonsmile.jpg`]}
                    />
                </BannerContainer>

                <PiggyBank variant={"full"} refreshing={refreshing} onRefreshingFinished={() => setRefreshing(false)} />

                <BuyAGiftButton mode="contained" color={"white"} onPress={() => { setIsModalOpen(true); }} >
                    <Row>
                        <BuyAGiftIcon source={require("../../../../assets/buyagift.png")} resizeMode="contain" />
                        <Col><Text variant="button" style={{ color: "#fff" }}>Create New Wishlist 🎁</Text><Text variant="caption">...............</Text></Col>
                    </Row>
                </BuyAGiftButton>

                <CreateWishListModalForm
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreateWishList}
                />
                <Spacer position="bottom" size="sm" />
                <WishLists wishLists={myWishLists} onIconPress={(item, percent) => {
                    //var wishItems = item.wishes;
                    //console.log("Percent:", percent);
                    navigation.navigate("WishItems", { Wistlist: item, Percent: percent });
                    //console.log(wishItems);
                }} />
                <Spacer position="bottom" size="xxl" />
                {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {myWishLists && myWishLists.map((wishlist) => {
                        const key = wishlist.id;
                        return (
                            <Spacer key={key} position="left" size="md">
                                <TouchableOpacity
                                // onPress={() =>
                                //     onNavigate("productDetailStack", {
                                //         product: product, isGiftCard: false
                                //     })
                                // }
                                >
                                    <CompactWishListInfo wishlist={wishlist}></CompactWishListInfo>

                                </TouchableOpacity>
                            </Spacer>
                        );
                    })}
                </ScrollView> */}

            </ScrollView>
        </>
    )
}