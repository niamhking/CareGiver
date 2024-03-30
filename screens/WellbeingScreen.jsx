import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const WellbeingScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInstructionModalVisible, setIsInstructionModalVisible] =
    useState(false);

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };

  const toggleInstructionModal = () => {
    setIsInstructionModalVisible(!isInstructionModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={styles.textHeader}>Personal Wellbeing</Text>
            <FontAwesome5 name="smile-beam" size={25} color="black" />
          </View>

          <Pressable
            style={styles.buttonWell}
            onPress={() => navigation.navigate("Wellness Tracking")}
          >
            <AntDesign name="form" size={50} color="#FFF" />
            <Text style={styles.text}>Mood and Behavioural Tracker</Text>
          </Pressable>

          <Pressable
            style={styles.buttonWell}
            onPress={() => navigation.navigate("Wellness Analytics")}
          >
            <AntDesign name="barschart" size={50} color="#FFF" />
            <Text style={styles.text}>Analytics</Text>
          </Pressable>

          <Pressable style={styles.buttonWell} onPress={toggleInstructionModal}>
            <Ionicons
              name="information-circle-outline"
              size={50}
              color="#FFF"
            />
            <Text style={styles.text}>How to Use</Text>
          </Pressable>

          <Pressable
            style={styles.buttonWell}
            onPress={() => navigation.navigate("Wellness Links")}
          >
            <Feather name="link" size={50} color="white" />
            <Text style={styles.text}>Helpful Links</Text>
          </Pressable>
        </View>

        {/* Instruction Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isInstructionModalVisible}
          onRequestClose={toggleInstructionModal}
        >
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer2}>
              {/* Add your instruction text here */}
              <Text style={styles.modalText}>
                Steps to add an event to the Mood and Behavioral Tracker:
                {"\n\n"}1 - Navigate to the Wellness page and select the "Mood
                and Behavioral Tracker" option.
                {"\n\n"}2 - View logs for the current or previous days. A green
                dot will indicate logged items for specific dates.
                {"\n\n"}3 - To add a new entry, press the "New Entry" button at
                the bottom of the screen.
                {"\n\n"}4 - Complete the form with information about the event.
                Required fields include:
                {"\n\n\t"}- Category: work, home, university,{"\n\t\t"}{" "}
                friends...
                {"\n\t"}- Impact level: Rate the impact of this{"\n\t\t"} event
                on your mood or behavior.
                {"\n\t"}- Date: Select the date of the entry using {"\n\t\t"}{" "}
                the date picker.
                {"\n\n"}5 - You can provide additional details about how you are
                feeling and how the event is impacting you.
                {"\n\n"}6 - Observations based on your entries can be observed
                from the Analytics page.
              </Text>
            </ScrollView>
            <Pressable
              style={styles.closeButton}
              onPress={toggleInstructionModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonWell: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#386c5f",
    margin: 15,
    width: 250,
  },
  gridContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15, // Adjust spacing between rows if needed
  },
  gridItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#386c5f",
    marginHorizontal: 10,
    width: 250,
  },
  modalContainer: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
    padding: 15,
  },
  closeButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#93c59d",
    marginBottom: 20,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
    paddingTop: 10,
  },
  textHeader: {
    fontSize: 25,
    lineHeight: 26,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    margin: 15,
  },
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#93c59d",
  },
  containerHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 10,
  },
});

export default WellbeingScreen;
