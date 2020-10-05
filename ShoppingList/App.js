import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);
  const [result, setResult] = useState('');
  let resultText;
  const { container, buttons, input } = styles;

  const add = () => {
    
    setResult(text);
    resultText=text;
    setData([...data, {key:resultText}]);
    setText('');
    
  }
  const clear = () => {

    setData([]);
    setText('');
  }

  return (

    <View style={container}>
      
      <TextInput
        style={input}
        onChangeText={(text) => setText(text)}
        value={text}
        />
     
      <View style={buttons}>
        <Button title='Add' onPress={add} />
        <Button title='Clear' onPress={clear} />
      </View>
      
      <Text style="color:blue;">Shopping List:</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.key}   </ Text>} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontSize: 12,
    margin:100,
    fontFamily: 'Arial',
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttons: {
    flexDirection: 'row',
    margin: 2,
    padding: 1
  },
  input: {
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
  }
});