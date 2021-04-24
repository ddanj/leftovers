import React, { Component } from "react";
import { Container } from "native-base";
import { NativeRouter, Switch, Route } from "react-router-native";
import { default as AppLoading } from "expo-app-loading";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

// My imports
import { Home, IngredientList, RecipesList } from "./app/views/Views";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading onError={console.warn} />;
    }
    return (
      <NativeRouter>
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/ingredient-list" component={IngredientList} />
            <Route exact path="/recipes-list" component={RecipesList} />
          </Switch>
        </Container>
      </NativeRouter>
    );
  }
}
