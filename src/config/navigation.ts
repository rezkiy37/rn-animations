import { EAllStacks, TNavigationTree } from "../types"




export const NavigationTree: TNavigationTree = {
  HomeStack: {
    name: EAllStacks.HomeStack,
    screens: {
      HomeScreen: {
        name: 'HomeScreen'
      }
    }
  },
  SettingsStack: {
    name: EAllStacks.SettingsStack,
    screens: {
      SettingsScreen: {
        name: 'SettingsScreen'
      }
    }
  },
  Drawer: {
    HomeStack: {
      name: EAllStacks.HomeStack
    },
    SettingsStack: {
      name: EAllStacks.SettingsStack
    }
  },
  Tabs: {
    name: 'Tabs',
    HomeStack: {
      name: EAllStacks.HomeStack
    },
    SettingsStack: {
      name: EAllStacks.SettingsStack
    }
  }
}