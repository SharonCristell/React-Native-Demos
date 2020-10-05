import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View, Button, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [loc, setLoc] = useState("");
  const [region, setRegion] = useState({
    lat: 60.200692,
    long: 24.934302,
    error: null
  }); 
  const APIkey = "AOHbYwJAIt1pAhlGS1QuuGHCZ0SFI9HX";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setRegion({
        lat: position.coords.latitude,
        long: position.coords.longitude,
        error: null
      });
    }),
      error => setRegion({ error: error });
  }, []);

  const getLocation = () => {
    const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${APIkey}&inFormat=kvp&outFormat=json&street=${loc}+13%2C+Helsinki%2C+Finland&thumbMaps=false`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        setRegion({
          lat: responseJson.results[0].locations[0].latLng.lat,
          long: responseJson.results[0].locations[0].latLng.lng
        });
      })
      .catch(error => {
        Alert.alert("Error", error);
      });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{ height: "100%", flex: 2 }}
        region={{
          latitude: region.lat,
          longitude: region.long,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        }}
      >
        <Marker
          coordinate={{ latitude: region.lat, longitude: region.long }}
          title={loc}
        />
      </MapView>

      <TextInput
        style={{fontSize: 16 }}
        value={loc}
        placeholder="Enter location"
        onChangeText={(loc) => setLoc(loc)}
      />

      <Button title="Show" onPress={getLocation} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});