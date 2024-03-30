import {
  View,
  Text,
  Linking,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

function StressInfo({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.textHeader}>How the Sensor Works</Text>
          <View style={styles.button}>
            <Text style={styles.textSubHeader}>PPG Sensors:</Text>
            <Text style={styles.text}>
              A Photoplethysmogram (PPG), in this case a Pulse Sensor, is a way
              to measure changes in blood volume by shining light into the skin
              and measuring the amount of light absorbed by blood vessels. In
              simpler terms, it helps us understand how our blood circulation
              changes over time.
            </Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.textSubHeader}>Biofeedback:</Text>
            <Text style={styles.text}>
              Biofeedback is the process of turning physiological information
              into a stress level. In our case, we measure the variance in pulse
              intervals, known as Heart Rate Variability (HRV), and calculate
              the Coefficient of Variation (CV). A higher CV indicates more
              irregularity in the intervals between heartbeats, this is strongly
              linked to stress or other physiological factors.
            </Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.textSubHeader}>HRV Calculation:</Text>
            <Text style={styles.text}>
              While it's possible to calculate HRV with a pulse sensor, the
              accuracy may not match dedicated ECG equipment. Given the
              project's goal to offer a quick stress guide for student carers,
              the HRV calculation is carried out using a PPG (Pulse Sensor) -
              for its simplicity and portability. It's important to note that
              stress is complex, and individual responses vary; interpretations
              are based on general associations.
            </Text>
          </View>

          <View style={styles.button}>
            <Text style={styles.textSubHeader}>Bluetooth Communication:</Text>
            <Text style={styles.text}>
              The calculated stress level is then sent to users mobile devices
              via Bluetooth from the circuit board. Users can then view the
              receives target stress reduction exercise on their devices.
            </Text>
          </View>

          {/* Websites and Online Platforms */}
          <View style={styles.button}>
            <Text style={styles.textResource}>
              Websites that cover HRV and CV analysis agaisnt stress in depth:
            </Text>

            <Text style={styles.text}>
              Stress and Heart Rate Variability: A Meta-Analysis and Review of
              the Literature
            </Text>
            <Pressable
              style={styles.buttonPress}
              onPress={() =>
                Linking.openURL(
                  "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5900369/"
                )
              }
            >
              <Text style={styles.textPress}>
                National Institutes of Health
              </Text>
            </Pressable>
            <Text style={styles.text}>
              Article on improving HRV data interpretation with the Coefficient
              of Variation
            </Text>
            <Pressable
              style={styles.buttonPress}
              onPress={() =>
                Linking.openURL(
                  "https://elitehrv.com/improving-hrv-data-interpretation-coefficient-variation"
                )
              }
            >
              <Text style={styles.textPress}>EHRV</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fbdcb",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#E1F2ED",
    margin: 15,
    width: 300,
  },
  container: {
    flex: 1,
    backgroundColor: "#E1F2ED",
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
  text: {
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: "black",
    padding: 10,
    textAlign: "left",
  },
  textResource: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    padding: 5,
  },
  textPress: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
  textHeader: {
    fontSize: 25,
    lineHeight: 26,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    margin: 15,
    marginTop: 25,
  },
  textSubHeader: {
    fontSize: 18,
    lineHeight: 19,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    paddingTop: 5,
  },
});

export default StressInfo;
