import React, { useContext, useEffect, useState } from "react";
import {View,Text,StyleSheet,TouchableOpacity,Image,ScrollView} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLOR_SCHEME from "../../colors/MainStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import avatar from "../../assets/images/avatar.jpg";
import axios from "axios";
import BaseUrl from "../../common/BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Context } from "../../context/Context";
const Profile = () => {
  const { Logout } = useContext(Context);
  const [profileImage, setProfileImage] = useState(null);
  const [profile, setProfile] = useState();

  const loadProfile = async () => {
    const empId = await AsyncStorage.getItem("empId");
    try {
      const { data } = await axios.get(`${BaseUrl}/auth/profile/${empId}`);
      setProfile(data.profile);
    } catch (error) {
      console.log(error, "Error");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    if (profile?.URL) {
      setProfileImage(profile.URL);
    }
  }, [profile]);

  useEffect(() => {
    const loadImage = async () => {
      const savedImage = await AsyncStorage.getItem("profileImage");

      if (savedImage) {
        setProfileImage(savedImage);
      } else if (profile?.URL) {
        setProfileImage(profile.URL);
      }
    };
    loadImage();
  }, [profile]);

  // Function to pick an image from the gallery
  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setProfileImage(selectedImageUri);
      await AsyncStorage.setItem("profileImage", selectedImageUri);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => handleImagePicker()}
          style={styles.avatarContainer}
        >
          <Image
            source={profileImage ? { uri: profileImage } : avatar}
            style={styles.avatarImage}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{profile?.EMP_NAME}</Text>
        <Text style={styles.title}>{profile?.DESIGNATION_NAME}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <InfoItem
            icon="card-account-details"
            label="Employee No"
            value={profile?.EMP_NO}
          />
          <InfoItem icon="badge-account" label="CNIC" value={profile?.NIC} />
          <InfoItem
            icon="calendar"
            label="Date of Birth"
            value={formatDate(profile?.DOB)}
          />
          <InfoItem
            icon="calendar-check"
            label="Join Date"
            value={formatDate(profile?.DOJ)}
          />
          <InfoItem
            icon="water"
            label="Blood Group"
            value={profile?.BLOOD_GROUP}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <InfoItem
            icon="cellphone"
            label="Mobile"
            value={profile?.MOBILE_PHONE}
          />
          <InfoItem icon="phone" label="Home" value={profile?.HOME_PHONE} />
          <InfoItem
            icon="email"
            label="Email"
            value={profile?.E_MAIL_ADDRESS || "N/A"}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Department Info</Text>
          <InfoItem
            icon="office-building"
            label="Department ID"
            value={profile?.DEPARTMENT_NAME}
          />
          <InfoItem icon="map-marker" label="Region" value={profile?.REGION_NAME} />
        </View>

        <TouchableOpacity onPress={() => Logout()} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <View style={styles.infoItem}>
    <MaterialCommunityIcons name={icon} size={20} color={COLOR_SCHEME.accent} />
    <Text style={styles.infoText}>
      {label}: {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_SCHEME.background,
  },
  header: {
    backgroundColor: COLOR_SCHEME.primary,
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLOR_SCHEME.accent,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLOR_SCHEME.text,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: COLOR_SCHEME.grayText,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: COLOR_SCHEME.secondary,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLOR_SCHEME.text,
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    color: COLOR_SCHEME.text,
    marginLeft: 10,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: COLOR_SCHEME.accent,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  logoutText: {
    color: COLOR_SCHEME.text,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
