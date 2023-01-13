/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import CameraNotAccessible from './src/components/CameraNotAccessible';
import CapturePhotoView from './src/components/CapturePhotoView';

export default function App() {
  const devices = useCameraDevices();
  const [hasCameraAccess, setCameraAccess] = useState(false);
  const [device, setDevice] = useState(null);

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

  const cameraView = () => {
    if (hasCameraAccess && device) {
      return <CapturePhotoView device={device} onTogglePosition={onTogglePosition} />
    } else {
      return <CameraNotAccessible/>
    }
  }

  return (
    <SafeAreaView>
      <View >
        {cameraView()}
      </View>
    </SafeAreaView>
  );
};