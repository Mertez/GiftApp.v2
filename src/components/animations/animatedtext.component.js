import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';

export const AnimatedText = () => {
    const animationValues = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];

    useEffect(() => {
        const animate = (index) => {
            Animated.sequence([
                Animated.timing(animationValues[index], {
                    toValue: .8,
                    duration: 100,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
                Animated.timing(animationValues[index], {
                    toValue: 1,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
                Animated.timing(animationValues[index], {
                    toValue: .8,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
                Animated.timing(animationValues[index], {
                    toValue: 0,
                    duration: 100,
                    easing: Easing.linear,
                    useNativeDriver: false,
                })
            ]).start(() => {
                animate((index + 1) % 4);
            });
        };
        animate(0);
    }, [animationValues]);

    const interpolateColor = (animationValue) => {
        return animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['#9900CC40', '#9900CCFF'],
        });
    };

    return (
        <View style={styles.container}>
            {animationValues.map((animValue, index) => (
                <Animated.Text
                    key={index}
                    style={[styles.text, { color: interpolateColor(animValue) }]}
                >
                    ▶
                </Animated.Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
    },
    text: {
        fontWeight: 700,
        fontSize: 18,
        marginHorizontal: 3,
    },
});
