import React, { useState } from 'react';
import { Modal, View, Button, Platform, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export const CustomPicker = ({ data, onValueChange, selectedValue }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (data &&
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text>{data.find(item => item.id === selectedValue)?.label || 'Select an option'}</Text>
            </TouchableOpacity>
            <Modal
                //animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ marginTop: 22 }}>
                    {Platform.OS === 'ios' && (
                        <Button title="Done" onPress={() => setModalVisible(false)} />
                    )}
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => {
                            onValueChange(itemValue);
                            if (Platform.OS !== 'ios') {
                                setModalVisible(false);
                            }
                        }}
                    >
                        {data.map((item, index) => (
                            <Picker.Item key={item.name + "_" + index} label={item.name} value={item.id} />
                        ))}
                    </Picker>
                </View>
            </Modal>
        </View>
    );
};
