
import React from 'react';
import { StyleSheet, Text, View ,Dimensions} from 'react-native';
import Animated,{useSharedValue,useAnimatedStyle,useAnimatedGestureHandler,withDecay,useDerivedValue,cancelAnimation} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Page,{width} from './Components/Page';

const title=["Hello","World","(-_-)","!!!!"];


const MAX_TRANSLATE_X = -width * (title.length - 1);
export default function App() {

  const translateX=useSharedValue(0);

  const clampedTranslateX = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  });

  const panGestureHandler=useAnimatedGestureHandler({
    onStart:(_,context)=>{
      context.x=translateX.value;
      cancelAnimation(translateX);
    },
    onActive:(event,context)=>{
      translateX.value=event.translationX+context.x;
      
    },
    onEnd:(event)=>{
      translateX.value=withDecay({velocity:event.velocityX})
    }
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View style={{flex:1,flexDirection:'row'}}>
      {title.map((title, index)=>{
        return (
          <Page key={index}  index={index} title={title} translateX={clampedTranslateX}  />
        )
      })}
      </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
});
