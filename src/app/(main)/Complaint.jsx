import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLOR_SCHEME from "../../colors/MainStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import RecentJobCard from "../../components/RecentJobCard";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BackHeader from "../../components/BackHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BaseUrl from "../../common/BaseUrl";
import axios from "axios";

const Complaint = () => {
  const navigate = useRouter();
  const filters = [
    "All",
    "Under Repair",
    "RE-Repair",
    "Estimate",
    "Part Waiting",
    "Lift",
    "Technical Enquiry",
    "Replacement",
    "Completed",
  ];
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const recentJobs = [
    {
      id: "1",
      complaintNo: "2233445566",
      visitDate: "12-06-2025",
      complainedFiledDay: "593",
      product: "LED TV",
      productCode: "CX-40U560",
      status: "Completed",
      region: "North Region",
      priority: "High",
    },
    {
      id: "2",
      complaintNo: "2233445566",
      visitDate: "12-06-2025",
      complainedFiledDay: "593",
      product: "LED TV",
      productCode: "CX-40U560",
      status: "In Progress",
      region: "South Region",
      priority: "Medium",
    },
    {
      id: "3",
      complaintNo: "2233445566",
      visitDate: "12-06-2025",
      complainedFiledDay: "593",
      product: "LED TV",
      productCode: "CX-40U560",
      status: "Pending",
      region: "East Region",
      priority: "Medium",
    },
    {
      id: "4",
      complaintNo: "2233445566",
      visitDate: "12-06-2025",
      complainedFiledDay: "593",
      product: "LED TV",
      productCode: "CX-40U560",
      status: "Part Waiting",
      region: "West Region",
      priority: "High",
    },
    {
      id: "5",
      complaintNo: "2233445566",
      visitDate: "12-06-2025",
      complainedFiledDay: "593",
      product: "LED TV",
      productCode: "CX-40U560",
      status: "Under Repair",
      region: "Central Region",
      priority: "Low",
    },
    {
      id: "6",
      complaintNo: "2233445566",
      visitDate: "12-06-2025",
      complainedFiledDay: "593",
      product: "LED TV",
      productCode: "CX-40U560",
      status: "Under Repair",
      region: "Central Region",
      priority: "High",
    },
    {
      id: "7",
      complaintNo: "2233445566",
      visitDate: "12-06-2025",
      complainedFiledDay: "593",
      product: "LED TV",
      productCode: "CX-40U560",
      status: "Part Waiting",
      region: "Central Region",
      priority: "Low",
    },
    {
      id: "8",
      complaintNo: "2233445566",
      visitDate: "12-06-2025",
      complainedFiledDay: "593",
      product: "LED TV",
      productCode: "CX-40U560",
      status: "Completed",
      region: "Central Region",
      priority: "Medium",
    },
  ];

  const filteredJobs = recentJobs
    .filter((job) => selectedFilter === "All" || job.status === selectedFilter)
    .filter(
      (job) => selectedPriority === "All" || job.priority === selectedPriority
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.region.localeCompare(b.region);
      }
      return b.region.localeCompare(a.region);
    });

  const [allJobs, setAllJobs] = useState();
  const getAllJobs = async () => {
    const empId = await AsyncStorage.getItem("empId");
    try {
      const { data } = await axios.get(`${BaseUrl}/allcomplaint/${empId}`);
      setAllJobs(data.complaints);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader name="All Complaints" gap={80} />
      {/* Status Filter Section */}
      <View style={styles.filterContainer}>
        <FlatList
          data={filters}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === item && styles.selectedFilter,
              ]}
              onPress={() => setSelectedFilter(item)}
            >
              <Text style={styles.filterText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* MAIN FILTER  */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setIsDropdownVisible((prev) => !prev)}
          >
            <Text style={styles.dropdownButtonText}>{selectedPriority}</Text>
            <Ionicons
              name="chevron-down"
              size={18}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>

          {isDropdownVisible && (
            <View style={styles.dropdownMenu}>
              <FlatList
                data={["All", "High", "Medium", "Low"].filter(
                  (item) => item !== selectedPriority
                )} // 🔹 Hide selected value
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedPriority(item);
                      setIsDropdownVisible(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.sortButton}
          onPress={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        >
          <Text style={styles.filterText}>
            Region {sortOrder === "asc" ? "A-Z ▲" : "Z-A ▼"}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Complaints List */}
      <View style={styles.cardContainer}>
        <FlatList
          data={allJobs}
          renderItem={({ item }) => (
            <RecentJobCard item={item} router={navigate} />
          )}
          keyExtractor={(item) => item?.COMPLAINT_ID}
          scrollEnabled={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default Complaint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_SCHEME.background,
    paddingHorizontal: 10,
  },
  filterContainer: {
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#555",
  },
  selectedFilter: {
    backgroundColor: "#1a1a1a",
    borderColor: "#777",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  cardContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  sortButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#555",
    marginVertical: 10,
    alignSelf: "flex-end",
  },
  dropdownContainer: {
    marginVertical: 10,
    alignSelf: "center",
    width: "38%",
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 20,
    backgroundColor: "#333",
    paddingHorizontal: 20,
  },

  dropdownButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  dropdownMenu: {
    position: "absolute",
    top: 50,
    width: "100%",
    backgroundColor: "#444",
    borderRadius: 8,
    zIndex: 100,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
    alignItems: "center",
  },
  dropdownItemText: {
    color: "#fff",
    fontSize: 16,
  },
});
