import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import backgroundImage from "../assets/homePage.png"; // replace with the actual path
import { ToastAndroid } from "react-native";
import { ref, onValue } from "firebase/database";
import { Database } from "../components/config";
import moment from "moment";

function HomeScreen({ navigation }) {
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  const transformDataForAgenda = (data) => {
    const transformedData = {};
    Object.keys(data).forEach((key) => {
      const item = data[key];
      const date = item.dueDate;
      if (!transformedData[date]) {
        transformedData[date] = [];
      }
      transformedData[date].push({
        title: item.title,
        dueDate: item.dueDate,
        category: item.category,
        newReminder: item.reminder ? "On" : "Off",
        priority: item.priority,
        note: item.note,
        key: key,
      });
    });

    return transformedData;
  };

  const getPriorityText = (impactValue) => {
    switch (impactValue) {
      case "1":
        return "Trivial";
      case "2":
        return "Low";
      case "3":
        return "Moderate";
      case "4":
        return "High";
      case "5":
        return "Urgent";
      default:
        return ""; // You can set a default value or handle it accordingly
    }
  };

  const checkItemsDueTomorrow = () => {
    const nextDay = moment().add(1, "day").format("YYYY-MM-DD");
    if (items[nextDay] && items[nextDay].length > 0) {
      // Filter events that have reminder set to true
      const eventsWithReminder = items[nextDay].filter(
        (item) => item.newReminder === "On"
      );

      // Start the notification message with the number of events due tomorrow
      let notificationMessage = `You have ${eventsWithReminder.length} events due tomorrow:\n`;

      // Append each event's details to the message
      eventsWithReminder.forEach((item, index) => {
        const priorityText = getPriorityText(item.priority);
        notificationMessage += `${index + 1} - ${item.title}: ${
          item.note
        } - Priority is ${priorityText}\n`;
      });

      // Display the notification
      ToastAndroid.showWithGravityAndOffset(
        notificationMessage,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        1,
        50
      );
    }
  };

  useEffect(() => {
    const fetchMoodEntries = async () => {
      try {
        const moodEntriesRef = ref(Database, "scheduler");

        onValue(moodEntriesRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const transformedData = transformDataForAgenda(data);
            setItems(transformedData);
          } else {
            // If data is null or undefined, set items to an empty object
            setItems({});
          }
        });
      } catch (error) {
        console.error("Error fetching mood entries from Firebase: ", error);
      }
    };

    fetchMoodEntries();
  }, []); // Empty dependency array to ensure the effect runs only once

  useEffect(() => {
    // Call the function to check items due tomorrow when items state changes
    checkItemsDueTomorrow();
  }, [items]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.textHeader}>Welcome Back Niamh!</Text>
            <View style={styles.containerRow}>
              <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("Wellbeing")}
              >
                <AntDesign name="rest" size={50} color="#000000" />
                <Text style={styles.text}>Wellbeing</Text>
              </Pressable>

              <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("University")}
              >
                <FontAwesome name="university" size={50} color="black" />
                <Text style={styles.text}>University</Text>
              </Pressable>
            </View>
            <View style={styles.containerRow}>
              <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("Care Profile")}
              >
                <AntDesign name="team" size={50} color="#000000" />
                <Text style={styles.text}>Care Support</Text>
              </Pressable>

              <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("Scheduler")}
              >
                <AntDesign name="calendar" size={50} color="#000000" />
                <Text style={styles.text}>Daily Scheduler</Text>
              </Pressable>
            </View>
            <View style={styles.containerRowLast}>
              <Pressable
                style={styles.buttonRowLast}
                onPress={() => navigation.navigate("Stress")}
              >
                <FontAwesome name="heartbeat" size={60} color="#000000" />
                <Text style={styles.text}>Stress Monitoring</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#E1F2ED",
    margin: 10,
    width: 145,
    height: 125,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' depending on preference
  },
  buttonRowLast: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#E1F2ED",
    margin: 8,
    width: 300,
    height: 120,
  },
  textHeader: {
    fontSize: 28,
    lineHeight: 29,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    margin: 15,
    paddingTop: 30,
    paddingBottom: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "#b0dfd9",
  },
  containerRow: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  containerRowLast: {},
  text: {
    fontSize: 19,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    textAlign: "center",
    paddingTop: 10,
  },
});

export default HomeScreen;
