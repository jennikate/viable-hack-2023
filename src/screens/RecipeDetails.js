import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import IngredientsBlock from "../components/IngredientsBlock";
import InstructionBlock from "../components/InstructionBlock";

function RecipeDetails({ route }) {
  const { url } = route.params;
  const [error, setError] = useState();
  const [recipeDetails, setRecipeDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getRecipeDetails = () => {
    setIsLoading(true);
    
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setRecipeDetails(json))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getRecipeDetails();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.container}>There is an error</Text>
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.container}>Loading ...</Text>
      </View>
    )
  }
console.log(recipeDetails.recipe)
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: recipeDetails.recipe.images.SMALL.url,
        }}
      />
      <Text style={styles.title}>{recipeDetails.recipe.label}</Text>
      <Text style={styles.smallText}>Source:</Text>
      <Text style={styles.smallText}>{recipeDetails.recipe.source}</Text>

      <IngredientsBlock
        ingredientsList={{ ingredients: recipeDetails.recipe.ingredients }} //want text
      />
      <InstructionBlock
        instructions={{ instructions: recipeDetails.recipe.url }}
      />
    </ScrollView>
  )
}

export default RecipeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    fontSize: 16,
  },
  image: {
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 16,
    textAlign: 'center',
  }
});