import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native-paper";
import { Text as SimpleText, ScrollView, TouchableOpacity, View, SafeAreaView, StatusBar, StyleSheet, Dimensions, Image } from "react-native";
import { Text } from "../../../components/typography/text.component";
// import { Search } from "../components/search.component";
import { CategoriesContext } from "../../../services/categories/categories.context";
import { CategoriesBar } from "../../categories/components/categories-bar.component";
import { GiftCardsContext } from "../../../services/giftcards/giftcards.context";
import { GiftCardsBar } from "../../giftcards/components/giftcards-bar.component";
import { ProductsContext } from "../../../services/products/products.context";
import { ProductsHotBar } from "../../products/components/products-hot-bar.component";
import { FadeInView } from "../../../components/animations/fade.animation";
import { Spacer } from "../../../components/spacer/spacer.component";
import { host, height, width } from "../../../utils/env";
import { HomeHeaderBanner } from "../../../components/banner/banners.component";
import { standardcolors } from "../../../infrastructure/theme/colors";
import { Loading, SafeArea, LoadingContainer } from "../components/home.styles";

const isToggled = false;



export const HomeScreen = ({ navigation }) => {
    const { isLoading: isCategoriesLoading, categories, error: categoriesError } = useContext(CategoriesContext);
    const { isLoading: isGiftCardsLoading, giftCards, error: giftcardError } = useContext(GiftCardsContext);
    const { isLoading: isProductHotsLoading, productHots: productHots, error: productHotsError, onGetProductsHot } = useContext(ProductsContext);

    const banners = [`b1.webp`, `b2.webp`];

    useEffect(() => {

        onGetProductsHot();
    }, []);

    //console.log("Loadings: ", isCategoriesLoading, isGiftCardsLoading, isProductHotsLoading);
    return (
        <SafeArea>

            <ScrollView>

                {(isCategoriesLoading || isGiftCardsLoading || isProductHotsLoading) ? (
                    <LoadingContainer>
                        <Loading size={50} animating={true} color={standardcolors.blue300} />
                    </LoadingContainer>
                ) : <></>}
                {/* <Search
                isFavouritesToggled={isToggled}
                onFavouritesToggle={() => setIsToggled(!isToggled)}
            /> */}

                <HomeHeaderBanner />

                <></>
                {isToggled && (
                    // <FavouritesBar
                    //     favourites={favourites}
                    //     onNavigate={navigation.navigate}
                    // />
                    <></>
                )}
                {categoriesError && (
                    <Spacer position="left" size="large">
                        <Text variant="error">Something went wrong retrieving the categories</Text>
                    </Spacer>
                )}

                {!categoriesError && (
                    <>
                        <CategoriesBar
                            categories={categories}
                            onNavigate={navigation.navigate}
                        />
                    </>

                    // <RestaurantList
                    //     data={restaurants}
                    //     renderItem={({ item }) => {
                    //         return (
                    //             <TouchableOpacity
                    //                 onPress={() =>
                    //                     navigation.navigate("RestaurantDetail", {
                    //                         restaurant: item,
                    //                     })
                    //                 }
                    //             >
                    //                 <Spacer position="bottom" size="large">
                    //                     <FadeInView>
                    //                         <RestaurantInfoCard restaurant={item} />
                    //                     </FadeInView>
                    //                 </Spacer>
                    //             </TouchableOpacity>
                    //         );
                    //     }}
                    //     keyExtractor={(item) => item.name}
                    // />
                )}
                {productHotsError && (
                    <Spacer position="left" size="large">
                        <Text variant="error">Something went wrong retrieving the hot product </Text>
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
                {giftcardError && (
                    <Spacer position="left" size="large">
                        <Text variant="error">Something went wrong retrieving the giftcards</Text>
                    </Spacer>
                )}
                {!giftcardError && (
                    <>
                        <GiftCardsBar
                            giftcards={giftCards}
                            onNavigate={navigation.navigate}
                        />
                    </>

                )}
            </ScrollView>
        </SafeArea>
    )
}