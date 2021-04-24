import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Left,
  Right,
  Text,
  Title,
} from "native-base";
import { Camera } from "expo-camera";

function Home(props) {
  const { history } = props;

  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = React.useState("off");

  let camera;

  const _startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    console.log(status);
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };
  const _takePicture = async () => {
    const photo = await camera.takePictureAsync();
    console.log(photo);
    setPreviewVisible(true);
    //setStartCamera(false)
    setCapturedImage(photo);
  };
  const _savePhoto = () => {};
  const _retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    _startCamera();
  };
  const _handleFlashMode = () => {
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("auto");
    }
  };
  const _switchCamera = () => {
    if (cameraType === "back") {
      setCameraType("front");
    } else {
      setCameraType("back");
    }
  };

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Leftovers</Title>
        </Body>
        <Right />
      </Header>
      <Container style={styles.container}>
        {startCamera ? (
          <Container
            style={{
              flex: 1,
              width: "100%",
            }}
          >
            {previewVisible && capturedImage ? (
              <CameraPreview
                photo={capturedImage}
                savePhoto={_savePhoto}
                retakePicture={_retakePicture}
              />
            ) : (
              <Camera
                type={cameraType}
                flashMode={flashMode}
                style={{ flex: 1 }}
                ref={(r) => {
                  camera = r;
                }}
              >
                <Container
                  style={{
                    flex: 1,
                    width: "100%",
                    backgroundColor: "transparent",
                    flexDirection: "row",
                  }}
                >
                  <Container
                    style={{
                      position: "absolute",
                      left: "5%",
                      top: "10%",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      onPress={_handleFlashMode}
                      style={{
                        backgroundColor: flashMode === "off" ? "#000" : "#fff",
                        // borderRadius: "50%",
                        height: 25,
                        width: 25,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                        }}
                      >
                        ⚡️
                      </Text>
                    </Button>
                    <Button
                      onPress={_switchCamera}
                      style={{
                        marginTop: 20,
                        // borderRadius: "50%",
                        height: 25,
                        width: 25,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                        }}
                      >
                        {cameraType === "front" ? "🤳" : "📷"}
                      </Text>
                    </Button>
                  </Container>
                  <Container
                    style={{
                      position: "absolute",
                      bottom: 0,
                      flexDirection: "row",
                      flex: 1,
                      width: "100%",
                      padding: 20,
                      justifyContent: "space-between",
                    }}
                  >
                    <Container
                      style={{
                        alignSelf: "center",
                        flex: 1,
                        alignItems: "center",
                      }}
                    >
                      <Button
                        onPress={_takePicture}
                        style={{
                          width: 70,
                          height: 70,
                          bottom: 0,
                          borderRadius: 50,
                          backgroundColor: "#fff",
                        }}
                      />
                    </Container>
                  </Container>
                </Container>
              </Camera>
            )}
          </Container>
        ) : (
          <Container
            style={{
              flex: 1,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onPress={_startCamera}
              style={{
                width: 130,
                borderRadius: 4,
                backgroundColor: "#14274e",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Take picture
              </Text>
            </Button>
          </Container>
        )}
      </Container>
    </Container>
  );
}

const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
  console.log("PHOTO: ", photo);
  return (
    <Container
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}
      >
        <Container
          style={{
            flex: 1,
            flexDirection: "column",
            padding: 15,
            justifyContent: "flex-end",
          }}
        >
          <Container
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                Re-take
              </Text>
            </Button>
            <Button
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,

                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                save photo
              </Text>
            </Button>
          </Container>
        </Container>
      </ImageBackground>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});

export default Home;
