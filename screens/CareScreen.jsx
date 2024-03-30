import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

function CareScreen({ navigation }) {
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
      <ScrollView style={styles.scrollViewCare}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.textHeaderCare}>Caring Support</Text>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Care Tracker")}
          >
            <AntDesign name="form" size={50} color="black" />
            <Text style={styles.text}>
              Care Receiver Mood, Behaviour and Symptom Tracker
            </Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Care Analytics")}
          >
            <AntDesign name="barschart" size={50} color="black" />
            <Text style={styles.text}>Analytics</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={toggleInstructionModal}>
            <Ionicons
              name="information-circle-outline"
              size={50}
              color="black"
            />
            <Text style={styles.text}>How to Use</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Care Links")}
          >
            <Feather name="link" size={50} color="black" />
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
                Steps to add an event to the Care Receiver's Tracker:
                {"\n\n"}1 - Navigate to the Care Support page and select the
                "Mood, Behavioral and Symptom Tracker" option.
                {"\n\n"}2 - View logs for the current or previous days. A blue
                dot will indicate logged items for specific dates.
                {"\n\n"}3 - To add a new entry, press the "New Entry" button at
                the bottom of the screen.
                {"\n\n"}4 - Complete the form with information about the event.
                Required fields include:
                {"\n\n\t"}- Category: Mood, Behavior, Symptom...
                {"\n\t"}- Severity level: Rate the severity of this {"\n\t\t"}{" "}
                event on the care receiver.
                {"\n\t"}- Date: Select the date of the entry using {"\n\t\t"}{" "}
                the date picker.
                {"\n\n"}5 - You can provide additional details about how the
                care receiver is feeling and how the event is impacting them.
                {"\n\n"}6 - Observations based on entries can be viewed from the
                Analytics page. Additionally, if you wish to share this tracked
                information you can download a text report to share with
                relevant health proffesionals using the 'Download Summary'
                button at the bottom of the page.
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
    width: 275,
  },
  buttonPress: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#385869",
    margin: 15,
    width: 275,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 10,
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
    backgroundColor: "#7c9fb4",
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
    color: "black",
    textAlign: "center",
    paddingTop: 10,
  },
  textPress: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  textHeaderCare: {
    fontSize: 25,
    lineHeight: 26,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    marginTop: 30,
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#8fbdcb",
  },
  scrollViewCare: {},
});

export default CareScreen;
