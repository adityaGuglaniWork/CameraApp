import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useRef } from 'react';
import { Camera } from 'react-native-vision-camera';
import { StyleSheet, View } from 'react-native'

const COLOR_ICON_DEFAULT = "#FEFEFE";
const COLOR_ICON_HIGHLIGHTED = "#FF5733";
const COLOR_ICON_SIZE = 30;

export default function CapturePhotoView({ device, onTogglePosition, onCapture }) {
  const [isFlashOn, setFlashOn] = useState(false);
  const camera = useRef(null);
  
  const onClickPicture = async () => {
    camera.current.takePhoto({
         flash: (isFlashOn) ? "on" : "off"
    })
      .then((photo) => {
        onCapture(photo.path);
      })
      .catch((e) => {
        alert("Couldnt capture")
      });
  }
    
    return (
      <>
        <Camera device={device}
          ref={camera}
          photo={true}
          style={styles.cameraContainer}
          isActive={true} />
        <View style={styles.controller}>
          <ControllerIcon name="repeat" onPress={onTogglePosition} />
          <ControllerIcon name="flash" onPress={() => { setFlashOn(!isFlashOn) }} isSelected={isFlashOn} />
          <ControllerIcon name="camera" onPress={onClickPicture} />
        </View>
      </>
    );

}
  
const ControllerIcon = ({ name, onPress, isSelected }) => {
    return <Icon name={name} size={COLOR_ICON_SIZE} style={{marginBottom: 40, marginLeft: 15, alignSelf: "center"}} onPress={onPress} color={ (isSelected)? COLOR_ICON_HIGHLIGHTED : COLOR_ICON_DEFAULT } />
}

const styles = StyleSheet.create({
  cameraContainer: {
    height: "100%",
    width: "100%"
    },
  controller: {
    position: "absolute",
    height: "100%",
    flexDirection: "column",
    marginBottom: 10,
    justifyContent: "center"
    }
});