import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

function MealsScreen({ route }) {
  const { mealType } = route.params;
  const [data, setData] = useState([]);
  const [showGetRecipe, setShowGetRecipe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getData = () => {
    console.log('getting data')
    setShowGetRecipe(false);
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer 9084fae8081a4fe2a91966328648d6b0");

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=9084fae8081a4fe2a91966328648d6b0&query=${mealType}&number=1`, requestOptions)
      .then((resp) => resp.json())
      .then((json) => setData(json.results))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }

  function onPress() {
    getData()
  };
  console.log(isLoading, data);

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.container}>No data</Text>
      </View>
    )
  }

  if (showGetRecipe) {
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
            <Text style={styles.title}>
              Press me to get a random {mealType} recipe
            </Text>
          </View>
        </Pressable>
      </View >
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        // for spoonacular
        data.map((item) => {
          console.log('p', item)
          return (
            <View key={item.id}>
              <Text style={styles.title}>{item.title}</Text>
              <Image
                style={styles.image}
                source={{
                  uri: item.image,
                }}
              />
            </View>
          );
        })
      )}
    </View>
  );
}

export default MealsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  image: {
    width: '100%',
    height: 200
  },
});
