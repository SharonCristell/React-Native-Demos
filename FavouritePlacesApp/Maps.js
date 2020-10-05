import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, TextInput, Button, FlatList } from "react-native";
import{createAppContainer} from "react-navigation";
import{createStackNavigator} from "react-navigation-stack";
import MapView, { Marker } from "react-native-maps";

const Map = (props) => {
    navigationOptions = { title: 'Map',};

    console.log('-----params-----', props.navigation.state.params)
    const{ params } = props.navigation.state;
    const data = params;
    console.log(data);

    const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    });

    useEffect(() => {
        const url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + data  + "&key=AIzaSyClulqjPepQjs9IWY8qfUlcUIHeFyr_2Ys";
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            setRegion({
                latitude: responseJson.results[0].geometry.location.lat,
                longitude: responseJson.results[0].geometry.location.lng,
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0221
            })
       })
       .catch((error) => { 
            Alert.alert('Error' , error); 
       });
    },[]);

    return (
        <>
            <MapView
                style={{ flex:1 }}
                region={region}>
                <Marker
                    coordinate={{
                    latitude: region.latitude,
                    longitude: region.longitude}}
                />
            </MapView>
            <Button title="Show" />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1/5,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

Map.navigationOptions = ({navigate}) => ({title: 'Map'});

export default Map;