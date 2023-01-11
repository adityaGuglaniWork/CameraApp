import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useRef } from 'react';
import { Camera } from 'react-native-vision-camera';
import { StyleSheet, View } from 'react-native'


const COLOR_ICON_DEFAULT = "#FEFEFE";
const COLOR_ICON_HIGHLIGHTED = "#FF5733";
const COLOR_ICON_SIZE = 30;

export default function CapturePhotoView({ device, onTogglePosition }) {
    const [isFlashOn, setFlashOn] = useState(false);
    const camera = useRef(null);
  
    const onClickPicture = async () => {
      camera.current.takePhoto({
          flash: (isFlashOn) ? "on" : "off"
      }).then((e) => { alert("Picture taken"); }).catch((e) => {console.log(e)});
    }
    
    return (
      <>
        <Camera device={device}
          style={styles.cameraContainer}
          ref={camera}
          photo={true}
          isActive={true} />
        <View style={styles.controller}>
          <ControllerIcon name="repeat" onPress={onTogglePosition} />
          <ControllerIcon name="flash" onPress={() => { setFlashOn(!isFlashOn) }} isSelected={isFlashOn} />
          <ControllerIcon name="camera" onPress={ onClickPicture } />
        </View>
      </>
    );
}
  
const ControllerIcon = ({ name, onPress, isSelected }) => {
    return <Icon name={name} size={COLOR_ICON_SIZE} onPress={onPress} color={ (isSelected)? COLOR_ICON_HIGHLIGHTED : COLOR_ICON_DEFAULT } />
}

const styles = StyleSheet.create({
    cameraContainer: {
        width: "100%",
        height: "80%"
    },
    controller: {
        width: "100%",
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 10,
        justifyContent: "space-evenly",
    }
});