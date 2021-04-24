import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Text,
  H3,
  Title,
  View,
} from "native-base";
import * as Clarifai from "clarifai";

import { ButtonHeader } from "../components/Components";

function Recipes(props) {
  const { history } = props;
  const imageUri = history.location.state.image.uri;
  const imageBase64 = history.location.state.image.base64;

  const [predictions, setPredictions] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        console.log(imageBase64);
        const newPredictions = await clarifaiApp.models.predict(
          { id: Clarifai.FOOD_MODEL },
          { base64: imageBase64 },
          { maxConcepts: 10, minValue: 0.4 } // maximum matches with over minimum theshold value
        );
        setPredictions(newPredictions.outputs[0].data.concepts);
        console.log(predictions);
      } catch (error) {
        console.log("Exception Error: ", error);
      }
    })();
  }, []);

  const clarifaiApp = new Clarifai.App({
    apiKey: "98c207d37c92446c8187dcfa9f60ce98",
  });
  process.nextTick = setImmediate; // You'll most likely encounter the error process.nextTick is not a function while using this library with React Native. To solve this, add process.nextTick = setImmediate; as close to the top of your entrypoint as you can. See #20 for more info.

  return (
    <Container>
      <ButtonHeader title="Recipes" history={history}></ButtonHeader>
      <Content padder>
        <Text>Image:</Text>
        <Text>{imageUri}</Text>
        <View>
          {predictions ? (
            <Text>{String(predictions)}</Text>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </Content>
    </Container>
  );
}

export default Recipes;
