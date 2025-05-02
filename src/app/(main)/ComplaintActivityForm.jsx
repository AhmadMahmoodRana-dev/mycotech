import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../components/CustomInput";
import { useCameraPermissions } from "expo-camera";
import QrcodeScannerModel from "../../components/Models/QrcodeScannerModel";
import BackHeader from "../../components/BackHeader";
import { styles } from "../../styles/ComplaintActivityForm";
import { useRouter } from "expo-router";

const ComplaintActivityForm = () => {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    name: "Ahmad Mahmood Khan",
    complaintNo: "2232100026",
    dueDate: "0000-00-00",
    appliance: "Refrigerator Gree GR-E8768G-C1",
    customerName: "ABDUL REHMAN",
    phone: "3015988221",
    address: "45-B, FEROZPUR ROAD LAHORE",
    problem: "Gas Leakage",
    visitDate: "2025-04-03",
    model: "",
    serialNo: "",
    dateOfManufacture: "",
  });

  const [showScanner, setShowScanner] = useState(false);
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const qrLock = useRef(false);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleBarcodeScanned = ({ data }) => {
    console.log("Scanned Data:", data);

    if (!qrLock.current && data) {
      qrLock.current = true;

      try {
        // Split by '%' and trim
        const parts = data.split("%").map((part) => part.trim());

        if (parts.length >= 2) {
          const serialNo = parts[0]; // First part is Serial Number
          const modelRaw = parts[1]; // e.g., "ES-18EM01WS SA+/I"
          const model = modelRaw.split(" ")[0]; // Get only the part before space (e.g., ES-18EM01WS)
          const dateOfManufacture = parts[2]; // Assuming you want to store this too

          setFormData((prev) => ({
            ...prev,
            serialNo,
            model,
            dateOfManufacture,
          }));

          // Auto-close scanner after success
          Alert.alert("Scan Successful", "Fields have been auto-filled!", [
            { text: "OK", onPress: () => setShowScanner(false) },
          ]);
        } else {
          throw new Error("Unexpected format");
        }
      } catch (error) {
        Alert.alert("Invalid Format", "Scanned data format is incorrect");
        qrLock.current = false; // Allow another scan in case of failure
      }
    }

    // Prevent re-scanning too quickly
    setTimeout(() => {
      qrLock.current = false;
    }, 1000);
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  if (!permission) {
    return <View />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <BackHeader name={"Complaint Activity"} gap={60} />
      {/* Complaint Details Card */}
      <View style={styles.card}>
        <View style={styles.complaintHeader}>
          <Text style={styles.complaintNumber}>{formData.complaintNo}</Text>
          <Text style={styles.visitDate}>{formData.visitDate}</Text>
        </View>
        <Text style={styles.productName}>{formData.appliance}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Existing Fields */}
        <View style={styles.formCard}>
          {/* Customer Name */}
          <CustomInput
            editable={false}
            icon={"person"}
            placeholder="Name"
            value={formData.name}
            onChangeText={(value) => handleChange("name", value)}
          />
          {/* Phone No */}
          <CustomInput
            editable={false}
            icon={"call"}
            placeholder="Phone No"
            value={formData.phone}
            onChangeText={(value) => handleChange("phone", value)}
          />
          {/* Address */}
          <CustomInput
            editable={false}
            icon={"location"}
            placeholder={"Address"}
            value={formData.address}
            onChangeText={(value) => handleChange("address", value)}
          />
          {/* Problem */}
          <CustomInput
            editable={false}
            icon={"alert-circle"}
            placeholder={"Problem"}
            value={formData.problem}
            onChangeText={(value) => handleChange("problem", value)}
          />
          {/* Visit Date */}
          <CustomInput
            editable={false}
            icon={"calendar"}
            placeholder={"Visit Date"}
            value={formData.visitDate}
            onChangeText={(value) => handleChange("visitDate", value)}
          />

          {/* Add new fields */}
          <CustomInput
            icon={"cube"}
            placeholder="Model"
            value={formData.model}
            onChangeText={(value) => handleChange("model", value)}
          />

          <CustomInput
            icon={"barcode"}
            placeholder="Serial Number"
            value={formData.serialNo}
            onChangeText={(value) => handleChange("serialNo", value)}
          />
          <CustomInput
            icon={"calendar"}
            placeholder="Manufacture Date"
            value={formData.dateOfManufacture}
            onChangeText={(value) => handleChange("dateOfManufacture", value)}
          />

          {formData.model === "" ||
          formData.serialNo === "" ||
          formData.dateOfManufacture === "" ? (
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => setShowScanner(true)}
            >
              <Text style={styles.scanButtonText}>Scan QR/Bar Code</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => navigate.push("FourButtonPages")}
            >
              <Text style={styles.scanButtonText}>Next</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Scanner Modal */}
        <QrcodeScannerModel
          requestPermission={requestPermission}
          facing={facing}
          handleBarcodeScanned={handleBarcodeScanned}
          permission={permission}
          setShowScanner={setShowScanner}
          showScanner={showScanner}
          toggleCameraFacing={toggleCameraFacing}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ComplaintActivityForm;
