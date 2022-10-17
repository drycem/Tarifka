import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';

import ItemCategory from '../components/ItemCategory/ItemCategory';

export default function Home({navigation}) {
  const [data, setData] = useState(null);

  const fetchCategories = async () => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(res => res.json())
      .then(({categories}) => {
        setData(categories);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderRecipe = ({item}) => (
    <ItemCategory item={item} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderRecipe}
        keyExtractor={item => item.idCategory}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    flex: 1,
  },
});
