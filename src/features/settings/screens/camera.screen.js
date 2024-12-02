import React, { useState, useRef, useEffect, useContext } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { View, Image } from 'react-native';
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../services/authentication/authectication.context";
import { Button } from "react-native-paper";
import { WidthPercent } from "../../../utils/env";
import { postFile } from "../../../infrastructure/data/apiCalls";
import ApiRoutes from '../../../infrastructure/data/apiRoutes';
import { FadeInView } from "../../../components/animations/fade.animation";
import { Text } from 'react-native-paper';
import { styles } from '../../giftcards/components/giftcard-card.styles';

const Row = styled.View`
    width: 100%;
    margin: auto auto 20px auto;
    bottom: 80px;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
`;

const Btn = styled(Button)`
  //margin:0;
  padding:5px 10px;
  margin-left: ${WidthPercent(5)}px;
  margin-right: ${WidthPercent(5)}px;
  background-color: #00000066;
  //border: 1px solid red;
  border-radius: 10px;
`;

const CameraIcon = styled(Image)`
    width: 25px;
    height:25px;
`;

const ProfileCamera = styled(CameraView)`
        width: 100%;
        height: 100%;
        flex: 1;
    `;

export const CameraScreen = ({ navigation }) => {

    const [cameraType, setCameraType] = useState('front');
    const [permission, requestPermission] = useCameraPermissions();
    const [isCameraReady, setIsCameraReady] = useState(false);
    const { user } = useContext(AuthenticationContext);

    const cameraRef = useRef();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 50, marginBottom: 20 }}>We need your permission to show the camera</Text>
                <Button background={'#4488CC'} textColor='white' style={{ backgroundColor: '#4488CC', margin: 'auto', width: '50%', }} onPress={requestPermission}>Grant Permission</Button>
            </View>
        );
    }



    const snap = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true, skipProcessing: true, aspect: [1, 1], allowsEditing: true };
            const data = await cameraRef.current.takePictureAsync(options);
            const source = data.uri;
            if (source) {
                AsyncStorage.removeItem(`${user.userId}-photo`);
                AsyncStorage.setItem(`${user.userId}-photo`, source);

                postFile(ApiRoutes.uploadUserPicture, source, `${user.userId}.jpg`, 'image/jpg');
            } else {
                return <Text>Not Source</Text>
            }
            navigation.navigate("Setting", { 'updatePhoto': 1 });
        } else {
            return <Text>cameraRef.current</Text>
        }
    };

    const onCameraReady = () => {
        setIsCameraReady(true);
    };

    // useEffect(() => {
    //     (async () => {
    //         const { status } = await requestPermission();
    //         setHasPermission(status === 'granted');
    //     })();
    // }, []);

    function toggleCameraType() {
        setCameraType(current => (current === 'back' ? 'front' : 'back'));
    }

    // if (permission === null || !hasPermission) {
    //     return <View />;
    // }

    return (
        <View style={{ flex: 1 }}>
            <CameraView
                style={{ flex: 1 }}
                facing={cameraType}
                ref={cameraRef}
                onCameraReady={onCameraReady}
                onMountError={(error) => {
                    console.error("camera error", error);
                }}
            >
                <FadeInView style={{ flex: 1 }} duration={1000}>
                    <Row>
                        <Btn mode="contained" textColor={"white"} onPress={() => { navigation.goBack(); }} >
                            <CameraIcon source={require("../../../../assets/cc.png")} />
                        </Btn>
                        <Btn mode="contained" textColor={null} style={{ backgroundColor: '#ff000099', paddingLeft: 20, paddingRight: 20 }} onPress={snap} >
                            <CameraIcon source={require("../../../../assets/cs.png")} />
                        </Btn>
                        <Btn mode="contained" textColor={"white"} onPress={toggleCameraType} >
                            <CameraIcon source={require("../../../../assets/cr.png")} />
                        </Btn>
                    </Row>
                </FadeInView>
            </CameraView>
        </View>
    );
}