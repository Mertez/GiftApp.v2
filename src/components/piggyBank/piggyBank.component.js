import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar, Avatar } from "react-native-paper";
import { ProductsContext } from "../../services/products/products.context";
import { TouchableOpacity, TouchableWithoutFeedback, Alert, TextInput, Button, View, Image } from "react-native";
import { host, user, WidthPercent } from "../../utils/env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../services/authentication/authectication.context";
import { WishesContext } from "../../services/wishes/wishes.context";
import { ActivityIndicator, ProgressBar, MD3Colors } from "react-native-paper";
import { Row } from "../../features/gifts/components/gift-info-card.styles";
import { Text as Txt } from "../typography/text.component";
import { standardcolors } from "../../infrastructure/theme/colors";

const Text = styled(Txt)`
  color: black;
`

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const PiggyBankContainerFull = styled.View`
  border-radius: 20px;
  border: 6px solid #ff7bac;
  width: ${WidthPercent(100, -20)}px;
  margin: 10px 10px;
  padding: 10px;
  background-color: #ff7bac4f;
`

const PiggyBankContainer = styled.View`
  border-radius: 0px;
  border: 0px solid #ff7bac;
  //width: ${WidthPercent(100, -70)}px;
  margin: 0px 0px 0px 0px;
  padding: 5px 60px 10px 0px;
  background-color: ${standardcolors.white};
`

const Line = styled(Row)`
  justify-content: space-between;
  line-height: 120%;
`
const W30 = styled.View`
  width: 16%;
  overflow: visible;
`
const W50 = styled.View`
  width: 50%;
  overflow: visible;
`
const W70 = styled.View`
  width: 84%;
  overflow: visible;
`
const PiggyBankIconFull = styled(Image)`
  height:120px;
  margin:auto;  
  overflow: visible;
`
const PiggyBankIcon = styled(Image)`
  height:40px;
  margin:auto;  
  overflow: visible;
`

const PiggyProgressBarFull = styled(ProgressBar)`
  margin: 10px 0px;
  height: 20px;
  border-radius: 10px;
  border: 3px solid  #ff7bac;
`

const PiggyProgressBar = styled(ProgressBar)`
  margin: 5px 0px;
  height: 10px;
  border-radius: 10px;
  border: 2px solid  #ff7bac;
`

export const PiggyBank = ({ refreshing, onRefreshingFinished, variant }) => {

  //console.log(refreshing);

  const [refreshCount, setRefreshCount] = useState(0);
  const { isLoading: isPiggyBankLoading, piggyBank, error: piggyBankError, onGetPiggyBank } = useContext(WishesContext);

  useEffect(() => {

    if (!isPiggyBankLoading)
      onRefreshingFinished();

  }, [isPiggyBankLoading]);

  useEffect(() => {

    if (refreshing)
      setRefreshCount(refreshCount + 1);

  }, [refreshing]);

  useEffect(() => {
    onGetPiggyBank();

  }, [refreshCount]);

  // var backCount = 0;
  // var backTimer = 0;

  if (variant == "full") {
    return (
      <>

        {/* {isPiggyBankLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )} */}
        {piggyBank && (
          <>
            <PiggyBankContainerFull>
              <Row>
                <W50>
                  <PiggyBankIconFull source={require('../../../assets/piggybank1.png')} style={{ width: WidthPercent(40), marginLeft: 0 }} resizeMode='contain' />
                </W50>
                <W50>
                  <Text variant="title">Piggy Bank Status</Text>
                  {/* <Text>wishMoneyAmount: {piggyBank.wishMoneyAmount}</Text>
              <Text>Total wished: {piggyBank.wishMoneyCredit}</Text>
              <Text>wishMoneyRemaining: {piggyBank.wishMoneyRemaining}</Text>
              <Text>piggyPaymentsCount: {piggyBank.piggyPaymentsCount}</Text> */}
                  <Line><Text>Total:</Text><Text>${piggyBank.piggyBank}</Text></Line>
                  <Line><Text>SelfPaid:</Text><Text>${piggyBank.piggyBankSelfPaid}</Text></Line>
                  <Line><Text>Gift:</Text><Text>${piggyBank.piggyBankGifted}</Text></Line>
                  <PiggyProgressBarFull progress={Math.round(100 * piggyBank.piggyBankSelfPaid / piggyBank.piggyBank) / 100} color='white' />
                </W50>
              </Row>

            </PiggyBankContainerFull>
            {/* <PaymentComponent /> */}
          </>
        )}

      </>
    );
  } else {
    return (
      <>

        {/* {isPiggyBankLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )} */}
        {piggyBank && (
          <>
            <PiggyBankContainer>
              <Row>
                <W30>
                  <PiggyBankIcon source={require('../../../assets/piggybank1.png')} style={{ width: WidthPercent(6), marginLeft: 10 }} resizeMode='contain' />
                </W30>
                <W70>
                  <Line><Text>Total:</Text><Text>${piggyBank.piggyBank}</Text></Line>
                  <PiggyProgressBar progress={Math.round(100 * piggyBank.piggyBankSelfPaid / piggyBank.piggyBank) / 100} color='white' />
                </W70>
              </Row>

            </PiggyBankContainer>
            {/* <PaymentComponent /> */}
          </>
        )}

      </>
    );
  }
};
