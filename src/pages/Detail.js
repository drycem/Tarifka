import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  Alert,
  Button,
} from 'react-native';

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

  const OpenYoutubeButton = ({url, children}) => {
    const handlePress = useCallback(async () => {
      let supported = null;
      try {
        console.log(url);
        supported = await Linking.canOpenURL(url);
      } catch {
        error => {
          console.log(error);
        };
      }

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Failed to open this URL:\n${url}`);
      }
    }, [url]);

    return <Button title={children} onPress={handlePress} />;
  };

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
        <OpenYoutubeButton url={data.strYoutube}>
          Watch on Youtube
        </OpenYoutubeButton>
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
  container: {
    backgroundColor: '#f5f5f5',
  },
});

export default Detail;
