import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import COLOR_SCHEME from '../colors/MainStyle';

const Dropdown = ({showStatusDropdown,setShowStatusDropdown,setPhoneStatus,statusOptions}) => {
  return (
          <Modal
            visible={showStatusDropdown}
            transparent
            animationType="fade"
            onRequestClose={() => setShowStatusDropdown(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPressOut={() => setShowStatusDropdown(false)}
            >
              <View style={styles.dropdownContainer}>
                {statusOptions.map((option, index) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.dropdownOption,
                      index !== statusOptions.length - 1 && styles.optionBorder,
                    ]}
                    onPress={() => {
                      setPhoneStatus(option);
                      setShowStatusDropdown(false);
                    }}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>
  )
}

export default Dropdown;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "80%",
    overflow: "hidden",
  },
  dropdownOption: {
    padding: 16,
    backgroundColor: COLOR_SCHEME.background,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR_SCHEME.secondary,
  },
  optionText: {
    color: COLOR_SCHEME.text,
    fontSize: 16,
  },
})
