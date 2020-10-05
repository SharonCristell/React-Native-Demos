import React from 'react';
import {  Text, View, FlatList } from 'react-native';

export default function History(props) {
  const {params} = props.navigation.state;
  console.log(params)
  return (
      <View>
        <Text>History:</Text>
        <FlatList
        data={params.data}
        renderItem={({ item }) => <Text>{item.key}</Text>}/>
      </View>
  );
}