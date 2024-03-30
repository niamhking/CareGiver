import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ref, push, onValue } from "firebase/database";
import { Database } from "../components/config";
import { ToastAndroid } from "react-native";
import NewCategoryModal from "./CategoryModal"; // Import the modal component

function WellnessNewLog({ navigation }) {
  const [category, setCategory] = useState("");
  const [feel, setFeel] = useState("");
  const [description, setDescription] = useState("");
  const [impact, setImpact] = useState("0");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [items, setItems] = useState({});
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const dateObject = new Date(date);
    const formattedDate = dateObject.toISOString().slice(0, 10);
    setDate(formattedDate);
    hideDatePicker();
  };

  const handleAddEntry = async () => {
    const missing = [];

    if (!date) {
      missing.push("Date");
    }

    if (impact === "0") {
      missing.push("Impact level");
    }

    if (!category) {
      missing.push("Category");
    }

    setMissingFields(missing);

    if (missing.length > 0) {
      return;
    }

    try {
      const newEntry = {
        category,
        feel,
        description,
        impact,
        note,
        date,
      };

      const entriesRef = ref(Database, "moodEntries");
      const newEntryRef = push(entriesRef, newEntry);

      setCategory("");
      setFeel("");
      setDescription("");
      setImpact("");
      setNote("");
      setDate("");

      ToastAndroid.showWithGravityAndOffset(
        "Tracked entry saved successfully",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );

      navigation.navigate("Wellness Tracking");
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        "Error adding entry to the tracker",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
      console.error("Error adding entry to the tracker: ", error);
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

        onValue(moodEntriesRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const transformedData = transformDataForAgenda(data);
            setItems(transformedData);

            const uniqueCategories = new Set();
            Object.values(data).forEach((entry) => {
              const category = entry.category.trim();
              uniqueCategories.add(category);
            });
            setCategoryOptions(Array.from(uniqueCategories));
          }
        });
      } catch (error) {
        console.error("Error fetching mood entries from Firebase: ", error);
      }
    };

    fetchMoodEntries();
  }, []);

  const handleCreateCategory = (newCategory) => {
    // Add the new category to the categoryOptions
    setCategoryOptions([...categoryOptions, newCategory]);
    // Set the new category as selected
    setCategory(newCategory);
    // Close the modal
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewCare}>
        <View style={styles.container}>
          <Text style={styles.textHeader}>Track your behaviour/mood:</Text>
          <View style={styles.rectView}>
            {missingFields.includes("Category") && (
              <Text style={styles.errorText}>Category is required</Text>
            )}
            <View style={styles.buttonPicker}>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => {
                  if (itemValue === "__new__") {
                    setModalVisible(true);
                  } else {
                    setCategory(itemValue);
                  }
                }}
                style={styles.picker}
              >
                <Picker.Item label="Category" value="" />
                {categoryOptions.map((option, index) => (
                  <Picker.Item key={index} label={option} value={option} />
                ))}
                <Picker.Item label="Create New Category" value="__new__" />
              </Picker>
            </View>
            <TextInput
              style={styles.button}
              placeholder="How do you feel?"
              value={feel}
              onChangeText={(text) => setFeel(text)}
            />
            <TextInput
              style={styles.button}
              placeholder="Why do you think this is?"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            {missingFields.includes("Impact level") && impact === "0" && (
              <Text style={styles.errorText}>Impact level is required</Text>
            )}
            <View style={styles.buttonPicker}>
              <Picker
                selectedValue={impact}
                style={styles.picker}
                onValueChange={(itemValue) => setImpact(itemValue)}
              >
                <Picker.Item label="Impact level" value="0" />
                <Picker.Item label="1 - Low" value="1" />
                <Picker.Item label="2 - Slight" value="2" />
                <Picker.Item label="3 - Moderate" value="3" />
                <Picker.Item label="4 - High" value="4" />
                <Picker.Item label="5 - Severe" value="5" />
              </Picker>
            </View>

            <TextInput
              style={styles.button}
              placeholder="What could help going on?"
              value={note}
              onChangeText={(text) => setNote(text)}
            />
            {missingFields.includes("Date") && (
              <Text style={styles.errorText}>Date is required</Text>
            )}
            <Pressable style={styles.button} onPress={showDatePicker}>
              <Text style={styles.text}>
                {date ? date.slice(0, 10) : "Select Date"}
              </Text>
            </Pressable>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonSubmit}
            onPress={handleAddEntry}
          >
            <Text style={styles.text}>Add New Entry</Text>
          </TouchableOpacity>
        </View>
        {/* Modal for creating a new category */}
        <NewCategoryModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onCreate={handleCreateCategory}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "baseline",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#6fa263",
    margin: 15,
    width: 250,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "left",
  },
  buttonPicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#6fa263",
    margin: 15,
    width: 250,
  },
  pickerLabel: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    color: "white",
  },
  buttonSubmit: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#386C5F",
    margin: 15,
    width: 250,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  errorText: {
    color: "red",
    textAlign: "left",
  },
  textHeader: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    margin: 15,
    textAlign: "center",
    paddingBottom: 10,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: "white",
  },
  rectView: {
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#386C5F",
    marginHorizontal: 18,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#93c59d",
    alignItems: "center",
  },
  scrollViewCare: {
    marginHorizontal: 5,
  },
});

export default WellnessNewLog;
