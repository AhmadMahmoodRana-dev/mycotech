import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import COLOR_SCHEME from '../../colors/MainStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import avatar from '../../assets/images/avatar.jpg';
const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);

  const technicianData = {
    name: "Ahmad Mahmood Rana",
    title: "Senior HVAC Technician",
    email: "john.carter@email.com",
    phone: "+1 (234) 567-890",
    skills: ["HVAC Installation", "System Repair", "Maintenance", "Troubleshooting"],
    completedJobs: 245,
    rating: 4.9,
    experience: 5,
  };
  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem('profileImage');
        if (savedImage) {
          setProfileImage(savedImage);
        }
      } catch (error) {
        console.error("Error loading profile image:", error);
      }
    };

    loadProfileImage();
  }, []);

  // Function to pick an image from the gallery
  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
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
      await AsyncStorage.setItem('profileImage', selectedImageUri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Avatar with Image Picker */}
        <TouchableOpacity style={styles.avatarContainer} onPress={handleImagePicker}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatarImage} />
          ) : (
            <Image source={avatar} style={styles.avatarImage} />
          )}
        </TouchableOpacity>

        <Text style={styles.name}>{technicianData.name}</Text>
        <Text style={styles.title}>{technicianData.title}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{technicianData.completedJobs}</Text>
            <Text style={styles.statLabel}>Jobs</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{technicianData.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{technicianData.experience}+</Text>
            <Text style={styles.statLabel}>Years</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="email" size={20} color={COLOR_SCHEME.accent} />
            <Text style={styles.infoText}>{technicianData.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="phone" size={20} color={COLOR_SCHEME.accent} />
            <Text style={styles.infoText}>{technicianData.phone}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills & Expertise</Text>
          <View style={styles.skillsContainer}>
            {technicianData.skills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_SCHEME.background,
  },
  header: {
    backgroundColor: COLOR_SCHEME.primary,
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLOR_SCHEME.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLOR_SCHEME.text,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLOR_SCHEME.text,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: COLOR_SCHEME.grayText,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR_SCHEME.text,
  },
  statLabel: {
    fontSize: 14,
    color: COLOR_SCHEME.grayText,
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
    fontWeight: '600',
    color: COLOR_SCHEME.text,
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    color: COLOR_SCHEME.text,
    marginLeft: 10,
    fontSize: 16,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: COLOR_SCHEME.accent,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 5,
  },
  skillText: {
    color: COLOR_SCHEME.text,
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: COLOR_SCHEME.accent,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 'auto',
  },
  logoutText: {
    color: COLOR_SCHEME.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
