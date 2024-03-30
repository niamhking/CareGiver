import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  UniScreen,
  CareScreen,
  StressScreen,
  Scheduler,
  UniSupportScreen,
  UniTimeScreen,
  UniFocusScreen,
  CareTrackerScreen,
  HomeScreen,
  WellbeingScreen,
  CareNewLog,
  CareLinks,
  SchedulerNew,
  WellnessTracking,
  WellnessNewLog,
  SensorResults,
  StressTips,
  WellnessLinks,
  WellnessAnalytics,
  StressInfo,
  CarerAnalytics,
} from "./screens";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const HeaderMenu = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation2 = useNavigation();

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="menu" size={40} color="white" />
      </TouchableOpacity>

      {/* Modal for the menu options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, flexDirection: "row", marginTop: 70 }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={closeModal} />
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              padding: 20,
              borderRadius: 10,
              width: 200,
            }}
          >
            <TouchableOpacity onPress={() => navigation2.navigate("Home")}>
              <Text style={styles.menuItem}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation2.navigate("Wellbeing")}>
              <Text style={styles.menuItem}>Wellbeing</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation2.navigate("Care Profile")}
            >
              <Text style={styles.menuItem}>Care Support</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation2.navigate("University")}
            >
              <Text style={styles.menuItem}>University</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation2.navigate("Scheduler")}>
              <Text style={styles.menuItem}>Daily Scheduler</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation2.navigate("Stress")}>
              <Text style={styles.menuItem}>Stress Monitoring</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  menuItem: {
    fontSize: 18,
    marginBottom: 20,
    color: "#333",
  },
};

function LogoTitle() {
  const navigation2 = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <TouchableOpacity onPress={() => navigation2.navigate("Home")}>
        <Image
          style={{ width: 80, height: 70 }}
          source={require("./assets/whiteLogo.png")}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          width: "100%",
          flex: 1,
          flexDirection: "row",
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => <HeaderMenu />,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: "#7ED7CC",
            },
          }}
        />
        <Stack.Screen
          name="Wellbeing"
          component={WellbeingScreen}
          options={{
            headerStyle: {
              backgroundColor: "#558e72",
            },
          }}
        />
        <Stack.Screen
          name="Wellness Tracking"
          component={WellnessTracking}
          options={{
            headerStyle: {
              backgroundColor: "#558e72",
            },
          }}
        />
        <Stack.Screen
          name="Wellness New Log"
          component={WellnessNewLog}
          options={{
            headerStyle: {
              backgroundColor: "#558e72",
            },
          }}
        />
        <Stack.Screen
          name="Wellness Links"
          component={WellnessLinks}
          options={{
            headerStyle: {
              backgroundColor: "#558e72",
            },
          }}
        />
        <Stack.Screen
          name="Wellness Analytics"
          component={WellnessAnalytics}
          options={{
            headerStyle: {
              backgroundColor: "#558e72",
            },
          }}
        />
        <Stack.Screen
          name="University"
          component={UniScreen}
          options={{
            headerStyle: {
              backgroundColor: "#2d334a",
            },
          }}
        />
        <Stack.Screen
          name="UniSupport"
          component={UniSupportScreen}
          options={{
            headerStyle: {
              backgroundColor: "#2d334a",
            },
          }}
        />
        <Stack.Screen
          name="UniTime"
          component={UniTimeScreen}
          options={{
            headerStyle: {
              backgroundColor: "#2d334a",
            },
          }}
        />
        <Stack.Screen
          name="UniFocus"
          component={UniFocusScreen}
          options={{
            headerStyle: {
              backgroundColor: "#2d334a",
            },
          }}
        />
        <Stack.Screen
          name="Stress"
          component={StressScreen}
          options={{
            headerStyle: {
              backgroundColor: "#7c9fb4",
            },
          }}
        />
        <Stack.Screen
          name="Stress Tips"
          component={StressTips}
          options={{
            headerStyle: {
              backgroundColor: "#7c9fb4",
            },
          }}
        />
        <Stack.Screen
          name="Sensor Results"
          component={SensorResults}
          options={{
            headerStyle: {
              backgroundColor: "#7c9fb4",
            },
          }}
        />
        <Stack.Screen
          name="Stress Info"
          component={StressInfo}
          options={{
            headerStyle: {
              backgroundColor: "#7c9fb4",
            },
          }}
        />
        <Stack.Screen
          name="Care Profile"
          component={CareScreen}
          options={{
            headerStyle: {
              backgroundColor: "#7c9fb4",
            },
          }}
        />
        <Stack.Screen
          name="Care Tracker"
          component={CareTrackerScreen}
          options={{
            headerStyle: {
              backgroundColor: "#7c9fb4",
            },
          }}
        />
        <Stack.Screen
          name="Care New Log"
          component={CareNewLog}
          options={{
            headerStyle: {
              backgroundColor: "#7c9fb4",
            },
          }}
        />
        <Stack.Screen
          name="Care Links"
          component={CareLinks}
          options={{
            headerStyle: {
              backgroundColor: "#7c9fb4",
            },
          }}
        />
        <Stack.Screen
          name="Care Analytics"
          component={CarerAnalytics}
          options={{
            headerStyle: {
              backgroundColor: "#7c9fb4",
            },
          }}
        />
        <Stack.Screen
          name="Scheduler"
          component={Scheduler}
          options={{
            headerStyle: {
              backgroundColor: "#9DE2FF",
            },
          }}
        />
        <Stack.Screen
          name="Scheduler New"
          component={SchedulerNew}
          options={{
            headerStyle: {
              backgroundColor: "#9DE2FF",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
