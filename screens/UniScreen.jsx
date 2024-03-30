import { Image } from "react-native";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Linking,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

function LogoTitle() {
  return (
    <Image
      style={{ width: 100, height: 100, marginTop: 30 }}
      source={require("../assets/strathLogo.png")}
      resizeMode="contain"
    />
  );
}

function UniScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewCare}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LogoTitle />
          <Text style={styles.textHeaderCare}>University Support</Text>
          <Pressable
            style={styles.buttonUni}
            onPress={() => navigation.navigate("UniSupport")}
          >
            <Fontisto name="email" size={50} color="black" />
            <Text style={styles.text}>Ask for Assistance</Text>
          </Pressable>

          <Pressable
            style={styles.buttonUni}
            onPress={() =>
              Linking.openURL(
                "https://www.strath.ac.uk/professionalservices/library/researchrevise/collections/eresourcesonlineresources/"
              )
            }
          >
            <Ionicons name="library-outline" size={50} color="black" />
            <Text style={styles.text}>Library Resources</Text>
          </Pressable>

          <Pressable
            style={styles.buttonUni}
            onPress={() => navigation.navigate("UniTime")}
          >
            <MaterialIcons name="access-time" size={50} color="black" />
            <Text style={styles.text}>Time Management Tips</Text>
          </Pressable>

          <Pressable
            style={styles.buttonUni}
            onPress={() => navigation.navigate("UniFocus")}
          >
            <Octicons name="tasklist" size={50} color="black" />
            <Text style={styles.text}>Maintaining Focus Tips</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonUni: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "white",
    margin: 16,
    width: 275,
    flexDirection: "row", // Added to align items in a row
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    paddingLeft: 10,
  },
  textHeaderCare: {
    fontSize: 25,
    lineHeight: 26,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    margin: 10,
    paddingTop: 10,
    paddingBottom: 15,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4F609B",
  },
  scrollViewCare: {
    marginHorizontal: 5,
  },
});

export default UniScreen;
