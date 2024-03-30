import * as React from "react";
import {
  View,
  Text,
  Linking,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

function StressTips({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#8fbdcb",
          }}
        >
          <Text style={styles.textHeader}>Stress Resources</Text>
          <View style={styles.button}>
            <Text style={styles.text}>
              Managing stress is crucial for maintaining mental well-being and
              overall health. In today's fast-paced world, various stress
              management resources can provide valuable guidance and support.
              Whether you prefer exploring informative websites, engaging with
              mobile apps, reading insightful books, tuning in to podcasts,
              taking online courses, or connecting through social media, the
              options are diverse.
            </Text>
            <Text style={styles.text}>
              This curated list includes reputable platforms and tools designed
              to help you understand, cope with, and alleviate stress. If you
              find that stress persists or significantly impacts your life,
              seeking guidance from a mental health professional is always a
              wise decision.
            </Text>
          </View>

          <View style={styles.button}>
            <Text style={styles.text}>
              Explore the following stress management resources across various
              mediums to find techniques and support that resonate with you.
            </Text>
          </View>

          {/* Websites and Online Platforms */}
          <View style={styles.button}>
            <Text style={styles.textResource}>
              Websites and Online Platforms:
            </Text>
            <Text style={styles.text}>
              Mind is a UK-based mental health charity, offering a wealth of
              resources on stress management, including articles and practical
              tips.
            </Text>
            <Pressable
              style={styles.buttonPress}
              onPress={() => Linking.openURL("https://www.mind.org.uk/")}
            >
              <Text style={styles.textPress}>Mind.org.uk (Mind)</Text>
            </Pressable>
            <Text style={styles.text}>
              The Mayo Clinic provides comprehensive information on stress, its
              effects on health, and effective stress management strategies.
            </Text>
            <Pressable
              style={styles.buttonPress}
              onPress={() =>
                Linking.openURL(
                  "https://www.mayoclinic.org/healthy-lifestyle/stress-management"
                )
              }
            >
              <Text style={styles.textPress}>
                Mayo Clinic - Stress Management
              </Text>
            </Pressable>
          </View>

          {/* Mobile Apps */}
          <View style={styles.button}>
            <Text style={styles.textResource}>Mobile Apps:</Text>
            <Text style={styles.text}>
              Headspace offers guided meditation and mindfulness exercises to
              help manage stress and promote relaxation.
            </Text>
            <Pressable
              style={styles.buttonPress}
              onPress={() => Linking.openURL("https://www.headspace.com/")}
            >
              <Text style={styles.textPress}>Headspace</Text>
            </Pressable>
            <Text style={styles.text}>
              Calm provides guided meditations, sleep stories, and relaxation
              music to reduce stress and improve overall well-being.
            </Text>
            <Pressable
              style={styles.buttonPress}
              onPress={() => Linking.openURL("https://www.calm.com/")}
            >
              <Text style={styles.textPress}>Calm</Text>
            </Pressable>
          </View>

          {/* Books */}
          <View style={styles.button}>
            <Text style={styles.textResource}>Books:</Text>
            <Text style={styles.text}>
              A practical guide with various techniques for managing stress by
              Martha Davis, Elizabeth Robbins Eshelman, and Matthew McKay.
            </Text>
            <Pressable
              style={styles.buttonPress}
              onPress={() =>
                Linking.openURL(
                  "https://www.amazon.com/Relaxation-Stress-Reduction-Workbook-Harbinger/dp/168403334X"
                )
              }
            >
              <Text style={styles.textPress}>
                The Relaxation and Stress Reduction Workbook
              </Text>
            </Pressable>
            <Text style={styles.text}>
              Neuroscientist Robert M. Sapolsky explores the science of stress
              and provides insights into managing stress in our lives.
            </Text>
            <Pressable
              style={styles.buttonPress}
              onPress={() =>
                Linking.openURL(
                  "https://www.amazon.com/Why-Zebras-Dont-Ulcers-Third/dp/0805073698"
                )
              }
            >
              <Text style={styles.textPress}>Why Zebras Don't Get Ulcers</Text>
            </Pressable>
          </View>

          {/* Podcasts */}
          <View style={styles.button}>
            <Text style={styles.textResource}>Podcasts:</Text>
            <Text style={styles.text}>
              This podcast focuses on mental health, mindfulness, and stress
              management, featuring discussions and interviews with experts.
            </Text>
            <Pressable
              style={styles.buttonPress}
              onPress={() => Linking.openURL("https://www.calmcollective.com/")}
            >
              <Text style={styles.textPress}>The Calm Collective</Text>
            </Pressable>
            <Text style={styles.text}>
              David Henzel discusses stress management, mindfulness, and
              personal development in this podcast.
            </Text>
            <Pressable
              style={styles.buttonPress}
              onPress={() => Linking.openURL("https://www.stresslessshow.com/")}
            >
              <Text style={styles.textPress}>
                The Stress Less Show with David Henzel
              </Text>
            </Pressable>
          </View>

          {/* Online Courses */}
          <View style={styles.button}>
            <Text style={styles.textResource}>Online Courses:</Text>

            <Text style={styles.text}>
              Explore mindfulness techniques for stress reduction and overall
              well-being with this course from Monash University.
            </Text>
            <Pressable
              style={styles.buttonPress}
              onPress={() =>
                Linking.openURL(
                  "https://www.coursera.org/learn/mindfulness-wellbeing-peak-performance"
                )
              }
            >
              <Text style={styles.textPress}>
                Coursera - Mindfulness for Wellbeing and Peak Performance
              </Text>
            </Pressable>
            <Text style={styles.text}>
              This course provides practical strategies for managing stress in
              daily life by Kain Ramsay.
            </Text>
            <Pressable
              style={styles.buttonPress}
              onPress={() =>
                Linking.openURL(
                  "https://www.udemy.com/course/stress-management-k/"
                )
              }
            >
              <Text style={styles.textPress}>
                Udemy - Stress Management: 40+ easy ways to deal with stress
              </Text>
            </Pressable>
          </View>

          {/* Social Media */}
          <View style={styles.button}>
            <Text style={styles.textResource}>Social Media:</Text>
            <Text style={styles.text}>
              For daily tips and inspiration on mental health, follow Dr. Helen
              Fisher on Instagram.
            </Text>
            <Pressable
              style={styles.buttonPress}
              onPress={() =>
                Linking.openURL("https://www.instagram.com/drhelenfisher/")
              }
            >
              <Text style={styles.textPress}>
                Follow @drhelenfisher on Instagram
              </Text>
            </Pressable>
            <Text style={styles.text}>
              Stay inspired with daily content on mental health by following
              Thrive on Instagram.
            </Text>
            <Pressable
              style={styles.buttonPress}
              onPress={() =>
                Linking.openURL("https://www.instagram.com/thrive/")
              }
            >
              <Text style={styles.textPress}>Follow @thrive on Instagram</Text>
            </Pressable>
            <Text style={styles.text}>
              Connect with the National Alliance on Mental Illness for valuable
              insights and updates on Twitter.
            </Text>
            <Pressable
              style={styles.buttonPress}
              onPress={() =>
                Linking.openURL("https://twitter.com/NAMICommunicate")
              }
            >
              <Text style={styles.textPress}>
                Follow @NAMICommunicate on Twitter
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    lineHeight: 20,
    letterSpacing: 0.25,
    color: "black",
    padding: 10,
  },
  textResource: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    padding: 10,
  },
  textPress: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
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
});

export default StressTips;
