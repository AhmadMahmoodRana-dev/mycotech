import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="CalenderPage" />
      <Stack.Screen name="Complaint" />
      <Stack.Screen name="ContactedDetail" />
      <Stack.Screen name="CustomerComplaintsHistory" />
      <Stack.Screen name="CustomerComplaintHistoryDetail" />
      <Stack.Screen name="Profile" />
      <Stack.Screen name="Setting" />
      <Stack.Screen name="StoreScreen" />
      <Stack.Screen name="TechnicalFindings" />
      <Stack.Screen name="Visits" />
      <Stack.Screen name="Advance" />
      <Stack.Screen name="OTPVerificationScreen" />
      <Stack.Screen name="InventoryPage" />
      <Stack.Screen name="OHStockPage" />
    </Stack>
  );
}
