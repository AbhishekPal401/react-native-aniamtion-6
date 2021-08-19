import React from 'react'
import { StyleSheet, Text, View ,Dimensions} from 'react-native';
import Animated,{useSharedValue,useAnimatedStyle,useAnimatedGestureHandler} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';


 export  const {width,height}=Dimensions.get('window');

const Page = (props) => {

    const pageOffset=width*props.index;

    const animatedStyle=useAnimatedStyle(()=>{
        return {
            transform:[{translateX:props.translateX.value+pageOffset}]
        }
    })

    return (
        <Animated.View style={[{
            ...StyleSheet.absoluteFillObject, 
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:`rgba(0,0,256,0.${props.index+2})`
        },animatedStyle]}>
            <Text style={{fontSize:30,color:'white',fontWeight:'700',letterSpacing:1.5,textTransform:'uppercase'}}>{props.title}</Text>
        </Animated.View>
    )
}

export default Page;

const styles = StyleSheet.create({
    
})
