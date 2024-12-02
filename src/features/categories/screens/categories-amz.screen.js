import React, { useEffect, useState, useRef, useContext } from "react";
import { Text as Txt, StyleSheet, SafeAreaView, Platform, TextInput, Button, View, BackHandler, Image, TouchableOpacity } from "react-native";
import { ActivityIndicator, ProgressBar } from "react-native-paper";
import WebView from "react-native-webview";
import styled from 'styled-components';
import { WidthPercent, HeightPercent, isAndroid } from "../../../utils/env";
import LottieView from "lottie-react-native";
import { AmazonContext } from "../../../services/amazon/amazon.context";
import { standardcolors } from "../../../infrastructure/theme/colors";
import { BlurView } from "expo-blur";

//import * as ScreenOrientation from 'expo-screen-orientation';

var btnSize = WidthPercent(20);
btnSize = btnSize > 80 ? 80 : btnSize;
const marginLeft = btnSize / 4;

const Text = styled(Txt)`
  text-align: center;
`

const VLoading = styled(View)`
  background-color: #000000AA;
  height:${1.7 * btnSize}px;
  width: 90%;
  left: 5%;
  opacity: 1;
  position: absolute;
  z-index:99999;
  bottom: ${isAndroid ? "100px" : "40px"};
  border-radius: 15%;
  padding: 3% 30%;
`

const RedText = styled(Txt)`
  text-align: center;
  color:white;
  font-size: ${WidthPercent(5)}px;
  
  letter-spacing: 40px;
  margin-left: ${isAndroid ? 0 : WidthPercent(10)}px;
`

const LoadingIndicator = styled(ActivityIndicator)`
    margin-left: -25px;
    top: ${isAndroid ? HeightPercent(14) : HeightPercent(14)}px;
    left: 50%;
    z-index: 9999;
    position: absolute;
  `

const Vm1 = styled(View)`
  flex:2;
  width:90%;
  margin: auto;
  overflow: visible;
`

const AppLogoFile = require("../../../../assets/icon.png");
const AppLogo = styled(Image)`
  height:90px;
  width: 90px;
  margin: ${isAndroid ? HeightPercent(16) : HeightPercent(15)}px auto 20px;
`

const AmLogoFile = require("../../../../assets/amlogo.png");
const AmLogo = styled(Image)`
  height:28px;
  width: 93px;
  margin: auto;
`
const CheckLogoFile = require("../../../../assets/check.png");
const CheckLogo = styled(Image)`
  height:${btnSize}px;
  width: ${btnSize}px;
`
const TimesLogoFile = require("../../../../assets/times.png");
const TimesLogo = styled(Image)`
  height:${1.1 * btnSize}px;
  width: ${1.1 * btnSize}px;
`
export const LottieCheckLogo = styled(LottieView)`
  height:${2 * btnSize}px;
  width: ${2 * btnSize}px;
  margin: auto -45px -38px;
  opacity: .8;
`
export const LottieTimesLogo = styled(LottieView)`
  height:${btnSize}px;
  width: ${btnSize}px;
  margin: auto auto 20px 20px;
  opacity: .8;
`

export const LottieLoading = styled(LottieView)`
  height:${2.5 * btnSize}px;
  width: ${2.5 * btnSize}px;
  margin: auto -55px -55px;
  opacity: .8;
  position: absolute;
  z-index:99999;
  bottom: ${isAndroid ? "100px" : "80px"};
  right: 7%;
`
const TimesBtn = styled(TouchableOpacity)`
  height:${btnSize}px;
  width: ${btnSize}px;
  margin: auto auto 4px 10px;
  position: absolute;
  z-index:999999;
  bottom: ${isAndroid ? "100px" : "80px"};
  left: 5%;
  opacity: .6;
`

const CheckBtn = styled(TouchableOpacity)`
  height:${btnSize}px;
  width: ${btnSize}px;
  margin: auto;
  position: absolute;
  z-index:99999;
  bottom: ${isAndroid ? "100px" : "80px"};
  right: 7%;
`

const AmLogoContainer = styled(View)`
  position: absolute;
  background-color:#232f3e;
  height:48px;
  width:100%;
  overflow: visible;
  z-index:9999;
  text-align:center;
`

const Vm2 = styled(View)`
  flex:1;
  width:100%;
  overflow: visible;
`
const CompactWebview = styled(WebView)`
    width:100%;
    height:100%;
    flex:1;
    overflow: visible;
`;


const Img = styled(Image)`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin: 10px auto;
`

// async function changeScreenOrientation() {
//     await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
// }

export const CategoriesAmazon = ({ route, navigation }) => {

  var params = route.params;
  var keyword = params.keyword;
  var isAGift = params.isagift;

  //changeScreenOrientation();

  const webViewRef = useRef(null);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [url, setUrl] = useState('');
  const [asin, setAsin] = useState('');
  const [imgSrc, setImgSrc] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checkShow, setCheckShow] = useState(false);
  const ActivityUniqueKey = 'x';

  const { onGetAsinDataRequest, asinData, error: amazonError, isLoading: isAmazonLoading } = useContext(AmazonContext);

  const onAndroidBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true; // prevent default behavior (exit app)
    }
    return false;
  };

  const onAsinDetected = (asi) => {
    //console.log("asin (detected): ", asin);
    //console.log("asi (parameter): ", asi);
    onGetAsinDataRequest(asi);
  }


  useEffect(() => {
    if (asinData) {
      //console.log("asinData: ", asinData);
      //console.log("Amazon Url: ", `https://amazon.com/dp/${asin}`);

      console.log("isAGift AMZ: ", isAGift);
      setImgSrc(asinData.image);
      setTitle(asinData.title);
      setPrice(asinData.price);
      setBrand(asinData.brand);

      setCheckShow(true);
    } else {
      setCheckShow(false);
    }
  }, [asinData]);


  const CompactView = styled(BlurView)`
    ${!isLoading ? "display: none;" : ""};
    width:100%;
    height:100%;
    overflow: visible;
    position: absolute;
    left: 0;
    top:48px;
    z-index:99999;
    background-color: #232f3eA6;
    flex:1;
`;

  useEffect(() => {

    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
      };
    }

  }, []);

  const ProCode = (ev) => {

    //console.log("ev: ", ev);
    //console.log("ProCode: " + ev.url.match(/(?:[/dp/]|$)([A-Z0-9]{10})/));

    if (ev.loading == false) {
      //const url = ev.url.replace("https://www.amazon.com/", "").replace("/aw/d/", "/").replace("/gp/", "/dp/");
      //const words = url.split('/');
      //const index = words.findIndex(o => o === "dp");
      //if (index > -1) {
      if (ev.url.match(/(?:[/dp/]|$)([A-Z0-9]{10})/) != null) {
        var result = ev.url.match(/(?:[/dp/]|$)([A-Z0-9]{10})/);
        //console.log("result: ", result);
        const asi = result[0].replace("/", "")
        setAsin(asi);
        // setAsin(.substring(1, 10));
        //console.log("asin: ", asi);
        onAsinDetected(asi);
      }

      if (isLoading)
        setIsLoading(false);
    }
  }


  _onMessage = event => {
    //console.log("Messag received", event.nativeEvent);
    // try {
    //   var values = JSON.parse(event.nativeEvent.data)
    //   setTitle(values.title);
    //   setPrice(values.price);
    //   setCheckShow(values.price != '');
    //   //console.log(values.price);
    //   // setAsin(values.asin);
    //   // const img = `https://ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=GB&ASIN=${values.asin}&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=SL500`
    //   // setImgSrc(img);
    // } catch (e) {
    //   setCheckShow(false);
    // }
  };

  const jsAvoidVideo = `
  
  document.addEventListener('DOMContentLoaded', (event) => {
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
        //alert(video);
        // Attempt to pause any video that might auto-play
        video.pause();
        // To prevent auto-playing, you might also want to remove the 'autoplay' attribute
        video.removeAttribute('autoplay');
        //video.hide();
    });
  });
  `

  const jsCode = `
      

      try{

        var navright = document.querySelector('.nav-right');
        var navleft = document.querySelector('.nav-left');
        
        try{ navright.remove(); }catch(e){
          //alert("Removing navright: ",e);
        }
        try{ navleft.remove(); }catch(e){
          //alert("Removing navleft: ",e);
        }        
        try{ footer.remove(); }catch(e){
          //alert("Removing footer: ",e);
        }
        
      }catch(e){
        //alert(e);
      }

      var title = document.querySelector('meta[name="title"]').content;
      //window.alert(title);
      try{
        var price = document.querySelectorAll('div#corePriceDisplay_mobile_feature_div span.a-offscreen')[0].innerText;
        //window.alert(price);
      }catch(e){}


      // try{
      //   var asin = document.getElementById("attach-base-asin").value; 
      // }catch(e){}
      
      // window.alert(title);

      try{


        var navright = document.querySelector('.nav-right');
        var navleft = document.querySelector('.nav-left');
        var navSubnavContainer = document.querySelector('#nav-subnav-container');
        var hmenuHeaderTop = document.querySelector('#hmenu-header-top');

        var footer = document.getElementsByTagName("footer")[0];
        var questions = document.getElementById("dpx-anywhere-ask_feature_div");
        var reviews = document.getElementById("aw-udpv3-customer-reviews_feature_div");
        var breadcrumb = document.getElementById("breadcrumb_feature_div");
        var ads = document.querySelectorAll('[id*="feature"]');
        //const elem = document.documentElement.innerText.includes('TOP OF PAGE');
        var aha = document.getElementsByTagName("a");

        try{ hmenuHeaderTop.remove(); }catch(e){
          //alert("Removing hmenuHeaderTop: ",e);
        }
        try{ navSubnavContainer.remove(); }catch(e){
          //alert("Removing navSubnavContainer: ",e);
        }
        try{ navright.remove(); }catch(e){
          //alert("Removing navright: ",e);
        }
        try{ navleft.remove(); }catch(e){
          //alert("Removing navleft: ",e);
        }        
        try{ footer.remove(); }catch(e){
          //alert("Removing footer: ",e);
        }
        try{ questions.remove(); }catch(e){
          //alert("Removing questions: ",e);
        }
        try{ reviews.remove(); }catch(e){
          //alert("Removing reviews: ",e);
        }
        try{ breadcrumb.remove(); }catch(e){
          //alert("Removing breadcrumb: ",e);
        }

        try{

          // window.alert(aha.length);
          // window.alert(aha[10].href);
          // window.alert(aha[20].href);
          // window.alert(aha[40].href);
          for (var i = 0; i < aha.length; i++) {
            //window.alert(ads[i].id);
            //ads[i].remove();
            aha[i].href=aha[i].href + "&tag=kidigogo08-20";
          }
          // window.alert(aha.length);
          // window.alert(aha[10].href);
          // window.alert(aha[20].href);
          // window.alert(aha[40].href);

        }catch(e){
          //alert(e);
        }


      }catch(e){
        //alert(e);
      }
      
      
      window.ReactNativeWebView.postMessage(JSON.stringify({title: title, asin : '', price: price}));
      true;
    `;

  //console.log(isAmazonLoading);
  //console.log(keyword);
  return (

    <>
      <Vm2>

        <CompactView intensity={20}>
          {/* <LoadingIndicator color={'red'} size={50} key={isLoading} /> */}
          <AppLogo source={AppLogoFile} /><RedText>GIFTAPP</RedText></CompactView>

        <AmLogoContainer >
          <AmLogo source={AmLogoFile} resizeMode='contain' />
          <ProgressBar progress={Math.round(loadingPercent)} color={standardcolors.red} />
        </AmLogoContainer>
        <TimesBtn
          onPress={() => { navigation.goBack() }}
        >
          <TimesLogo source={TimesLogoFile} resizeMode='contain' />
        </TimesBtn>

        {isAmazonLoading && !checkShow &&

          <>
            <VLoading><Text style={{ color: '#fff' }}>Wait until loading the product content</Text></VLoading>
            <LottieLoading
              key="animation"
              autoPlay
              loop
              resizeMode="cover"
              source={require("../../../../assets/anims/loading.json")}
            />
          </>
        }

        {checkShow &&
          <CheckBtn
            onPress={() => {
              navigation.navigate('giftAddConfirmStack', {
                isagift: isAGift,
                gift: {
                  productId: null,
                  name: title,
                  icon: imgSrc,
                  price: price.value,
                  brand: brand,
                  amzUrl: url,
                  asin: asin,
                }, navigation
              })
            }}
          >
            {/* <CheckLogo source={CheckLogoFile} resizeMode='contain' /> */}
            <LottieCheckLogo
              key="animation"
              autoPlay
              loop
              resizeMode="cover"
              source={require("../../../../assets/anims/85185-checkmark.json")}
            />
          </CheckBtn>
        }


        <CompactWebview
          style={{ marginTop: 48, }}
          nestedScrollEnabled
          ref={webViewRef}
          injectedJavaScriptBeforeContentLoadedForMainFrameOnly={true}
          //androidHardwareAccelerationDisabled={false}
          //scalesPageToFit={false}
          source={{
            uri: `https://www.amazon.com/s?k=${keyword}&tag=kidigogo08-20`
            //uri: "https://www.amazon.com/dp/B0BLGCXCYB"
            //uri: "https://www.trendyol.com/orlontex/erkek-siyah-paris-cizgi-baskili-oversize-bisiklet-yaka-sweatshirt-p-367932894?boutiqueId=61&merchantId=582236&sav=true"
            //html: "<h1>Hello</h1>"
          }}
          //javaScriptEnabledAndroid={true}
          //injectedJavaScript={jsCode}
          injectedJavaScript={jsAvoidVideo}
          onMessage={_onMessage}
          onLoadEnd={({ nativeEvent }) => {

            //console.log("Amazon loading ended: " + nativeEvent.url)
          }}
          onLoadStart={({ nativeEvent }) => {
            if (!isLoading)
              setIsLoading(true);

            setLoadingPercent(0);
            setImgSrc('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
            setAsin('');
            setTitle('');
            setPrice('');
            setCheckShow(false);
            setUrl(nativeEvent.url);
            //console.log("Start: " + nativeEvent.url);
          }}
          //ref={ref => { this.webview = ref; }}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}

          onLoadProgress={({ nativeEvent }) => {
            setLoadingPercent(Math.round(nativeEvent.progress));
            //if (nativeEvent.progress == 1) setIsLoading(false);
          }}
          onNavigationStateChange={(nativeEvent) => {
            ProCode(nativeEvent);
          }}
        // renderLoading={() => {
        //   return (
        //     <CompactView ><LoadingIndicator color={'red'} size={20} /><RedText>GiftApp</RedText></CompactView>
        //   )
        // }}
        />
      </Vm2>

      {/* <Vm1>

        <Img source={{ uri: imgSrc }} resizeMode='contain' />
        <Text>{title.replace("Amazon.com: ", "").replace("Amazon.com | ", "")}</Text>
        <Text style={{ color: '#0088ff' }}>{asin}</Text>
        <Text style={{ color: '#ff0000', fontSize: 20 }}>{price}</Text>
      </Vm1> */}
    </>
  );
}

