import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Fonts } from './../references/Fonts';
import moment from 'moment'

type PropsList = {
    item?: any,
    title?: string,
    time?: string,
    color?: string
}
class WaktuSholat extends Component<PropsList, {}> {

    render() {
        const { title, time, color } = this.props
        return (
            <View
                style = {{
                    paddingLeft: 10,
                    borderLeftColor:  color != undefined ? color : '#303030',
                    borderLeftWidth: 2,
                    marginVertical: 5,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Text
                    style = {{
                        color: '#303030',
                        fontFamily: Fonts.OpenSans.SemiBold
                    }}
                >
                    {title}
                </Text>
                <Text
                    style = {{
                        fontFamily: Fonts.OpenSans.Regular,
                        color: '#303030',
                        letterSpacing: 0.5,
                        marginLeft: 5
                    }}
                >
                    {time}
                </Text>
            </View>
        )
    }
}

export default class MonthlySholat extends Component<PropsList, {}> {
    state = {  }
    
    render() {
        const { item } = this.props        
        return (
            <View
                style = {{
                    marginVertical: 10,
                    flexDirection: 'row',
                    backgroundColor: '#f9f9f9',
                    borderRadius: 10
                }}
            >
                <View
                    style = {{
                        backgroundColor: '#f1f2f6',
                        padding: 20,
                        borderRadius: 10,
                        alignSelf: 'flex-start'
                    }}
                >
                    <Text
                        style = {{
                            fontFamily: Fonts.OpenSans.Regular,
                            fontSize: 12,
                            color: '#303030',
                            textAlign: 'center'
                        }}
                    >
                        <Text style = {{ fontSize: 10 }} >
                            Tanggal{`\n`}
                        </Text>
                        <Text
                            style = {{
                                fontFamily: Fonts.OpenSans.SemiBold,
                                fontSize: 23
                            }}
                        >
                            {moment(item.tanggal).format('DD')}{`\n`}
                        </Text>
                        <Text>
                            {moment(item.tanggal).format('MMMM YYYY')}
                        </Text>
                    </Text>
                </View>
                <View style = {{ paddingLeft: 10 }} >
                    <WaktuSholat title = 'Shubuh' time = {item.shubuh} color = '#474787' />
                    <WaktuSholat title = 'Dhuha' time = {item.dhuha} color = '#34ace0' />
                    <WaktuSholat title = 'Dzuhur' time = {item.dzuhur} color = '#ffb142' />
                    <WaktuSholat title = 'Ashr' time = {item.ashr} color = '#ff793f' />
                    <WaktuSholat title = 'Maghrib' time = {item.magrib} color = '#40407a' />
                    <WaktuSholat title = 'Isya' time = {item.isya} color = '#2c2c54' />
                </View>
            </View>
        )
    }
}
