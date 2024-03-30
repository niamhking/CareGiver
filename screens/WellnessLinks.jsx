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

function WellnessLinks({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewCare}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#93c59d",
          }}
        >
          <Text style={styles.textHeaderCare}>
            Links for Personal Wellbeing
          </Text>
          <Pressable
            style={styles.button}
            onPress={() =>
              Linking.openURL(
                "https://www.cdc.gov/physicalactivity/basics/pa-health/index.htm#:~:text=Regular%20physical%20activity%20is%20one,ability%20to%20do%20everyday%20activities."
              )
            }
            accessible={true}
            accessibilityRole="button"
          >
            <Text style={styles.text}>Benefits of Regular Exercise</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() =>
              Linking.openURL(
                "https://www.calm.com/blog/mental-health-exercises"
              )
            }
            accessible={true}
            accessibilityRole="button"
          >
            <Text style={styles.text}>Wellness Exercises</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() =>
              Linking.openURL(
                "https://www.nhs.uk/live-well/exercise/gym-free-workouts/"
              )
            }
            accessible={true}
            accessibilityRole="button"
          >
            <Text style={styles.text}>NHS Recommended Gym-Free Workouts</Text>
          </Pressable>
          <View style={styles.buttonQuote}>
            <Text style={styles.textQuote}>
              "Wellness is not just about the body; it's also about the mind and
              spirit. Take time for self-care and embrace activities that
              promote your well-being."
            </Text>
          </View>
          <Pressable
            style={styles.button}
            onPress={() =>
              Linking.openURL(
                "https://www.carersuk.org/media/g5icgqmw/carers-uk-eating-well-for-carers-2021.pdf"
              )
            }
            accessible={true}
            accessibilityRole="button"
          >
            <Text style={styles.text}>Nutrition Advice for Carers</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() =>
              Linking.openURL(
                "https://www.carersuk.org/help-and-advice/your-health-and-wellbeing/getting-enough-sleep/#:~:text=Some%20useful%20tips%3A,of%20your%20natural%20rest%20patterns."
              )
            }
            accessible={true}
            accessibilityRole="button"
          >
            <Text style={styles.text}>Carers UK - Sleep Advice</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() =>
              Linking.openURL(
                "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/five-steps-to-mental-wellbeing/"
              )
            }
            accessible={true}
            accessibilityRole="button"
          >
            <Text style={styles.text}>
              NHS Recommended Ways to Improve Mental Wellness
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#558e72",
    margin: 12,
    width: 270,
  },
  buttonQuote: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 22,
    backgroundColor: "#386c5f",
    margin: 15,
    width: 270,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
  textQuote: {
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: "white",
    fontStyle: "italic",
  },
  textHeaderCare: {
    fontSize: 23,
    lineHeight: 26,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    margin: 10,
    marginTop: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#93c59d",
  },
});

export default WellnessLinks;
