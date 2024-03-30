import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { ref, onValue } from "firebase/database";
import { Database } from "../components/config";
import { Picker } from "@react-native-picker/picker";
import PieChart from "react-native-pie-chart";

function WellnessAnalytics({ navigation }) {
  const [items, setItems] = useState({});
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [series, setSeries] = useState([]);
  const [sliceColor, setSliceColor] = useState([]);
  const [categoriesPi, setCategoriesPi] = useState([]);

  const getImpactText = (impactValue) => {
    switch (impactValue) {
      case 1:
        return "Low";
      case 2:
        return "Slight";
      case 3:
        return "Moderate";
      case 4:
        return "High";
      case 5:
        return "Severe";
      default:
        return ""; // You can set a default value or handle it accordingly
    }
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const calculateCategoryCounts = () => {
    const categoryCounts = {};

    Object.values(items).forEach((entries) => {
      entries.forEach((entry) => {
        const category1 = entry.category.trim().toLowerCase(); // Remove whitespace and convert to lowercase
        const category = category1.charAt(0).toUpperCase() + category1.slice(1);
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
    });

    return categoryCounts;
  };

  const prepareChartData = (data) => {
    const categoryCounts = calculateCategoryCounts(data);
    const categories = Object.keys(categoryCounts);

    // Extract only values from categoryCounts
    const seriesTemp = categories.map((category) => categoryCounts[category]);

    // Extract only colors from getRandomColor function
    const sliceColorTemp = categories.map(() => getRandomColor());

    // Update state once after the loop
    setSeries(seriesTemp);
    setSliceColor(sliceColorTemp);
    setCategoriesPi(categories);
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

        // Calculate the date based on the selected time frame
        const currentDate = new Date();
        let startDate;

        switch (selectedTimeFrame) {
          case "week":
            startDate = new Date(currentDate);
            startDate.setDate(startDate.getDate() - 7);
            break;
          case "month":
            startDate = new Date(currentDate);
            startDate.setMonth(startDate.getMonth() - 1);
            break;
          case "3months":
            startDate = new Date(currentDate);
            startDate.setMonth(startDate.getMonth() - 3);
            break;
          case "6months":
            startDate = new Date(currentDate);
            startDate.setMonth(startDate.getMonth() - 6);
            break;
          case "year":
            startDate = new Date(currentDate);
            startDate.setFullYear(startDate.getFullYear() - 1);
            break;
          default:
            startDate = null;
            break;
        }

        // Set up a listener for real-time updates, fetching only entries within the specified time frame
        onValue(moodEntriesRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            // Filter entries based on date
            const filteredData = startDate
              ? Object.keys(data)
                  .filter((key) => new Date(data[key].date) >= startDate)
                  .reduce((obj, key) => {
                    obj[key] = data[key];
                    return obj;
                  }, {})
              : data;

            const transformedData = transformDataForAgenda(filteredData);
            setItems(transformedData);
          }
        });
      } catch (error) {
        console.error("Error fetching mood entries from Firebase: ", error);
      }
    };

    fetchMoodEntries();
  }, [selectedTimeFrame]);

  useEffect(() => {
    // Ensure that items is not an empty object before calling prepareChartData
    if (Object.keys(items).length > 0) {
      prepareChartData(items);
    }
  }, [items]);

  const calculateAverageImpactScores = () => {
    const categoryImpactSums = {};
    const categoryImpactCounts = {};

    Object.values(items).forEach((entries) => {
      entries.forEach((entry) => {
        const category = entry.category.trim().toLowerCase();
        const impact = parseInt(entry.impact);

        if (!isNaN(impact)) {
          categoryImpactSums[category] =
            (categoryImpactSums[category] || 0) + impact;
          categoryImpactCounts[category] =
            (categoryImpactCounts[category] || 0) + 1;
        }
      });
    });

    const averageImpactScores = {};
    Object.keys(categoryImpactSums).forEach((category) => {
      averageImpactScores[category] =
        categoryImpactSums[category] / categoryImpactCounts[category];
    });

    return averageImpactScores;
  };

  const renderCategoryWithMostEntries = () => {
    const categoryCounts = calculateCategoryCounts();
    const categories = Object.keys(categoryCounts);

    if (categories.length > 0) {
      const categoryWithMostEntries = categories.reduce(
        (maxCategory, category) => {
          return categoryCounts[category] > categoryCounts[maxCategory]
            ? category
            : maxCategory;
        },
        categories[0]
      );

      return (
        <Text style={styles.bodyText}>
          Most Entered Category: {categoryWithMostEntries} (
          {categoryCounts[categoryWithMostEntries]} entries)
        </Text>
      );
    } else {
      return (
        <Text style={styles.analyticsText}>No category counts available</Text>
      );
    }
  };

  const calculateEmotionalTrends = () => {
    const emotionalTrends = {};

    Object.values(items).forEach((entries) => {
      entries.forEach((entry) => {
        const feeling = entry.feel.trim().toLowerCase(); // Trim and convert to lowercase
        if (feeling !== "") {
          if (!emotionalTrends[feeling]) {
            emotionalTrends[feeling] = {};
          }
          emotionalTrends[feeling][entry.date] = true;
        }
      });
    });

    return emotionalTrends;
  };

  const renderEmotionalTrends = () => {
    const emotionalTrends = calculateEmotionalTrends();

    const calculateMostCommonDays = (feeling) => {
      const dayCounts = {};

      Object.keys(emotionalTrends[feeling]).forEach((date) => {
        const day = new Date(date).toLocaleDateString(undefined, {
          weekday: "long",
        });
        const dayOfWeek = day.split(",")[0];
        dayCounts[dayOfWeek] = (dayCounts[dayOfWeek] || 0) + 1;
      });

      // Find the overall day with the maximum occurrence count
      let mostCommonDay = Object.keys(dayCounts)[0];
      Object.keys(dayCounts).forEach((day) => {
        if (dayCounts[day] > dayCounts[mostCommonDay]) {
          mostCommonDay = day;
        }
      });

      // Ensure the date format is removed and keep only the day of the week
      const dayOfWeek = mostCommonDay.split(",")[0];

      return dayOfWeek;
    };

    const filteredEmotions = Object.keys(emotionalTrends).filter(
      (emotion) => emotion && Object.keys(emotionalTrends[emotion]).length > 1
    );

    if (filteredEmotions.length > 0) {
      return (
        <View>
          <Text style={styles.analyticsText}>
            Most common days for these feelings :
          </Text>
          {filteredEmotions.map((emotion) => (
            <Text key={emotion} style={styles.bodyText}>
              {emotion.charAt(0).toUpperCase() + emotion.slice(1)}: {"\t"}
              {calculateMostCommonDays(emotion)}
            </Text>
          ))}
        </View>
      );
    } else {
      return (
        <Text style={styles.analyticsText}>No emotional trends available</Text>
      );
    }
  };

  const findMostImpactfulEvents = () => {
    const impactfulEvents = [];

    Object.values(items).forEach((entries) => {
      entries.forEach((entry) => {
        if (entry.impact === "4" || entry.impact === "5") {
          impactfulEvents.push(entry);
        }
      });
    });

    return impactfulEvents;
  };

  // Helper function to check if a date is within a week
  const isWithinWeek = (date) => {
    const currentDate = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(currentDate.getDate() - 7);
    return date >= oneWeekAgo && date <= currentDate;
  };

  // Helper function to check if a date is within a month
  const isWithinMonth = (date) => {
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    return date >= oneMonthAgo && date <= currentDate;
  };

  // Helper function to check if a date is within the past n months
  const isWithinPastMonths = (date, months) => {
    const currentDate = new Date();
    const monthsAgo = new Date();
    monthsAgo.setMonth(currentDate.getMonth() - months);
    return date >= monthsAgo && date <= currentDate;
  };

  // Helper function to check if a date is within the past year
  const isWithinPastYear = (date) => {
    const currentDate = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    return date >= oneYearAgo && date <= currentDate;
  };

  // Now you can use these helper functions in the calculateTotalEntries function:

  const calculateTotalEntries = () => {
    let totalEntries = 0;

    Object.values(items).forEach((entries) => {
      entries.forEach((entry) => {
        const entryDate = new Date(entry.date);

        switch (selectedTimeFrame) {
          case "week":
            if (isWithinWeek(entryDate)) {
              totalEntries += 1;
            }
            break;
          case "month":
            if (isWithinMonth(entryDate)) {
              totalEntries += 1;
            }
            break;
          case "3months":
            if (isWithinPastMonths(entryDate, 3)) {
              totalEntries += 1;
            }
            break;
          case "6months":
            if (isWithinPastMonths(entryDate, 6)) {
              totalEntries += 1;
            }
            break;
          case "year":
            if (isWithinPastYear(entryDate)) {
              totalEntries += 1;
            }
            break;
          default:
            totalEntries += 1;
            break;
        }
      });
    });

    return totalEntries;
  };

  const renderTotalEntries = () => {
    const totalEntries = calculateTotalEntries();
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.analyticsText}>
          Total entries in the personal mood and behavioral tracker:{" "}
          {totalEntries}
        </Text>
      </View>
    );
  };

  const renderSevereActions = () => {
    const impactfulEvents = findMostImpactfulEvents();
    let entryCounter = 0; // Initialize a counter variable

    const openModal = (entry) => {
      setSelectedEntry(entry);
      setModalVisible(true);
    };

    if (impactfulEvents.length > 0) {
      return (
        <View>
          <Text style={styles.analyticsText}>
            Most impactful events over the past month and their root causes,
            please select an entry to view your future notes and feelings:
          </Text>
          {impactfulEvents.map((event, index) => {
            entryCounter++; // Increment the counter for each entry
            return (
              <TouchableOpacity key={index} onPress={() => openModal(event)}>
                <View style={styles.clickButton}>
                  <Text style={styles.textClickable}>
                    Entry {entryCounter}:{" "}
                    {event.description ? event.description : event.category}
                  </Text>
                  <View style={styles.analyticsSeparator} />
                </View>
              </TouchableOpacity>
            );
          })}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {selectedEntry && (
                  <>
                    <Text style={styles.modalText}>
                      Description:{" "}
                      {selectedEntry.description || "Not available"}
                    </Text>
                    <Text style={styles.modalText}>
                      How this made you feel:{" "}
                      {selectedEntry.feel || "Not available"}
                    </Text>
                    <Text style={styles.modalText}>
                      Note for the Future:{" "}
                      {selectedEntry.note || "Not available"}
                    </Text>
                  </>
                )}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      );
    } else {
      return (
        <Text style={styles.analyticsText}>
          No high or severe impact events found
        </Text>
      );
    }
  };

  const renderAverageImpactScores = () => {
    const averageImpactScores = calculateAverageImpactScores();
    const categories = Object.keys(averageImpactScores);

    if (categories.length > 0) {
      return (
        <View>
          <Text style={styles.analyticsText}>
            Average impact scores for each category:
          </Text>
          {categories.map((category) => (
            <View key={category}>
              <Text style={styles.bodyText}>
                {category.charAt(0).toUpperCase() + category.slice(1)}:{" "}
                {averageImpactScores[category].toFixed(2)} {"\t\t"} -{"    "}
                {getImpactText(Math.round(averageImpactScores[category]))}
              </Text>
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <Text style={styles.analyticsText}>
          No impact scores available for analysis
        </Text>
      );
    }
  };

  const renderPieChart = () => {
    return (
      <View style={styles.centerContainer}>
        <PieChart
          widthAndHeight={200}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.6}
        />
        <View style={styles.legendContainer}>
          {series.map((value, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: sliceColor[index],
                  marginRight: 10,
                  borderRadius: 5,
                }}
              />
              <Text style={styles.bodyText}>
                {categoriesPi[index]} - {value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollViewCare}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.centerContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.textHeaderCare}>Wellness Analytics</Text>
          </View>
          {/* Dropdown to select time frame */}
          {/* Picker to select time frame */}
          {/* Centered Picker */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedTimeFrame}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedTimeFrame(itemValue)}
            >
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Past Week" value="week" />
              <Picker.Item label="Past Month" value="month" />
              <Picker.Item label="Past 3 Months" value="3months" />
              <Picker.Item label="Past 6 Months" value="6months" />
              <Picker.Item label="Past Year" value="year" />
            </Picker>
          </View>
          <View style={styles.analyticsContainer}>
            <Text style={styles.analyticsText}>Category analysis:</Text>
            {items && Object.keys(items).length > 0 ? (
              <View>{renderCategoryWithMostEntries()}</View>
            ) : (
              <Text style={styles.analyticsText}>Loading...</Text>
            )}

            {series.length > 0 ? (
              <View>{renderPieChart()}</View>
            ) : (
              <Text style={styles.analyticsText}>Loading Chart...</Text>
            )}

            {items && Object.keys(items).length > 0 ? (
              <View>{renderAverageImpactScores()}</View>
            ) : (
              <Text style={styles.analyticsText}>Loading...</Text>
            )}

            {items && Object.keys(items).length > 0 ? (
              <View>{renderEmotionalTrends()}</View>
            ) : (
              <Text style={styles.analyticsText}>Loading...</Text>
            )}

            {items && Object.keys(items).length > 0 ? (
              <View>{renderSevereActions()}</View>
            ) : (
              <Text style={styles.analyticsText}>Loading...</Text>
            )}

            {items && Object.keys(items).length > 0 ? (
              <View>{renderTotalEntries()}</View>
            ) : (
              <Text style={styles.analyticsText}>Loading...</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textHeaderCare: {
    fontSize: 23,
    lineHeight: 26,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    margin: 10,
    marginTop: 30,
    paddingBottom: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#93c59d",
  },
  centerContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  picker: {
    flex: 1,
    height: 40,
    width: 200,
    borderWidth: 1,
    borderRadius: 12,
    color: "white",
  },
  pickerContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#6fa263",
    width: 200,
  },
  scrollViewCare: {
    flex: 1,
    paddingLeft: 5,
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#93c59d",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
  },
  analyticsContainer: {
    margin: 15,
  },
  analyticsText: {
    fontSize: 19,
    color: "black",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
  },
  bodyText: {
    fontSize: 18,
    color: "black",
    marginBottom: 5,
    paddingLeft: 5,
  },
  clickButton: {
    backgroundColor: "#558e72",
    borderRadius: 15,
    marginBottom: 10,
  },
  textClickable: {
    paddingLeft: 15,
    fontSize: 16,
    color: "white",
    padding: 10,
    elevation: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#558e72",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  legendItem: {
    alignItems: "center",
    marginRight: 20,
    marginBottom: 10,
  },
});

export default WellnessAnalytics;
