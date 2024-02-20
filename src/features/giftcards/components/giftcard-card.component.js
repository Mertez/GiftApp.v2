import React from "react";
import { SvgXml } from "react-native-svg";
import { View, Image, StyleSheet } from "react-native";
import { standardcolors } from "../../../infrastructure/theme/colors";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { host, WidthPercent } from "../../../utils/env";

import {
    GiftCardCard,
    GiftCardCardCover,
    Info,
    Section,
    SectionEnd,
    Rating,
    Icon,
    Address,
    styles
} from "./giftcard-card.styles";
import styled from "styled-components";

const CenterdCard = styled(View)`
    text-align:center;
    width: ${WidthPercent(30, -10)}px;
    float:left;
    align-items: center;
`
const Centerd = styled(View)`
    text-align:center;
    
`

export const GiftCardInfoCard = ({ giftcard = {} }) => {
    const {
        name = "",
        icon = "",
        brand = "",
        price = 0
    } = giftcard;



    //const ratingArray = Array.from(new Array(Math.floor(rating)));
    //var icon = `../../../../assets/giftcards/${photo}`;
    //const icon = "../../../../assets/gcs/" + photo;

    //console.log(photo);
    return (
        <CenterdCard>
            <GiftCardCardCover source={{ uri: `${host}/images/giftcards/${icon}` }} elevation={4} style={styles.shadow} />
            <Centerd>
                <Text variant="caption" style={{ textAlign: "center", color: 'black' }}>{name}</Text>
                <Text variant="caption" style={{ textAlign: "center", color: 'gray' }}>{brand}</Text>
                <Text variant="caption" style={{ textAlign: "center", color: 'red' }}>${price}</Text>
            </Centerd>

        </CenterdCard>

        // <GiftCardCard elevation={2}>
        //     <View>
        //         {/* <Favourite restaurant={restaurant} /> */}
        //         {/* <GiftCardCardCover key={name} source={require(`../../../../assets/giftcards/${photo}`)} /> */}
        //         <GiftCardCardCover source={photo} />
        //     </View>
        //     <Info>
        //         <Section>
        //             <Rating>
        //                 {/* {ratingArray.map((_, i) => (
        //                     <SvgXml
        //                         key={`star-${name}-${i}`}
        //                         xml={star}
        //                         width={20}
        //                         height={20}
        //                     />
        //                 ))} */}
        //             </Rating>
        //             <SectionEnd>
        //                 <Text>{platform}</Text>
        //                 <Text>${price}</Text>
        //                 {/* {isClosedTemporarily && (
        //                     <Text variant="error">CLOSED TEMPORARILY</Text>
        //                 )}
        //                 <Spacer position="left" size="large">
        //                     {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
        //                 </Spacer> */}
        //                 {/* <Spacer position="left" size="large">
        //                     <Icon source={{ uri: icon }} />
        //                 </Spacer> */}
        //             </SectionEnd>
        //         </Section>
        //         {/* <Address>{name}</Address> */}
        //     </Info>
        // </GiftCardCard>
    );
};
