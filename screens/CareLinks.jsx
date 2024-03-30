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
import { SimpleLineIcons } from "@expo/vector-icons";

function CareBehaviour({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewCare}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#83B6C6",
          }}
        >
          <Text style={styles.textHeaderCare}>Useful Links for Carers</Text>
          <Pressable
            style={styles.button}
            onPress={() =>
              Linking.openURL(
                "https://www.nhs.uk/conditions/social-care-and-support-guide/practical-tips-if-you-care-for-someone/how-to-deal-with-challenging-behaviour-in-adults/"
              )
            }
            accessible={true}
            accessibilityRole="button"
          >
            <Text style={styles.text}>Dealing with challenging behaviours</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() =>
              Linking.openURL(
                "https://carers.org/grants-and-discounts/introduction"
              )
            }
            accessible={true}
            accessibilityRole="button"
          >
            <Text style={styles.text}>Funding Opportunities</Text>
          </Pressable>

          <View style={styles.buttonQuote}>
            <Text style={styles.textQuote}>
              Seeking help is not a burden, but a smart move. In the wise words
              of Albert Einstein, 'The only source of knowledge is experience'.
              Embrace the learning that comes with asking for support.
            </Text>
          </View>
          <Pressable
            style={styles.button}
            onPress={() => Linking.openURL("https://carers.org")}
            accessible={true}
            accessibilityRole="button"
          >
            <Text style={styles.text}>Carers Trust Website</Text>
          </Pressable>
          <Pressable
            style={styles.buttonCall}
            onPress={() => Linking.openURL("tel:03001231053")}
            accessible={true}
            accessibilityRole="button"
          >
            <SimpleLineIcons name="phone" size={35} color="white" />
            <Text style={styles.textCall}>Carers Trust Helpline</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() =>
              Linking.openURL(
                "https://www.nhs.uk/conditions/social-care-and-support-guide/"
              )
            }
            accessible={true}
            accessibilityRole="button"
          >
            <Text style={styles.text}>NHS Support Guide</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => Linking.openURL("https://www.nhs.uk/conditions/")}
            accessible={true}
            accessibilityRole="button"
          >
            <Text style={styles.text}>NHS Health Advice</Text>
          </Pressable>
          <Pressable
            style={styles.buttonCall}
            onPress={() => Linking.openURL("tel:111")}
            accessible={true}
            accessibilityRole="button"
          >
            <SimpleLineIcons name="phone" size={35} color="white" />
            <Text style={styles.textCall}>NHS 111 Helpline</Text>
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
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#E1F2ED",
    margin: 15,
    width: 270,
  },
  buttonQuote: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 22,
    backgroundColor: "#7c9fb4",
    margin: 15,
    width: 270,
  },
  buttonCall: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#7c9fb4",
    margin: 15,
    width: 270,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    textAlign: "center",
  },
  textCall: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    paddingTop: 10,
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
    fontSize: 25,
    lineHeight: 26,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    margin: 10,
    marginTop: 30,
  },
});

export default CareBehaviour;
