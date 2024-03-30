import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import { ref, onValue, remove, child } from "firebase/database";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Database } from "../components/config";

function WellnessTracking({ navigation }) {
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  const navigateToNewEntry = () => {
    // Use the navigation prop to navigate to the new entry page
    navigation.navigate("Wellness New Log");
  };

  const handleDeleteEntry = (entryKey) => {
    try {
      const entryRef = ref(Database, `moodEntries/${entryKey}`);
      remove(entryRef);
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const getImpactText = (impactValue) => {
    switch (impactValue) {
      case "1":
        return "Low";
      case "2":
        return "Slight";
      case "3":
        return "Moderate";
      case "4":
        return "High";
      case "5":
        return "Severe";
      default:
        return ""; // You can set a default value or handle it accordingly
    }
  };

  const transformDataForAgenda = (data) => {
    const transformedData = {};
    Object.keys(data).forEach((key) => {
      const item = data[key];
      const date = item.date;
      if (!transformedData[date]) {
        transformedData[date] = [];
      }
      transformedData[date].push({
        category: item.category,
        feel: item.feel,
        description: item.description,
        impact: item.impact,
        note: item.note,
        date: item.date,
        key: key,
      });
    });
    return transformedData;
  };

  useEffect(() => {
    const fetchMoodEntries = async () => {
      try {
        const moodEntriesRef = ref(Database, "moodEntries");

        // Set up a listener for real-time updates
        onValue(moodEntriesRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const transformedData = transformDataForAgenda(data);
            setItems(transformedData);
          }
        });
      } catch (error) {
        console.error("Error fetching mood entries from Firebase: ", error);
      }
    };

    fetchMoodEntries();
  }, []);

  const renderItem = (item) => {
    return (
      // could make this a view or leave as touchable and eventually expand functinoality eg editing etc
      <View style={styles.item}>
        <Card>
          <Card.Content style={styles.itemStyle}>
            <View>
              <View style={styles.row}>
                <Text style={[styles.boldText, styles.label]}>Category:</Text>
                <Text style={styles.content}>{item.category}</Text>
              </View>

              {item.feel !== "" && (
                <View style={styles.row}>
                  <Text style={[styles.boldText, styles.label]}>Feel:</Text>
                  <Text style={styles.content}>{item.feel}</Text>
                </View>
              )}

              {item.description !== "" && (
                <View style={styles.row}>
                  <Text style={[styles.boldText, styles.label]}>
                    Description:
                  </Text>
                  <Text style={styles.content}>{item.description}</Text>
                </View>
              )}

              {item.impact !== "" && (
                <View style={styles.row}>
                  <Text style={[styles.boldText, styles.label]}>Impact:</Text>
                  <Text style={styles.content}>
                    {getImpactText(item.impact)}
                  </Text>
                </View>
              )}

              {item.note !== "" && (
                <View style={styles.row}>
                  <Text style={[styles.boldText, styles.label]}>
                    Notes for future:
                  </Text>
                  <Text style={styles.content}>{item.note}</Text>
                </View>
              )}
              <Pressable
                style={styles.deleteButton}
                onPress={() => handleDeleteEntry(item.key)}
              >
                <MaterialCommunityIcons
                  name="delete"
                  size={24}
                  color="#E75050"
                />
              </Pressable>

              {/* <Avatar.Text label="N" /> */}
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  const renderEmptyDate = () => {
    // Check if there are no entries for the selected date
    return (
      <View style={styles.emptyDate}>
        <Text style={styles.itemText}>No entries for this day</Text>
        <Text style={styles.itemText}>
          To add an entry for your personal tracker please create one by
          selecting the 'New Entry' button below
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textHeader}>Mood and Behavioural Tracker</Text>

      <Agenda
        items={items}
        selected={selectedDate}
        renderItem={renderItem}
        renderEmptyData={renderEmptyDate}
        showClosingKnob={true}
        theme={{
          agendaTodayColor: "green",
          selectedDayBackgroundColor: "green",
          dotColor: "green",
          // backgroundColor: "lightgreen", // Set the background color for the entire agenda
          // calendarBackground: "lightgreen", // Set the background color for the calendar section
        }}
        showOnlySelectedDayItems={true}
      />
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.buttonWell}
          onPress={navigateToNewEntry}
        >
          <Text style={styles.buttonText}>New Entry</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonWell: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#386c5f",
    margin: 15,
    width: 200,
  },
  deleteButton: {
    position: "absolute",
    top: 1,
    right: 1,
    padding: 2,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  containerButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    flexWrap: "wrap",
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemStyle: {
    backgroundColor: "#93c59d",
    flex: 1,
    borderRadius: 5,
  },
  itemText: {
    color: "#888",
    fontSize: 16,
    padding: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
    flexWrap: "wrap",
  },
  boldText: {
    fontWeight: "bold",
    marginRight: 5,
  },
  textHeader: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    textAlign: "center",
    margin: 15,
  },
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "white",
  },
  scrollViewCare: {
    marginHorizontal: 5,
  },
  emptyDate: {
    height: 15,
    alignItems: "center",
    flex: 1,
    padding: 30,
  },
});

export default WellnessTracking;
