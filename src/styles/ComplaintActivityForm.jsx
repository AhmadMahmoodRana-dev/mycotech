import { Platform, StyleSheet } from "react-native";
import COLOR_SCHEME from "../colors/MainStyle";
export const styles = StyleSheet.create({
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
    marginBottom: 10,
    marginTop: 10,
  },
  dropdown: {
    borderWidth: 1,
    padding: 12,
    backgroundColor:COLOR_SCHEME.background,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: COLOR_SCHEME.background,
  },

  dropdownText: {
    fontSize: 16,
    color: COLOR_SCHEME.grayText,
  },

  dropdownList: {
    borderWidth: 1,
    borderColor: COLOR_SCHEME.primary,
    borderRadius: 8,
    backgroundColor: COLOR_SCHEME.background,
    marginBottom: 10,
  },

  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_SCHEME.grayText,
  },
  addButtonText:{
    color: "#fff",
    fontWeight: "600",
  },
  inputContainer: {
    backgroundColor: COLOR_SCHEME.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical:14
  },
});
