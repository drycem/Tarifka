import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    margin: 5,
    alignContent: 'flex-end',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 5,
    paddingHorizontal: 15,
  },
  img: {
    overflow: 'hidden',
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 20,
    flexDirection: 'column-reverse',
  },
});
