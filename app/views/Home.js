import React, { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
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
} from 'native-base';

import { CameraButton } from '../components/Components';

function Home(props) {
  const { history } = props;

  return (
    <Container>
      <Header noLeft>
        <Body>
          <Title>Leftovers</Title>
        </Body>
      </Header>
      <Content padder contentContainerStyle={styles.content}>
        <View style={styles.container}>
          <Icon
            style={styles.fridgeIcon}
            type="MaterialCommunityIcons"
            name="fridge"
          />

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              Take a picture of what's inside your fridge.
            </Text>
          </View>

          <CameraButton style={styles.cameraButton} history={history} />
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },

  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? -64 : -56,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fridgeIcon: {
    fontSize: 48,
  },
  descriptionContainer: {
    padding: 24,
  },
  description: {
    fontSize: 28,
    textAlign: 'center',
  },
  cameraButton: {},
});

export default Home;
