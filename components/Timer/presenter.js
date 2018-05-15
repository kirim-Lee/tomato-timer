import React, {Component} from 'react';
import {View, Text, StyleSheet,StatusBar} from 'react-native';
import Button from "../Button";

function formatTime(time){
    let minutes = Math.floor(time/60);
    time -= minutes*60;
    let seconds =parseInt(time%60,10);
    return `${minutes<10 ? `0${minutes}` : minutes} : ${seconds<10 ? `0${seconds}` : seconds}`;
}
class Timer extends Component{
    //prop불러올때마다 불려옴
    componentWillReceiveProps(nextProps){
        const currentProps=this.props;
        //console.log(`The current isPlaying is: ${currentProps.isPlaying} and the new ones is: ${nextProps.isPlaying}`)
        if(!currentProps.isPlaying && nextProps.isPlaying){
            //start interval
            const timerInterval = setInterval(()=>{
                currentProps.addSeconds();
            },1000);
            this.setState({
                timerInterval
            })
        }else if(currentProps.isPlaying && !nextProps.isPlaying){
            //clear interval
            clearInterval(this.state.timerInterval);
        }
    }
    render(){
        console.log(this.props);
        const {isPlaying,elapsedTime,timerDuration,startTimer,restartTimer} = this.props;
        return(
            <View style={styles.container}>
                <StatusBar barStyle={"light-content"} />
                <View style={styles.upper}>
                    <Text style={styles.time}>{formatTime(timerDuration-elapsedTime)}</Text>
                </View>
                <View style={styles.lower}>
                    {!isPlaying && <Button iconName="play-circle-o" onPress={startTimer} />}
                    {isPlaying && <Button iconName="stop-circle" onPress={restartTimer}/>}
                </View>
            </View>
        );   
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#CE0B24"
    },
    upper:{
        flex:2,
        justifyContent:"center",
        alignItems:"center"
    },
    lower:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    time:{
        color:"white",
        fontSize:120,
        fontWeight:"100"
    }
});

export default Timer;