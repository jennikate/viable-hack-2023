import { StyleSheet, Text, View } from "react-native";

function RecipeDetails({ id }) {
  return (
    <View style={styles.container}>
      <Text style={styles.container}>Details screen</Text>
    </View>
  )
}

export default RecipeDetails;

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