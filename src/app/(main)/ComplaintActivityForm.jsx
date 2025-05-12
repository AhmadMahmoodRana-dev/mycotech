import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../components/CustomInput";
import { useCameraPermissions } from "expo-camera";
import QrcodeScannerModel from "../../components/Models/QrcodeScannerModel";
import BackHeader from "../../components/BackHeader";
import { styles } from "../../styles/ComplaintActivityForm";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import CustomDropdown from "../../components/CustomDropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
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
    paymentType: "",
    attachments: [],
    purchaseDate: "",
  });
  const scrollViewRef = useRef(null);
  const [showScanner, setShowScanner] = useState(false);
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const qrLock = useRef(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const isoDate = selectedDate.toISOString().split("T")[0]; // e.g. 2025-05-12
      handleChange("purchaseDate", isoDate);
    }
  };

  const handleChange = (key, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [key]: value };

      if (key === "paymentType") {
        // Wait for UI to update before scrolling
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 300);
      }

      return updated;
    });
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

          setFormData((prev) => ({
            ...prev,
            serialNo,
            model,
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

  // ################   IMAGE PICKER  ##################
  const pickImagesFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets || [];
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...selectedImages],
      }));
    }
  };

  const takePhotoFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Denied", "Camera access is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, result.assets[0]],
      }));
    }
  };

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

      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
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
          {/* Address */}
          <CustomInput
            editable={false}
            icon={"location"}
            placeholder={"Address"}
            value={formData.address}
            onChangeText={(value) => handleChange("address", value)}
          />
          {/* Phone No */}
          <CustomInput
            editable={false}
            icon={"call"}
            placeholder="Phone No"
            value={formData.phone}
            onChangeText={(value) => handleChange("phone", value)}
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ flex: 1, marginRight: 10 }}>
              <CustomInput
                icon="cube"
                placeholder="Model"
                value={formData.model}
                onChangeText={(value) => handleChange("model", value)}
              />
            </View>

            <TouchableOpacity
              style={{ paddingBottom: 12 }}
              onPress={() => setShowScanner(true)}
            >
              <AntDesign name="scan1" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <CustomInput
            icon={"barcode"}
            placeholder="Serial Number"
            value={formData.serialNo}
            onChangeText={(value) => handleChange("serialNo", value)}
          />

          <CustomDropdown
            value={formData.paymentType}
            onSelect={(value) => handleChange("paymentType", value)}
            items={["Warranty", "Cash", "Credit"]}
            placeholder="Select Payment Type"
          />

          {formData.paymentType === "Warranty" && (
            <>
              <View>
                <Text style={styles.label}>Upload Warranty Document</Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TouchableOpacity
                    onPress={pickImagesFromGallery}
                    style={styles.addButton}
                  >
                    <Text style={styles.addButtonText}>Gallery</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={takePhotoFromCamera}
                    style={styles.addButton}
                  >
                    <Text style={styles.addButtonText}>Camera</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView horizontal style={{ marginTop: 10 }}>
                  {formData.attachments.map((img, i) => (
                    <Image
                      key={i}
                      source={{ uri: img.uri }}
                      style={{
                        width: 80,
                        height: 80,
                        marginRight: 10,
                        borderRadius: 8,
                      }}
                    />
                  ))}
                </ScrollView>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.label}>Date of Purchase</Text>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={[styles.inputContainer, { justifyContent: "center" }]}
                >
                  <Text style={{ color: "white" }}>
                    {formData.purchaseDate
                      ? formData.purchaseDate
                      : "Select Date"}
                  </Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    value={
                      formData.purchaseDate
                        ? new Date(formData.purchaseDate)
                        : new Date()
                    }
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={handleDateChange}
                  />
                )}
              </View>
            </>
          )}

          {formData.model === "" ||
          formData.serialNo === "" ||
          formData.paymentType === "" ||
          (formData.paymentType === "Warranty" &&
            formData.purchaseDate === "") ? null : (
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => navigate.push("Visits")}
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