import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon, View } from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

function CameraButton(props) {
  const { history, callback } = props;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.cancelled) {
      const manipulatedResult = await ImageManipulator.manipulateAsync(
        result.uri,
        // [{ resize: { width: 1280 } }],
        [],
        {
          compress: 1,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true,
        }
      );

      callback(result.uri, manipulatedResult.base64);
    }
  };

  return (
    <View>
      <Button
        bordered
        rounded
        style={styles.cameraButton}
        onPress={takePicture}
      >
        <Icon type="Entypo" name="camera" />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraButton: {
    padding: 12,
  },
});

export default CameraButton;
