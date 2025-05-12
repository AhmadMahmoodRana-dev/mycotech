import React, { useState, useEffect } from "react";
import {View,Text,StyleSheet,FlatList,TextInput,TouchableOpacity,ActivityIndicator} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import BackHeader from "../../components/BackHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const COLOR_SCHEME = {
  primary: "#2A2A2A",
  secondary: "#3B3B3B",
  accent: "#1e8dcf",
  background: "#1A1A1A",
  text: "#FFFFFF",
  grayText: "#AAAAAA",
};

const OHStockPage = () => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with your actual data fetching logic
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockInventory = [
        {
          id: "1",
          partNo: "ENG-001",
          description: "Engine Oil Filter",
          servicePrice: 24.99,
          quantity: 15,
          branchQuantities: {
            "Main Branch": 8,
            "North Branch": 4,
            "South Branch": 3,
          },
        },
        {
          id: "2",
          partNo: "BRK-002",
          description: "Brake Pads Set",
          servicePrice: 49.99,
          quantity: 22,
          branchQuantities: {
            "Main Branch": 12,
            "North Branch": 6,
            "South Branch": 4,
          },
        },
        {
          id: "3",
          partNo: "BAT-003",
          description: "Car Battery 12V",
          servicePrice: 129.99,
          quantity: 9,
          branchQuantities: {
            "Main Branch": 5,
            "North Branch": 2,
            "South Branch": 2,
          },
        },
        {
          id: "4",
          partNo: "TIR-004",
          description: "All-Season Tires",
          servicePrice: 89.99,
          quantity: 14,
          branchQuantities: {
            "Main Branch": 6,
            "North Branch": 5,
            "South Branch": 3,
          },
        },
        {
          id: "5",
          partNo: "SPK-005",
          description: "Spark Plugs (Set of 4)",
          servicePrice: 19.99,
          quantity: 30,
          branchQuantities: {
            "Main Branch": 15,
            "North Branch": 10,
            "South Branch": 5,
          },
        },
      ];
      setInventory(mockInventory);
      setFilteredInventory(mockInventory);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchText === "") {
      setFilteredInventory(inventory);
    } else {
      const filtered = inventory.filter(
        (item) =>
          item.partNo.toLowerCase().includes(searchText.toLowerCase()) ||
          item.description.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredInventory(filtered);
    }
  }, [searchText, inventory]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <Text style={styles.partNo}>{item.partNo}</Text>
        <Text style={styles.quantity}>Qty: {item.quantity}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>
        Service Price: ${item.servicePrice.toFixed(2)}
      </Text>

      <View style={styles.branchContainer}>
        <Text style={styles.branchTitle}>Branch Quantities:</Text>
        {Object.entries(item.branchQuantities).map(([branch, qty]) => (
          <View key={branch} style={styles.branchRow}>
            <Text style={styles.branchName}>{branch}:</Text>
            <Text style={styles.branchQty}>{qty}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLOR_SCHEME.accent} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingHorizontal:14}}>
        <BackHeader gap={74} name={"On Hand Stock"} />
      </View>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color={COLOR_SCHEME.grayText} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Part No or Description"
          placeholderTextColor={COLOR_SCHEME.grayText}
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText !== "" && (
          <TouchableOpacity onPress={() => setSearchText("")}>
            <MaterialIcons
              name="close"
              size={20}
              color={COLOR_SCHEME.grayText}
            />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredInventory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons
              name="inventory"
              size={50}
              color={COLOR_SCHEME.grayText}
            />
            <Text style={styles.emptyText}>No items found</Text>
          </View>
        }
      />
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
    padding: 16,
    paddingTop: 50,
  },
  headerText: {
    color: COLOR_SCHEME.text,
    fontSize: 24,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR_SCHEME.secondary,
    borderRadius: 8,
    paddingHorizontal: 12,
    margin: 16,
    marginTop: 8,
  },
  searchInput: {
    flex: 1,
    color: COLOR_SCHEME.text,
    padding: 12,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: COLOR_SCHEME.secondary,
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  partNo: {
    color: COLOR_SCHEME.accent,
    fontSize: 18,
    fontWeight: "bold",
  },
  quantity: {
    color: COLOR_SCHEME.text,
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    color: COLOR_SCHEME.text,
    fontSize: 16,
    marginBottom: 8,
  },
  price: {
    color: COLOR_SCHEME.text,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  branchContainer: {
    borderTopWidth: 1,
    borderTopColor: COLOR_SCHEME.primary,
    paddingTop: 8,
  },
  branchTitle: {
    color: COLOR_SCHEME.grayText,
    fontSize: 14,
    marginBottom: 4,
  },
  branchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  branchName: {
    color: COLOR_SCHEME.text,
    fontSize: 14,
  },
  branchQty: {
    color: COLOR_SCHEME.text,
    fontSize: 14,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR_SCHEME.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    color: COLOR_SCHEME.grayText,
    fontSize: 18,
    marginTop: 16,
  },
});

export default OHStockPage;
