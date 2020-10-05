import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as SQLite from "expo-sqlite";
import { Button, Header, Input, ListItem, Icon } from "react-native-elements";

const db = SQLite.openDatabase('shoppingdb.db');

const Places = (props) => {
    navigationOptions = { title: 'My Places', };

    const [address, setAddress] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists addresslist (id integer primary key not null, address text);');
        });
        updateAddressList();
    }, []);
    // Save address

    const saveAddress = () => {
        db.transaction(tx => {
            tx.executeSql('insert into addresslist (address) values (?);', [address]);
        }, null, updateAddressList
        )
    }
    // Update address
    const updateAddressList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from addresslist;', [], (_, { rows }) =>
                setData(rows._array)
            );
        });
        setAddress('');
    }

    const deleteAddress = (id) => {
        db.transaction(
            tx => {
                tx.executeSql('delete from addresslist where id = ?;', [id]);
            }, null, updateAddressList
        )
    }



    const { navigate } = props.navigation;

    return (
        <View>
            <View>
                <Input
                    label='Placefinder'
                    placeholder='Type in address'
                    value={address}
                    onChangeText={address => setAddress(address)}
                />
            </View>
            <View>
                <Button buttonStyle={{ width: 350 }} type="solid"
                 icon={{ name: 'save' }} onPress={saveAddress} title="SAVE" />
             
                 
            </View>
            <View>
                {
                    data.map((item, i) => (
                        <ListItem
                            key={i}
                            subtitle={item.address}
                            rightTitle='show on map'
                            rightIcon={{ name: "chevron-right" }}
                            onPress={() => navigate('Map', item.address)}
                            onLongPress={() => deleteAddress(item.id)}
                            bottomDivider
                        />
                    ))
                }
            </View>
        </View>
    );
}

Places.navigationOptions = ({ navigate }) => ({ title: 'My Places' });

export default Places;