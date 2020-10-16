import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets, TransitionSpecs } from '@react-navigation/stack'
import { StackParamsList } from './sources/references/types/navigator'
import Home from './sources/screens/Home';
import SplashScreen from './sources/screens/SplashScreen';

const Stack = createStackNavigator<StackParamsList>()

const App = () => {
  React.useEffect(() => {
    StatusBar.setBackgroundColor('#fff')
    StatusBar.setBarStyle('dark-content')
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions = {{
          headerShown: false,
          ...TransitionSpecs.TransitionIOSSpec,
          ...TransitionPresets.SlideFromRightIOS
        }}
      >
        <Stack.Screen name = 'SplashScreen' component = {SplashScreen} />
        <Stack.Screen name = 'Home' component = {Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App