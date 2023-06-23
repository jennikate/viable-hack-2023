import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import RenderHtml from 'react-native-render-html';

function InstructionBlock({ instructions }) {
  const source = { html: instructions.instructions };
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Instructions
        </Text>
      </View>
      <View style={styles.instructionContainer}>
        {/* <Text style={styles.bodyText}>{instructions.instructions}</Text> */}
        <RenderHtml
          contentWidth={width}
          source={source} />
      </View>
    </View>
  );
};

export default InstructionBlock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  instructionContainer: {
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
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
  }
});