import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ref, push } from "firebase/database";
import { Database } from "../components/config";
import { ToastAndroid } from "react-native";

function SchedulerNew({ navigation }) {
  const [expected, setExpectedTime] = useState("");
  const [title, setTitle] = useState("");
  const [reminder, setReminder] = useState(false);
  const [priority, setPriority] = useState("0");
  const [note, setNote] = useState("");
  const [dueDate, setdueDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [missingFields, setMissingFields] = useState([]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    // Create a Date object from the original date string
    const dateObject = new Date(selectedDate);
    // Extract date components in 'YYYY-MM-DD' format
    const formattedDate = dateObject.toISOString().slice(0, 10);
    setdueDate(formattedDate);
    hideDatePicker();
  };

  const toggleReminder = () => {
    setReminder((prevReminder) => !prevReminder); // Toggle the reminder state
  };

  const handleAddEntry = async () => {
    const missing = [];

    if (!dueDate) {
      missing.push("Date");
    }

    if (!title) {
      missing.push("Title");
    }

    if (priority === "0") {
      missing.push("Priority");
    }

    setMissingFields(missing);

    if (missing.length > 0) {
      return; // Stop execution if there are missing fields
    }

    try {
      // Update the database with the new entry
      const newEntry = {
        title,
        dueDate,
        expected,
        reminder,
        priority,
        note,
      };

      // Use push() to generate a unique key for each entry
      const entriesRef = ref(Database, "scheduler");
      const newEntryRef = push(entriesRef, newEntry);

      // Reset the state after adding the entry
      setTitle("");
      setdueDate("");
      setExpectedTime("");
      setReminder(false);
      setPriority("");
      setNote("");

      // Display a success message using toast
      ToastAndroid.showWithGravityAndOffset(
        "New event saved successfully",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );

      navigation.navigate("Scheduler");
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        "Error adding event to the scheduler",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
      console.error("Error adding entry to the database: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewCare}>
        <View style={styles.container}>
          <Text style={styles.textHeader}>Keep track of your events:</Text>
          <View style={styles.rectView}>
            {missingFields.includes("Title") && (
              <Text style={styles.errorText}>Title is required</Text>
            )}
            <TextInput
              style={styles.button}
              placeholder="Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />

            {missingFields.includes("Date") && (
              <Text style={styles.errorText}>Due date is required</Text>
            )}
            <Pressable style={styles.button} onPress={showDatePicker}>
              <Text style={styles.text}>
                {dueDate ? dueDate.slice(0, 10) : "Select Due Date"}
              </Text>
            </Pressable>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <Text style={styles.pickerLabel}>Expected Time Taken:</Text>
            <View style={styles.buttonPicker}>
              <Picker
                selectedValue={expected}
                style={styles.picker}
                onValueChange={(itemValue) => setExpectedTime(itemValue)}
              >
                {/* Default option */}
                <Picker.Item label="" value="0" />
                <Picker.Item
                  label="Less than 1 hour"
                  value="Less than 1 hour"
                />
                <Picker.Item label="1-2 hours" value="1-2 hours" />
                <Picker.Item label="2-4 hours" value="2-4 hours" />
                <Picker.Item
                  label="Half a day (4-6 hours)"
                  value="Half a day (4-6 hours)"
                />
                <Picker.Item
                  label="Full day (6-8 hours or more)"
                  value="Full day (6-8 hours or more)"
                />
              </Picker>
            </View>

            <View style={styles.buttonSwitch}>
              <Text style={styles.pickerLabel}>
                Reminder: {reminder ? "On" : "Off"}
              </Text>
              <Switch
                style={styles.switch}
                value={reminder}
                onValueChange={toggleReminder}
              />
            </View>

            {missingFields.includes("Priority") && priority === "0" && (
              <Text style={styles.errorText}>Priority level is required</Text>
            )}
            <View style={styles.buttonPicker}>
              <Text style={styles.pickerLabel}>Select Priority:</Text>
              <Picker
                selectedValue={priority}
                style={styles.picker}
                onValueChange={(itemValue) => setPriority(itemValue)}
              >
                {/* Default option */}
                <Picker.Item label="" value="0" />
                <Picker.Item label="1 - Trivial" value="1" />
                <Picker.Item label="2 - Low" value="2" />
                <Picker.Item label="3 - Moderate" value="3" />
                <Picker.Item label="4 - High" value="4" />
                <Picker.Item label="5 - Urgent" value="5" />
              </Picker>
            </View>

            <TextInput
              style={styles.button}
              placeholder="Note"
              value={note}
              onChangeText={(text) => setNote(text)}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonSubmit}
            onPress={handleAddEntry}
          >
            <Text style={styles.text}>Add New Event</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#8CCEEA",
    margin: 15,
    width: 250,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "left",
  },
  buttonSwitch: {
    alignItems: "absolute",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#8CCEEA",
    margin: 15,
    width: 250,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "left",
    flexDirection: "row",
  },
  buttonPicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 12,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#8CCEEA",
    margin: 15,
    width: 250,
  },
  switch: {
    marginLeft: 70,
  },
  pickerLabel: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    marginRight: 5,
  },
  picker: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 5,
    color: "white",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  buttonSubmit: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#7CBCEA",
    margin: 10,
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
    textAlign: "center",
    paddingBottom: 20,
    paddingTop: 10,
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
    backgroundColor: "#7CBCEA",
    marginHorizontal: 18,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#DAF4FF",
    alignItems: "center",
  },
  scrollViewCare: {
    marginHorizontal: 5,
  },
});

export default SchedulerNew;
