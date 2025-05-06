import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
  Image,
} from "react-native";
import DarkTheme from "../../colors/MainStyle";

export default function OTPVerificationScreen() {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) return;
  
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  
    if (text && index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }
  };
  

  const handleVerify = () => {
    if (otp.some((val) => val === "")) {
      Alert.alert("Error", "Please fill up all the cells properly");
      return;
    }

    const code = otp.join("");
    Alert.alert("Verified", `Code entered: ${code}`);
  };

  const handleClear = () => {
    setOtp(["", "", "", ""]);
    inputs.current[0].focus();
  };

  const handleKeyPress = ({ key }, index) => {
    if (key === 'Backspace') {
      if (otp[index] === '') {
        const newOtp = [...otp];
        if (index > 0) {
          newOtp[index - 1] = '';
          setOtp(newOtp);
          inputs.current[index - 1].focus();
        }
      }
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Logo + Title */}
      <Image
        style={styles.logo}
        source={require("../../assets/images/otpLogo.png")}
      />
      {/* OTP Section */}
      <Text style={styles.otpTitle}>OTP Verification</Text>
      <Text style={styles.description}>
        Enter the code sent to <Text style={styles.bold}>(03015988221)</Text>
      </Text>

      {/* OTP Input Boxes */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, index)}
            returnKeyType="next"
          />
        ))}
      </View>

      {/* Error if not filled */}
      {otp.some((val) => val === "") && (
        <Text style={styles.errorText}>
          *Please fill up all the cells properly
        </Text>
      )}

      {/* Resend */}
      <View style={styles.resendContainer}>
        <Text style={{color:"#fff"}}>Didn't receive the code?</Text>
        <TouchableOpacity onPress={() => Alert.alert("Resend code")}>
          <Text style={styles.resendText}> RESEND</Text>
        </TouchableOpacity>
      </View>

      {/* Verify Button */}
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyText}>VERIFY</Text>
      </TouchableOpacity>

      {/* Clear */}
      <TouchableOpacity onPress={handleClear}>
        <Text style={styles.clearText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
    backgroundColor: DarkTheme.background,
  },
  logo: {
    fontWeight: "bold",
    color: "#0077cc",
    width: 200,
    height: 200,
    marginBottom: 40,
  },

  subtitle: {
    fontSize: 16,
    color: "#0077cc",
    marginBottom: 40,
  },
  otpTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: DarkTheme.text,
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
    color: DarkTheme.text,
  },
  bold: {
    fontWeight: "bold",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    // paddingHorizontal: 20,
    marginBottom: 10,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 5,
    color: DarkTheme.text,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  resendContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  resendText: {
    color: DarkTheme.accent,
    fontWeight: "bold",
  },
  verifyButton: {
    backgroundColor: DarkTheme.accent,
    width: "80%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  verifyText: {
    color: "#fff",
    fontWeight: "bold",
  },
  clearText: {
    marginTop: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
});