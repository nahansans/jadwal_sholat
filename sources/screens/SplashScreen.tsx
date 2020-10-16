import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Modal } from 'react-native'
import {StackParamsList} from '../references/types/navigator'
import { StackNavigationProp } from '@react-navigation/stack'
import { Fonts } from './../references/Fonts';

type PropsList = {
    navigation: StackNavigationProp<StackParamsList, 'SplashScreen'>
}

const SplashScreen = (props: PropsList) => {
    useEffect(() => {
        setTimeout(() => {
            props.navigation.replace('Home')
        }, 1500);
    }, [])
    return (
        <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }} >
            <Text
                style = {{
                    fontFamily: Fonts.OpenSans.SemiBold,
                    color: '#303030',
                    fontSize: 16,
                    letterSpacing: 0.3
                }}
            >
                Jadwal Sholat
            </Text>
            <View
                style = {{
                    paddingVertical: 2,
                    paddingHorizontal: 20,
                    borderRadius: 20,
                    backgroundColor: '#303030',                    
                }}
            />
        </View>        
    )
}

export default SplashScreen