import React, { useState, useEffect, useRef } from 'react'
import { 
    View, 
    ScrollView, 
    Text, 
    TouchableOpacity, 
    Modal, 
    Pressable, 
    Image,
    Animated,
    Dimensions,
    ActivityIndicator,
    TextInput
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import { Fonts } from './../references/Fonts';
import {StackParamsList} from '../references/types/navigator'
import { StackNavigationProp } from '@react-navigation/stack'
import DailySholat from '../components/DailySholat';
import AsyncStorage from '@react-native-community/async-storage';
import MonthlySholat from './../components/MonthlySholat';

type PropsList = {
    navigation: StackNavigationProp<StackParamsList, 'Home'>
}

type DailySholatType = {
    imsyak: string,
    shubuh: string,
    dzuhur: string,
    magrib: string,
    isya: string,
    dhuha: string,
    ashr: string,
    tanggal?: string
}

const API = 'https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master'

const Home = () => {
    const pressableAnimation = useRef(new Animated.Value(1)).current
    const [dailySholat, setDailySholat] = useState({} as DailySholatType)
    const [modalVisible, setmodalVisible] = useState(false)
    const [cities, setcities] = useState([] as string[])
    const [cityName, setcityName] = useState('')
    const [monthlySholat, setMonthlySholat] = useState<DailySholatType[]>([])

    useEffect(() => {
        checkSessionCity()
    }, [])

    const checkSessionCity = async() => {
        const city = await AsyncStorage.getItem('city')
        if (city != null) {
            setcityName(city)
            getDailySholat(city)
            getMonthlySholat(city)
        }
    }

    const getCity = () => {
        fetch(`${API}/kota.json`)
        .then(res => res.json())
        .then(resJSON => {            
            setcities(resJSON)
        })
        .catch(error => {
            console.warn(error)
        })
    }

    const getMonthlySholat = (item: string) => {
        let year = moment().format('YYYY')
        let month = moment().format('MM')
        fetch(`${API}/adzan/${item}/${year}/${month}.json`)
        .then(res => res.json())
        .then(resJSON => {    
            console.log(JSON.stringify(resJSON, null, 4))        
            setMonthlySholat(resJSON)
        })
        .catch(error => {
            console.warn(error)
        })
    }

    const getDailySholat = (item: string) => {
        let year = moment().format('YYYY')
        let month = moment().format('MM')
        let day = moment().format('DD')
        fetch(`${API}/adzan/${item}/${year}/${month}/${day}.json`)
        .then(res => res.json())
        .then(resJSON => {            
            setDailySholat(resJSON)
        })
        .catch(error => {
            console.warn(error)
        })
    }
    return (
        <>
        <ScrollView style = {{ backgroundColor: '#fff' }} contentContainerStyle = {{ paddingBottom: 20}} >
            <View
                style = {{ 
                    backgroundColor: '#3498db',
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    paddingBottom: 20,
                    borderBottomEndRadius: 10,
                    borderBottomStartRadius: 10,
                }} 
            >
                <Text
                    style = {{
                        fontFamily: Fonts.OpenSans.SemiBold,
                        color: '#fff',
                        fontSize: 16,
                        letterSpacing: 0.1
                    }}
                >
                    Jadwal Sholat
                </Text>
            </View>
            <Animated.View
                style = {{
                    transform: [{scale: pressableAnimation}]
                }}
            >
                <Pressable
                    style = {{
                        margin: 20,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        backgroundColor: '#3498db',
                        borderRadius: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    onPress = {() => {
                        setmodalVisible(true)
                        
                    }}
                    onPressIn = {() => {
                        Animated.timing(pressableAnimation, {
                            toValue: 0.95,
                            duration: 200,
                            useNativeDriver: true
                        }).start()
                    }}
                    onPressOut = {() => {
                        Animated.timing(pressableAnimation, {
                            toValue: 1,
                            duration: 200,
                            useNativeDriver: true
                        }).start()
                    }}
                >
                    <Text
                        style = {{
                            fontFamily: Fonts.OpenSans.Regular,
                            color: '#fff'
                        }}
                    >
                        {cityName != '' ? cityName : 'Pilih Kota'}
                    </Text>
                    <Image
                        source = {require('../images/ic_dropdown.png')}
                        style = {{
                            width: 30,
                            height: 30,
                            tintColor: '#fff'
                        }}
                    />
                </Pressable>
            </Animated.View>

            {
                cityName != '' ?
                <View
                    style = {{
                        marginHorizontal: 20
                    }}
                >
                    <Text
                        style = {{
                            fontFamily: Fonts.OpenSans.SemiBold,
                            color: '#303030',
                            fontSize: 20,
                            marginVertical: 10
                        }}
                    >
                        Jadwal Sholat Hari Ini
                    </Text>
                    <DailySholat
                        title = 'Shubuh'
                        time = {dailySholat.shubuh}
                        color = '#474787'
                    />
                    <DailySholat
                        title = 'Dhuha'
                        time = {dailySholat.dhuha}
                        color = '#34ace0'
                    />
                    <DailySholat
                        title = 'Dzuhur'
                        time = {dailySholat.dzuhur}
                        color = '#ffb142'
                    />
                    <DailySholat
                        title = 'Ashar'
                        time = {dailySholat.ashr}
                        color = '#ff793f'
                    />
                    <DailySholat
                        title = 'Maghrib'
                        time = {dailySholat.magrib}
                        color = '#40407a'
                    />
                    <DailySholat
                        title = 'Isya'
                        time = {dailySholat.isya}
                        color = '#2c2c54'
                    />
                </View>
                : null
            }
            {
                monthlySholat.length != 0 ?
                <View
                    style = {{
                        marginHorizontal: 20
                    }}
                >
                    <Text
                        style = {{
                            fontFamily: Fonts.OpenSans.SemiBold,
                            color: '#303030',
                            fontSize: 20,
                            marginVertical: 10
                        }}
                    >
                        Jadwal Sholat Bulan Ini
                    </Text>
                    {
                        monthlySholat.map((item, index) => {
                            return (
                                <MonthlySholat
                                    item = {item}
                                    key = {index}
                                />
                            )
                        })
                    }
                </View>
                : null
            }
        </ScrollView>

        <Modal
            visible = {modalVisible}
            onRequestClose = {() => setmodalVisible(false)}
            transparent = {true}            
            onShow = {() => {                
                getCity()                
            }}
        >
            <TouchableOpacity
                onPress = {() => {
                    setmodalVisible(false)
                    setcities([])
                }}
                style = {{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.2)'
                }}
            />
            <View
                style = {{
                    backgroundColor: 'white',
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    height: Dimensions.get('window').height * 0.55,
                    padding: 20,
                    borderTopEndRadius: 20,
                    borderTopStartRadius: 20
                }}
            >
                <Text style = {{ fontFamily: Fonts.OpenSans.SemiBold, color: '#303030', fontSize: 16 }} >
                    Pilih Kota
                </Text>
                <TextInput
                    placeholder='cari nama kota...'
                    style = {{
                        borderColor: '#303030',
                        borderBottomWidth: 1,
                        fontFamily: Fonts.OpenSans.Regular,
                        marginVertical: 5,
                        paddingHorizontal: 10
                    }}
                    onChangeText = {(value) => {
                        fetch(`${API}/kota.json`)
                        .then(res => res.json())
                        .then(resJSON => {
                            
                            let Cities = resJSON as string[]

                            let filteredCities = Cities.filter(cities => cities.includes(value.toLowerCase()))

                            setcities(filteredCities)
                        })
                    }}
                />
                <ScrollView>
                    {
                        cities.length == 0 ?
                        <ActivityIndicator size = 'small' color = 'dimgrey' />
                        :
                        cities.map((item:any, index:any) => {
                            return (
                                <TouchableOpacity
                                    style = {{
                                        padding: 10,
                                        borderRadius: 10,
                                        borderColor: '#303030',
                                        borderWidth: 1,
                                        marginVertical: 10
                                    }}
                                    onPress = {async() => {
                                        await AsyncStorage.setItem('city', item)
                                        setcityName(item)
                                        setmodalVisible(false)
                                        setcities([])
                                        getDailySholat(item)     
                                        getMonthlySholat(item)                                   
                                    }}
                                >
                                    <Text>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </Modal>
        </>
    )
}

export default Home