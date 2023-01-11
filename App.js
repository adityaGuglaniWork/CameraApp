/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useRef, useEffect } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { SafeAreaView, Text, StyleSheet, View, Button, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CameraNotAccessible from './src/components/CameraNotAccessible';



const COLOR_ICON_DEFAULT = "#FEFEFE";
const COLOR_ICON_HIGHLIGHTED = "#FF5733";
const COLOR_ICON_SIZE = 30;

export default function App() {
  const devices = useCameraDevices();
  const [hasCameraAccess, setCameraAccess] = useState(false);
  const [device, setDevice] = useState(null);
  const [isFlashOn, setFlashOn] = useState(false);
  const camera = useRef <Camera>(null);

  const requestPermissionAndSetupCamera = async () => {
    const permissionStatus = await Camera.getCameraPermissionStatus();
    if (permissionStatus === "authorized") {
      setCameraAccess(true);
    } else { 
      const newCameraPermission = await Camera.requestCameraPermission();
      setCameraAccess(newCameraPermission === "authorized");
    }
  }

  useEffect(() => {
    requestPermissionAndSetupCamera();
  }, []);

  useEffect(() => {
    if (devices !== null) {
      setDevice(devices.back);
    }
  }, [devices]);

  function onTogglePosition() {
    (device.position == 'front') ? setDevice(devices.back) : setDevice(devices.front);
  }

  const onClickPicture = async () => {
    camera.current.takePhoto({
        flash: (isFlashOn) ? "on" : "off"
    }).then((e) => { alert("Picture taken"); }).catch((e) => {console.log(e)});
  }

  const cameraView = () => {
    if (hasCameraAccess && device) {
      return <><Camera device={ device }
        style={styles.cameraContainer}
        ref={camera}
        photo={true}
        isActive={true} />
      <View style={styles.controller}>
        <ControllerIcon name="repeat" onPress={onTogglePosition} />
        <ControllerIcon name="flash" onPress={() => { setFlashOn(!isFlashOn) }} isSelected={isFlashOn} />
        <ControllerIcon name="camera" onPress={ onClickPicture } />
      </View></>
    } else {
      return <CameraNotAccessible/>
    }
  }

  return (
    <SafeAreaView style={styles.appContainer}>
      <Text style={styles.heading}>CAMERA APP</Text>
      <View >
        {cameraView()}
      </View>
    </SafeAreaView>
  );
};

const ControllerIcon = ({ name, onPress, isSelected }) => {
  return <Icon name={name} size={COLOR_ICON_SIZE} onPress={onPress} color={ (isSelected)? COLOR_ICON_HIGHLIGHTED : COLOR_ICON_DEFAULT } />
}

const styles = StyleSheet.create({
  appContainer: {
    width: "80%",
    alignSelf: "center"
  },
  cameraContainer: {
    width: "100%",
    height: "80%"
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 50,
  },
  controller: {
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    justifyContent: "space-evenly",
  }
});