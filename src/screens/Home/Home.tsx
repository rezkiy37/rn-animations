import React, { FC, useEffect, useRef, useState } from 'react'

import LottieView from 'lottie-react-native'



export default (() => {

  const animRef = useRef<LottieView | null>(null)

  const [showAnim, toggleAnim] = useState<boolean>(true)

  useEffect(() => {
    showAnim && animRef.current?.play()
  }, [showAnim])

  return (
    <>
      <LottieView
        ref={animation => {
          animRef.current = animation;
        }}
        style={{
          width: 100,
          height: 100,
        }}
        source={require('./src/covid.json')}
      />
    </>
  )
}) as FC