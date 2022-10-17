import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import ItemMeal from '../components/ItemMeal/ItemMeal';

export default ({route, navigation}) => {
  const {strCategory} = route.params;
  const [data, setData] = useState(null);

  const renderMeals = ({item}) => (
    <ItemMeal item={item} navigation={navigation} />
  );

  useEffect(() => {
    const fetchMeals = async () => {
      const tempdata = {c: strCategory};
      const url = new URL('https://www.themealdb.com/api/json/v1/1/filter.php');
      for (let k in tempdata) {
        url.searchParams.append(k, tempdata[k]);
      }

      fetch(url)
        .then(res => res.json())
        .then(s => {
          const {meals} = s;
          setData(meals);
        })
        .catch(err => {
          console.log(err);
        });
    };
    fetchMeals();
  }, [strCategory]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderMeals}
        keyExtractor={item => item.idMeal + ''}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
  },
});
