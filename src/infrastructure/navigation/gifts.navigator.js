import React from "react";
import { IgnoreWarnings } from "../../utils/env";
import { Text } from "../../components/typography/text.component";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { GiftsScreen } from "../../features/gifts/screens/gifts.screen";
import { CategoryProductsScreen } from "../../features/categories/screens/category-products.screen";
import { CategoriesAmazon } from "../../features/categories/screens/categories-amz.screen";
import { ProductDetailScreen } from "../../features/products/screens/product-detail.screen";
import { isAndroid } from "../../utils/env";
import { GiftAddConfirm } from "../../features/gifts/screens/gift-add-confirm.screen";
import { PaymentComponent } from "../../features/payment/components/payment.component";
import { CameraScreen } from "../../features/settings/screens/camera.screen";
import { MainAppFeature } from "../../components/animations/mainappfeature.component";

const giftsStack = createStackNavigator();

export const GiftsNavigator = (navigation) => {

    IgnoreWarnings();

    //console.log(props);
    return (
        <giftsStack.Navigator
            screenOptions={isAndroid ? {
                ...TransitionPresets.ScaleFromCenterAndroid,
                headerShown: true,
            } : {
                ...TransitionPresets.ModalPresentationIOS,
                headerShown: true,
            }}
        >
            <giftsStack.Screen
                name="giftsMain"
                options={{ title: 'Gifts 🎁', headerShown: false }}
                component={GiftsScreen}
            />
            <giftsStack.Screen
                options={({ route }) => ({ title: `${route.params.categoryName} Gifts`, headerShown: true })}
                name="categoryProductStack"
                component={CategoryProductsScreen}
            />
            <giftsStack.Screen
                //options={({ route }) => ({ title: `${route.params.categoryName} Amazon` })}
                options={{ title: 'Amazon 🛍️', headerShown: isAndroid }}
                name="categoryAmazonStackGift"
                component={CategoriesAmazon}
            />
            <giftsStack.Screen
                //options={({ route }) => ({ title: `${route.params.categoryName} Gift Add` })}
                options={{ title: 'Back to AMZ', headerShown: true }}
                name="giftAddConfirmStack"
                component={GiftAddConfirm}
            />
            <giftsStack.Screen
                options={({ route }) => ({ title: `${route.params.product.name}` })}
                name="productDetailStack"
                component={ProductDetailScreen}
            // options={{
            //     header: ({ navigation }) => (
            //         <Header {...{ navigation }} backScreen={giftsMain} />
            //     ),
            // }}
            />
            <giftsStack.Screen
                options={({ route }) => ({ title: `Payment` })}
                name="CreditCardPaymentStack"
                component={PaymentComponent} />
            <giftsStack.Screen name="Camera" component={CameraScreen} options={({ route }) => ({ title: `Profile Photo` })} />
            <giftsStack.Screen name="MainAppFeature" component={MainAppFeature} options={{ headerShown: true, title: 'Future option' }} />
        </giftsStack.Navigator>
    );
};
