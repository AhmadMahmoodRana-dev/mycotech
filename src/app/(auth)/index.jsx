import { Image, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import COLOR_SCHEME from "../../colors/MainStyle"; // Update import path

const index = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.logoContainer}>
        <Image
          source={require("../../assets/images/Dwp11.png")}
          style={Styles.logo}
        />
        <Text style={Styles.logoText}>DWP CARE</Text>
        <Text style={Styles.tagline}>Technical Excellence, Always</Text>
      </View>

      <View style={Styles.formContainer}>
        <View style={Styles.form}>
          {/* Username Input */}
          <View style={Styles.inputContainer}>
            <Ionicons 
              name="person-outline" 
              size={24} 
              color={COLOR_SCHEME.accent} 
              style={Styles.icon} 
            />
            <TextInput
              style={Styles.input}
              placeholder="Username"
              placeholderTextColor={COLOR_SCHEME.grayText}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={Styles.inputContainer}>
            <Ionicons 
              name="lock-closed-outline" 
              size={24} 
              color={COLOR_SCHEME.accent} 
              style={Styles.icon} 
            />
            <TextInput
              style={Styles.input}
              placeholder="Password"
              placeholderTextColor={COLOR_SCHEME.grayText}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={Styles.eyeIcon}
            >
              <Feather
                name={passwordVisible ? "eye-off" : "eye"}
                size={24}
                color={COLOR_SCHEME.accent}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={Styles.forgotPassword}>
            <Text style={Styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={Styles.loginButton}
            activeOpacity={0.8}
          >
            <Text style={Styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_SCHEME.background,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    // tintColor: COLOR_SCHEME.accent,
  },
  logoText: {
    color: COLOR_SCHEME.text,
    fontSize: 28,
    fontWeight: '700',
    marginTop: 15,
    letterSpacing: 1.2,
  },
  tagline: {
    color: COLOR_SCHEME.grayText,
    fontSize: 14,
    marginTop: 8,
  },
  formContainer: {
    flex: 1,
    backgroundColor: COLOR_SCHEME.primary,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    paddingTop: 50,
    shadowColor: COLOR_SCHEME.accent,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR_SCHEME.secondary,
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 56,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: COLOR_SCHEME.text,
    fontSize: 16,
    height: '100%',
  },
  eyeIcon: {
    marginLeft: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: COLOR_SCHEME.accent,
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: COLOR_SCHEME.accent,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    shadowColor: COLOR_SCHEME.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonText: {
    color: COLOR_SCHEME.primary,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default index;