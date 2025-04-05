import { ScrollView, StyleSheet, Text, View } from 'react-native';
import COLOR_SCHEME from '../../colors/MainStyle';
import { useLocalSearchParams } from 'expo-router';
import BackHeader from '../../components/BackHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomerComplaintHistoryDetail = () => {
  const params = useLocalSearchParams()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
      <BackHeader gap={80} name={"History Detail"}/>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.productName}>{params.product}</Text>
          <View style={[styles.statusContainer, { backgroundColor: COLOR_SCHEME.accent }]}>
            <Text style={styles.statusText}>{params.status}</Text>
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <DetailRow label="Complaint Number" value={params.complaintNo} />
          <DetailRow label="Visit Date" value={params.visitDate} />
          <DetailRow label="Days Since Complaint" value={params.complainedFiledDay} />
          <DetailRow label="Product Code" value={params.productCode} />
          <DetailRow label="Region" value={params.region} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_SCHEME.background,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: COLOR_SCHEME.primary,
    padding: 16,
    borderRadius: 8,
  },
  productName: {
    fontSize: 24,
    fontWeight: '600',
    color: COLOR_SCHEME.text,
    flex: 1,
    marginRight: 16,
  },
  statusContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusText: {
    color: COLOR_SCHEME.text,
    fontSize: 14,
    fontWeight: '500',
  },
  detailsContainer: {
    backgroundColor: COLOR_SCHEME.secondary,
    borderRadius: 8,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_SCHEME.primary,
  },
  detailLabel: {
    color: COLOR_SCHEME.grayText,
    fontSize: 16,
  },
  detailValue: {
    color: COLOR_SCHEME.text,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CustomerComplaintHistoryDetail;