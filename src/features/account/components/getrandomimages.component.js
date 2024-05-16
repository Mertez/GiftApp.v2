import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import { UserIconsF, UserIconsT } from '../userPhotos';


const ImageContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: 10px 10px 90px 10px;
`;

const UserImage = styled.Image`
    width: 80px;
    height: 80px;
    margin: 5px;
    border-radius: 40px;
`;

const getRandomImages = () => {
    const allImages = Object.values(UserIconsT);
    const numberOfImages = Math.floor(Math.random() * 8) + 1; // Random number between 0 and 8
    const shuffledImages = allImages.sort(() => 0.5 - Math.random());
    return shuffledImages.slice(0, numberOfImages);
};

export const RandomImagesComponent = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(getRandomImages());
    }, []);

    return (
        <ImageContainer>
            {images.map((image, index) => (
                <UserImage key={index} source={image} />
            ))}
        </ImageContainer>
    );
};
