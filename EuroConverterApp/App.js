import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Picker, TextInput, Button, Image } from 'react-native';

export default function App() {
  const [currencyValues, setCurrencyValues] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [selectedRate, setSelectedRate] = useState();
  const [data, setData] = useState({});
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);

  const getRates = () => {
    const url = 'http://data.fixer.io/api/latest?access_key=ff7dfb36b364a45ebaf396023d11a249';
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        setData(responseJson.rates);
        setLoading(false)
       
        let newCurrenciesArray = Object.keys(data).map(key => (
          { name: key, rate: data[key] }
        ))
        setCurrencyValues(newCurrenciesArray);
        console.log('currencies', currencyValues);
      })
      .catch((error) => {
        Alert.alert('Error: ', error);
      })
  }

  useEffect(() => {
    getRates();
  }, [loading]);

  const getChange = (index) => {
    currencyValues.map((value, i) => {
      if (index === i) {
        setSelectedCurrency(currencyValues[index].name);
        setSelectedRate(currencyValues[index].rate)        
      }      
    })
    
  } 

  const getValue = () => {
    const finalResult = (Number(amount) / selectedRate).toFixed(2);
    setResult(finalResult);
       
  }

  return (
    <View style={styles.container}>
      <View style={styles.centerFirst}>
        <Image style={{ width: 250, height: 150 }} source={{ uri: 'https://cdn.pixabay.com/photo/2013/07/12/15/34/euro-150091_960_720.png' }} />
        <Text style={{ alignItems: 'center', fontWeight: "bold", fontSize: 20 }}>{result} €</Text>
      </View>
      <View style={styles.centerSecond}>
        <TextInput
          style={styles.input}
          value={amount}
          placeholder="Amount"
          onChangeText={(amount) => setAmount(amount)}
        />
        {loading ? <Text>Loading...</Text> :
          <Picker
            style={{ marginTop: 15, width: 100 }}
            selectedValue={selectedCurrency}
            onValueChange={(itemValue, itemIndex) => getChange(itemIndex)}>
            {currencyValues.map((item) => {
              return <Picker.Item key={item.name} label={item.name} value={item.name} />
            })}
          </Picker>}
        <Button
          style={styles.button}
          title="CONVERT"
          onPress={getValue}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
  },
  input: {
    fontSize: 18,
    width: 150,
    borderColor: 'lightgreen',
    borderBottomWidth: 2,
    marginTop: 300,
  },
  button: {
    width: 150,
    marginTop: 70,
    flexDirection: "row",
  },
  centerFirst: {
    alignItems: "center",
    marginTop: 70,
  },
  centerSecond: {
    alignItems: "center",
    marginTop: -250,
    flexShrink:2

  }
});