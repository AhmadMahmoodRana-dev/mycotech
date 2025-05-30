import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import COLOR_SCHEME from "../../colors/MainStyle";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../components/BackHeader";
import InvoiceModel from "../../components/Models/InvoiceModel";
import CustomDropdown from "../../components/CustomDropdown";

const initialEntry = { partNo: "", partName: "", quantity: "", price: "" };
const initialService = { name: "", price: "" };
const StoreScreen = () => {
  const PARTS_LIST = [
    { partNo: "PN001", partName: "Brake Pad", price: 120 },
    { partNo: "PN002", partName: "Oil Filter", price: 75 },
    { partNo: "PN003", partName: "Air Filter", price: 90 },
  ];
  const handlePartNoSelect = (index, selectedPart) => {
    const updatedEntries = [...entries];
    updatedEntries[index].partNo = selectedPart.partNo;
    updatedEntries[index].partName = selectedPart.partName;
    updatedEntries[index].price = selectedPart.price.toString();
    setEntries(updatedEntries);
  };

  const [entries, setEntries] = useState([{ ...initialEntry }]);
  const [serviceEntries, setServiceEntries] = useState([{ ...initialService }]);

  const handleInputChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const isEntryFilled = (entry) => {
    return entry.partNo && entry.partName && entry.quantity && entry.price;
  };

  const addNewEntry = () => {
    const lastEntry = entries[entries.length - 1];
    if (!isEntryFilled(lastEntry)) {
      Alert.alert(
        "Incomplete Entry",
        "Please fill out all fields before adding a new entry."
      );
      return;
    }
    setEntries([...entries, { ...initialEntry }]);
  };

  const removeEntry = (indexToRemove) => {
    if (entries.length === 1) {
      Alert.alert("Minimum Entry", "At least one entry must remain.");
      return;
    }
    const updatedEntries = entries.filter(
      (_, index) => index !== indexToRemove
    );
    setEntries(updatedEntries);
  };
  const [showInvoice, setShowInvoice] = useState(false);

  const handleSubmit = () => {
    if (selectedType === "hardware") {
      const allFilled = entries.every(isEntryFilled);
      if (!allFilled) {
        Alert.alert(
          "Incomplete Form",
          "Please fill out all fields before submitting."
        );
        return;
      }
      const parsedEntries = entries.map((entry) => ({
        ...entry,
        quantity: Number(entry.quantity),
        price: Number(entry.price),
      }));
      console.log("Submitted Hardware Entries:", parsedEntries);
    } else {
      const allFilled = serviceEntries.every(isServiceFilled);
      if (!allFilled) {
        Alert.alert("Incomplete Form", "Please fill out all service entries.");
        return;
      }
      const parsedServices = serviceEntries.map((entry) => ({
        ...entry,
        price: Number(entry.price),
      }));
      console.log("Submitted Service Entries:", parsedServices);
    }

    setShowInvoice(true);
    setEntries([{ ...initialEntry }]);
    setServiceEntries([{ ...initialService }]);
  };

  const technician = { name: "Ahmad Mahmood", id: "TECH1234" };
  const customer = {
    name: "Ali Raza",
    address: "123 Street, Lahore",
    phone: "0300-1234567",
  };
  const services = [
    { name: "AC Repair", price: 2500 },
    { name: "Gas Refill", price: 1500 },
    { name: "General Maintenance", price: 1000 },
  ];

  const [selectedType, setSelectedType] = useState("hardware");

  const handleServiceSelect = (index, selectedServiceName) => {
    const selectedService = services.find(
      (s) => s.name === selectedServiceName
    );
    const updatedServices = [...serviceEntries];
    updatedServices[index].name = selectedService.name;
    updatedServices[index].price = selectedService.price.toString();
    setServiceEntries(updatedServices);
  };

  const isServiceFilled = (entry) => entry.name && entry.price;

  const addNewService = () => {
    const lastEntry = serviceEntries[serviceEntries.length - 1];
    if (!isServiceFilled(lastEntry)) {
      Alert.alert(
        "Incomplete Entry",
        "Please fill out all service fields before adding a new one."
      );
      return;
    }
    setServiceEntries([...serviceEntries, { ...initialService }]);
  };

  const removeService = (indexToRemove) => {
    if (serviceEntries.length === 1) {
      Alert.alert("Minimum Entry", "At least one service must remain.");
      return;
    }
    const updated = serviceEntries.filter(
      (_, index) => index !== indexToRemove
    );
    setServiceEntries(updated);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR_SCHEME.background }}>
      <ScrollView style={styles.container}>
        <BackHeader name={"Store"} gap={120} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedType === "hardware" && styles.activeTab,
            ]}
            onPress={() => setSelectedType("hardware")}
          >
            <Text style={styles.tabText}>Hardware</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedType === "services" && styles.activeTab,
            ]}
            onPress={() => setSelectedType("services")}
          >
            <Text style={styles.tabText}>Services</Text>
          </TouchableOpacity>
        </View>
        {isEntryFilled(entries[entries.length - 1]) && (
          <TouchableOpacity onPress={addNewEntry} style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add New</Text>
          </TouchableOpacity>
        )}
        {isServiceFilled(serviceEntries[serviceEntries.length - 1]) && (
          <TouchableOpacity onPress={addNewService} style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add New</Text>
          </TouchableOpacity>
        )}

        {selectedType === "hardware" ? (
          entries.map((entry, index) => (
            <View key={index} style={styles.card}>
              <TouchableOpacity
                onPress={() => removeEntry(index)}
                style={styles.removeButton}
              >
                <Entypo name="cross" style={styles.removeButtonText} />
              </TouchableOpacity>

              <Text style={styles.label}>Part No.</Text>
              <CustomDropdown
                items={PARTS_LIST.map((part) => part.partNo)}
                value={entry.partNo}
                placeholder="Select Part No."
                onSelect={(selectedPartNo) => {
                  const selectedPart = PARTS_LIST.find(
                    (p) => p.partNo === selectedPartNo
                  );
                  handlePartNoSelect(index, selectedPart);
                }}
                style={{ marginBottom: 12 }}
              />

              <Text style={styles.label}>Part Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Part Name"
                placeholderTextColor={COLOR_SCHEME.grayText}
                value={entry.partName}
                editable={false}
                onChangeText={(value) =>
                  handleInputChange(index, "partName", value)
                }
              />

              <Text style={styles.label}>Quantity</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Quantity"
                placeholderTextColor={COLOR_SCHEME.grayText}
                keyboardType="numeric"
                value={entry.quantity}
                onChangeText={(value) =>
                  handleInputChange(index, "quantity", value)
                }
              />

              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Price"
                placeholderTextColor={COLOR_SCHEME.grayText}
                keyboardType="numeric"
                value={entry.price}
                editable={false}
                onChangeText={(value) =>
                  handleInputChange(index, "price", value)
                }
              />
            </View>
          ))
        ) : (
          <>
            {serviceEntries.map((entry, index) => (
              <View key={index} style={styles.card}>
                <TouchableOpacity
                  onPress={() => removeService(index)}
                  style={styles.removeButton}
                >
                  <Entypo name="cross" style={styles.removeButtonText} />
                </TouchableOpacity>

                <Text style={styles.label}>Service</Text>
                <CustomDropdown
                  items={services.map((s) => s.name)}
                  value={entry.name}
                  placeholder="Choose Service"
                  onSelect={(serviceName) =>
                    handleServiceSelect(index, serviceName)
                  }
                  style={{ marginBottom: 12 }}
                />

                <Text style={styles.label}>Price</Text>
                <TextInput
                  style={styles.input}
                  value={entry.price}
                  editable={false}
                />
              </View>
            ))}
          </>
        )}

        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
      <InvoiceModel
        visible={showInvoice}
        onClose={() => setShowInvoice(false)}
        technician={technician}
        customer={customer}
        services={services}
      />
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
    alignSelf: "flex-end",
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
    borderRadius: "100%",
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
  tabButton: {
    padding: 10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: COLOR_SCHEME.accent,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  activeTab: {
    backgroundColor: COLOR_SCHEME.accent,
  },
  tabText: {
    color: COLOR_SCHEME.text,
    fontWeight: "600",
  },
});

export default StoreScreen;