import React from "react";
import { StyleSheet } from "react-native";
import { Icon, Left, ListItem, Right, Text } from "native-base";

function IngredientListItem(props) {
  const { history, ingredientsArray, setter } = props;

  return ingredientsArray.map((ingredient, i) => {
    return (
      <ListItem key={i} last={i === ingredientsArray.length - 1}>
        <Left>
          <Text>{ingredient}</Text>
        </Left>
        <Right>
          <Icon
            type="Entypo"
            name="circle-with-minus"
            style={styles.removeIcon}
            onPress={() => {
              setter(
                ingredientsArray.filter((value, j) => {
                  return j != i;
                })
              );
            }}
          />
        </Right>
      </ListItem>
    );
  });
}

const styles = StyleSheet.create({
  removeIcon: {
    fontSize: 24,
    color: "red",
    lineHeight: 24,
  },
});

export default IngredientListItem;
