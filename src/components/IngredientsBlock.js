import { StyleSheet, Text, View } from "react-native";

function IngredientsBlock({ ingredientsList }) {
  // Could use a FlatList and render each item in the list
  // but that will apply a scroll to the FlatList area and not the whole page
  // so using map for content here and applying scrollability higher up

  // function renderIngredient(item) {
  //   <Text style={styles.listText}>{item.item.original}</Text>
  // }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Ingredients
        </Text>
      </View>
      <View style={styles.ingredientContainer}>
        {ingredientsList.ingredients.map((ingredient) => {
          return (
            <View key={ingredient.id}>
              <Text style={styles.listText}>&#x2022; {ingredient.original}</Text>
            </View>
          )
        })}
        {/* <FlatList
          data={ingredientsList.ingredients}
          keyExtractor={(item) => item.original}
          renderItem={renderIngredient}
        /> */}
      </View>
    </View>
  );
};

export default IngredientsBlock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  ingredientContainer: {
    padding: 10,
  },
  titleContainer: {
    backgroundColor: "#ecf0f1",
    lineHeight: 24,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    padding: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  listText: {
    fontSize: 16,
    lineHeight: 24,
    paddingLeft: 10,
  }
});