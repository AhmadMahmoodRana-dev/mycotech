import React, { useState } from "react";
import {View,ScrollView,Text,Switch,TouchableOpacity,StyleSheet} from "react-native";
import COLOR_SCHEME from "../../colors/MainStyle";
import { SafeAreaView } from "react-native-safe-area-context";
const Setting = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    newJobs: true,
    jobUpdates: true,
    messages: true,
  });

  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Account Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Account Settings</Text>
          <SettingsItem
            title="Edit Profile"
            onPress={() => console.log("Navigate to Edit Profile")}
          />
          <SettingsItem
            title="Change Password"
            onPress={() => console.log("Navigate to Change Password")}
          />
          <SettingsItem
            title="Logout"
            onPress={() => console.log("Handle logout")}
            isLastItem
          />
        </View>

        {/* Notification Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Notifications</Text>
          <SettingsItem
            title="New Job Alerts"
            rightComponent={
              <Switch
                value={notificationSettings.newJobs}
                onValueChange={() => handleToggle("newJobs")}
                trackColor={{
                  false: COLOR_SCHEME.secondary,
                  true: COLOR_SCHEME.accent,
                }}
                thumbColor={COLOR_SCHEME.text}
              />
            }
          />
          <SettingsItem
            title="Job Updates"
            rightComponent={
              <Switch
                value={notificationSettings.jobUpdates}
                onValueChange={() => handleToggle("jobUpdates")}
                trackColor={{
                  false: COLOR_SCHEME.secondary,
                  true: COLOR_SCHEME.accent,
                }}
                thumbColor={COLOR_SCHEME.text}
              />
            }
          />
          <SettingsItem
            title="Messages"
            rightComponent={
              <Switch
                value={notificationSettings.messages}
                onValueChange={() => handleToggle("messages")}
                trackColor={{
                  false: COLOR_SCHEME.secondary,
                  true: COLOR_SCHEME.accent,
                }}
                thumbColor={COLOR_SCHEME.text}
              />
            }
            isLastItem
          />
        </View>

        {/* App Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Preferences</Text>
          <SettingsItem
            title="Dark Mode"
            rightComponent={
              <Switch
                value={darkMode}
                onValueChange={() => setDarkMode(!darkMode)}
                trackColor={{
                  false: COLOR_SCHEME.secondary,
                  true: COLOR_SCHEME.accent,
                }}
                thumbColor={COLOR_SCHEME.text}
              />
            }
            isLastItem
          />
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Support</Text>
          <SettingsItem
            title="Contact Support"
            onPress={() => console.log("Navigate to Contact Support")}
          />
          <SettingsItem
            title="FAQs"
            onPress={() => console.log("Navigate to FAQs")}
          />
          <SettingsItem
            title="Terms of Service"
            onPress={() => console.log("Navigate to Terms")}
            isLastItem
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SettingsItem = ({ title, onPress, rightComponent, isLastItem }) => (
  <TouchableOpacity
    style={[styles.itemContainer, isLastItem && styles.lastItem]}
    onPress={onPress}
  >
    <Text style={styles.itemTitle}>{title}</Text>
    {rightComponent && rightComponent}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_SCHEME.background,
    padding: 16,
  },
  section: {
    backgroundColor: COLOR_SCHEME.primary,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    padding: 16,
    color: COLOR_SCHEME.grayText,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_SCHEME.grayText,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemTitle: {
    fontSize: 16,
    color: COLOR_SCHEME.text,
  },
});

export default Setting;
