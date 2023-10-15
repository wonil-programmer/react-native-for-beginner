import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { Fontisto } from "@expo/vector-icons";

const API_KEY = "fb3205c7c05da153fb96691becdcf557";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Rain: "rains",
};
export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState();
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    // 사용자에게 위치 정보 추적 허용 요청
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    // 사용자의 위치를 한 번 수집
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    // 위치 저장
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(
      json.list.filter((weather) => {
        if (weather.dt_txt.includes("00:00:00")) {
          return weather;
        }
      })
    );
    console.log(days);
  };

  useEffect(() => {
    getWeather();
  });

  return (
    <View className={"flex flex-1 bg-coral"}>
      <StatusBar style={"light"} />
      <View className="flex-1 bg-slate-100 justify-center items-center">
        <Text className="text-[68px] color-slate-600">{city}</Text>
      </View>
      <View className="weather flex-[1.8] bg-white">
        <ScrollView
          className={"weather"}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weather}
        >
          {days ? (
            days.map((day, index) => (
              <View key={index} className={"day w-screen items-center"}>
                <View className={"items-center"}>
                  <Text
                    className={"temperature mt-[48px] mb-[24px] text-[168px]"}
                  >
                    {parseFloat(day.main.temp).toFixed(1)}
                  </Text>
                  <Fontisto
                    name={icons[day.weather[0].main]}
                    size={48}
                    color="black"
                  />
                </View>
                <Text className={"description -mt-2 text-[48px]"}>
                  {day.weather[0].main}
                </Text>
                <Text className={"description -mt-1 text-[36px]"}>
                  {day.weather[0].description}
                </Text>
              </View>
            ))
          ) : (
            <View className={`day w-screen justify-center items-center`}>
              <ActivityIndicator size="large" color="orange" />
            </View>
          )}
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
