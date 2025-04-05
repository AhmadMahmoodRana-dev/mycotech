import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLOR_SCHEME from "../../colors/MainStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import CustomInput from "../../components/CustomInput";
import { CameraView, useCameraPermissions } from "expo-camera";
import QrcodeScannerModel from "../../components/Models/QrcodeScannerModel";
import BackHeader from "../../components/BackHeader";

const ComplaintActivityForm = () => {
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
  });

  const [showScanner, setShowScanner] = useState(false);
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  // const [scanningActive, setScanningActive] = useState(true);
  const qrLock = useRef(false);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleBarcodeScanned = ({ data }) => {
    console.log("Scanned Data:", data);
    if (!qrLock.current && data) {
      qrLock.current = true;

      try {
        const [modelPart, serialPart] = data.split("|");
        const model = modelPart.split(":")[1]?.trim();
        const serialNo = serialPart.split(":")[1]?.trim();

        setFormData((prev) => ({
          ...prev,
          model: model || "",
          serialNo: serialNo || "",
        }));

        Alert.alert("Scan Successful", "Data has been auto-filled!", [
          { text: "OK", onPress: () => setShowScanner(false) },
        ]);
      } catch (error) {
        Alert.alert("Invalid Format", "Scanned data format is incorrect");
      } finally {
        setTimeout(() => {
          qrLock.current = false;
        }, 500);
      }
    }
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

          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => setShowScanner(true)}
          >
            <Text style={styles.scanButtonText}>Scan QR/Bar Code</Text>
          </TouchableOpacity>
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

// Add these new styles to your existing StyleSheet
const styles = StyleSheet.create({
  scanButton: {
    backgroundColor: COLOR_SCHEME.accent,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  scanButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
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
  formCard: {
    backgroundColor: COLOR_SCHEME.secondary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
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
  rowBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLOR_SCHEME.secondary,
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: COLOR_SCHEME.accent,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  iconRow: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    color: COLOR_SCHEME.text,
    fontWeight: "600",
    marginBottom: 5,
    paddingHorizontal: 10,
  },
});

export default ComplaintActivityForm;

