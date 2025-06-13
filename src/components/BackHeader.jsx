import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import COLOR_SCHEME from "../colors/MainStyle";

const BackHeader = ({name,gap}) => {
    const navigate = useRouter();
    const run = () =>{

    }
  return (
    <View style={{ alignItems: "center", flexDirection: "row", gap: gap,marginBottom: 20 }}>
      <Ionicons
        name="arrow-back-sharp"
        size={24}
        color="white"
        onPress={() => navigate.back()}
      />
      <Text style={styles.header}>{name}</Text>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: COLOR_SCHEME.text,
      },
});
