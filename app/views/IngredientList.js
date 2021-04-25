import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Icon,
  Input,
  Item,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Toast,
  View,
} from "native-base";
import * as Clarifai from "clarifai";

// My imports
import { CLARIFAI_API_KEY } from "@env";
import {
  ButtonHeader,
  CameraButton,
  IngredientListItem,
} from "../components/Components";

function IngredientList(props) {
  const { history } = props;
  const imageUri = props.location.state.image.uri;
  const imageBase64 = props.location.state.image.base64;

  const [loaded, setLoaded] = useState(false);
  const [detectedIngredients, setDetectedIngredients] = useState([]);
  const [enteredIngredients, setEnteredIngredients] = useState([]);

  process.nextTick = setImmediate; // You'll most likely encounter the error process.nextTick is not a function while using this library with React Native. To solve this, add process.nextTick = setImmediate; as close to the top of your entrypoint as you can. See #20 for more info.

  useEffect(detectFood, []);

  let ingredientInput;

  function detectFood() {
    (async () => {
      try {
        console.log(imageBase64);
        setLoaded(false);

        const clarifaiApp = new Clarifai.App({
          apiKey: CLARIFAI_API_KEY,
        });

        const newPredictions = await clarifaiApp.models.predict(
          { id: Clarifai.FOOD_MODEL },
          { base64: imageBase64 },
          { maxConcepts: 5, minValue: 0.4 } // maximum matches with over minimum theshold value
        );

        console.log(newPredictions.outputs[0].data.concepts);

        setDetectedIngredients(
          removeDuplicates(
            detectedIngredients.concat(
              newPredictions.outputs[0].data.concepts.map((a) => a.name)
            )
          )
        );

        setLoaded(true);

        console.log(detectedIngredients);
      } catch (error) {
        console.log("Exception Error: ", error);
      }
    })();
  }

  function removeDuplicates(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j]) a.splice(j--, 1);
      }
    }

    return a;
  }

  function includesIngredient(ingredient) {
    return (
      !enteredIngredients.includes(ingredientInput) &&
      !detectedIngredients.includes(ingredientInput)
    );
  }

  function ingredientsEmpty() {
    return enteredIngredients.length === 0 && detectedIngredients.length === 0;
  }

  function setIngredientInput(value) {
    ingredientInput = value ? value : ingredientInput;
  }

  function addIngredient() {
    includesIngredient(ingredientInput)
      ? Toast.show({
          text: "Ingredient already in list!",
          buttonText: "Okay",
        })
      : setEnteredIngredients(enteredIngredients.concat(ingredientInput));
  }

  return (
    <Container>
      <ButtonHeader title="Ingredients" history={history}></ButtonHeader>
      <Content contentContainerStyle={styles.content}>
        <List>
          {/* Render detected ingredients */}
          <ListItem itemDivider first style={styles.itemDivider}>
            <Text>Ingredients Detected</Text>
          </ListItem>
          {loaded ? (
            <IngredientListItem
              history={history}
              ingredientsArray={detectedIngredients}
              setter={setDetectedIngredients}
            />
          ) : (
            <ListItem>
              <Text>Loading...</Text>
            </ListItem>
          )}

          {/* Render user entered ingredients */}
          <ListItem itemDivider first style={styles.itemDivider}>
            <Text>Ingredients Added</Text>
          </ListItem>
          <IngredientListItem
            history={history}
            ingredientsArray={enteredIngredients}
            setter={setEnteredIngredients}
          />
          <Form>
            <Item>
              <Left>
                <Input
                  placeholder="Add additional ingredient..."
                  onChangeText={(val) => setIngredientInput(val)}
                />
              </Left>
              <Icon
                type="Entypo"
                name="circle-with-plus"
                style={styles.addIcon}
                onPress={() => {
                  addIngredient();
                }}
              />
            </Item>
          </Form>
        </List>

        <View style={styles.buttonContainer}>
          <Left>
            <CameraButton
              history={history}
              callback={(uri, base64) => {
                history.push("/ingredient-list", {
                  image: { uri: uri, base64: base64 },
                });
                detectFood();
              }}
            ></CameraButton>
          </Left>
          <Body></Body>
          <Right>
            <Button
              success
              bordered
              onPress={() => {
                ingredientsEmpty()
                  ? Toast.show({
                      text: "Empty list of ingredients!",
                      buttonText: "Okay",
                    })
                  : history.push("/recipes-list", {
                      ingredients: enteredIngredients.concat(
                        detectedIngredients
                      ),
                    });
              }}
            >
              <Text>CONTINUE</Text>
            </Button>
          </Right>
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addIcon: {
    fontSize: 28,
    color: "green",
    lineHeight: 28,
    marginRight: 8,
  },
  buttonContainer: {
    margin: 18,
    flexDirection: "row",
  },
  itemDivider: {},
});

export default IngredientList;
