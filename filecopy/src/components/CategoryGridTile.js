import { ImageBackground, Platform, Pressable, StyleSheet, Text, View } from "react-native";

function CategoryGridTile({ title, image, onPress }) {
  const imageUri = {uri: image};

  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: '#fff' }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null
        ]}
        onPress={onPress}
      >
        <View style={[styles.innerContainer]}>
          <ImageBackground source={imageUri} resizeMode="contain" style={styles.image}>
            <Text style={styles.title}>
              {title}
            </Text>
          </ImageBackground>
        </View>
      </Pressable>
    </View >
  );
};

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 4, // android shadow
    shadowColor: 'black',
    // iOS shadow:
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible' // make sure ripple effect doesn't go over rounded corners on android, and shadow isn't hidden on iOS
  },
  button: {
    flex: 1
  },
  buttonPressed: {
    opacity: 0.5
  },
  innerContainer: {
    flex: 1,
    borderRadius: 8
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center',
    color: 'white',
    lineHeight: 24,
    textAlign: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  }
});