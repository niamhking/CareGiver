import * as React from "react";
import {
  View,
  Text,
  Linking,
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

function UniFocusScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewCare}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.textHeaderCare}>Focus Skills</Text>
          <View style={styles.buttonUni}>
            <Text style={styles.introText}>Improve Your Focus Skills:</Text>

            <Text style={styles.text}>
              Developing strong focus skills is crucial for academic success and
              personal growth. The ability to concentrate on tasks, manage time
              effectively, and avoid distractions can significantly impact your
              overall performance.
            </Text>
          </View>

          <View style={styles.buttonUni}>
            <Text style={styles.introText}>
              Enhance your focus skills with these insightful articles:
            </Text>

            <Text
              style={styles.linkText}
              onPress={() =>
                Linking.openURL(
                  "https://www.betterup.com/blog/15-ways-to-improve-your-focus-and-concentration-skills"
                )
              }
            >
              1. Tips for Improving Concentration and Focus
            </Text>

            <Text
              style={styles.linkText}
              onPress={() =>
                Linking.openURL(
                  "https://www.acadecraft.com/blog/strategies-to-help-students-focus-in-the-classroom/"
                )
              }
            >
              2. Strategies to Boost Student Concentration in the Classroom
            </Text>

            <Text
              style={styles.linkText}
              onPress={() =>
                Linking.openURL(
                  "https://www.oxfordinternationaleducationgroup.com/7-ways-to-increase-memory-power-in-students/"
                )
              }
            >
              3. Memory Improvement Techniques for Students
            </Text>
          </View>

          <Pressable
            style={styles.buttonUni}
            onPress={() =>
              Linking.openURL("https://www.youtube.com/watch?v=XIQinUyFeFg")
            }
          >
            <AntDesign name="youtube" size={50} color="black" />
            <Text style={styles.textButton}>
              Check out this informative video on enhancing focus skills during
              university life - 3mins.
            </Text>
          </Pressable>
          <Pressable
            style={styles.buttonUni}
            onPress={() =>
              Linking.openURL("https://www.youtube.com/watch?v=ldC3R7RgFYY")
            }
          >
            <AntDesign name="youtube" size={50} color="black" />
            <Text style={styles.textButton}>
              Listen to this podcast made for caregivers that shares tips on how
              to stop feeling distracted and overwhelmed - 37mins.
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonUni: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "white",
    margin: 15,
    width: 290,
  },
  introText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
    textAlign: "center",
  },
  linkText: {
    color: "#4F609B",
    fontSize: 16,
    textDecorationLine: "underline",
    marginTop: 8,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
    textAlign: "center",
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    textAlign: "center",
  },
  textHeaderCare: {
    fontSize: 25,
    lineHeight: 26,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    margin: 15,
    marginTop: 30,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#4F609B",
  },
  scrollViewCare: {
    marginHorizontal: 5,
  },
});

export default UniFocusScreen;
