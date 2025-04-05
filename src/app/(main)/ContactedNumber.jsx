import React, { useState } from "react";
import {View,Text,TouchableOpacity,StyleSheet,Platform,Linking} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import COLOR_SCHEME from "../../colors/MainStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Dropdown from "../../components/Dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomInput from "../../components/CustomInput";
import BackHeader from "../../components/BackHeader";

const ContactedNumber = () => {
  const params = useLocalSearchParams();
  const [phone, setPhone] = useState("3008878690");
  const [landline, setLandline] = useState("02135678900");
  const [address, setAddress] = useState("Test Address, City");
  const [phoneStatus, setPhoneStatus] = useState("working");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [visitDate, setVisitDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const router = useRouter();
  const statusOptions = ["working", "not reachable", "wrong number"];
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
  const handleCall = () => {
    const phoneNumber = `tel:+92${phone}"`;
    Linking.openURL(phoneNumber).catch((err) =>
      Alert.alert("Error", "Could not make a call")
    );
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
      setVisitDate(selectedTime);
      setShowTimePicker(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader name={"Contacted Number"} gap={60}/>
      <TouchableOpacity
        onPress={() => router.push("CustomerComplaintsHistory")}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 4,
          alignItems: "flex-end",
        }}
      >
        <Text style={{ color: "white", fontSize: 14, fontStyle: "italic"}}>
          <Text>History </Text>{" "}
          <FontAwesome name="history" size={14} color={"white"} />
        </Text>
      </TouchableOpacity>

      {/* Complaint Details Card */}
      <View style={styles.card}>
        <View style={styles.complaintHeader}>
          <Text style={styles.complaintNumber}>{params.complaintNo}</Text>
          <Text style={styles.visitDate}>{params.visitDate}</Text>
        </View>
        <Text style={styles.productName}>
          {params.product} | {params.productCode}
        </Text>
      </View>

      {/* Arrival Button */}
      <TouchableOpacity
        onPress={() => router.push("ComplaintActivityForm")}
        style={[
          styles.arrivalButton,
          { backgroundColor: getStatusColor(params.status) },
        ]}
      >
        <Ionicons
          name="navigate"
          size={20}
          color="white"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>Complaint is {params.status}</Text>
      </TouchableOpacity>

      {/* Editable Form Section */}
      <View style={styles.formCard}>
        {/* Customer Name */}
        <CustomInput
          icon={"person"}
          placeholder={"Name"}
          value={"Ahmad Mahmood Rana"}
          editable={false}
        />
        {/* Phone No */}
        <CustomInput
          iconFunction={handleCall}
          icon={"call"}
          placeholder={"Phone No"}
          value={phone}
          onChangeText={setPhone}
        />
        {/*LandLine No */}
        <CustomInput
          icon={"phone-portrait"}
          placeholder={"Landline No"}
          value={landline}
          onChangeText={setLandline}
        />
        {/* Phone Status Dropdown */}
        <TouchableOpacity
          style={styles.inputGroup}
          onPress={() => setShowStatusDropdown(true)}
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
        {/* Address */}
        <CustomInput
          icon={"location"}
          placeholder={"Address"}
          value={address}
          onChangeText={setAddress}
        />
        {/* Visit Date */}
        <TouchableOpacity
          style={styles.inputGroup}
          onPress={() => setShowDatePicker(true)}
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
      </View>
      {/* VISIT DATE */}
      {showDatePicker && (
        <DateTimePicker
          value={visitDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
          minimumDate={new Date()} // Prevent selecting past dates
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={visitDate}
          mode="time"
          display="default"
          onChange={onChangeTime}
          minimumDate={
            visitDate.toDateString() === new Date().toDateString()
              ? new Date()
              : undefined
          }
        />
      )}

      {/* Custom Dropdown Modal */}
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
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  header: {
    color: COLOR_SCHEME.text,
    fontSize: 26,
    fontWeight: "800",
  },
  card: {
    backgroundColor: COLOR_SCHEME.secondary,
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
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
    backgroundColor: COLOR_SCHEME.accent,
    borderRadius: 10,
    padding: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    ...Platform.select({
      ios: {
        shadowColor: COLOR_SCHEME.accent,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
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
      android: {
        elevation: 3,
      },
    }),
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
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
    paddingVertical: 12,
  },
  addressInput: {
    height: 80,
    textAlignVertical: "center",
  },
  picker: {
    flex: 1,
    color: COLOR_SCHEME.text,
  },
});

export default ContactedNumber;

