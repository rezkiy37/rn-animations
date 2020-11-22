/** 
 * Default type of navigaiton item
 */
type TNavigationItem<T> = {
  name: T
}




/**
 * Navigation tree must be used at all nav methods and configs
 */
export type TNavigationTree = {
  Drawer: TDrawerBranches
  Tabs: TTabs
} & {
    [stack in EAllStacks]: TStack<stack>
  }


/**
 * Common stacks between tabs, drawer and tree
 */
type TCommonStacks =
  | 'HomeStack'
  | 'SettingsStack'


/**
 * Pick up screen to stack by slug
 */
type TStack<T> = TNavigationItem<T> & {
  screens: T extends EAllStacks.HomeStack
  ? { [screen in THomeStackScreens]: TNavigationItem<screen> }
  : T extends EAllStacks.SettingsStack
  ? { [screen in TSettingsStackScreens]: TNavigationItem<screen> }
  : never
}

export enum EAllStacks {
  HomeStack = 'HomeStack',
  SettingsStack = 'SettingsStack',
}


type THomeStackScreens =
  | 'HomeScreen'

type TSettingsStackScreens =
  | 'SettingsScreen'


/** 
 * All possible drawer branches
 */
export type TDrawerBranches = {
  [branch in TPossibleDraweBranches]: TNavigationItem<branch>
}

/**
 * List of all possible drawer branches
 */
type TPossibleDraweBranches = TCommonStacks





/**
 * All possible tabs
 */
export type TTabs = {
  name: 'Tabs'
} & {
    [tab in TPossibleTabs]: TNavigationItem<tab>
  }

/**
 * List of all possible tabs
 */
type TPossibleTabs = TCommonStacks



export type TDrawerSkeleton = {

}
