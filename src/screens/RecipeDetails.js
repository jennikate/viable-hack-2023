import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import IngredientsBlock from "../components/IngredientsBlock";
import InstructionBlock from "../components/InstructionBlock";

function RecipeDetails({ route }) {
  const { id } = route.params;
  const [error, setError] = useState();
  const [recipeDetails, setRecipeDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getRecipeDetails = () => {
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer 9084fae8081a4fe2a91966328648d6b0");

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=9084fae8081a4fe2a91966328648d6b0&includeNutrition=false`, requestOptions)
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

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: recipeDetails.image,
        }}
      />
      <Text style={styles.title}>{recipeDetails.title}</Text>
      <Text style={styles.smallText}>Source:</Text>
      <Text style={styles.smallText}>{recipeDetails.sourceName}</Text>

      <IngredientsBlock
        ingredientsList={{ ingredients: recipeDetails.extendedIngredients }}
      />
      <InstructionBlock
        instructions={{ instructions: recipeDetails.instructions }}
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
    width: '100%',
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