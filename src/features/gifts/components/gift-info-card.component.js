import React from "react";
import { StyleSheet, View, SafeAreaView, Platform, StatusBar } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
// import { Spacer } from "@react-native-material/core";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { star, starOff, opens } from "../../../../assets/icons";
import {
    CardTitle, CardContent, Cardx, CardCover,
    OpenMD, OpenSM, Row, Section,
    SectionEnd, SectionStart, Star, AvatarIcon
} from "./gift-info-card.styles";
import { Favourite } from "../../../components/favourites/favourite.component";

export const giftInfoCard = ({ gift = {}, showButtons = false }) => {
    const {
        name = "Sample gift",
        icon = "food",
        //photoz = ["https://lotipoints.com/wp-content/uploads/2020/11/DSC03947.jpg", "https://lotipoints.com/wp-content/uploads/2021/03/loti-sultanahmet.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/loti1-1-copy.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/lotiz-3.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/IMG_2331.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/IMG_2322.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/IMG_2316.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/IMG_2258.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/DSC04139.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/DSC04081.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/DSC03989.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/DSC03981.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/DSC03973.jpg", "https://lotipoints.com/wp-content/uploads/2020/11/DSC03947.jpg", "https://lotipoints.com/wp-content/uploads/2021/03/loti-sultanahmet.jpg"],
        photos = [],
        address = "Sultan Ahmet, Divan Yolu Cd. No:27, 34112 Fatih/İstanbul",
        openingHours = "Everyday 08:00 until 02:00",
        isOpenNow = true,
        rating = 4.9,
        isClosedTemporarily = true,
        placeId
    } = gift;


    const ceilRate = Math.round(rating);
    const ratingArray = Array.from(new Array(ceilRate));
    const ratingOffArray = Array.from(new Array(5 - ceilRate));
    const OpenSMIcon = props => <>{isClosedTemporarily ? (<Spacer position="right" size="none" ><Spacer position="bottom" size="none"><Text variant="warning">Closed Temporary!</Text></Spacer ></Spacer>) : (<></>)}
        {/* <OpenSM xml={isOpenNow ? opens : null} /> */}
    </>;
    const OpenMDIcon = props => <OpenSM xml={(isOpenNow && !isClosedTemporarily) ? opens : null} />;
    const LeftContent = props => <AvatarIcon {...props} icon={icon} />
    //const rand = Math.floor(Math.random() * photos.length);
    const rand = (50 - (rating * 10));
    return (<>

        <Cardx elevation={2}>
            <CardTitle title={name} subtitle={openingHours} left={LeftContent} right={OpenMDIcon} />
            <CardContent>

                {/* <Text variant="title">{name}</Text> */}
                <Text variant="caption">{address}</Text>
                <Spacer position="top" size="sm" >
                    <Section>
                        <Spacer position="bottom" size="sm">
                            <Row>
                                {ratingArray.map((item, index) => (
                                    <Star xml={star} key={`${placeId}-${index}`} />
                                ))}
                                {ratingOffArray.map((item, index) => (
                                    <Star xml={starOff} key={`${placeId}-${10 - index}`} />
                                ))}
                            </Row>
                        </Spacer>
                        <SectionEnd>
                            <OpenSMIcon />
                        </SectionEnd>
                    </Section>
                </Spacer>
            </CardContent>

            <CardCover source={{ uri: photos[0] }} /><Favourite gift={gift} />
            {(showButtons) ?
                <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions> : <></>}
        </Cardx>
    </>)
}