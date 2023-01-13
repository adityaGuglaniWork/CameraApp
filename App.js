/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image } from 'react-native';
import CameraNotAccessible from './src/components/CameraNotAccessible';
import CapturePhotoView from './src/components/CapturePhotoView';
import CameraRoll from '@react-native-community/cameraroll';

export default function App() {
  const devices = useCameraDevices();
  const [hasCameraAccess, setCameraAccess] = useState(false);
  const [device, setDevice] = useState(null);
  const [clickedPictures, setClickedPictures] = useState([]);

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

  function onCapture(cachePath) {
    CameraRoll.save(cachePath);
    setClickedPictures([...clickedPictures, cachePath]);
  }

  const cameraView = () => {
    if (hasCameraAccess && device) {
      return <CapturePhotoView device={device} onTogglePosition={onTogglePosition} onCapture={onCapture} />
    } else {
      return <CameraNotAccessible />
    }
  }

  const clickedImagesViewHolder = ({ item }) => {
    return (
      <View>
      <Image style={styles.clickedImageContainer} source={{ uri: "file://" + item }} />
      </View >
    );
  }

  return (
    <SafeAreaView>
      <View >
        {cameraView()}
      </View>
      <FlatList
        horizontal={true}
        style={styles.clickedImages}
        data={clickedPictures}
        renderItem={clickedImagesViewHolder}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  clickedImages: {
    flex: 1,
    width: "100%",
    position: "absolute",
    bottom: 0
  },
  clickedImageContainer: {
    margin: 5,
    width: 100,
    height: 100,
  }
});