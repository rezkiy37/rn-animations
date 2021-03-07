import React, { FC } from 'react'

import { HomeScreen, PanResponderScreen } from '../screens'
import { createStackNavigator } from '@react-navigation/stack'
import { THomeStackParamList } from '../types'
import { NavigationTree } from '../config'



const HomeStack = createStackNavigator<THomeStackParamList>()


export default (() => (
  <HomeStack.Navigator
    initialRouteName={NavigationTree.HomeStack.screens.PanResponderScreen.name}
  >
    <HomeStack.Screen
      name={NavigationTree.HomeStack.screens.HomeScreen.name}
      component={HomeScreen}
    />

    <HomeStack.Screen
      name={NavigationTree.HomeStack.screens.PanResponderScreen.name}
      component={PanResponderScreen}
    />
  </HomeStack.Navigator>
)) as FC