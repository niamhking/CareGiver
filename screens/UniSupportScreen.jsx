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
import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const emailOptions = [
  {
    title: "Call university support team 'Widening Access'",
    phoneNumber: "tel:01415483799",
  },
  {
    title: "Request materials for a missed lecture",
    email: "mailto:?subject=Request for Materials",
    body: "Dear Professor [Professor's Last Name],\n\nI trust this email finds you well. I am writing to request materials for a lecture that I was unable to attend due to my responsibilities as a carer. I am eager to catch up on the content and would be grateful for any assistance you can provide.\n\nIf there are any specific materials, readings, or resources from the missed lecture that you could share, it would greatly aid my efforts to stay up-to-date with the course. Additionally, please let me know if there are any further details you require from my end.\n\nThank you for your understanding and support in this matter. I appreciate your time and assistance.\n\nBest regards,\n\n[Your Full Name]\n[Your Class/Section Information]\n[Your Contact Information]",
  },
  {
    title: "Request for University Support as a Student Carer",
    email: "mailto:wideningaccess@strath.ac.uk?subject=Request for Support",
    body: "Dear University Support Team,\n\nI hope this message finds you well. As a student with caregiving responsibilities, I am currently facing challenges in balancing my studies with my caregiving duties. I am reaching out to request general assistance from campus support services to help me navigate and manage these challenges more effectively.\n\n [Insert any specific problems here].\n\nAny guidance, resources, or support you can provide would be immensely valuable. I appreciate your understanding and assistance in this matter.\n\nSincerely,\n\n[Your Full Name]\n[Your Student ID]\n[Your Contact Information]",
  },
  {
    title: "Request for Deadline Extension due to Caregiving Responsibilities",
    email: "mailto:?subject=Deadline Extension Request",
    body: "Dear Professor [Professor's Last Name],\n\nI trust this email finds you well. I am writing to request a deadline extension for the [specific assignment or task]. Due to my responsibilities as a carer, unforeseen challenges have arisen, impacting my ability to meet the original deadline.\n\nI would be immensely grateful for your understanding and any support you can provide in extending the deadline. I assure you that I am committed to completing the assignment with the same level of dedication, despite the unforeseen circumstances.\n\nThank you for your consideration and support.\n\nSincerely,\n\n[Your Full Name]\n[Your Class/Section Information]\n[Your Contact Information]",
  },
];

function UniSupportScreen({ navigation }) {
  const handlePress = (contactInfo, body) => {
    if (contactInfo.email) {
      Linking.openURL(`${contactInfo.email}&body=${encodeURIComponent(body)}`);
    } else if (contactInfo.phoneNumber) {
      Linking.openURL(contactInfo.phoneNumber);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewCare}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#4F609B",
          }}
        >
          <Text style={styles.textHeaderCare}>Contact University</Text>

          {emailOptions.map((option, index) => (
            <Pressable
              key={index}
              style={styles.buttonUni}
              onPress={() => handlePress(option, option.body)}
            >
              {option.email ? (
                <Fontisto name="email" size={50} color="black" />
              ) : (
                <SimpleLineIcons name="phone" size={45} color="black" />
              )}
              <Text style={styles.text}>{option.title}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonUni: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "white",
    margin: 15,
    width: 270,
  },
  text: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "bold",
    letterSpacing: 0.25,
    textAlign: "center",
    color: "black",
    paddingTop: 5,
  },
  textHeaderCare: {
    fontSize: 25,
    lineHeight: 26,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    margin: 15,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#4F609B",
  },
  scrollViewCare: {
    marginHorizontal: 5,
  },
});

export default UniSupportScreen;
