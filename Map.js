import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const Map = ({route}) => {
  const [address, setAddress] = useState(route.params.address);

  const [coords, setCoords] = useState([]);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onSearch = () => {
    if (!address) {
      return;
    }

    fetch(
      `https://geocode.maps.co/search?q=${address}&api_key=66d066874e369310388269nub9d8b37`,
    )
      .then(response => response.json())
      .then(response => {
        setCoords(response);
        setRegion({
          latitude: Number(response[0].lat),
          longitude: Number(response[0].lon),
          latitudeDelta: 0,
          longitudeDelta: 0,
        });
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={{width: '100%', height: '90%'}}
        region={region}
        onRegionChange={region => setRegion(region)}>
        {coords.map((item, index) => (
          <Marker
            key={index}
            title={item.display_name}
            coordinate={{
              latitude: Number(item.lat),
              longitude: Number(item.lon),
            }}
          />
        ))}
      </MapView>

      <View style={{width: '100%'}}>
        <Button title="SHOW" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '000',
  },
});

export default Map;
