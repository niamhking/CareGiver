import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  Dimensions,
  Image,
} from "react-native";
import DeviceModal from "./DeviceConnectionModal";
import useBLE from "./useBLE";
import Carousel from "react-native-reanimated-carousel";
import Tts from "react-native-tts";
import { AntDesign } from "@expo/vector-icons";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

function StressScreen({ navigation }) {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    heartRate,
    disconnectFromDevice,
  } = useBLE();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInstructionModalVisible, setIsInstructionModalVisible] =
    useState(false);

  // Array of images for each step
  const instructionImages = [
    require("./img/img1.png"),
    require("./img/img2.png"),
    require("./img/img3.png"),
    require("./img/img4.png"),
    require("./img/img5.png"),
    require("./img/img6.png"),
    require("./img/img7.png"),
    require("./img/reset.png"),
    require("./img/disclaimer.png"),
    // Add more images for each step as needed
  ];

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

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

  const textToSpeech = (text) => {
    Tts.speak(text);
  };

  // Render item function for the Carousel component
  const renderCarouselItem = ({ item, index }) => {
    // Array of texts corresponding to each image index
    const instructionTexts = [
      "Switch the power on using the switch on the bottom of the device or plug it in with a micro-USB cable. Once on the device will light up and show a ring of red lights - this means the board is ready to connect.",
      "Connect to the sensor from the app, if available it will be shown as Stress Sensor. If no options are visible please see the reset note at the end of the instructions.",
      "Once connected to the sensor you need to place your index finger lightly on the sensor and secure with the velcro strap maintaining light pressure.",
      "Face the board so that the opening with the sensor wires is facing away from you. Press the left button on the board to start the readings - try to not move too much or change the pressure on the sensor.",
      "You can take measurements for as long as you wish but for reasonable accuracy take readings for 30 to 60 seconds, the longer the better. As each 10 seconds passes a green light will turn on to illustrate how much time has passed - the image above shows 60 seconds having passed.",
      "Once you have finished taking your measurements, please press the right button on the board to stop the sensor.",
      "If a successful measurement has been taken you will see a new button appearing, select this option to view your recommended exercise to improve your stress levels",
      "Check power source of sensor and reset the board by pressing the smaller middle button - the lights will briefly flash but you should see the constant red ring of lights again.",
      "Disclaimer - No content on this app, regardless of date, should ever be used as a substitute for direct medical advice from your doctor or other qualified clinician.",
      // Add more texts for each image as needed
    ];

    const titleTexts = [
      "Step 1",
      "Step 2",
      "Step 3",
      "Step 4",
      "Step 5",
      "Step 6",
      "Step 7",
      "Reseting the Device",
      "Disclaimer",
    ];

    const currentText = instructionTexts[index];

    return (
      <View style={styles.carouselItemContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.carouselItemTitleText2}>{titleTexts[index]}</Text>
          <Pressable onPress={() => textToSpeech(currentText)}>
            <AntDesign name="sound" size={30} color="white" />
          </Pressable>
        </View>
        <Image
          source={item}
          style={styles.carouselItemImage}
          resizeMode="contain"
        />
        <Text style={styles.carouselItemText}>{instructionTexts[index]}</Text>
      </View>
    );
  };

  const navigateToSensorResults = () => {
    // Use the navigation prop to navigate to the SensorResults screen
    navigation.navigate("Sensor Results", { cv: heartRate });
  };

  const navigateToSensorResultsTest = () => {
    // Use the navigation prop to navigate to the SensorResults screen
    navigation.navigate("Sensor Results", { cv: 3 });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#8fbdcb",
          }}
        >
          <Text style={styles.textHeader}>Stress Monitoring</Text>

          <Text style={styles.textHead}>
            Monitor your current stress levels and get suggested exercises to
            help you relax:
          </Text>
          {connectedDevice ? (
            <>
              <Text style={styles.textBody}>
                You're connected to the stress sensor, please take your readings
              </Text>
              {/* Check the value of heartRate and navigate to SensorResults accordingly */}
              {heartRate >= 1 && heartRate <= 4 && (
                <Pressable
                  style={styles.button}
                  onPress={navigateToSensorResults}
                >
                  <Text style={styles.text}>View Recommendations</Text>
                </Pressable>
              )}
            </>
          ) : (
            <Text style={[styles.text, { textAlign: "center" }]}>
              Stress Monitor not yet connected
            </Text>
          )}
          <Pressable
            style={styles.buttonSum}
            onPress={connectedDevice ? disconnectFromDevice : openModal}
          >
            <Text style={styles.textSum}>
              {connectedDevice ? "Disconnect" : "Connect"}
            </Text>
          </Pressable>
          <DeviceModal
            closeModal={hideModal}
            visible={isModalVisible}
            connectToPeripheral={connectToDevice}
            devices={allDevices}
          />
          <Pressable style={styles.button} onPress={toggleInstructionModal}>
            <Text style={styles.text}>How to Use</Text>
          </Pressable>
          <Pressable
            style={[styles.button, { alignItems: "center" }]}
            onPress={() => navigation.navigate("Stress Tips")}
          >
            <Text style={[styles.text, { textAlign: "center" }]}>
              Stress Management Resources
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, { alignItems: "center" }]}
            onPress={() => navigation.navigate("Stress Info")}
          >
            <Text style={[styles.text, { textAlign: "center" }]}>
              How the Sensor Works
            </Text>
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
            <View>
              <View style={styles.carouselContainer}>
                <Text style={styles.carouselItemTitleText}>
                  Swipe to View Steps
                </Text>
                <Carousel
                  loop
                  width={width * 0.8}
                  height={height * 0.8}
                  mode="parallax"
                  modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 10,
                  }}
                  autoPlay={false}
                  data={instructionImages} // Pass the instructionImages array here
                  renderItem={renderCarouselItem} // Use the renderCarouselItem function
                />
              </View>
            </View>
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
  container: {
    flex: 1,
    backgroundColor: "#E1F2ED",
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#8fbdcb",
  },
  scrollContainer2: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 30,
  },
  carouselContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: height, // Adjust height to fit the modal
  },
  carouselItemContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselItemImage: {
    width: width - 40, // Adjust the width to fit within the carousel
    height: width - 40, // Adjust the height to maintain aspect ratio
    resizeMode: "contain",
  },
  carouselItemText: {
    fontSize: 16,
    lineHeight: 18,
    color: "white",
    textAlign: "center",
    flexWrap: "wrap",
    marginTop: 30,
  },
  carouselItemTitleText: {
    fontSize: 22,
    lineHeight: 23,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  carouselItemTitleText2: {
    fontSize: 22,
    lineHeight: 23,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    paddingEnd: 20,
  },
  closeButton: {
    marginBottom: 30,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#7c9fb4",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#E1F2ED",
    margin: 15,
    width: 250,
  },
  buttonPress: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#7392A9",
    margin: 15,
    width: 250,
  },
  buttonSum: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#7c9fb4",
    margin: 15,
    width: 250,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    padding: 15,
  },
  textHead: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
    padding: 15,
  },
  textBody: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
    padding: 15,
  },
  textSum: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    padding: 10,
  },
  textHeader: {
    fontSize: 25,
    lineHeight: 26,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    margin: 15,
  },
});

export default StressScreen;
