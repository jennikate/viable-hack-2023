import { Pressable, Linking, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useCallback } from "react";
// import RenderHtml from 'react-native-render-html';

function InstructionBlock({ instructions }) {
  console.log(instructions)
  // const source = { html: instructions.instructions };
  // const { width } = useWindowDimensions();

  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Instructions
        </Text>
      </View>
      <View style={styles.instructionContainer}>
        <Text style={styles.bodyText}>
          {/* SPOONACULAR returns html as a string to render so needs this, Edamam doesn't <RenderHtml
          contentWidth={width}
          source={source} /> */}
          <OpenURLButton url={instructions.instructions}>View instructions on source website</OpenURLButton>
        </Text>
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
    marginBottom: 20,
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
  },
  button: {
    marginTop: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});