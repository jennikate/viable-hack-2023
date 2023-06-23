import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

function MealsScreen({ route, navigation }) {
  const { mealType } = route.params;
  const [error, setError] = useState();
  const [recipeTitleImage, setRecipeTitleImage] = useState([]);
  const [showGetRecipe, setShowGetRecipe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getData = () => {
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
      .then((json) => setRecipeTitleImage(json.results))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }

  function onGetRandomRecipePress() {
    getData()
  };

  function onGetRecipeDetailPress({ id }) {
    navigation.navigate('RecipeDetails', {
      id: id,
    });
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.container}>There is an error</Text>
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
          onPress={onGetRandomRecipePress}
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
        recipeTitleImage.map((item) => {
          return (
            <View key={item.id}>
              <Text style={styles.title}>{item.title}</Text>
              <Image
                style={styles.image}
                source={{
                  uri: item.image,
                }}
              />
              <Pressable
                android_ripple={{ color: '#fff' }}
                style={({ pressed }) => [
                  styles.button,
                  pressed ? styles.buttonPressed : null
                ]}
                onPress={() => onGetRecipeDetailPress({ id: item.id })}
              >
                <Text style={styles.title}>Press for recipe details</Text>
              </Pressable>
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
