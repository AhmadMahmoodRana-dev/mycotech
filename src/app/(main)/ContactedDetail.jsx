import React, { useState, useRef, useEffect } from "react";
import {View,Text,TouchableOpacity,StyleSheet,Platform,Linking,Alert} from "react-native";
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
    phone: "3008878690",
    landline: "02135678900",
    address: "Test Address, City",
    phoneStatus: "Contact Status",
    visitDate: new Date(),
  });

  const [phone, setPhone] = useState(initialData.current.phone);
  const [landline, setLandline] = useState(initialData.current.landline);
  const [address, setAddress] = useState(initialData.current.address);
  const [phoneStatus, setPhoneStatus] = useState(
    initialData.current.phoneStatus
  );
  const [visitDate, setVisitDate] = useState(initialData.current.visitDate);

  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [isUpdated, setIsUpdated] = useState(false);

  const statusOptions = ["Contact Status", "not reachable", "wrong number"];

  useEffect(() => {
    const changed =
      phone !== initialData.current.phone ||
      landline !== initialData.current.landline ||
      address !== initialData.current.address ||
      phoneStatus !== initialData.current.phoneStatus ||
      visitDate.toString() !== initialData.current.visitDate.toString();

    setIsUpdated(changed);
  }, [phone, landline, address, phoneStatus, visitDate]);

  const handleCall = () => {
    const phoneNumber = `tel:+92${phone}`;
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
  const isCompleted = params.status === "Completed";

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
          <Text style={styles.complaintNumber}>{params.complaintNo}</Text>
          <Text style={styles.visitDate}>{params.visitDate}</Text>
        </View>
        <Text style={styles.productName}>
          {params.product} | {params.productCode}
        </Text>
      </View>

      {/* Complaint Status */}
      {params.status == "Completed" ? (
        <View
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
        </View>
      ) : (
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
      )}

      {/* Editable Contact Form */}
      <View style={styles.formCard}>
        <CustomInput
          icon="person"
          placeholder="Name"
          value="Ahmad Mahmood Rana"
          editable={false}
        />

        <CustomInput
          iconFunction={!isCompleted ? handleCall : undefined}
          icon="call"
          placeholder="Phone No"
          value={phone}
          editable={!isCompleted}
        />

        <CustomInput
          icon="phone-portrait"
          placeholder="Landline No"
          value={landline}
          editable={!isCompleted}
        />

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
          value={address}
          editable={!isCompleted}
        />

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

        {isUpdated && !isCompleted && (
          <TouchableOpacity
            style={{
              backgroundColor: COLOR_SCHEME.accent,
              padding: 12,
              flexDirection: "row",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
            onPress={() => {
              initialData.current = {
                phone,
                landline,
                address,
                phoneStatus,
                visitDate,
              };
              setIsUpdated(false);
            }}
          >
            <Ionicons name="cloud-upload" size={20} color="white" />
            <Text style={{ color: "white" }}>Update</Text>
          </TouchableOpacity>
        )}
      </View>

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

      {/* Status Dropdown Modal */}
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
});

export default ContactedDetail;
