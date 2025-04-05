import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CameraView } from "expo-camera";

const QrcodeScannerModel = ({setShowScanner,showScanner,permission,facing,handleBarcodeScanned,toggleCameraFacing,requestPermission}) => {
  return (
    <Modal visible={showScanner} animationType="slide">
      <View style={styles.scannerContainer}>
        {!permission?.granted ? (
          <View style={styles.permissionContainer}>
            <Text style={styles.permissionText}>
              Camera permission is required to scan QR codes
            </Text>
            <Button title="Grant Permission" onPress={requestPermission} />
          </View>
        ) : (
          <>
            <CameraView
              style={styles.camera}
              facing={facing}
              onBarcodeScanned={handleBarcodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ["qr", "ean13", "code128", "code39"],
              }}
            >
              <View style={styles.scannerOverlay}>
                <View style={styles.scanFrame} />
                <Text style={styles.scanText}>Align code within frame</Text>
              </View>
            </CameraView>

            <View style={styles.scannerControls}>
              <TouchableOpacity
                style={styles.scannerButton}
                onPress={() => setShowScanner(false)}
              >
                <Text style={styles.buttonText}>Close Scanner</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.scannerButton}
                onPress={toggleCameraFacing}
              >
                <Text style={styles.buttonText}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default QrcodeScannerModel;

const styles = StyleSheet.create({
 
  scannerContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  scannerOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  scanFrame: {
    width: 250,
    height: 150,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "transparent",
  },
  scanText: {
    color: "white",
    marginTop: 20,
    fontSize: 16,
  },
  scannerControls: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  scannerButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 15,
    borderRadius: 8,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
