import { Linking, View, StyleSheet, Text, Button } from "react-native";

export default function CameraNotAccessible() {
    const goToSettings = () => {
        Linking.openSettings();
    }
    
    return (<>
    <View>
        <Text style={ styles.cameraNotAccessible }>Camera Not Accessible</Text>
        <Button title="GO TO SETTINGS" onPress={() => { goToSettings() }} />
        </View>
    </>);
}

const styles = StyleSheet.create({
    cameraNotAccessible: {
        alignSelf: "center",
        height: 100,
        justifyContent: "center"
    },

});