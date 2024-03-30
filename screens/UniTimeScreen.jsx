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

function UniTimeScreen({ navigation }) {
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
          <Text style={styles.textHeaderCare}>Time Management Tips</Text>
          <View style={styles.buttonUni}>
            <Text style={styles.introText}>Enhance Your Time Management:</Text>

            <Text style={styles.text}>
              Effective time management is essential for academic success and
              personal productivity. Developing skills to prioritise tasks, set
              goals, and allocate time wisely can lead to better performance and
              reduced stress.
            </Text>
          </View>

          <View style={styles.buttonUni}>
            <Text style={styles.introText}>
              Explore these insightful articles for time management tips:
            </Text>

            <Text
              style={styles.linkText}
              onPress={() =>
                Linking.openURL(
                  "https://smartcaresoftware.com/news/12-top-tips-effective-time-management-for-caregivers/"
                )
              }
            >
              1. Effective Time Management for Caregivers
            </Text>

            <Text
              style={styles.linkText}
              onPress={() =>
                Linking.openURL(
                  "https://www.forbes.com/sites/forbescoachescouncil/2023/02/13/14-time-management-practices-for-completing-your-to-do-list/"
                )
              }
            >
              2. Forbes' Time Management Practices
            </Text>

            <Text
              style={styles.linkText}
              onPress={() =>
                Linking.openURL(
                  "https://www.agingcare.com/articles/caregiver-time-management-skills-144932.htm"
                )
              }
            >
              3. Time Management Strategies for Caregivers
            </Text>
          </View>

          <Pressable
            style={styles.buttonUni}
            onPress={() =>
              Linking.openURL("https://www.youtube.com/watch?v=XqdDMNExvA0")
            }
          >
            <AntDesign name="youtube" size={50} color="black" />
            <Text style={styles.textButton}>
              Check out this informative video on effective time management
              strategies during university life.
            </Text>
          </Pressable>

          <Pressable
            style={styles.buttonUni}
            onPress={() =>
              Linking.openURL("https://www.youtube.com/watch?v=iDbdXTMnOmE")
            }
          >
            <AntDesign name="youtube" size={50} color="black" />
            <Text style={styles.textButton}>
              Brian Christian distills computer scientists' time management
              strategies over the past five decades, offering quick insights for
              optimising our own lives in a brief 5-minute video.
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

export default UniTimeScreen;
