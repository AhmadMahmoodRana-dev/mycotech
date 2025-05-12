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
import { useRouter } from "expo-router";
import CustomDropdown from "../../components/CustomDropdown";

const predefinedFindings = [
  {
    actualFault: "No Function",
    relevantReason: "Dust in Panel",
    correctiveAction: "Clean It Properly",
  },
  {
    actualFault: "Overheating",
    relevantReason: "Blocked Vents",
    correctiveAction: "Clear the Ventilation",
  },
];

const initialEntry = {
  actualFault: "",
  relevantReason: "",
  correctiveAction: "",
};

const TechnicalFindings = () => {
  const [findings, setFindings] = useState([{ ...initialEntry }]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const isFilled = (entry) =>
    entry.actualFault && entry.relevantReason && entry.correctiveAction;

  const addFinding = () => {
    setFindings([...findings, { ...initialEntry }]);
  };

  const handleDelete = (index) => {
    const updated = findings.filter((_, i) => i !== index);
    setFindings(updated.length ? updated : [{ ...initialEntry }]);
  };


  const handleSelectPredefined = (value) => {
    const updated = [...findings];
    updated[dropdownIndex][activeField] = value;
    setFindings(updated);
    setDropdownVisible(false);
    setDropdownIndex(null);
    setActiveField(null);
  };

  const handleSubmit = () => {
    const allFilled = findings.every(isFilled);
    if (!allFilled) {
      alert("Please complete all findings before submitting.");
      return;
    }
    console.log("Submitted Findings:", findings);
    router.push("/StoreScreen");
    setSubmitted(true);
    setFindings([initialEntry]);
  };

  const actualFaultOptions = [
    ...new Set(predefinedFindings.map((item) => item.actualFault)),
  ];
  const relevantReasonOptions = [
    ...new Set(predefinedFindings.map((item) => item.relevantReason)),
  ];
  const correctiveActionOptions = [
    ...new Set(predefinedFindings.map((item) => item.correctiveAction)),
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR_SCHEME.background }}>
      <ScrollView style={styles.container}>
        <BackHeader name={"Technician Findings"} gap={50} />
    {isFilled(findings[findings.length - 1]) && (
      <TouchableOpacity onPress={addFinding} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add New</Text>
      </TouchableOpacity>
    )}

        {findings.map((entry, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.label}>Actual Fault</Text>
            <CustomDropdown
              items={actualFaultOptions}
              value={entry.actualFault}
              placeholder="Select Actual Fault"
              onSelect={(value) => {
                const updated = [...findings];
                updated[index].actualFault = value;
                setFindings(updated);
              }}
            />

            <Text style={styles.label}>Relevant Reason</Text>
            <CustomDropdown
              items={relevantReasonOptions}
              value={entry.relevantReason}
              placeholder="Select Relevant Reason"
              onSelect={(value) => {
                const updated = [...findings];
                updated[index].relevantReason = value;
                setFindings(updated);
              }}
            />

            <Text style={styles.label}>Corrective Action</Text>
            <CustomDropdown
              items={correctiveActionOptions}
              value={entry.correctiveAction}
              placeholder="Select Corrective Action"
              onSelect={(value) => {
                const updated = [...findings];
                updated[index].correctiveAction = value;
                setFindings(updated);
              }}
            />
            <TouchableOpacity
              onPress={() => handleDelete(index)}
              style={styles.removeButton}
            >
              <Entypo name="cross" style={styles.removeButtonText} />
            </TouchableOpacity>
          </View>
        ))}


        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  addButton: {
    backgroundColor: COLOR_SCHEME.accent,
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-end",
    marginVertical: 15,
  },
  addButtonText: { color: "#fff", fontWeight: "600" },
  card: {
    backgroundColor: COLOR_SCHEME.secondary,
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: { fontWeight: "500", marginBottom: 6, color: COLOR_SCHEME.text },
  input: {
    backgroundColor: COLOR_SCHEME.background,
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: COLOR_SCHEME.accent,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  submitButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  resultCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  findingTitle: { fontWeight: "700", marginBottom: 8 },
  bold: { fontWeight: "600" },
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
    borderRadius: "100%",
    zIndex: 1,
    padding: 6,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TechnicalFindings;
