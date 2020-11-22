import React, { FC } from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { TSettingsStackParamList } from '../types'
import { NavigationTree } from '../config'
import { SettingsScreen } from '../screens'



const SettingsStack = createStackNavigator<TSettingsStackParamList>()



export default (() => (
  <SettingsStack.Navigator

  >
    <SettingsStack.Screen
      name={NavigationTree.SettingsStack.screens.SettingsScreen.name}
      component={SettingsScreen}
    />
  </SettingsStack.Navigator>
)) as FC