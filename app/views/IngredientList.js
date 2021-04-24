import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  Body,
  Container,
  Content,
  Header,
  Icon,
  List,
  ListItem,
  Text,
  Title,
} from 'native-base';

function IngredientList(props) {
  const { history } = props;
  const [detectedIngredients, setDetectedIngredients] = useState([]);
  const [enteredIngredients, setEnteredIngredients] = useState([]);
  useEffect(() => {
    (async () => {
      setDetectedIngredients([
        'Ingredient #1',
        'Ingredient #2',
        'Ingredient #3',
      ]);
      setEnteredIngredients([
        'EIngredient #1',
        'EIngredient #2',
        'EIngredient #3',
      ]);
    })();
  }, []);

  function ingredientsUI(arr, setFunction) {
    return arr.map((ingredient, i) => {
      return (
        <ListItem key={i}>
          <Icon
            type="Entypo"
            name="circle-with-minus"
            style={styles.removeIcon}
            onPress={() => {
              setFunction(
                arr.filter((value, j) => {
                  return j != i;
                })
              );
            }}
          />
          <Text>{ingredient}</Text>
        </ListItem>
      );
    });
  }

  const detected = ingredientsUI(detectedIngredients, setDetectedIngredients);
  const entered = ingredientsUI(enteredIngredients, setEnteredIngredients);

  return (
    <Container>
      <Header noLeft>
        <Body>
          <Title>Leftovers - My Ingredients</Title>
        </Body>
      </Header>
      <Content>
        <List>
          {/* Render detected ingredients */}
          <ListItem itemHeader first>
            <Text>Detected Ingredients</Text>
          </ListItem>
          {detected}

          {/* Render user entered ingredients */}
          <ListItem itemHeader first>
            <Text>User Entered Ingredients</Text>
          </ListItem>
          {entered}
        </List>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  removeIcon: {
    marginRight: 10,
    fontSize: 20,
    color: 'red',
    lineHeight: 20,
  },
});

export default IngredientList;
