import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Home(props) {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [result, setResult] = useState('');
  const [data, setData] = useState([]);

  const onPlus = () => {
    const value = Number(text1) + Number(text2);
    setResult(value);
    const string = `${text1} + ${text2} = ${value}`;
    setData([{ key: string }, ...data]);
    setText1('');
    setText2('');
    
  }

  const onSubstract = () => {
    const value = Number(text1) - Number(text2);
    setResult(value);
    const string = `${text1} - ${text2} = ${value}`;
    setData([{ key: string }, ...data]);
    setText1('');
    setText2('');
  }

  const { container, buttons, input, button } = styles;
  const {navigate} = props.navigation;
  return (
    <View style={container}>
     <Text>Result: {result}</Text>
      <TextInput
        style={input}
        onChangeText={(text1) => setText1(text1)}
        value={text1}
        keyboardType="numeric" />
      <TextInput
        style={input}
        onChangeText={(text2) => setText2(text2)}
        value={text2}
        keyboardType="numeric" />
      <View style={buttons}>
        <Button title='+' onPress={onPlus} />
        <Button title='-' onPress={onSubstract} />
      </View>

      <Button
        style={button}
        onPress={()=> navigate('History', {data: data})} 
        title="History"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row'
  },
  input: {
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
  },
});