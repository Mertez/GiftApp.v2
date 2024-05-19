import React, { useState, useEffect } from 'react';
import { View, Image, Text, SafeAreaView, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { UserIconsF, UserIconsT } from '../userPhotos';
import { formatCurrency } from '../../../utils/env';
import { UserImageWithBadge } from './userimagewithbadge.component';


// const ImageContainer = styled.View`
//     flex-direction: row;
//     flex-wrap: wrap;
//     justify-content: center;
//     margin: 10px 10px 90px 10px;
// `;

// const UserImage = styled.Image`
//     width: 80px;
//     height: 80px;
//     margin: 5px;
//     border-radius: 40px;
// `;

// const Badge = styled.View`
//     top:150px;
//     left:-10px;
//     background-color:gray;
//     padding:5px;
//     margin:0;
//     line-height:20px;
//     height:28px;
//     border-radius: 8px;
// `;

const UserImageContainer = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const HorizontalFlatList = styled(FlatList).attrs({
    contentContainerStyle: { paddingHorizontal: 10 },
})`
    width: 100%;
`;


const getRandomImages = () => {
    const allImages = Object.values(UserIconsT);
    const numberOfImages = Math.floor(Math.random() * 8) + 1; // Random number between 0 and 8
    const shuffledImages = allImages.sort(() => 0.5 - Math.random());

    var imgs = shuffledImages.slice(0, numberOfImages);
    //console.log("images", imgs[0]);
    return imgs;
};


const getRandomUsers = (totalAmount) => {

    var randomPeople = getRandomImages();


    const randomValues = [];
    let sum = 0;

    // Generate random values for each person
    for (let i = 0; i < randomPeople.length; i++) {
        const randomValue = Math.random();
        randomValues.push(randomValue);
        sum += randomValue;
    }

    // Normalize the random values so their sum matches the total amount
    const normalizedValues = randomValues.map(value => (value / sum) * totalAmount);

    // Adjust values to ensure each person gets more than 0
    const minAmount = 0.01; // Minimum amount each person should get
    let adjustedValues = normalizedValues.map(value => Math.max(value, minAmount));

    // Ensure the total sum is correct after adjustment
    let adjustedSum = adjustedValues.reduce((acc, value) => acc + value, 0);
    let diff = totalAmount - adjustedSum;

    // Distribute the remaining amount randomly
    while (diff > 0) {
        for (let i = 0; i < randomPeople.length; i++) {
            if (diff <= 0) break;
            adjustedValues[i] += minAmount;
            diff -= minAmount;
        }
    }

    // Assign the adjusted values to each person
    const newPeople = randomPeople.map((person, index) => ({
        person: person,
        amount: adjustedValues[index].toFixed(2), // Round to 2 decimal places
    }));

    //console.log("newPeople", newPeople);
    return newPeople;
};

export const RandomImagesComponent = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(getRandomImages());
    }, []);

    return (
        <ImageContainer>
            {images.map((image, index) => (
                <>
                    <UserImage key={'UserImage_' + index} source={image} />
                    <Text key={'Text_' + index}>{image}</Text>
                </>
            ))}
        </ImageContainer>
    );
};



export const RandomPersonComponent = ({ totalAmount }) => {
    // const [people, setPeople] = useState([]);

    // useEffect(() => {
    //     setPeople(getRandomUsers(totalAmount));
    // }, []);

    people = getRandomUsers(totalAmount);
    console.log(people);
    return (
        <UserImageContainer>
            <HorizontalFlatList
                data={people}
                horizontal
                keyExtractor={(item) => item.person}
                renderItem={({ item }) => (
                    <UserImageWithBadge person={item} />
                )}
            />
        </UserImageContainer>
    );
};
