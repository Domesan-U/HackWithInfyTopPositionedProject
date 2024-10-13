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
export function IngredientsCheck(){
  
  const [healthyImage,setImageHealthy] = useState(false);
  const [count,setCounter] = useState(0);
  const [recom,setRecom] = useState("");
  const [allergy,setAllergy] = useState("");
  
  
    const [imageLoc,setImageLoc] = useState<null|string>(null);
        const openCamer = ()=>{
          ImagePicker.openPicker({
            width: 300,
            height: 400,
          }).then(image => {
            console.log(image);
            setImageLoc(image['path'])
            handlePostRequest();
            setCounter(count+1);
          
          }); //   ImagePicker.openCropper({
        //     path: imageLoc!=null?imageLoc:"",
        //     width: 300,
        //     height: 400,
        //     mediaType: 'photo' 
        //   }).then(image => {
        //     console.log(image);
        //   });
        }
        const createNutritionalRow = (label:any, value:any) => (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
          );
          
        const  handlePostRequest =async( )=> {
          console.log("IMAGE:"+imageLoc);
            const formData = new FormData();
            formData.append('image', {
                uri: imageLoc!=null?imageLoc:'https://plus.unsplash.com/premium_photo-1675714692342-01dfd2e6b6b5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlyZHxlbnwwfHwwfHx8MA%3D%3D',
                type: 'image/jpeg', // Adjust the type as needed
                name: 'image.jpeg'
            });
            try{
                const response = await axios.post('http://3.110.121.222:3000/upload-image/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const responseData = response.data;
                setRecom(responseData.gemini_response.recommendation);
                setAllergy(responseData.gemini_response.allergy_concerns);
                console.log("HerE me: "+recom+" : "+ Object.keys(responseData.gemini_response));
                // if(responseData.Calories.includes("above the limit") || responseData.Carbohydrates.includes("above the limit") || responseData.Cholesterol.includes("above the limit") ||responseData.Fiber.includes("above the limit")  || responseData.Protein.includes("above the limit") ||responseData.Sugar.includes("above the limit") ){
                //   setImageHealthy(false);
                // }
                // else{
                //   setImageHealthy(true);
                // }
                // Assuming responseData is an object with properties like Calorie
                console.log("The data is:", responseData);
                // console.log("Calorie:", responseData.Calories); // Accessing specific property
                // console.log("All keys:", Object.keys(responseData));
              
           
            } catch (error) {
                console.error('Error making POST request:', error);
            }
            finally{
                console.log("FINALLY");
            }
        }
        useEffect(() => {
          },[]);
    const navigation = useNavigation();
    const data = [
        { label: 'Calories', value: '30g' },
        { label: 'Protein', value: '40g' },
        { label: 'Carbs', value: '50g' },
        { label: 'Fat', value: '20g' },
      ];
    
    return (

      <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>IS This Healthy For You?</Text>
      </View>

      {/* Recommendation Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommendation</Text>
        <Text style={styles.sectionContent}>{recom==""?"You can check your recommendation here":recom}</Text>
      </View>

      {/* Allergy Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Allergy</Text>
        <Text style={styles.sectionContent}>{allergy==""?"You can check your allergic information here":allergy}</Text>
      </View>

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={openCamer}>
        <Image 
          style={styles.buttonImage}
          source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFDLnz014bpzLsn-CmjUMULAPpKAw4ePAPjQ&s'}}
        />
      </TouchableOpacity>
    </View>   
     );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#007bff',
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    color: '#007bff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionContent: {
    color: '#343a40',
    fontSize: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
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
     
  });
  