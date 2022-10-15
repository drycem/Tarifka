import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

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

  const renderRecipe = ({item}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('MealsScreen', {strCategory: item.strCategory});
        }}>
        <Text>{item.strCategory}</Text>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={renderRecipe}
        keyExtractor={item => item.idCategory}
      />
    </SafeAreaView>
  );
}
