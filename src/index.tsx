import React, { FC } from 'react'
import { Drawer } from './navigation'
import { NavigationContainer } from '@react-navigation/native'


export default (() => (
  <NavigationContainer>
    <Drawer />
  </NavigationContainer>
)) as FC