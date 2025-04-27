import React from "react";
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput} from 'react-native';
import { useState } from "react";

export type GameModalProps = {
    visible: boolean;
    onAdd: (title: string, price: number) => void;
    onCancel: () => void;
};

export default function GameModal({visible, onAdd, onCancel} : GameModalProps){
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);

    return (
        <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={() => {}}>
            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <TextInput 
                        style={styles.boxInput}
                        placeholder="Title"
                        value={title}
                        onChangeText={text => setTitle(text)}
                        autoFocus
                    />
                    <TextInput 
                        style={styles.boxInput}
                        placeholder="Price"
                        value={price.toString()}
                        onChangeText={text => setPrice(Number(text))}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={() => onAdd(title, price)}>
                            <Text style={styles.buttonText}>
                                Add
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCancel} onPress={() => onCancel()}>
                            <Text style={styles.buttonText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>        
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:'rgba(0,0,0,0.7)',
        alignContent:"center",
        justifyContent:"center",
        flex:1
    },
    boxContainer: {
        backgroundColor:'rgba(255, 255, 255, 1)',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        margin:20,
    },
    buttonText: {
        fontWeight:"bold",
        color:'rgba(255, 255, 255, 1)',
    },
    buttonAdd:{
        backgroundColor:'rgb(18, 150, 47)',
        borderRadius:5,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        padding:0
    },
    buttonCancel:{
        backgroundColor:'rgb(215, 28, 18)',
        borderRadius:5,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        padding:0
    },
    buttonContainer: {
        flexDirection:"row",
        marginTop:10,
        height:70
    },
    boxInput:{
        alignSelf:"stretch",
        height:40,
        borderRadius: 5,
        backgroundColor: 'rgba(79, 123, 123, 0.42)',
        margin:5
    }
})