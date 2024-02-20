import React, { useContext, useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
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

const BannerContainer = styled.View`
    width: 100%;
    height: ${bannerHeight}px;
`

export const MarketScreen = ({ navigation }) => {
    const { isLoading: isCategoriesLoading, categories, error: categoriesError } = useContext(CategoriesContext);
    const { isLoading: isGiftCardsLoading, giftCards, error: giftcardError } = useContext(GiftCardsContext);
    const { isLoading: isDealBrandsLoading, dealBrands, error: dealBrandsError, onGetDealBrands } = useContext(ProductsContext);
    const { isLoading: isProductsHotByBrandsLoading, deals: deals, error: brandProductsError, onGetProducts } = useContext(ProductsContext);
    const [showItems, setShowItems] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        onGetDealBrands();
        //setIsLoading(false);
    }, []);

    // useEffect(() => {
    //     setIsLoading(false);
    // }, [dealBrands]);

    const onBrandPressed = (brand) => {

        setIsLoading(true);

        switch (brand.id) {
            case "wishappCats":
                //console.log("market brand:", "wishappCats");
                setShowItems('wishappCats');
                break;

            case "wishappCards":
                //console.log("market brand:", "wishappCards");
                setShowItems('wishappCards');
                break;

            default:
                setShowItems('onlineDeals');
                onGetProducts(productTypeEnum.OnlineDeals, -1, -1, -1, brand.id);

        }
        // if (brand === null) {
        //     console.log("market brand:", "Wish");
        //     setShowDeals(false);

        //     return false;
        // }

        // setShowDeals(true);
        // onGetProducts(productTypeEnum.OnlineDeals, -1, -1, -1, brand.id);
    }

    return (
        <SafeArea>



            {(isDealBrandsLoading) ? (
                <LoadingContainer>
                    <Loading size={50} animating={true} color={standardcolors.blue300} />
                </LoadingContainer>
            ) : <></>}

            {dealBrandsError && (
                <Spacer position="left" size="large">
                    <Text variant="error">Something went wrong retrieving the hot product</Text>
                </Spacer>
            )}
            {!(dealBrandsError && isLoading) && (

                <>
                    <BrandBar
                        brands={dealBrands && dealBrands.result}
                        onNavigate={navigation.navigate}
                        onBrandPressed={onBrandPressed}
                    />
                </>
            )}

            <ScrollView>
                <BannerContainer>
                    <HomeHeaderBanner userBanners={[`samsung1.jpg`, `walmart1.jpg`, `amazonsmile.jpg`]} />
                </BannerContainer>

                {(deals || !isLoading) && (showItems === 'onlineDeals') && (

                    <>
                        <ProductsList
                            products={deals.result}
                            navigation={navigation}
                            variant="listOnlineDeal"
                            variantCover="listCoverOnlineDeal"
                        />
                    </>
                )}

                {categories && (showItems === 'wishappCats') && (
                    <>

                        <CategoriesCol
                            categories={categories}
                            onNavigate={navigation.navigate}
                            navigation={navigation}
                            variant="col3"
                            variantCover="col3Cover"
                        />
                    </>
                )}


                {giftCards && (showItems === 'wishappCards') && (
                    <>
                        <GiftCardsCol
                            giftcards={giftCards}
                            onNavigate={navigation.navigate}
                        />

                    </>
                )}

                <Spacer position="bottom" size="xxl" />
            </ScrollView>
        </SafeArea>
    )
}