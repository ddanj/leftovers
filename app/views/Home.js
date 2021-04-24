import React, { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Text,
  Title,
} from 'native-base';
import * as ImagePicker from 'expo-image-picker';

function Home(props) {
  const { history } = props;

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <Container>
      <Header noLeft>
        <Body>
          <Title>Leftovers</Title>
        </Body>
      </Header>
      <Container style={styles.container}>
        <Button style={styles.cameraButton} onPress={takePicture}>
          <Text style={styles.cameraButtonText}></Text>
        </Button>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraButton: {},
  cameraButtonText: {},
  image: {
    width: 400,
    height: 400,
  },
});

export default Home;
