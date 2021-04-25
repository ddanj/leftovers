import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Card, CardItem, Left, Right, Text, Body } from 'native-base';
import AutoHeightImage from 'react-native-auto-height-image';

// My Imports
import Hyperlink from './Hyperlink';

export default function RecipeCards(props) {
  const { recipes } = props;
  //   console.log('\n\n\n\n\n\n\n\n\n');
  //   console.log(recipes[0]['recipe']);

  return recipes.map((recipe, i) => {
    return (
      <Card key={i}>
        <CardItem header>
          <Left>
            <Text>{recipe['recipe']['label']}</Text>
          </Left>
          <Right>
            <AutoHeightImage
              width={125}
              source={{ uri: recipe['recipe']['image'] }}
              style={styles.image}
            ></AutoHeightImage>
          </Right>
        </CardItem>
        <CardItem>
          <Body>
            <Text>//Your text here</Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Hyperlink to={recipe['recipe']['url']} underline>
            {recipe['recipe']['source']}
          </Hyperlink>
        </CardItem>
      </Card>
    );
  });
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
});
