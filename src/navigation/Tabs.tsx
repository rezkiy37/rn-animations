import React, { FC } from 'react'

import HomeStack from './Home-stack'
import SettingsStack from './Settings-stack'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { TTabsParamList } from '../types'
import { NavigationTree } from '../config'



const Drawer = createMaterialBottomTabNavigator<TTabsParamList>()


export default (() => (
  <Drawer.Navigator  >
    <Drawer.Screen
      name={NavigationTree.Tabs.HomeStack.name}
      component={HomeStack}
    />
    <Drawer.Screen
      name={NavigationTree.Tabs.SettingsStack.name}
      component={SettingsStack}
    />
  </Drawer.Navigator>
)) as FC