// components/CustomDropdown.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import DarkTheme from "../colors/MainStyle";

const CustomDropdown = ({
  items = [],
  placeholder = "Select",
  style = {},
  value,
  onSelect,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (item) => {
    onSelect(item); // Call parent function to update form
    setShowDropdown(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
      <View style={[styles.container, style]}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text
            style={[
              styles.buttonText,
              !value && { fontSize: 14, color: DarkTheme.text },
            ]}
          >
            {value || placeholder}
          </Text>
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdown}>
            <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled={true}>
              {items.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={{ color: DarkTheme.text }}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  dropdownButton: {
    padding: 11,
    marginBottom: 5,
    backgroundColor: DarkTheme.background,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: DarkTheme.background,
  },
  buttonText: {
    fontSize: 16,
    color: DarkTheme.text,
  },
  dropdown: {
    backgroundColor: DarkTheme.background,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: DarkTheme.background,
    elevation: 4,
    zIndex: 10,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: DarkTheme.primary,
  },
});

export default CustomDropdown;
