import React, { FC } from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { THomeStackParamList } from '../types'
import { NavigationTree } from '../config'
import { HomeScreen } from '../screens'



const HomeStack = createStackNavigator<THomeStackParamList>()



export default (() => (
  <HomeStack.Navigator

  >
    <HomeStack.Screen
      name={NavigationTree.HomeStack.screens.HomeScreen.name}
      component={HomeScreen}
    />
  </HomeStack.Navigator>
)) as FC