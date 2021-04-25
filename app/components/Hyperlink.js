import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Text } from 'native-base';

function Hyperlink(props) {
  const { to, underline, style } = props;
  return (
    <Text
      style={[
        styles.link,
        style,
        { textDecorationLine: underline ? 'underline' : 'none' },
      ]}
      onPress={() => Linking.openURL(to)}
    >
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  link: {
    color: '#2c6bd6',
  },
});

export default Hyperlink;
