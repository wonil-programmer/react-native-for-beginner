import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function App() {
  return (
    <View className={"flex flex-1 bg-coral"}>
      <StatusBar style={"light"} />
      <View className="flex-1 bg-slate-100 justify-center items-center">
        <Text className="text-[68px] color-slate-600">Seoul</Text>
      </View>
      <View className="weather flex-[1.8] bg-white">
        <ScrollView
          className={"weather"}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weather}
        >
          <View className={`day w-screen items-center`}>
            <Text className="temperature mt-[48px] text-[178px]">27</Text>
            <Text className="description -mt-2 text-[54px]">Sunny</Text>
          </View>
          <View className={`day w-screen items-center`}>
            <Text className="temperature mt-[48px] text-[178px]">27</Text>
            <Text className="description -mt-2 text-[54px]">Sunny</Text>
          </View>
          <View className={`day w-screen items-center`}>
            <Text className="temperature mt-[48px] text-[178px]">27</Text>
            <Text className="description -mt-2 text-[54px]">Sunny</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weather: {
    backgroundColor: "white",
  },
});
