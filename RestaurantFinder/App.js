import React, { useState } from "react";
import { Alert, StyleSheet, View, Button, TextInput, Text} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {

  const [loc, setLoc] = useState("");
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934392,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });
  const [markers, setMarkers] = useState([]);

  const searchAddress = () => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + loc + '&key=AIzaSyClulqjPepQjs9IWY8qfUlcUIHeFyr_2Ys'
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setRegion({
          latitude: responseJson.results[0].geometry.location.lat,
          longitude: responseJson.results[0].geometry.location.lng,
        })
      })
      .then(searchRestaurants)
      .catch((error) => {
        Alert.alert(error);
      })

  }
  const searchRestaurants = () => {
    let loca = region.latitude + ',' + region.longitude;
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + loca + '&type=restaurant&radius=500&key=AIzaSyClulqjPepQjs9IWY8qfUlcUIHeFyr_2Ys';
    fetch(url)
      .then((response2) => response2.json())
      .then((responseJson2) => {
        setMarkers(responseJson2.results)

      })
      .catch((error) => {
        Alert.alert(error);
      })
  }


  return (
    <View style={styles.container}>
      

      <MapView
        style={{ height: "100%", flex: 2 }}
        region={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        }}
      >
        {markers.map((marker, i) => (
          <MapView.Marker
            key={i}
            coordinate={{
              latitude: marker.geometry.location.lat,
              longitude: marker.geometry.location.lng
            }}
            title={marker.name}
            description={marker.vicinity}
          />
        ))}
      </MapView>
      <Text style={{ marginTop: 30, fontSize: 18 }}>Type an address and press search to see the location</Text>
      <TextInput
        style={{ fontSize: 16 }}
        value={loc}
        placeholder="Type and address"
        onChangeText={loc => setLoc(loc)} />
        <Text style={{ marginTop: 30, fontSize: 18 }}>The, press search again to see the nearby places</Text>
      <Button title="Search" onPress={searchAddress} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});