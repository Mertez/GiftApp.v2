import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import { CompactgiftInfo } from "../../gifts/components/compact-gift-info.component";

const CalloutText = styled.Text`
    color:red;
`;

export const MapCallout = ({ gift }) => {
    return (
        <CompactgiftInfo gift={gift} ></CompactgiftInfo>
    )
}