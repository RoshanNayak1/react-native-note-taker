import { StyleSheet, Text, TextInput, View ,Button,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Theme ={
  dark:{
    backgroundColor: '#000000',
    textColor: '#ffffff',
    buttonColor: 'cyan',
    inputBorderColor:'white'
  },
  light:{
    backgroundColor: '#ffffff',
    textColor: '#000000',
    buttonColor: 'blue',
    inputBorderColor: 'black'
  }
}

const App = () => {
  const [savenote,setsavenote ]= useState('');
  const [savednote, setsavednote]=useState('');
  const [isDarkMode,setisDarkMode]= useState(false);
  const currentTheme= isDarkMode ? Theme.dark :Theme.light;

  //funtion for save note
  const SaveNoteFunc= async()=>{
    await AsyncStorage.setItem('savenote', savenote);
   setsavenote('');
   SavedNoteFunc();
  };

  //function for saved note load
  const SavedNoteFunc = async()=>{
    const storedNote = await AsyncStorage.getItem('savenote');
    if(storedNote){
      setsavednote(storedNote);
    }
  };
  //funtion for update note
  const UpdateNoteFunc = async()=>{
    await AsyncStorage.setItem('savenote',savenote)
    setsavednote(savenote);
    setsavenote('');
    Alert.alert('Note Updated Successfully')
  }

  //function fot delete note
  const DeteteNoteFunc =async()=>{
    await AsyncStorage.removeItem('savenote');
    setsavednote('');
    setsavenote('');
    Alert.alert('Note Deleted Successfully')
  }

  //function for toggle theme
  const toggleTheme = () => {
    setisDarkMode(isDark => !isDark);
  };
  useEffect(()=>{
SavedNoteFunc();
  },[])

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
    <View >
      <Text style={styles.text}>SAVE NOTES </Text>
      <TextInput style={[styles.TextInput, {borderColor : currentTheme.inputBorderColor ,color :currentTheme.textColor}]}
      placeholder='Please Enter Text'
      placeholderTextColor={isDarkMode ? 'lightgray' :'gray'}
      value={savenote}
      onChangeText={setsavenote}
      
      >
      </TextInput>
      <View style={styles.buttonContainer}>

      <Button title='Save Note' onPress= {SaveNoteFunc}/>
      <Button title='Update Note' disabled={!savednote} onPress= {UpdateNoteFunc} color='orange'/>
      <Button title='Delete Note' disabled={!savednote} onPress= {DeteteNoteFunc} color='red'/>
      </View>
      <Text style={styles.output}>
        Saved Note : {savednote ? savednote : 'No Note Saved'}
       
      </Text>
      <Button title= {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'} 
      onPress={toggleTheme}
       />
    </View>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
// backgroundColor:currentTheme.backgroundColor;
  },
  
  text:{
    color:'red',
    paddingLeft:10,
    paddingTop:20,
    paddingBottom:20,
    // backgroundColor: currentTheme.color;
    
  }, 
  TextInput:{
  
    borderWidth:2,
    margin:10,
    paddingBottom:10,
    paddingLeft:10
  },
  output:{
    paddingLeft:20,
    backgroundColor:'gray',
    color:'white',
    marginTop:20,
    padding:20,
    fontSize:25
  },
  buttonContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center',
    margin:10
  }
})