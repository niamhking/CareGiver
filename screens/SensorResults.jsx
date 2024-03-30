import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Modal,
  Linking,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import Video from "react-native-video";
import video from "./video/CareGiverAudio.mp4";
import { AntDesign } from "@expo/vector-icons";

function SensorResults({ navigation }) {
  const route = useRoute();
  const cvValue = route.params?.cv;
  const [isExModalVisible, setIsExModalVisible] = useState(false);
  const [isVidModalVisible, setIsVidModalVisible] = useState(false);

  const toggleExModal = () => {
    setIsExModalVisible(!isExModalVisible);
  };

  const toggleVidModal = () => {
    setIsVidModalVisible(!isVidModalVisible);
  };

  const exerciseInfo = {
    1: {
      level: "Level 1: Deep Breathing and Mindfulness",
      description:
        "Simple breathing exercises can help by themselves. Rapid, shallow, erratic breathing is a common response to stress. Slow, deep, regular breathing is a sign of relaxation. You can learn to control your respirations so they mimic relaxation; the effect, in fact, will be relaxing.",
      benefits:
        "Deep breathing is easy to learn. You can do it at any time, in any place. You can use deep breathing to help dissipate stress as it occurs. Practice the routine in advance; then use it when you need it most. If you find it helpful, consider repeating the exercise four to six times a day — even on good days.",
    },
    2: {
      level: "Level 2: Progressive Muscle Relaxation (PMR)",
      description:
        "PMR involves tensing and then releasing different muscle groups to promote relaxation. Tighten each muscle and maintain the contraction for 20 seconds before slowly releasing it. As the muscle relaxes, concentrate on the release of tension and the sensation of relaxation. Start with your facial muscles, then work down the body.",
      benefits:
        "Enhances body awareness, reduces muscle tension, and promotes overall relaxation.",
    },
    3: {
      level: "Level 3: Guided Imagery and Visualisation",
      description:
        "Close your eyes and imagine a peaceful scene or scenario. Engage all your senses in this visualisation. It could be a beach, a forest, or any place that brings you comfort. Use guided imagery recordings or scripts if needed.",
      benefits:
        "Shifts focus from stressors, promotes relaxation, and provides a mental escape.",
    },
    4: {
      level: "Level 4: Cognitive Behavioral Therapy (CBT) Techniques",
      description:
        "CBT involves identifying and challenging negative thought patterns. When stressed, identify the thoughts contributing to stress, assess their accuracy, and replace them with more balanced and positive thoughts. This may involve keeping a stress journal to track thoughts and emotions.",
      benefits:
        "Targets the root cause of stress, enhances coping mechanisms, and fosters a more positive mindset.",
    },
  };

  const info = exerciseInfo[cvValue];

  const exerciseDescriptions = [
    "Wrinkle your forehead and arch your eyebrows. Hold; then relax.",
    "Close your eyes tightly. Hold; then relax.",
    "Wrinkle your nose and flare your nostrils. Hold; then relax.",
    "Push your tongue firmly against the roof of your mouth. Hold; then relax.",
    "Grimace. Hold; then relax.",
    "Clench your jaws tightly. Hold; then relax.",
    "Tense your neck by pulling your chin down to your chest. Hold; then relax.",
    "Arch your back. Hold; then relax.",
    "Breathe in as deeply as you can. Hold; then relax.",
    "Tense your stomach muscles. Hold; then relax.",
    "Tense your buttocks and thigh muscles. Hold; then relax.",
    "Tense your biceps. Hold; then relax.",
    "Tense your arms and clench your fists. Hold; then relax.",
    "Press your feet down. Hold; then relax.",
    "Pull your toes up. Hold; then relax.",
  ];

  const level3RoutineSteps = [
    "Guided Imagery Recordings or Scripts (Optional): If you find it helpful, you can use pre-recorded guided imagery sessions or scripts. Many resources, including apps and websites, offer guided imagery specifically designed for relaxation. I have included links at the end to a few interesting ones you can tru out.",
    "Find a Quiet Space: Choose a quiet and comfortable place where you won't be interrupted.",
    "Sit or Lie Down Comfortably: Sit in a comfortable chair or lie down on your back. Make sure your body is relaxed, and you're in a position that allows you to fully engage in the visualisation.",
    "Close Your Eyes: Gently close your eyes to eliminate visual distractions and enhance your focus on the imagery.",
    "Deep Breathing: Start with a few deep, calming breaths. Inhale slowly through your nose, hold for a moment, and exhale through your mouth. Repeat this a few times to center yourself.",
    "Choose Your Imagery: Select a peaceful scene or scenario that resonates with you. It could be a beach, a forest, a meadow, or any place where you feel calm and comfortable.",
    "Engage Your Senses: Begin to vividly imagine the details of your chosen scene. Engage all your senses:",
    "Sight: Picture the colors, shapes, and details around you.",
    "Sound: Imagine the sounds, whether it's the rustle of leaves, waves crashing, or birds chirping.",
    "Smell: Envision the scents associated with your chosen location.",
    "Touch: Feel the temperature, the texture of surfaces, and any sensations on your skin.",
    "Taste: If applicable, imagine any tastes associated with your peaceful place.",
    "Stay Present: If your mind starts to wander or stressors creep in, gently guide your focus back to the visualisation. Allow yourself to fully immerse in the peaceful scene.",
    "Gradual Transition: Towards the end of the session, start to transition your awareness back to the present. Slowly become aware of your physical surroundings.",
    "Reflect: Take a moment to reflect on how you feel after the visualisation. Notice any changes in your mood, stress levels, or overall sense of well-being.",
    "Repeat Daily: Make this visualisation routine a daily practice to enhance its effectiveness over time.",
  ];

  const level4RoutineSteps = [
    "Set the Stage: Find a quiet and comfortable space where you can focus without distractions.",
    "Start with Relaxation: Begin with a few minutes of deep breathing or progressive muscle relaxation to create a calm and centered mindset.",
    "Identify Stressful Thoughts: Take a few moments to identify any stressful thoughts or negative self-talk that you're currently experiencing. These could be related to a specific situation or a general feeling of stress.",
    "Record Thoughts in a Stress Journal: Use a stress journal to write down the identified thoughts. Be specific and include details about the situation, your emotions, and the thoughts that contribute to your stress.",
    "Assess the Accuracy of Thoughts: Analyse each identified thought. Ask yourself if these thoughts are accurate, realistic, and based on evidence. Consider alternative perspectives or explanations for the situation.",
    "Challenge Negative Thoughts: Challenge and reframe negative thoughts by asking yourself:",
    "What evidence supports or contradicts this thought?",
    "Is there a more balanced or positive way to view the situation?",
    "How would I advise a friend who is thinking in a similar way?",
    "Create Balanced Statements: Formulate more balanced and realistic statements to replace the negative thoughts. Focus on statements that are objective and affirming.",
    "Positive Affirmations: Incorporate positive affirmations related to your ability to cope, your strengths, and your resilience. Repeat these affirmations to reinforce a positive mindset.",
    "Develop an Action Plan: Identify actionable steps you can take to address the stressors or challenges you've identified. Break down larger tasks into smaller, manageable steps.",
    "Reflect on Progress: Regularly review your stress journal and note any changes in your thought patterns, emotional responses, and overall stress levels. Celebrate progress and adjustments you've made in your thinking.",
    "Seek Support (if needed): If certain stressors persist or if you find it challenging to manage thoughts on your own, consider reaching out to a mental health professional for guidance and support.",
    "Integrate into Daily Routine: Make this CBT routine a part of your daily or weekly self-care practices. Consistency is key to building resilience and fostering a positive mindset over time.",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.textHeader}>Stress Results</Text>
          <Text style={styles.text}>
            Results taken after measuring your biofeedback, scroll to see full
            recommended exercise routine:
          </Text>
          <View style={styles.buttonSum}>
            <Text style={styles.textSum}>{info.level}</Text>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.textUp}>{info.description}</Text>

            <Text style={styles.label}>Benefits:</Text>
            <Text style={styles.textUp}>{info.benefits}</Text>
          </View>
          {/* Conditionally render exercise descriptions for Level 1 */}
          {cvValue === 1 && (
            <View style={styles.button}>
              <Text style={styles.textHeader}>Routine:</Text>
              <Text style={styles.textRoutine}>
                You will get the most benefit if you do it regularly, as part of
                your daily routine.
              </Text>
              <Text style={styles.textRoutine}>
                You can do it standing up, sitting in a chair that supports your
                back, or lying on a bed or yoga mat on the floor.
              </Text>
              <Text style={styles.textRoutine}>
                Make yourself as comfortable as you can. If you can, loosen any
                clothes that restrict your breathing.
              </Text>
              <Text style={styles.textRoutine}>
                If you're lying down, place your arms a little bit away from
                your sides, with the palms up. Let your legs be straight, or
                bend your knees so your feet are flat on the floor.If you're
                sitting, place your arms on the chair arms.
              </Text>
              <Text style={styles.textRoutine}>
                If you're sitting or standing, place both feet flat on the
                ground. Whatever position you're in, place your feet roughly
                hip-width apart.
              </Text>
              <Text style={styles.textRoutine}>
                Let your breath flow as deep down into your belly as is
                comfortable, without forcing it. Try breathing in through your
                nose and out through your mouth. Breathe in gently and
                regularly. Some people find it helpful to count steadily from 1
                to 5. Then let it flow out gently, counting from 1 to 5 again,
                if you find this helpful.
              </Text>
              <Text style={styles.textRoutine}>
                Keep doing this for at least 5 minutes.
              </Text>
            </View>
          )}
          {cvValue === 2 && (
            <>
              <View style={styles.button}>
                <Text style={styles.textHeader}>Routine:</Text>
                {/* Conditionally render exercise descriptions for Level 2 */}
                {cvValue === 2 &&
                  exerciseDescriptions.map((exercise, index) => (
                    <Text key={index} style={styles.textRoutine}>
                      {`${index + 1}. ${exercise}`}
                    </Text>
                  ))}

                <Text style={styles.text}>
                  Duration: The entire routine should take 12 to 15 minutes.
                </Text>
              </View>
            </>
          )}
          {/* Conditionally render exercise descriptions and routine for Level 3 */}
          {cvValue === 3 && (
            <View style={styles.button}>
              <Text style={styles.textHeader}>Routine:</Text>
              {/* Conditionally render exercise descriptions for Level 3 */}
              {cvValue === 3 &&
                level3RoutineSteps.map((exercise, index) => (
                  <Text key={index} style={styles.textRoutine}>
                    {`${index + 1}. ${exercise}`}
                  </Text>
                ))}

              <Text style={styles.text}>
                Duration: The entire routine should take 10 to 15 minutes.
              </Text>

              <Text style={styles.text}>Guided Example:</Text>

              <Pressable style={styles.buttonExample} onPress={toggleExModal}>
                <AntDesign name="profile" size={50} color="#FFF" />
                <Text style={styles.textUp}>Script (Offline)</Text>
              </Pressable>
              <Pressable style={styles.buttonExample} onPress={toggleVidModal}>
                <AntDesign name="videocamera" size={50} color="#FFF" />
                <Text style={styles.textUp}>Audio (Offline)</Text>
              </Pressable>
              <Pressable
                style={styles.buttonExample}
                onPress={() =>
                  Linking.openURL("https://www.youtube.com/watch?v=qcdbCphVa1g")
                }
              >
                <AntDesign name="youtube" size={50} color="#FFF" />
                <Text style={styles.textUp}>Video (Online)</Text>
              </Pressable>
            </View>
          )}
          {/* Conditionally render exercise descriptions and routine for Level 4 */}
          {cvValue === 4 && (
            <View style={styles.button}>
              <Text style={styles.textHeader}>Routine:</Text>
              {/* Conditionally render exercise descriptions for Level 4 */}
              {cvValue === 4 &&
                level4RoutineSteps.map((exercise, index) => (
                  <Text key={index} style={styles.textRoutine}>
                    {`${index + 1}. ${exercise}`}
                  </Text>
                ))}

              <Text style={styles.text}>
                Remember, the goal is not to eliminate stress but to change the
                way you perceive and respond to stressors. Regular practice of
                CBT techniques can contribute to long-term stress management and
                improved mental well-being.
              </Text>

              <Text style={styles.text}>
                Duration: The entire routine should take 15 to 20 minutes.
              </Text>
            </View>
          )}
        </View>
        {/* Video Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVidModalVisible}
          onRequestClose={toggleVidModal}
        >
          <View style={styles.modalContainer}>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Video here */}
              <Video
                source={video} // Can be a URL or a local file.
                ref={(ref) => {
                  this.player = ref;
                }} // Store reference
                onBuffer={this.onBuffer} // Callback when remote video is buffering
                onError={this.videoError} // Callback when video cannot be loaded
                paused={false} // make it start
                repeat={false} // make it a loop
                resizeMode="cover"
                style={styles.backgroundVideo}
              />
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={toggleVidModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </Modal>
        {/* Script Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isExModalVisible}
          onRequestClose={toggleExModal}
        >
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer2}>
              {/* Add your instruction text here */}
              <Text style={styles.modalText}>
                Guided Imagery: The Beach
                {"\n\n"}By: Prentiss Price, Ph.D.
                {"\n\n"}For a few moments allow yourself to take several nice,
                long, deep breaths. Notice the cool air coming in, filling your
                lungs, and the soothing warm air going out. Just let all your
                thoughts float away as you bring your attention to your
                breathing... in and out. You might mentally scan your body and
                notice if you're holding any tension in your muscles. If you
                are, just gently let all that tension melt away with every out
                breath.... bring your attention to your breathing, in and
                out.... in and out... let yourself feel more and more
                comfortable sitting where you are.
                {"\n\n"}In your mind's eye, you see yourself descending down a
                long, narrow, wooden stairway towards a beautiful, inviting
                beach. Your bare feet feel the rough weathered steps, and with
                each step, you feel more and more tension gently melting away
                from your body. As you continue down the stairway, you notice
                how the bright white sand stretches down the shoreline as far as
                you can see. The ocean is a deep shade of blue with the fine
                white crests of the waves sweeping towards the shore. You reach
                the end of the stairway and step down, sinking into the warm
                soothing sand. As you rub the sand lightly between your toes, a
                soothing sensation of relaxation gently melts through your
                entire body. The roaring sounds of the sea's surf, the waves
                crashing over each other, calms your mind and allows you to feel
                even more relaxed.
                {"\n\n"}You begin walking slowly towards the edge of the water
                and notice the warm sun on your face and shoulders. The salty
                smell of the sea air invigorates you, and you take in a deep
                breath... breathe slowly out... and feel more relaxed and
                refreshed. Finally, you reach the water's edge and you gladly
                invite the waves to flow over your toes and ankles. You watch
                the waves glide smoothly towards you, gently sweeping around
                your feet, and the trails of sea water that flow slowly back out
                again. The cool water feels soft and comforting as you enjoy a
                few moments allowing yourself to gaze out on the far reaching
                horizon. Overhead, you notice two seagulls gracefully soaring
                high above the ocean waters, and you can hear their soft cries
                becoming faint as they glide away. And all of these sights,
                sounds, and sensations allow you to let go and relax more and
                more.
                {"\n\n"}After a moment you begin strolling down the beach at the
                water's edge. You feel a cool gentle breeze pressing lightly
                against your back, and with every step, you feel yourself
                relaxing more and more. As you walk down the beach, you notice
                the details of sights and sounds around you, and soothing
                sensations of the sun, the breeze, and the sand below your feet.
                {"\n\n"}As you continue your leisurely walk down the beach, you
                notice a colorful beach chair resting in a nice peaceful spot
                where the powdery soft sand lies undisturbed. You approach this
                comfortable-looking beach chair, then you sit down, lie back,
                and settle in. You take in a long deep breath, breathe slowly
                out, and feel even more relaxed and comfortable resting in your
                chair. For a few moments more, let yourself enjoy the sights and
                sounds of this beautiful day on the beach. And, when you feel
                ready, you can gently bring your attention back to the room...
                still letting yourself feel nice and comfortable sitting where
                you are.
              </Text>
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={toggleExModal}>
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
    justifyContent: "center",
    backgroundColor: "#8fbdcb",
  },
  scrollContainer2: {
    flexGrow: 1,
    padding: 20,
  },
  contentContainer: {
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
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
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#7c9fb4",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  backgroundVideo: {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10,
    aspectRatio: 1,
    width: "100%",
  },
  button: {
    alignItems: "left",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#E1F2ED",
    margin: 15,
    width: 300,
  },
  label: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    padding: 10,
  },
  buttonSum: {
    alignItems: "left",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#7c9fb4",
    margin: 15,
    width: 300,
  },
  buttonExample: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
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
    padding: 10,
  },
  textRoutine: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
    padding: 10,
  },
  textUp: {
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: "white",
    padding: 10,
  },
  textSum: {
    fontSize: 16,
    lineHeight: 18,
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

export default SensorResults;
