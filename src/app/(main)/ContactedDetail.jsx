import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Linking,
  Alert,
  ScrollView,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

import COLOR_SCHEME from "../../colors/MainStyle";
import Dropdown from "../../components/Dropdown";
import CustomInput from "../../components/CustomInput";
import BackHeader from "../../components/BackHeader";

const ContactedDetail = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const initialData = useRef({
    phoneStatus: "Contact Status",
    visitDate: new Date(),
  });

  const [phoneStatus, setPhoneStatus] = useState(
    initialData.current.phoneStatus
  );
  const [visitDate, setVisitDate] = useState(initialData.current.visitDate);

  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const statusOptions = ["Contact Status", "not reachable", "wrong number"];
  const isCompleted = params.STATUS === "Completed";

  useEffect(() => {
    const changed =
      phoneStatus !== initialData.current.phoneStatus ||
      visitDate.toString() !== initialData.current.visitDate.toString();
    setIsUpdated(changed);
  }, [phoneStatus, visitDate]);

  const handleCall = () => {
    const phoneNumber = `tel:${params.MOBILE_NO}`;
    Linking.openURL(phoneNumber).catch(() => {
      Alert.alert("Error", "Could not make a call");
    });
  };

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setVisitDate(selectedDate);
      setShowDatePicker(false);
      setShowTimePicker(true);
    }
  };

  const onChangeTime = (event, selectedTime) => {
    if (selectedTime) {
      const updatedDate = new Date(visitDate);
      updatedDate.setHours(selectedTime.getHours());
      updatedDate.setMinutes(selectedTime.getMinutes());
      setVisitDate(updatedDate);
      setShowTimePicker(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#4ECCA3";
      case "In Progress":
        return "#FFD700";
      case "Pending":
        return "#FF6B6B";
      default:
        return COLOR_SCHEME.grayText;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader name="Contacted Detail" gap={60} />

      {/* Complaint History Navigation */}
      <TouchableOpacity
        onPress={() => router.push("CustomerComplaintsHistory")}
        style={{ paddingVertical: 12, alignItems: "flex-end" }}
      >
        <Text style={{ color: "white", fontSize: 14, fontStyle: "italic" }}>
          History <FontAwesome name="history" size={14} color="white" />
        </Text>
      </TouchableOpacity>

      {/* Complaint Details */}
      <View style={styles.card}>
        <View style={styles.complaintHeader}>
          <Text style={styles.complaintNumber}>{params.COMPLAINT_NO}</Text>
          <Text style={styles.visitDate}>{params.visitDate}12-02-2025</Text>
        </View>
        <Text style={styles.productName}>
          {params.PRODUCT_NAME} | {params.PRODUCT_MODEL_NUMBER}
        </Text>
      </View>

      {/* Complaint Status Button */}
      <TouchableOpacity
        onPress={
          isCompleted ? undefined : () => router.push("ComplaintActivityForm")
        }
        style={[
          styles.arrivalButton,
          { backgroundColor: getStatusColor(params.STATUS) },
        ]}
        disabled={isCompleted}
      >
        <Ionicons
          name="navigate"
          size={20}
          color="white"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>Complaint is {params.STATUS}</Text>
      </TouchableOpacity>

      {/* Contact Information Form */}
      <ScrollView style={styles.formCard}>
        <CustomInput
          icon="person"
          placeholder="Name"
          value={params.CUSTOMER_MANUAL_NAME}
          editable={false}
        />

        <CustomInput
          iconFunction={handleCall}
          icon="call"
          placeholder="Phone No"
          value={params.MOBILE_NO}
          editable={false}
        />

        <CustomInput
          icon="phone-portrait"
          placeholder="Landline No"
          value={params.MOBILE_NO}
          editable={false}
        />

        {/* Editable Contact Status */}
        <TouchableOpacity
          style={styles.inputGroup}
          onPress={() => !isCompleted && setShowStatusDropdown(true)}
          disabled={isCompleted}
        >
          <Ionicons
            name="information-circle"
            size={18}
            color={COLOR_SCHEME.grayText}
            style={styles.inputIcon}
          />
          <Text style={[styles.input, { paddingVertical: 12 }]}>
            {phoneStatus}
          </Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color={COLOR_SCHEME.grayText}
          />
        </TouchableOpacity>

        <CustomInput
          icon="location"
          placeholder="Address"
          value={params.ADDRESS}
          editable={false}
        />

        {/* Editable Visit Date */}
        <TouchableOpacity
          style={styles.inputGroup}
          onPress={() => !isCompleted && setShowDatePicker(true)}
          disabled={isCompleted}
        >
          <Ionicons
            name="calendar"
            size={18}
            color={COLOR_SCHEME.grayText}
            style={styles.inputIcon}
          />
          <Text style={[styles.input, { paddingVertical: 12 }]}>
            {visitDate ? visitDate.toLocaleString() : "Select Visit Date"}
          </Text>
        </TouchableOpacity>

        {/* Update Button */}
        {isUpdated && !isCompleted && (
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => {
              initialData.current = { phoneStatus, visitDate };
              setIsUpdated(false);
            }}
          >
            <Ionicons name="cloud-upload" size={20} color="white" />
            <Text style={{ color: "white" }}>Update</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Date and Time Pickers */}
      {showDatePicker && (
        <DateTimePicker
          value={visitDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
          minimumDate={new Date()}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={visitDate}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}

      {/* Status Dropdown */}
      <Dropdown
        showStatusDropdown={showStatusDropdown}
        setPhoneStatus={setPhoneStatus}
        setShowStatusDropdown={setShowStatusDropdown}
        statusOptions={statusOptions}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_SCHEME.background,
    padding: 15,
  },
  card: {
    backgroundColor: COLOR_SCHEME.secondary,
    borderRadius: 12,
    padding: 18,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: { elevation: 3 },
    }),
  },
  complaintHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  complaintNumber: {
    color: COLOR_SCHEME.text,
    fontWeight: "600",
  },
  visitDate: {
    color: COLOR_SCHEME.grayText,
  },
  productName: {
    color: COLOR_SCHEME.accent,
    fontWeight: "700",
    fontSize: 16,
  },
  arrivalButton: {
    borderRadius: 10,
    padding: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textTransform:"capitalize"
  },
  buttonIcon: {
    marginRight: 10,
  },
  formCard: {
    backgroundColor: COLOR_SCHEME.secondary,
    borderRadius: 12,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: { elevation: 3 },
    }),
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: COLOR_SCHEME.background,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: COLOR_SCHEME.text,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: COLOR_SCHEME.accent,
    padding: 12,
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
    marginBottom:50
  },
});

export default ContactedDetail;
