import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import BackHeader from "../../components/BackHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import BaseUrl from "../../common/BaseUrl";

const { width } = Dimensions.get("window");

const COLOR_SCHEME = {
  primary: "#2A2A2A",
  secondary: "#3B3B3B",
  accent: "#1e8dcf",
  background: "#1A1A1A",
  text: "#FFFFFF",
  grayText: "#AAAAAA",
};

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("hardware");
  const tabPosition = useState(new Animated.Value(0))[0];
  const tabUnderlineWidth = width * 0.2;

  // Handle tab switching with animation
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    Animated.spring(tabPosition, {
      toValue: tab === "hardware" ? 0 : width * 0.45,
      useNativeDriver: true,
    }).start();
  };

  const fetchedInventory = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/allInventory`);
      setInventory(data?.inventory);
    } catch (error) {
      console.error(error);
    }
  };

  // Mock data for hardware and services
  useEffect(() => {
    fetchedInventory();
    setIsLoading(false);
  }, []);

  // Render hardware items
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.description}>{item?.ITEM_DESC}</Text>

      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Service Price:</Text>
        <Text style={styles.priceValue}>${item?.ITEM_PRICE?.toFixed(2)}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.typeBadge}>Type: {item?.ITEM_TYPE}</Text>
        <Text style={styles.partNo}>{item?.PART_NO || "No Part Number"}</Text>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLOR_SCHEME.accent} />
        <Text style={styles.loadingText}>Loading Inventory...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 14 }}>
        <BackHeader gap={100} name={"Inventory"} />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabChange("hardware")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "hardware" && styles.activeTabText,
            ]}
          >
            Hardware
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabChange("services")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "services" && styles.activeTabText,
            ]}
          >
            Services
          </Text>
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.tabIndicator,
            {
              transform: [{ translateX: tabPosition }],
              width: tabUnderlineWidth,
            },
          ]}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color={COLOR_SCHEME.grayText} />
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder={
            activeTab === "hardware" ? "Search parts..." : "Search services..."
          }
          placeholderTextColor={COLOR_SCHEME.grayText}
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
        data={inventory
          .filter((item) =>
            activeTab === "hardware"
              ? item.ITEM_TYPE === "01"
              : item.ITEM_TYPE === "02"
          )
          .filter(
            (item) =>
              (item?.ITEM_DESC || "")
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
              (item?.PART_NO || "")
                .toLowerCase()
                .includes(searchText.toLowerCase())
          )}
        renderItem={renderItem}
        keyExtractor={(item) => item.ITEM_ID?.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons
              name={
                activeTab === "hardware" ? "handyman" : "miscellaneous-services"
              }
              size={50}
              color={COLOR_SCHEME.grayText}
            />
            <Text style={styles.emptyText}>
              No {activeTab === "hardware" ? "hardware" : "services"} items
              found
            </Text>
            <Text style={styles.emptySubText}>
              Try adjusting your search or check back later
            </Text>
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
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    paddingHorizontal: 20,
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: COLOR_SCHEME.background + "20",
    paddingBottom: 10,
  },
  tabButton: {
    paddingVertical: 12,
    width: "45%",
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLOR_SCHEME.grayText,
  },
  activeTabText: {
    color: COLOR_SCHEME.accent,
    fontWeight: "700",
  },
  tabIndicator: {
    position: "absolute",
    bottom: -1,
    left: 64,
    height: 3,
    backgroundColor: COLOR_SCHEME.accent,
    borderRadius: 3,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR_SCHEME.secondary,
    borderRadius: 12,
    paddingHorizontal: 15,
    margin: 16,
    marginTop: 15,
    marginBottom: 20,
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
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLOR_SCHEME.accent,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },

  serviceName: {
    color: COLOR_SCHEME.text,
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  quantity: {
    color: COLOR_SCHEME.text,
    fontSize: 16,
    fontWeight: "600",
    backgroundColor: "#1e8dcf22",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  price: {
    color: COLOR_SCHEME.accent,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
  },
  branchContainer: {
    borderTopWidth: 1,
    borderTopColor: COLOR_SCHEME.primary,
    paddingTop: 10,
  },
  branchTitle: {
    color: COLOR_SCHEME.grayText,
    fontSize: 14,
    marginBottom: 6,
  },
  branchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  branchName: {
    color: COLOR_SCHEME.text,
    fontSize: 14,
    opacity: 0.8,
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
  loadingText: {
    color: COLOR_SCHEME.grayText,
    marginTop: 20,
    fontSize: 16,
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
    fontWeight: "600",
  },
  emptySubText: {
    color: COLOR_SCHEME.grayText,
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
    opacity: 0.7,
  },
  serviceDetails: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 10,
  },
  detailBadge: {
    backgroundColor: "#1e8dcf33",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  detailBadgeText: {
    color: COLOR_SCHEME.text,
    fontSize: 13,
    fontWeight: "500",
  },
  card: {
    backgroundColor: COLOR_SCHEME.secondary,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#4A90E2",
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
    color: COLOR_SCHEME.grayText,
    marginBottom: 12,
    lineHeight: 22,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: "#666",
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "700",
    color: COLOR_SCHEME.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typeBadge: {
    backgroundColor: COLOR_SCHEME?.background,
    color: "#4A90E2",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: "500",
  },
  partNo: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
});

export default InventoryPage;