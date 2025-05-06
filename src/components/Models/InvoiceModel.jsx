import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  Alert,
  Modal,
  StyleSheet,
} from 'react-native';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import { useRouter } from 'expo-router';
import DarkTheme from "../../colors/MainStyle"

const InvoiceModel = ({ visible, onClose, customer, technician, services }) => {
  const totalAmount = services.reduce((sum, item) => sum + item.price, 0);

  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
            }
            h1 {
              text-align: center;
              color: #4A90E2;
            }
            .section {
              margin-bottom: 20px;
            }
            .title {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 8px;
              border-bottom: 1px solid #ccc;
              padding-bottom: 4px;
            }
            .row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 6px;
            }
            .total {
              margin-top: 20px;
              font-size: 18px;
              font-weight: bold;
              text-align: right;
              border-top: 2px solid #000;
              padding-top: 10px;
            }
          </style>
        </head>
        <body>
          <h1>Service Invoice</h1>
  
          <div class="section">
            <div class="title">Customer Details</div>
            <p><strong>Name:</strong> ${customer.name}</p>
            <p><strong>Address:</strong> ${customer.address}</p>
            <p><strong>Phone:</strong> ${customer.phone}</p>
          </div>
  
          <div class="section">
            <div class="title">Technician</div>
            <p><strong>Name:</strong> ${technician.name}</p>
            <p><strong>ID:</strong> ${technician.id}</p>
          </div>
  
          <div class="section">
            <div class="title">Services</div>
            ${services
              .map(
                (s) =>
                  `<div class="row"><span>${s.name}</span><span>Rs ${s.price}</span></div>`
              )
              .join('')}
          </div>
  
          <div class="total">
            Total: Rs ${services.reduce((sum, item) => sum + item.price, 0)}
          </div>
        </body>
      </html>
    `;
  
    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      Alert.alert('Success', 'PDF Generated & Saved');
      return uri;
    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF');
      console.error(error);
    }
  };

  const shareInvoice = async () => {
    const filePath = await generatePDF();
    if (filePath && (await Sharing.isAvailableAsync())) {
      await Sharing.shareAsync(filePath);
    } else {
      Alert.alert('Sharing not available');
    }
  };

  const router = useRouter();
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.header}>Invoice</Text>

            <View style={styles.section}>
              <Text style={styles.title}>Customer Details</Text>
              <Text style={styles.impheading}>Name: {customer.name}</Text>
              <Text style={styles.impheading}>Address: {customer.address}</Text>
              <Text style={styles.impheading}>Phone: {customer.phone}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.title}>Technician</Text>
              <Text style={styles.impheading}>Name: {technician.name}</Text>
              <Text style={styles.impheading}>ID: {technician.id}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.title}>Services</Text>
              {services.map((item, i) => (
                <View key={i} style={styles.serviceRow}>
                  <Text style={styles.impheading}>{item.name}</Text>
                  <Text style={styles.impheading}>Rs {item.price}</Text>
                </View>
              ))}
            </View>

            <View style={styles.total}>
              <Text style={styles.totalText}>Total: Rs {totalAmount}</Text>
            </View>

            <View style={{ marginTop: 16 }}>
              {/* <Button title="Generate & Save PDF" onPress={generatePDF} /> */}
              <Button title="Processing" onPress={() => router.navigate("OTPVerificationScreen")} />
              <View style={{ height: 10 }} />
              <Button title="Share Invoice" onPress={shareInvoice} />
              <View style={{ height: 10 }} />
              <Button title="Close" onPress={onClose} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default InvoiceModel;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: DarkTheme.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    padding: 16,
  },
  header: {
    color: DarkTheme.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  section: {
    marginBottom: 12,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
    color: DarkTheme.text,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  total: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DarkTheme.text,
  },
  impheading:{
    color: DarkTheme.text,
  }
});
