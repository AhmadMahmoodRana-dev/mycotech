import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import COLOR_SCHEME from "../../colors/MainStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import { Entypo } from "@expo/vector-icons";
import CustomInput from "../../components/CustomInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

const predefinedStatus = ["Estimate", "In Progress", "Completed"];
const predefinedRemarks = ["no power", "overheating", "not responding"];

const initialEntry = {
  name: "",
  status: "",
  remarks: "",
  visitDate: null,
};

const Visits = () => {
  const [visits, setVisits] = useState([{ ...initialEntry }]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState("date"); // "date" or "time"
  const [datePickerIndex, setDatePickerIndex] = useState(null);

  const isFilled = (entry) =>
    entry.name.trim() && entry.status && entry.remarks && entry.visitDate;
  

  const addVisit = () => {
    setVisits([...visits, { ...initialEntry }]);
  };

  const handleDelete = (index) => {
    const updated = visits.filter((_, i) => i !== index);
    setVisits(updated.length ? updated : [{ ...initialEntry }]);
  };

  const openDropdown = (index, field) => {
    setDropdownIndex(index);
    setActiveField(field);
    setDropdownVisible(true);
  };

  const handleSelect = (value) => {
    const updated = [...visits];
    updated[dropdownIndex][activeField] = value;
    setVisits(updated);
    setDropdownVisible(false);
    setDropdownIndex(null);
    setActiveField(null);
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...visits];
    updated[index][field] = value;
    setVisits(updated);
  };

  const handleSubmit = () => {
    // Filter out incomplete entries
    const completedVisits = visits.filter(isFilled);

    if (completedVisits.length === 0) {
      alert("Please fill out at least one complete visit.");
      return;
    }

    // Example action: print to console or send to backend
    console.log("Submitted Visits:", completedVisits);
    alert("Visits submitted successfully!");

    // Optionally reset form
    setVisits([{ ...initialEntry }]);
  };

  const openDatePicker = (index) => {
    setDatePickerMode("date");
    setDatePickerIndex(index);
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }

    const currentDate = selectedDate;

    if (datePickerMode === "date") {
      // Show time picker next
      setDatePickerMode("time");
    } else {
      const updated = [...visits];
      const prevDate = updated[datePickerIndex].visitDate || new Date();
      updated[datePickerIndex].visitDate = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth(),
        prevDate.getDate(),
        currentDate.getHours(),
        currentDate.getMinutes()
      );
      setVisits(updated);
      setShowDatePicker(false);
      setDatePickerIndex(null);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR_SCHEME.background }}>
      <ScrollView style={styles.container}>
        <BackHeader name={"Visits"} gap={50} />

        {visits.map((entry, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.label}>Name</Text>

            <CustomInput
              onChangeText={(text) => handleInputChange(index, "name", text)}
              value={entry.name}
              placeholder={"Enter Your Name"}
            />

            <Text style={styles.label}>Status</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => openDropdown(index, "status")}
            >
              <Text
                style={{
                  color: entry.status
                    ? COLOR_SCHEME.text
                    : COLOR_SCHEME.grayText,
                }}
              >
                {entry.status || "Select Status"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Remarks</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => openDropdown(index, "remarks")}
            >
              <Text
                style={{
                  color: entry.remarks
                    ? COLOR_SCHEME.text
                    : COLOR_SCHEME.grayText,
                }}
              >
                {entry.remarks || "Select Remarks"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Visit Date</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => openDatePicker(index)}
            >
              <Text
                style={{
                  color: entry.visitDate
                    ? COLOR_SCHEME.text
                    : COLOR_SCHEME.grayText,
                }}
              >
                {entry.visitDate
                  ? new Date(entry.visitDate).toLocaleString()
                  : "Select Date & Time"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleDelete(index)}
              style={styles.removeButton}
            >
              <Entypo name="cross" style={styles.removeButtonText} />
            </TouchableOpacity>
          </View>
        ))}

        {isFilled(visits[visits.length - 1]) && (
          <TouchableOpacity onPress={addVisit} style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add New</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Option</Text>
            <FlatList
              data={
                activeField === "status" ? predefinedStatus : predefinedRemarks
              }
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setDropdownVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode={datePickerMode}
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={onDateChange}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    backgroundColor: COLOR_SCHEME.secondary,
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    position: "relative",
  },
  label: {
    fontWeight: "500",
    marginBottom: 6,
    color: COLOR_SCHEME.text,
  },
  input: {
    backgroundColor: COLOR_SCHEME.primary,
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: COLOR_SCHEME.accent,
    padding: 12,
    borderRadius: 10,
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  dropdownItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  dropdownItemText: {
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    fontWeight: "600",
  },
  removeButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#f44336",
    borderRadius: 50,
    zIndex: 1,
    padding: 6,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: COLOR_SCHEME?.accent || "#4CAF50", // fallback green
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default Visits;
