import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

function MealsScreen({ route, navigation }) {
  const { mealType } = route.params;
  const [error, setError] = useState();
  const [recipeData, setRecipeData] = useState([]);
  const [showGetRecipe, setShowGetRecipe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getData = () => {
    setShowGetRecipe(false);
    setIsLoading(true);

    // SPOONACULAR
    // const myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer 9084fae8081a4fe2a91966328648d6b0");

    // const requestOptions = {
    //   method: 'GET',
    //   headers: myHeaders,
    //   redirect: 'follow'
    // };

    // fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=9084fae8081a4fe2a91966328648d6b0&query=${mealType}&number=1`, requestOptions)
    //   .then((resp) => resp.json())
    //   .then((json) => setRecipeData(json.results))
    //   .catch((error) => setError(error))
    //   .finally(() => setIsLoading(false));

    // EDAMAM
    fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${mealType}&app_id=b24fc1b6&app_key=5372fda81d31572bfd05cd0669302a60&random=true`)
      .then((resp) => resp.json())
      .then((json) => setRecipeData(json.hits))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }


  function onGetRecipeDetailPress({ url }) {
    console.log('pressed')
    navigation.navigate('RecipeDetails', {
      url: url,
    });
  }

  useEffect(() => {
    getData();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.container}>There is an error</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        // for edamam
        recipeData.map((item) => {
          return (
            <View key={item.recipe.uri}>
              <Pressable
                android_ripple={{ color: '#fff' }}
                style={({ pressed }) => [
                  styles.button,
                  pressed ? styles.buttonPressed : null
                ]}
                onPress={() => onGetRecipeDetailPress({ url: item._links.self.href })}
              >
                <Image
                  style={styles.image}
                  source={{
                    uri: item.recipe.images.SMALL.url,
                  }}
                />
                <Text style={styles.title}>{item.recipe.label}</Text>
              </Pressable>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

export default MealsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 40,
    paddingTop: 20,
  },
  image: {
    height: 200,
    borderRadius: 8,
    backgroundColor: 'white',
  },
});
