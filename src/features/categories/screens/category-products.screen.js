import React, { useState, useRef, useEffect, useContext } from "react";
import { TouchableOpacity, Image, ScrollView, Text } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native-paper";
import { CategoriesContext } from "../../../services/categories/categories.context";
import { ProductsContext } from "../../../services/products/products.context";
import { ProductList, SelectButton } from "../../products/components/product-card.styles";
import { FadeInView } from "../../../components/animations/fade.animation";
import { ProductInfoCard } from "../../products/components/product-card.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { ProductsCol } from "../../products/components/products-col.component";
import { WidthPercent } from "../../../utils/env";
import { productTypeEnum } from "../../../infrastructure/models/enums";
import { standardcolors } from "../../../infrastructure/theme/colors";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const CategoryProductsScreen = ({ route, navigation }) => {

    // console.log("CategoryProductsScreen", navigation);

    var params = route.params;
    var categoryId = params.categoryId;
    var categoryName = params.categoryName;

    //console.log("CategoryProductsScreen", categoryName);

    const { isLoading: isCategoriesLoading, categories, error: categoriesError } = useContext(CategoriesContext);
    const { isLoading: isProductsLoading, products: products, error: productsError, onGetProducts } = useContext(ProductsContext);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
    }, []);

    useEffect(() => {
        onGetProducts(productTypeEnum.Product, -1, -1, categoryId, '');
        setIsLoading(false);
        //console.log("CategoryProductsScreenProds: ", products);
    }, [categoryId]);

    // useEffect(() => {
    //     //onGetProductsByCategory(categoryId);
    //     console.log("giftObject: ", giftObject);
    // }, [giftObject]);

    return (
        <>
            <Text>{isLoading}</Text>
            {(isProductsLoading || isLoading) && (
                <LoadingContainer>
                    <Loading size={50} animating={true} color={standardcolors.blue300} />
                </LoadingContainer>
            )}
            {productsError && (
                <Spacer position="left" size="large">
                    <Text variant="error">Something went wrong retrieving the product data</Text>
                </Spacer>
            )}

            {!(isProductsLoading || isLoading) && products && (
                <>
                    <TouchableOpacity
                        style={{ backgroundColor: 'white', paddingTop: 10, marginTop: 0 }}
                        onPress={() =>
                            //navigation.setParams({"x":1})
                            navigation.navigate("categoryAmazonStack", { keyword: categoryName, isagift: false }, navigation)
                        }
                    >
                        <Image source={require('../../../../assets/Shop-Now-on-Amazon-button.png')} style={{ width: (WidthPercent(60)), height: (WidthPercent(15)), alignSelf: 'center', padding: 0, margin: 0 }} resizeMode={"contain"} />
                    </TouchableOpacity>
                    <ScrollView nestedScrollEnabled={true}>
                        <ProductsCol products={products.result} variant="col3" variantCover="col3Cover" navigation={navigation} />
                    </ScrollView>
                </>
            )}
        </>
    );
};
