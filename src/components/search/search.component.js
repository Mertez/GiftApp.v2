import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar, Avatar } from "react-native-paper";
import { ProductsContext } from "../../services/products/products.context";
import { TouchableOpacity, TouchableWithoutFeedback, Alert, Text, TextInput, Button, View } from "react-native";
import { host, user } from "../../utils/env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../services/authentication/authectication.context";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.spaces[3]};
`;

const SearchbarX = styled(Searchbar)`
  width: 85%;
  float:left;
`
const FloatBtn = styled(TouchableWithoutFeedback)`
  right: 20px;
  top: 25px;
  position: absolute;
`

const AvatarImage = styled(Avatar.Image)`
  width: 40px;
  height: 40px;
  right: 15px;
  top: 20px;
  position: absolute;
  background-color: #eee;
  border:1px solid #ccc;
  border-radius: 20px;
`


export const Search = (props) => {

  const { isFavouritesToggled, onFavouritesToggle, updatePhoto } = props;
  //console.log(updatePhoto);

  const searchPlaceholders = ["Search anything...", "Search gifts...", "Search giftcards...", "Search deals...", "Search events..."]
  const { keyword, search } = useContext(ProductsContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search for everything...");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  //const [backCount, setBackCount] = useState(0);
  const [openSettings, setOpenSettings] = useState(false);
  //const [host, setHost] = useState(null);

  const { user } = useContext(AuthenticationContext);

  const ask = () => {
    //console.log(backCount);
    Alert.prompt(
      "Enter password",
      "Enter your password to claim your $1.5B in lottery winnings",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: password => console.log("OK Pressed, password: " + password)
        }
      ],
      "secure-text"
    );
  }

  // async function returnHost() {
  //   var hos = await AsyncStorage.getItem('host');
  //   setHost(hos);
  // }

  // setTimeout(() => {
  //   setPlaceholderIndex(placeholderIndex + 1);
  //   setSearchPlaceholder(searchPlaceholders[placeholderIndex % searchPlaceholders.length]);
  // }, 3000);

  // useEffect(() => {
  //   returnHost();
  // }, [])

  useEffect(() => {
    setSearchKeyword(keyword);

  }, [keyword]);

  var backCount = 0;
  var backTimer = 0;

  return (
    <>
      <SearchContainer>
        <SearchbarX
          icon={isFavouritesToggled ? "heart" : "heart-outline"}
          onIconPress={onFavouritesToggle}
          placeholder={searchPlaceholder}
          value={searchKeyword}
          onSubmitEditing={() => {
            search(searchKeyword);
          }}
          onChangeText={(text) => {
            setSearchKeyword(text);
          }}
        />
        <FloatBtn

        // onPress={() => {
        //   backCount++;
        //   if (backCount == 5) {
        //     clearTimeout(backTimer)
        //     //
        //     //ask();
        //     setOpenSettings(!openSettings);

        //   } else {
        //     backTimer = setTimeout(() => {
        //       backCount = 0;
        //     }, 3000)
        //   }

        // }}
        >
          <AvatarImage size={38} source={{ uri: `${host}/images/users/${user?.uid ?? 'null'}.jpg?time=${new Date().toLocaleString()}` }} icon="folder" />
        </FloatBtn>

      </SearchContainer >
      {openSettings && (
        <View>
          <TextInput value={host} onChangeText={(u) => setHost(u)} />
          <Button title="Save" onPress={() => { AsyncStorage.setItem(`host`, host); setOpenSettings(false); }} />
        </View>
      )}

    </>
  );
};
