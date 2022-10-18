import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  Alert,
  Dimensions,
  TouchableOpacity,
  ScrollView,
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
          setData(meals[0]);
        })
        .catch(error => {
          console.log(error);
        });
    };

    fetchDetail();
  }, [mealId]);

  const OpenYoutubeButton = ({url}) => {
    const handlePress = useCallback(async () => {
      let supported = null;
      try {
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

    return (
      <TouchableOpacity style={styles.btn} onPress={handlePress}>
        <Text style={styles.btn_text}>Watch on Youtube</Text>
      </TouchableOpacity>
    );
  };

  try {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          {data && data.strMealThumb ? (
            <Image
              style={styles.img}
              source={{
                uri: data.strMealThumb,
              }}
            />
          ) : undefined}
          <Text style={styles.title}>{data.strMeal}</Text>
          <Text style={styles.area}>{data.strArea}</Text>
          <Text style={styles.info}>{data.strInstructions}</Text>
        </ScrollView>
        <OpenYoutubeButton url={data.strYoutube} />
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
    width: Dimensions.get('window').width,
    height: 380,
    resizeMode: 'contain',
  },
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 5,
  },
  title: {
    color: '#c62828',
    fontSize: 34,
    fontWeight: 'bold',
    margin: 5,
  },
  area: {
    color: '#c62828',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 5,
  },
  info: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
  },
  btn: {
    backgroundColor: 'red',
    color: 'white',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  btn_text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Detail;
