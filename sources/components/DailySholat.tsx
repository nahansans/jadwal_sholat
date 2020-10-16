import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Fonts } from './../references/Fonts';

type PropsList = {
    title: string,
    time: string,
    color?: string
}

export default class  extends Component<PropsList, {}> {
    state = {  }
    render() {
        const { title, color, time } = this.props
        return (
            <View
                style = {{
                    padding: 20,
                    backgroundColor: color != undefined ? color : '#3498db',
                    borderRadius: 10,
                    marginVertical: 10
                }}
            >
                <Text
                    style = {{
                        color: '#fff',
                        fontFamily: Fonts.OpenSans.SemiBold
                    }}
                >
                    {title}
                </Text>
                <Text
                    style = {{
                        color: '#fff',
                        fontFamily: Fonts.OpenSans.Regular,
                        letterSpacing: 0.5
                    }}
                >
                    {time}
                </Text>
            </View>
        )
    }
}