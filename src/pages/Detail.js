import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Detail = ({route, navigation}) => {
  const {mealId} = route.params;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const tempdata = {i: mealId};
      const url = new URL('https://www.themealdb.com/api/json/v1/1/lookup.php');
      for (let k in tempdata) {
        url.searchParams.append(k, tempdata[k]);
      }

      fetch(url)
        .then(res => res.json())
        .then(s => {
          const {meals} = s;
          console.log(meals[0]);
          setData(meals[0]);
        })
        .catch(err => {
          console.log(err);
        });
    };

    fetchDetail();
  }, [mealId]);

  try {
    return (
      <View>
        {data && data.strMealThumb ? (
          <Image
            style={styles.img}
            source={{
              uri: data.strMealThumb,
            }}
          />
        ) : undefined}
        <Text>{data.strMeal}</Text>
      </View>
    );
  } catch (error) {
    console.log(error);
    return (
      <View>
        <Text>ERROR: {JSON.stringify(data)}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  img: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default Detail;
