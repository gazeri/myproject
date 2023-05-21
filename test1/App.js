import { StatusBar } from "expo-status-bar";
import { ToastAndroid, View, Text, Pressable, StyleSheet } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { useState ,useRef,useEffect} from 'react';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
import { GestureHandlerRootView } from "react-native-gesture-handler"; 
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';


import Slider from 'react-native-swipe-slider';


// import { BarCodeScanner } from 'expo-barcode-scanner';



import ImageViewer from './components/ImageViewer';
import Button from './components/Button';

import * as Location from 'expo-location';


const PlaceholderImage = require('./assets/images/background-image.png');
//const image = { uri: "https://docs.expo.dev/static/images/tutorial/splash.png" };

function MyCheckbox({
  checked,
  onChange,
  buttonStyle = {},
  activeButtonStyle = {},
  inactiveButtonStyle = {},
  activeIconProps = {},
  inactiveIconProps = {},
}) {
  const iconProps = checked ? activeIconProps : inactiveIconProps;
  return (
    <Pressable
      style={[
        buttonStyle,
        checked
          ? activeButtonStyle
          : inactiveButtonStyle,
      ]}
      onPress={() => onChange(!checked)}>
      {checked && (
        <Ionicons
          name="checkmark"
          size={22}
          color="white"
          {...iconProps}
        />
      )}
    </Pressable>
  );
}


export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(50);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
    
  const [timer, setTimer] = useState(0);
  const startTime = new Date();
  
  
  

  
  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };
  const onReset = () => {
    setShowAppOptions(false);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 640,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };


  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      alert(result.assets[0].uri);
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      
    }
  };
  /*
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  
  if (status === null) {
    requestPermission();
  }*/

  function showToast() {
    ToastAndroid.show("Toast", ToastAndroid.SHORT);
  }
  const getElapsedTime = () => {
      setTimer((new Date().getTime() - startTime.getTime()) / 1000);
//      useEffect();
  };
//setInterval(getElapsedTime, 2000);

  /*{}*/
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
   text = JSON.stringify(location);
  AddText (text.ToString()  , "test")
  }
 // setInterval(useEffect, 2000);
  return (    
    <GestureHandlerRootView style={styles.container}> 
    <View style={styles.container}>
    {/* { <ImageBackground source={image} style={styles.image}>
      <Text style={styles.text}>Elements</Text>
      <Text style={styles.text}>in Front of</Text>
      <Text style={styles.text}>Background</Text>
    </ImageBackground> } */}
  
      <View style={styles.imageContainer}>
    <View ref={imageRef} collapsable={false}>

          <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji !== null ? (
            <EmojiSticker imageSize={100} stickerSource={pickedEmoji} />
          ) : null}
        </View>
      </View>
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>      
        ) : (
      <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <IconButton icon="save-alt" label="Toast" onPress={showToast} />

      </View>
      
      )}  
    </View>
      <View style={styles.checkboxContainer}>
      <MyCheckbox
          checked={checked}
          onChange={setChecked}
          buttonStyle={styles.checkboxBase}
          activeButtonStyle={styles.checkboxChecked}
        />
        <Text style={styles.checkboxLabel}>{`⬅️ Click!`}</Text>
      </View>
      <Slider
          min={0}
          max={100}
          value={value}
          onChange={value => setValue(value)}
          changeEventThrottle={100}
          style={styles.slider}
          backgroundColor={'#e5e5e5'}
          barColor={'#fca311'}
        >          
        </Slider>
        <Text>{value}</Text>
        {/*
        {scanned && <Button theme="mystyle" label="Scan again" onPress={() => setScanned(false)} />}
        <View style={styles.scanner_area}>
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
        />
        </View>*/}
        

        <StatusBar backgroundColor= '#00f' barStyle="dark-content" hidden={false} translucent={false}/>
      <Text style={styles.paragraph}>{text}</Text>
    </GestureHandlerRootView>

  );
}



const styles = StyleSheet.create({
  // Styles that are unchanged from previous step are hidden for brevity. 
  footerContainer: {
    flex: 1 / 2,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ff0',//'#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 300,
    borderRadius: 18,
  },
    optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  image2: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'coral',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: 'coral',
  },
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    marginVertical: 16,
    fontWeight: 'bold',
    fontSize: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: 500,
    fontSize: 18,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  slider: {
    justifyContent: 'center',
    width: '100%',
    height: 64,
    marginTop: 16
  },
  icon: {
    marginHorizontal: 16
  },
    scanner_area: {
    justifyContent: 'center',
    width: '100%',
    height: 150,
    marginTop: 6
  },

});

