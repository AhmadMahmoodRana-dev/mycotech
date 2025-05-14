import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLOR_SCHEME from "../colors/MainStyle";

const CustomInput = ({
  icon,
  placeholder,
  value,
  onChangeText,
  editable = true,
  secureTextEntry = false,
  iconFunction,
}) => {
  return (
    <View style={styles.inputGroup}>
      <Ionicons
        onPress={() => iconFunction?.()}
        name={icon}
        size={18}
        color={COLOR_SCHEME.grayText}
        style={styles.inputIcon}
      />
      <TextInput
        style={[
          styles.input,
          placeholder === "Address" && styles.addressInput,
        ]}
        placeholder={placeholder}
        placeholderTextColor={COLOR_SCHEME.grayText}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        secureTextEntry={secureTextEntry}
        multiline={placeholder === "Address"}
        textAlignVertical={
          placeholder === "Address" ? "top" : "center"
        } // Ensures better alignment
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
    backgroundColor: COLOR_SCHEME.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputIcon: {
    marginRight: 10,
    marginTop: 12,
  },
  input: {
    flex: 1,
    color: COLOR_SCHEME.text,
    fontSize: 16,
    paddingVertical: 8,
  },
  addressInput: {
    height: 80,
  },
});

export default CustomInput;
