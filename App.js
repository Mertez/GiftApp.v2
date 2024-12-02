import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, Platform, StatusBar } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Navigation } from "./src/infrastructure/navigation";
import { useFonts as useOswald, Oswald_400Regular, Oswald_700Bold } from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import { useFonts as useRobotoMono, RobotoMono_400Regular, RobotoMono_700Bold } from "@expo-google-fonts/roboto-mono";

import { AuthenticationContextProvider } from "./src/services/authentication/authectication.context";
import { IgnoreWarnings, HeightPercent } from "./src/utils/env";
import { GlobalContextProvider } from "./src/GlobalVariables";
import Toast from 'react-native-toast-message';
//import { AppBackground } from "./src/features/account/components/account.styles";


const isAndroid = Platform.OS === "android";

const SafeArea = styled(SafeAreaView)`
  width:100%;
  height:100%;
  margin:0px;
  padding:0px;
`;


const SafeArea2 = styled(SafeAreaView)`
  ${isAndroid ? "flex: 1" : ""};
  margin-top: ${isAndroid ? StatusBar.currentHeight : 0}px;
  margin-top: 0px;
  margin-bottom: 0px;
`;

export default function App() {

  IgnoreWarnings();

  const [oswaldLoaded] = useOswald({ Oswald_400Regular, Oswald_700Bold });
  const [latoLoaded] = useLato({ Lato_400Regular, Lato_700Bold });
  const [robotoMonoLoaded] = useRobotoMono({ RobotoMono_400Regular, RobotoMono_700Bold });
  const [isAuthenticated, setIsAuthencticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isToggled, setIsToggled] = useState(false);


  const [hostState, setHostState] = useState(null);

  const getAHostInfoAsync = async () => {
    const hostInfo = AsyncStorage.getItem('host').then((info) => {
      //console.log("hostInfo:", info);
      setHostState(info);
      module.exports = {
        host: info
      };
    });
  };

  useEffect(() => {
    getAHostInfoAsync();
  }, []);

  module.exports = {
    host: hostState
  };


  const SignInUser = () => {
    //console.log(email, password);
    signInWithEmailAndPassword(authentication, email, password)
      .then((res) => {
        setIsAuthencticated(true);
        //alert(res);
      }).catch((res) => {
        setIsAuthencticated(false);
        console.error(res);
      });

  };

  const SignOutUser = () => {
    //console.log(email, password);
    signOut(authentication)
      .then((res) => {
        setIsAuthencticated(false);
      }).catch((res) => {
        setIsAuthencticated(false);
        console.error(res);
      });

  };

  const RegisterUser = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((res) => {
        //console.log(res);
      });
  };




  if (!oswaldLoaded || !latoLoaded || !robotoMonoLoaded) {

    return <Text style={{ textAlign: 'center', verticalAlign: 'middle' }}>Loading...</Text>;
  } else {
    console.log(Platform.OS);
    return (
      <>
        {/* <CompactWebview source={{ uri: "http://192.168.2.104:5001/GiftApp-83239/us-central1/geocode?city=antwerp&v=3" }} /> */}
        {/* <AppBackground></AppBackground> */}
        <SafeArea>
          <GlobalContextProvider>
            <ThemeProvider theme={theme}>
              <AuthenticationContextProvider>
                <Navigation >
                  <Toast ref={(ref) => Toast.setRef(ref)} />
                </Navigation>
              </AuthenticationContextProvider>
            </ThemeProvider>
          </GlobalContextProvider>
        </SafeArea>
        <StatusBar style="auto" />
      </>
    );
  }
}