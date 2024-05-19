import React, { useState, useEffect } from 'react';
import { View, Image, Text, SafeAreaView, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { UserIconsF, UserIconsT } from '../userPhotos';
import { formatCurrency } from '../../../utils/env';


const UserImageContainer = styled.View`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin:10px;
`;

const UserImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 40px;
`;

const Badge = styled.View`
  position: absolute;
  bottom: -5px;
  right: -5px;
  background-color: #FF6347AA;
  padding: 5px 10px;
  border-radius: 10px;
`;

const BadgeText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

export const UserImageWithBadge = ({ person }) => {
    var key = person.person;
    return (
        <UserImageContainer>
            <UserImage key={'UserImageX' + key} source={person.person} />
            <Badge>
                <BadgeText key={'TextX' + key}>{formatCurrency(person.amount)}</BadgeText>
            </Badge>
        </UserImageContainer>
    )
}