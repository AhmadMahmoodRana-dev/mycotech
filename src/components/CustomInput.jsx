import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLOR_SCHEME from "../colors/MainStyle";
import { Text } from "react-native";

const CustomInput = ({
  icon,
  placeholder,
  value,
  onChangeText,
  editable = true,
  secureTextEntry = false,
  iconFunction
}) => {
  return (
    <View style={styles.inputGroup}>
      <Ionicons onPress={() => iconFunction()}
        name={icon}
        size={18}
        color={COLOR_SCHEME.grayText}
        style={styles.inputIcon}
      />
      {placeholder === "Phone No" ? (
        <Text style={{ color: "white", fontSize: 16 }}>+92</Text>
      ) : null}

      {placeholder === "Address" ? (
        <TextInput
            style={[styles.input, styles.addressInput]}
            placeholder={placeholder}
          placeholderTextColor={COLOR_SCHEME.grayText}
          value={value}
          onChangeText={onChangeText} // Important for handling input
          editable={editable}
          secureTextEntry={secureTextEntry}
        />
      ) : (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLOR_SCHEME.grayText}
          value={value}
          onChangeText={onChangeText} // Important for handling input
          editable={editable}
          secureTextEntry={secureTextEntry}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default CustomInput;
