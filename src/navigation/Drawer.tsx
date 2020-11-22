import React, { FC } from 'react'

import Tabs from './Tabs'
import HomeStack from './Home-stack'
import SettingsStack from './Settings-stack'

import { createDrawerNavigator } from '@react-navigation/drawer'
import { TDrawerParamList } from '../types'
import { NavigationTree } from '../config'




const Drawer = createDrawerNavigator<TDrawerParamList>()


export default (() => (
  <Drawer.Navigator
    initialRouteName={NavigationTree.Drawer.HomeStack.name}
  >
    <Drawer.Screen
      name={NavigationTree.Tabs.name}
      component={Tabs}
    />
    <Drawer.Screen
      name={NavigationTree.Drawer.HomeStack.name}
      component={HomeStack}
    />
    <Drawer.Screen
      name={NavigationTree.Drawer.SettingsStack.name}
      component={SettingsStack}
    />
  </Drawer.Navigator>
)) as FC