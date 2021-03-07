import React, { FC, useCallback, useMemo, useState } from 'react'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import {
  PanResponderGestureState,
  PanResponderInstance,
  LayoutChangeEvent,
  TouchableOpacity,
  LayoutRectangle,
  SafeAreaView,
  PanResponder,
  StyleSheet,
  Animated,
  View,
  Vibration,
} from 'react-native'



const PanResponderScreen: FC = () => {

  const [position] = useState<Animated.ValueXY>(new Animated.ValueXY())

  const [draggingAnim] = useState<Animated.Value>(new Animated.Value(0))
  const [detectDropZoneAnim] = useState<Animated.Value>(new Animated.Value(0))

  const [showDraggable, toggleDraggable] = useState<boolean>(true)
  const [dropZone, setDropZone] = useState<LayoutRectangle | null>(null)

  const dropZoneBackground = useMemo<Animated.AnimatedInterpolation>(() => {
    return detectDropZoneAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, .1)']
    })
  }, [draggingAnim])

  const scale = useMemo<Animated.AnimatedInterpolation>(() => {
    return draggingAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.2]
    })
  }, [draggingAnim])

  const pulseAnimation = useCallback(() => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(draggingAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false
        }),
        Animated.timing(draggingAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false
        })
      ]))
  }, [draggingAnim])

  const isDropZone = useCallback<(gesture: PanResponderGestureState) => boolean>(gesture => {
    console.log('isDropZone', { ...dropZone }, { ...gesture })

    if (!dropZone) {
      console.log('There is not dropZone')
      return false
    }

    const correctCoords: Array<boolean> = []

    if (gesture.dy >= dropZone?.y) {
      correctCoords.push(true)
    } else {
      correctCoords.push(false)
    }

    if ((dropZone.x - (dropZone.width / 2)) <= gesture.dx && gesture.dx <= (dropZone.x + (dropZone.width / 2))) {
      correctCoords.push(true)
    } else {
      correctCoords.push(false)
    }

    return correctCoords.every(v => v)
  }, [dropZone])

  const responders = useMemo<PanResponderInstance>(() => PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (_, s) => {
      console.log('onPanResponderGrant', { ...s })

      pulseAnimation().start()

      Vibration.vibrate()

      //@ts-ignore
      position.setOffset({ x: position.x._value, y: position.y._value })
    },
    onPanResponderMove: (e, s) => {
      console.log('onPanResponderMove', s)

      if (isDropZone(s)) {
        Animated.timing(detectDropZoneAnim, {
          toValue: 1,
          useNativeDriver: false
        }).start()
      }

      Animated.event([null, {
        dx: position.x,
        dy: position.y,
      }], {
        useNativeDriver: false
      })(e, s)
    },
    onPanResponderRelease: (_, s) => {
      console.log('onPanResponderRelease', { ...s })

      Vibration.cancel()

      Animated.timing(draggingAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }).start()

      Animated.timing(detectDropZoneAnim, {
        toValue: 0,
        useNativeDriver: false
      }).start()

      if (isDropZone(s)) {
        toggleDraggable(false)
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false
        }).start()
      }
    },
  }), [position, isDropZone])

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setDropZone(e.nativeEvent.layout)
  }, [])


  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            {showDraggable && (
              <Animated.View
                style={[
                  styles.cycle,
                  position.getLayout(),
                  { transform: [{ scale }] }
                ]}

                {...responders.panHandlers}
              >
                <FontAwesome5
                  name='apple-alt'
                  color='red'
                  size={35}
                />
              </Animated.View>
            )}

            <Animated.View
              onLayout={onLayout}
              style={[
                styles.dropZone,
                //@ts-ignore
                {
                  transform: [{ translateX: '-50%' }, { scale }],
                  backgroundColor: dropZoneBackground
                }
              ]}
            >
              <TouchableOpacity
                activeOpacity={.7}
                style={styles.dropZoneTouchable}
                onPress={() => toggleDraggable(prev => !prev)}
              >
                <FontAwesome
                  name='trash'
                  size={25}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </SafeAreaView>
      </SafeAreaView>
    </>
  )
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#eee'
  },
  cycle: {
    width: 50,
    height: 50,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 100 / 2,
    backgroundColor: 'transparent',
  },
  dropZone: {
    width: 100,
    height: 100,

    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    left: '50%',
    bottom: 0,

    borderWidth: 1,
    borderRadius: 100 / 2,
    borderStyle: 'solid',
    borderColor: '#999',
  },
  dropZoneTouchable: {
    width: '100%',
    height: '100%',

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 100 / 2,

    backgroundColor: 'transparent',
  }
})


export default PanResponderScreen


/**
    onStartShouldSetResponder: e => {
      console.log('onStartShouldSetResponder', e)
      return true
    },
    onMoveShouldSetResponder: e => {
      console.log('onMoveShouldSetResponder', e)
      return true
    },
    onResponderEnd: e => {
      console.log('onResponderEnd', e)
    },
    onResponderGrant: e => {
      console.log('onResponderGrant', e)
    },
    onResponderMove: e => {
      console.log('onResponderMove', e)
    },
    onResponderRelease: e => {
      console.log('onResponderMove', e)
    },
 */