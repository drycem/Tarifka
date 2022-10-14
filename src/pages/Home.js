import React, {useEffect, useState} from 'react';
import {FlatList, Text, SafeAreaView} from 'react-native';

export default function Home() {
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

  const renderRecipe = ({item}) => <Text>{item.strCategory}</Text>;

  return (
    <SafeAreaView>
      <Text>Home</Text>
      <FlatList
        data={data}
        renderItem={renderRecipe}
        keyExtractor={item => item.idCategory}
      />
    </SafeAreaView>
  );
}
