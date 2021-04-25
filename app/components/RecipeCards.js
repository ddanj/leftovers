import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, Card, CardItem, Left, Text, View } from 'native-base';
import AutoHeightImage from 'react-native-auto-height-image';

// My Imports
import Hyperlink from './Hyperlink';

export default function RecipeCards(props) {
  const { recipes } = props;

  return recipes.map((recipe, i) => {
    return (
      <Card key={i}>
        <CardItem header>
          <Left>
            <AutoHeightImage
              width={125}
              source={{ uri: recipe['recipe']['image'] }}
              style={styles.image}
            ></AutoHeightImage>
          </Left>
          <Body style={styles.titleContainer}>
            <Text style={styles.title}>{recipe['recipe']['label']}</Text>
            <Hyperlink
              to={recipe['recipe']['url']}
              underline
              style={styles.title}
            >
              {recipe['recipe']['source']}
            </Hyperlink>
          </Body>
        </CardItem>
        <CardItem style={styles.contentContainer}>
          <View>
            {recipe['recipe']['dishType'] ? (
              <Text>
                {' '}
                {'Dish Type: ' + recipe['recipe']['dishType'].join(' ')}
              </Text>
            ) : null}
            {recipe['recipe']['calories'] ? (
              <Text>
                {' '}
                {'Calories: ' + Math.floor(recipe['recipe']['calories'])}
              </Text>
            ) : null}
          </View>
        </CardItem>
      </Card>
    );
  });
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
  titleContainer: {
    justifyContent: 'center',
  },
});
