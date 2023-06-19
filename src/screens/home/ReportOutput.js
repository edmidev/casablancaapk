import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants';

const Home = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.bgColor,
                color: '#fff'
            }}>
            <Text>ReportOutput</Text>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({});