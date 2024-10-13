import React, { useEffect } from "react";
import { useState, 

 } from "react";
 import { AndroidColor } from "@notifee/react-native";
import { View,Text, Image,TouchableOpacity,StyleSheet } from "react-native";
import { useNavigation, } from '@react-navigation/native';
import ImagePicker, { openCamera } from 'react-native-image-crop-picker';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee from '@notifee/react-native';
export function AfterCamera(){
    type NutritionalInfo = {
        Calories: string;
        Carbohydrates: string;
        Cholesterol: string;
        Fat: string;
        Fiber: string;
        Sodium: string;
        Sugar: string;
      };
    let userProfile = {
        Calories: '0.0',
        Carbohydrates: '0.0',
        Cholesterol: '0.0',
        Fat:'0',
        Fiber:'0',
        Sodium:'0',
        Sugar:'0'
      };
      const addValues = (responseValue:String, prevValue:String) => {
        // Convert strings to numbers, default to 0 if conversion fails
        const numResponseValue = parseFloat(responseValue) || 0;
        const numPrevValue = parseFloat(prevValue) || 0;
        
        // Perform the addition
        const sum = numResponseValue + numPrevValue;
        
        // Convert the result back to string
        return sum.toString();
      };
      const [Calorie, setCalorie] = useState("0");
      const [Carbohydrates, setCarbohydrates] = useState("0");
      const [Cholesterol, setCholesterol] = useState("0");
      const [Fat, setFat] = useState("0");
      const [Fiber, setFiber] = useState("0");
      const [Sodium, setSodium] = useState("0");
      const [Sugar, setSugar] = useState("0");
    
    const [imageLoc,setImageLoc] = useState<null|string>(null);
    const [userPrevValue,setUserPrevValue] = useState<NutritionalInfo>(userProfile);
    const pushTheNotification = async()=>{
        console.log("notification pushed");
        let shouldPush=false;
        shouldPush = [Calorie, Carbohydrates, Cholesterol, Fat, Fiber, Sodium, Sugar].some(value => value.includes('above the limit'));
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'default',
          });
         
          // Display a notification
          await notifee.displayNotification({
            title: 'SWASTH',
            body: shouldPush?"You are on the Limit Feel Free to eat":"Your limit is exceeded try to avoid eating",
            android: {
                channelId:'default',
                color: AndroidColor.RED,
                colorized: true,// pressAction is needed if you want the notification to open the app when pressed
              },
          }).then();
    }
    const reset = async()=>{
      setCalorie("0");
      setCarbohydrates('0');
      setCholesterol('0');
      setFat('0');
      setFiber('0');
      setSodium('0');
      setSugar('0');
      await AsyncStorage.setItem('Calorie', "0");
      await AsyncStorage.setItem('Carbohydrates', "0");
      await AsyncStorage.setItem('Cholesterol', "0");
      await AsyncStorage.setItem('Fat', "0");
      await AsyncStorage.setItem('Fiber', "0");
      await AsyncStorage.setItem('Sodium', "0");
      await AsyncStorage.setItem('Sugar', "0");

    }
    const openCamer = ()=>{
        ImagePicker.openCamera({
            width: 300,
            height: 400,
          }).then(image => {
            console.log(image);
            setImageLoc(image['path']);
            console.log(imageLoc)
            handlePostRequest();
          });
        //   ImagePicker.openCropper({
        //     path: imageLoc!=null?imageLoc:"",
        //     width: 300,
        //     height: 400,
        //     mediaType: 'photo' 
        //   }).then(image => {
        //     console.log(image);
        //   });
        }
        const setData = async()=>{
            console.log("Set data is called");
           
            await AsyncStorage.setItem('Calorie', Calorie);
            await AsyncStorage.setItem('Carbohydrates', Carbohydrates);
            await AsyncStorage.setItem('Cholesterol', Cholesterol);
            await AsyncStorage.setItem('Fat', Fat);
            await AsyncStorage.setItem('Fiber', Fiber);
            await AsyncStorage.setItem('Sodium', Sodium);
            await AsyncStorage.setItem('Sugar', Sugar);
        }
        const createNutritionalRow = (label:any, value:any) => (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
          );
        const getData = async (key:any) => {
            
            try {
               let value = await AsyncStorage.getItem('Calories');
               
              if (value !== null){
                const calorie = await AsyncStorage.getItem('Calorie') || "0";
                const carbohydrates = await AsyncStorage.getItem('Carbohydrates') || "0";
                const cholesterol = await AsyncStorage.getItem('Cholesterol') || "0";
                const fat = await AsyncStorage.getItem('Fat') || "0";
                const fiber = await AsyncStorage.getItem('Fiber') || "0";
                const sodium = await AsyncStorage.getItem('Sodium') || "0";
                const sugar = await AsyncStorage.getItem('Sugar') || "0";
          
                // Update state variables
                setCalorie(calorie);
                setCarbohydrates(carbohydrates);
                setCholesterol(cholesterol);
                setFat(fat);
                setFiber(fiber);
                setSodium(sodium);
                setSugar(sugar);
             }
              
              else{
                await AsyncStorage.setItem('Calories',Calorie);
                console.log("The value is not present");
                value = await AsyncStorage.getItem('Calories');
                // value != null ? JSON.parse(value) : null;
                if (value !== null){
                  console.log("VALUE IS storing now: "+value);
                }
               
              }
            } catch (e) {
              console.error('Failed to load data', e);
            }
          };
        const  handlePostRequest =async( )=> {
            console.log("IMAGE:"+imageLoc);
            const formData = new FormData();
            formData.append('file', {
                uri: imageLoc!=null?imageLoc:'https://plus.unsplash.com/premium_photo-1675714692342-01dfd2e6b6b5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlyZHxlbnwwfHwwfHx8MA%3D%3D',
                type: 'image/jpeg', // Adjust the type as needed
                name: 'image.jpg'
            });
            try{
              let tempWeight = await AsyncStorage.getItem('Weight');
              if(tempWeight==null){
                await AsyncStorage.setItem('Weight', "60");
                tempWeight = await AsyncStorage.getItem('Weight');
              }
      console.log("The weight:is "+tempWeight);
                const response = await axios.post('http://3.110.121.222:8000/analyze/small/30/60', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const responseData = response.data;

                // Assuming responseData is an object with properties like Calorie
                console.log("The data is:", responseData);
                console.log("Calorie:", responseData.Calories); // Accessing specific property
                console.log("All keys:", Object.keys(responseData));
                setCalorie(responseData.Calories);
                setCarbohydrates(responseData.Carbohydrates );
                setCholesterol(responseData.Cholesterol );
                setFat(responseData.Fat );
                setFiber(responseData.Fiber );
                setSodium(responseData.Sodium );
                setSugar(responseData.Sugar );
                pushTheNotification();
                // let temp = {
                //     Calories: addValues(responseData.Calories, userPrevValue.Calories),
                //     Carbohydrates: addValues(responseData.Carbohydrates, userPrevValue.Carbohydrates),
                //     Cholesterol: addValues(responseData.Cholesterol, userPrevValue.Cholesterol),
                //     Fat: addValues(responseData.Fat, userPrevValue.Fat),
                //     Fiber: addValues(responseData.Fiber, userPrevValue.Fiber),
                //     Sodium: addValues(responseData.Sodium, userPrevValue.Sodium),
                //     Sugar: addValues(responseData.Sugar, userPrevValue.Sugar),
                // }
                //setUserPrevValue(temp);
                setData();
            } catch (error) {
                console.error('Error making POST request:', error);
            }
            finally{
                console.log("FINALLY");
            }
        }
        useEffect(() => {
           getData("carbs");
          },[]);
    const navigation = useNavigation();
    const data = [
        { label: 'Calories', value: '30g' },
        { label: 'Protein', value: '40g' },
        { label: 'Carbs', value: '50g' },
        { label: 'Fat', value: '20g' },
      ];
    
    return (

<View style={{flex:1}}>
    <Text style={{color:'black',alignSelf:'center',fontSize:24,fontWeight:'bold',margin:20}}>Your Today's Nutrition</Text>
    <View style={{alignItems:'center'}}><Text style={{color:'white',alignSelf:'flex-end',padding:20,backgroundColor:'green',borderRadius:40,margin:10}}onPress={reset}>RESET</Text></View>
    <View style={{alignItems:'center'}}><Text style={{color:'black',borderColor:'black',borderRadius:20,borderWidth:2,margin:20,padding:10}}>YOU CAN CHECK YOUR PROGRESS HERE</Text></View>
  
    <View style={{flex:1,justifyContent:'center',padding:20}}>
    <View style={{ justifyContent: 'space-between', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
    {createNutritionalRow('Calories', Calorie)}
      {createNutritionalRow('Carbohydrate', Carbohydrates)}
      {createNutritionalRow('Cholesterol', Cholesterol)}
      {createNutritionalRow('Fat', Fat)}
      {createNutritionalRow('Fiber', Fiber)}
      {createNutritionalRow('Sodium', Sodium)}
      {createNutritionalRow('Sugar', Sugar)}
       </View>
    
    
</View>
        <TouchableOpacity style={styles.floatingButton} onPress={openCamer}>
            <Image style={{width:50,height:50}} source={{uri:'https://cdn-icons-png.flaticon.com/128/8428/8428668.png'}}/>
        </TouchableOpacity>
         </View>


    );

}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,  // Adjust this if needed
      },
      value: {
        fontSize: 18,
        color: '#666',
        flex: 2,  // Adjust this if needed
        textAlign: 'right',  // Align text to the right if desired
      },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5', 
    },
    header: {
      width: '100%', // Full width of the container
      padding: 20,
      backgroundColor: '#6200ee', // Header background color
      alignItems: 'center',
      marginBottom: 20, // Space between header and buttons
    },
    headerText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
    buttonContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
    },
    button: {
      flexDirection: 'row',
      backgroundColor: 'blue',
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
      borderRadius: 10,
      padding: 10, // Add padding to create space within the button
    },
    icon: {
      width: 40,
      height: 40,
      marginRight: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
      flexShrink: 1, // Ensures the text shrinks if necessary
      flexWrap: 'wrap', // Allows text to wrap if too long
      textAlign: 'left', // Aligns text to the left
    },
    floatingButton: {
        backgroundColor:'white',
        position: 'absolute',
        bottom: 20,  // 20 units from the bottom of the screen
        right: 20,   // 20 units from the right side of the screen
        borderRadius: 30,
        padding: 15,
        elevation: 8, // Add shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.2, // Shadow opacity
        shadowRadius: 2.5, // Shadow radius
      },
     
  });
  