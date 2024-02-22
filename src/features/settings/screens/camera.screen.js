import React, { useState, useRef, useEffect, useContext } from 'react';
import { Camera, CameraType } from 'expo-camera';
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

const ProfileCamera = styled(Camera)`
        width: 100%;
        height: 100%;
        flex: 1;
    `;

export const CameraScreen = ({ navigation }) => {

    const [type, setType] = useState(CameraType.front);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [hasPermission, setHasPermission] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const { user } = useContext(AuthenticationContext);

    const cameraRef = useRef();


    const snap = async () => {
        //console.log(cameraRef.current);
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true, skipProcessing: true, aspect: [1, 1], allowsEditing: true };
            const data = await cameraRef.current.takePictureAsync(options);
            const source = data.uri;
            if (source) {
                //await cameraRef.current.pausePreview();
                //setIsPreview(true);
                //console.log("picture", data);
                //console.log("user", user.userId);
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

    useEffect(() => {
        (async () => {

            console.log(type);
            console.log(cameraRef);

            const { status } = await Camera.requestCameraPermissionsAsync();
            console.log(status);

            setHasPermission(status === 'granted');
            console.log(hasPermission);

            console.log(error);

        })();
    }, []);

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <View style={{ flex: 1 }}>

            <Camera
                style={{ flex: 1 }}
                type={type}
                ref={cameraRef}
                onCameraReady={onCameraReady}
                onMountError={(error) => {
                    console.error("camera error", error);
                }}
            >
                <FadeInView style={{ flex: 1 }} duration={1000}>
                    <Row>

                        <Btn mode="contained" textColor={"white"}
                            onPress={() => { navigation.goBack(); }} >
                            {/* <Text variant="label" style={{ color: standardcolors.black }}>Cancel</Text> */}
                            <CameraIcon source={require("../../../../assets/cc.png")} />
                        </Btn>
                        <Btn mode="contained" textColor={null} style={{ backgroundColor: '#ff000099', paddingLeft: 20, paddingRight: 20 }}
                            onPress={snap} >
                            {/* <Text variant="label" style={{ color: standardcolors.white }}>Shoot</Text> */}
                            <CameraIcon source={require("../../../../assets/cs.png")} />
                        </Btn>
                        <Btn mode="contained" textColor={"white"}
                            onPress={toggleCameraType} >
                            {/* <Text variant="label" style={{ color: standardcolors.black }}>Rotate</Text> */}
                            <CameraIcon source={require("../../../../assets/cr.png")} />
                        </Btn>

                    </Row>
                </FadeInView>
            </Camera>
        </View >
    );
}