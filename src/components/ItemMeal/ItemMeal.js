import React from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  ImageBackground,
  View,
} from 'react-native';

import styles from './ItemMeal.style';

export default ({item, navigation}) => (
  <View style={styles.container}>
    <TouchableWithoutFeedback
      style={styles.item}
      onPress={() =>
        navigation.navigate('DetailScreen', {mealId: item.idMeal})
      }>
      <ImageBackground style={styles.img} source={{uri: item.strMealThumb}}>
        <Text numberOfLines={1} style={styles.text}>
          {item.strMeal}
        </Text>
      </ImageBackground>
    </TouchableWithoutFeedback>
  </View>
);
