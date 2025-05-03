import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import COLOR_SCHEME from "../../colors/MainStyle";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 16;
const BUTTON_WIDTH = (width - CARD_MARGIN * 3) / 2;

const quickActions = [
  { id: "1", icon: "work", title: "Store", route: "/StoreScreen" },
  { id: "2", icon: "summarize", title: "Visit Date", route: "Visits" },
  { id: "3", icon: "inventory", title: "Techni Finding",route:"TechnicialFIndings" },
  { id: "4", icon: "open-with", title: "Advance" },
];

const FourButtonPages = () => {
  const navigation = useRouter();

  const renderButton = (item) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => item.route && navigation.push(item.route)}
      style={styles.quickActionItem}
      activeOpacity={0.9}
    >
     
      <View style={styles.gradient}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name={item.icon}
            size={34}
            color={COLOR_SCHEME.accent}
          />
        </View>
      </View>
      <Text style={styles.quickActionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonGrid}>
        <View style={styles.row}>
          {renderButton(quickActions[0])}
          {renderButton(quickActions[1])}
        </View>
        <View style={styles.row}>
          {renderButton(quickActions[2])}
          {renderButton(quickActions[3])}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_SCHEME.background,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonGrid: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: CARD_MARGIN,
  },
  quickActionItem: {
    width: BUTTON_WIDTH,
    marginHorizontal: CARD_MARGIN / 2,
    borderRadius: 16,
    backgroundColor: COLOR_SCHEME.background,
    elevation: 4,
    shadowColor: COLOR_SCHEME.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  gradient: {
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
  },
  iconContainer: {
    backgroundColor: COLOR_SCHEME.accent + "20",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  quickActionText: {
    color: COLOR_SCHEME.text,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
});

export default FourButtonPages;
