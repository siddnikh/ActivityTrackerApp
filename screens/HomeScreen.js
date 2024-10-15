import React from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { colors } from "../colors";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation, items, saveItems }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("ItemDetails", { item })}
    >
      <BlurView intensity={100} tint="dark" style={styles.blurView}>
        <Ionicons
          name={item.icon}
          size={40}
          color={colors.primary}
          style={styles.itemIcon}
        />
        <Text style={styles.itemText}>{item.name}</Text>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[colors.secondary, colors.background]}
      style={styles.container}
    >
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
      />
      <Text style={styles.motivationText}>
        Keep tracking your activities and achieve your goals!
      </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddItem")}
      >
        <BlurView intensity={100} tint="systemChromeMaterialDark" style={styles.addButtonBlur}>
          <Ionicons name="add" size={32} color={colors.primary} />
        </BlurView>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 40,
    justifyContent: "center",
  },
  listContent: {
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: "space-between", // Better grid layout
    marginVertical: 10,
  },
  item: {
    width: (width - 50) / 2.1, // Increased spacing for a cleaner grid
    height: 180,
    margin: 10,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: colors.primary,
  },
  motivationText: {
    marginVertical: 10,
    textAlign: "center",
    fontSize: 16,
    color: colors.textSecondary, // or any color you prefer
    fontWeight: "bold", // optional for emphasis
    marginBottom: 90, // Adjusted margin to create space above the add button
  },
  blurView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  itemIcon: {
    marginBottom: 15,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    elevation: 6,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  addButtonBlur: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
