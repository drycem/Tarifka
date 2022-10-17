import React from 'react';
import {TouchableWithoutFeedback, Text, View, Image} from 'react-native';

import styles from './ItemCategory.style';

export default ({item, navigation}) => {
  console.log(item.strCategoryThumb);
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{uri: item.strCategoryThumb}} />
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('MealsScreen', {strCategory: item.strCategory});
        }}>
        <Text style={styles.text}>{item.strCategory}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};
