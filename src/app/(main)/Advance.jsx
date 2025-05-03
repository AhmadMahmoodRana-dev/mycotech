import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import COLOR_SCHEME from "../../colors/MainStyle";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";

const initialEntry = { amount: "", remarks: "", images: [] };

const Advance = () => {
  const [entries, setEntries] = useState([{ ...initialEntry }]);

  const handleInputChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const isEntryFilled = (entry) => entry.amount && entry.remarks;

  const addNewEntry = () => {
    const lastEntry = entries[entries.length - 1];
    if (!isEntryFilled(lastEntry)) {
      Alert.alert("Incomplete Entry", "Fill out all fields before adding new.");
      return;
    }
    setEntries([...entries, { ...initialEntry }]);
  };

  const removeEntry = (indexToRemove) => {
    if (entries.length === 1) {
      Alert.alert("Minimum Entry", "At least one entry is required.");
      return;
    }
    const updatedEntries = entries.filter((_, i) => i !== indexToRemove);
    setEntries(updatedEntries);
  };

  const pickImagesFromGallery = async (index) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const newEntries = [...entries];
      const selectedImages = result.assets || [];
      newEntries[index].images = [
        ...newEntries[index].images,
        ...selectedImages,
      ];
      setEntries(newEntries);
    }
  };

  const takePhotoFromCamera = async (index) => {
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
      const newEntries = [...entries];
      newEntries[index].images.push(result.assets[0]);
      setEntries(newEntries);
    }
  };

  const handleSubmit = () => {
    const allFilled = entries.every(isEntryFilled);
    if (!allFilled) {
      Alert.alert("Incomplete Form", "Fill out all fields before submitting.");
      return;
    }

    console.log("Submitted Entries:", entries);
    setEntries([{ ...initialEntry }]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR_SCHEME.background }}>
      <ScrollView style={styles.container}>
        <BackHeader name={"Advance"} gap={120} />

        {entries.map((entry, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity
              onPress={() => removeEntry(index)}
              style={styles.removeButton}
            >
              <Entypo name="cross" style={styles.removeButtonText} />
            </TouchableOpacity>

            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Amount"
              placeholderTextColor={COLOR_SCHEME.grayText}
              value={entry.amount}
              keyboardType="numeric"
              onChangeText={(value) =>
                handleInputChange(index, "amount", value)
              }
            />

            <Text style={styles.label}>Remarks</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter remarks"
              placeholderTextColor={COLOR_SCHEME.grayText}
              value={entry.remarks}
              onChangeText={(value) =>
                handleInputChange(index, "remarks", value)
              }
            />

            <Text style={styles.label}>Upload Warranty Document</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                onPress={() => pickImagesFromGallery(index)}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => takePhotoFromCamera(index)}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>Camera</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal style={{ marginTop: 10 }}>
              {entry.images.map((img, i) => (
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
        ))}

        {/* Show "+ Add New" only if last entry is filled */}
        {isEntryFilled(entries[entries.length - 1]) && (
          <TouchableOpacity onPress={addNewEntry} style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add New</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_SCHEME.background,
    padding: 16,
  },
  addButton: {
    backgroundColor: COLOR_SCHEME.accent,
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginVertical: 15,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  card: {
    backgroundColor: COLOR_SCHEME.secondary,
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    position: "relative",
  },
  label: {
    color: COLOR_SCHEME.text,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: COLOR_SCHEME.background,
    color: COLOR_SCHEME.text,
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  removeButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#f44336",
    borderRadius: 100,
    zIndex: 1,
    padding: 6,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: COLOR_SCHEME.accent,
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

export default Advance;
