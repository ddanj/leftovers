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

  const detectedIngredients = [
    'Ingredient #1',
    'Ingredient #2',
    'Ingredient #1',
  ];
  const enteredIngredients = [
    'Ingredient #1',
    'Ingredient #2',
    'Ingredient #1',
  ];

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
          {detectedIngredients.map((ingredient, i) => {
            return (
              <ListItem key={i}>
                <Icon
                  type="Entypo"
                  name="circle-with-minus"
                  style={styles.removeIcon}
                />
                <Text>{ingredient}</Text>
              </ListItem>
            );
          })}

          {/* Render user entered ingredients */}
          <ListItem itemHeader first>
            <Text>User Entered Ingredients</Text>
          </ListItem>
          {enteredIngredients.map((ingredient, i) => {
            return (
              <ListItem key={i}>
                <Icon
                  type="Entypo"
                  name="circle-with-minus"
                  style={styles.removeIcon}
                />
                <Text>{ingredient}</Text>
              </ListItem>
            );
          })}
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
