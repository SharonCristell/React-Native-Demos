import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, Button, TextInput, FlatList, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipe = () => {
    const toLowerCaseKeyword = keyword.toLowerCase();
    const url = 'http://www.recipepuppy.com/api/?i=' + toLowerCaseKeyword;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setRecipes(responseJson.results);
      })
      .catch((error) => {
        Alert.alert('Error: ', error);
      })
  }
  
  return (
    <View style={styles.container}>
      <Text style="color:blue; marginTop:50px"></Text>
      <Text style="color:blue; marginTop:50px">Welcome to the Recipe App Finder!</Text>
      <FlatList
        style={{marginTop: '20%'}}
        data={recipes}
        keyExtractor={item => item.title}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Image style={{width:70, height: 70}} source={{uri: item.thumbnail}} />
          </View>
        )} />
         <Text style="color:blue; marginTop:50px">Search brand new recipes below...</Text>
      <TextInput
        style={styles.input}
        value={keyword}
        placeholder="Type an Ingredient"
        onChangeText={(keyword) => setKeyword(keyword)} />
      <Button
        title="Find"
        onPress={getRecipe} />
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
  input: { 
    fontSize: 18, 
    width: 200, 
    
  }
});