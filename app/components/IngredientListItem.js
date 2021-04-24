import React from "react";
import { StyleSheet } from "react-native";
import { Icon, ListItem, Text } from "native-base";

function IngredientListItem(props) {
  const { history, ingredientsArray, setter } = props;

  return ingredientsArray.map((ingredient, i) => {
    return (
      <ListItem key={i}>
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
        <Text>{ingredient}</Text>
      </ListItem>
    );
  });
}

const styles = StyleSheet.create({
  removeIcon: {
    marginRight: 10,
    fontSize: 20,
    color: "red",
    lineHeight: 20,
  },
});

export default IngredientListItem;
