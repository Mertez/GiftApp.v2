import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { colors, standardcolors } from "../../../infrastructure/theme/colors";
import { ProductsContext } from "../../../services/products/products.context";


const SearchContainer = styled(View)`
  // background-color: ${standardcolors.white};
  padding: ${(props) => props.theme.spaces[3]};
`;


export const Search = ({ hasFavourites, isFavouritesToggled, onFavouritesToggle }) => {
    //console.log("1. Search");
    //const locationContext = useContext(LocationContext);
    const { keyword, search } = useContext(ProductsContext);
    const [searchKeyword, setSearchKeyword] = useState(keyword);

    // useEffect(() => {
    //     search(searchKeyword);
    // }, []);

    // useEffect(() => {
    //     setSearchKeyword(keyword);
    // }, [keyword]);

    return (
        <SearchContainer>
            <Searchbar
                icon={hasFavourites ? (isFavouritesToggled ? "heart" : "heart-outline") : null}
                onIconPress={hasFavourites ? onFavouritesToggle : null}
                placeholder="Search for ..."
                value={searchKeyword}
                style={{
                    backgroundColor: standardcolors.white,
                    marginBottom: 0,
                    paddingBottom: 0,
                    width: "100%"
                }}
                onSubmitEditing={() => {
                    //console.log("search.component onSubmitEditing: ", searchKeyword);
                    search(searchKeyword);
                }}
                onChangeText={(text) => {
                    // if(!text.length){
                    //     return;
                    // }
                    //console.log("search.component onChangeText: ", text);
                    setSearchKeyword(text);
                }}
            />
        </SearchContainer>
    );
};
