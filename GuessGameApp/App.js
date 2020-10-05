import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button, AsyncStorage } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [result, setResult] = useState('Guess a number between 1-100:');
  const [counter, setCounter] = useState(0);
  const [highScore, setHighScore] = useState();
  
  useEffect(()=> async() => (showHighScore()));

  const guessNumber= () => {
    console.log('random number', randomNumber);
   
    if(!isNaN(input) && Number(input) > randomNumber) {
      setCounter(counter + 1);
      setResult(`Your guess ${input} is too high`);
      
    }
    else if (!isNaN(input) && Number(input) < randomNumber) {
      setCounter(counter + 1);
      setResult(`Your guess ${input} is too low`);
      
      
    }
    else if (isNaN(input)) {
      setResult('Please enter valid number')

    }
    else {
      alert(`You guessed the number in ${counter + 1} guesses!`);
      saveValue();
      setRandomNumber(Math.floor(Math.random() * 100) + 1);
      setCounter(0); 
    }
    setInput('');
  }
  const saveValue= async() => {
    try{
     if((counter + 1) < highScore || highScore === null) {
        await AsyncStorage.setItem('counter', JSON.stringify(counter + 1));
      }
    }
    catch {
      Alert.alert('Error saving data');
    }  
  }

  const showHighScore = async() => {
    try{
      const saveCounter = await AsyncStorage.getItem('counter');
      let parsedSaveCounter = JSON.parse(saveCounter);
      setHighScore(parsedSaveCounter);
      console.log('parsedSaveCounter', parsedSaveCounter)
    }
    catch (error) {
      Alert.alert('Error');
    }
  }

 
  const clearValues = async() => {
    AsyncStorage.clear();
    setHighScore();
}

  const { container, inputStyle, resultStyle } = styles;
  return (
    <View style={container}>
      <Text style={resultStyle}>{result}</Text>
      <TextInput
        style={inputStyle}
        onChangeText={(input) => setInput(input)}
        value={input}
        keyboardType="numeric" />
      <Button onPress={guessNumber} title="MAKE GUESS"/>
      <Button onPress={clearValues} title="RESET SCORE"/>
      <View>
        <Text>High Score: {highScore} guesses</Text>
      </View>
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
  inputStyle: {
    width: 80,
    borderColor: 'gray',
    borderWidth: 1
  },
  resultStyle: {
    fontSize: 20,
  }
});