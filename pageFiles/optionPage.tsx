import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const { height } = Dimensions.get('window');
import axios from 'axios';
import ImagePicker, { openCamera } from 'react-native-image-crop-picker';
const ChooseOption = () => {
    const [imageLoc,setImageLoc] = useState<null|string>(null);
 const openCamer = ()=>{
    ImagePicker.openCamera({
        width: 300,
        height: 400,
      }).then(image => {
        console.log(image);
        setImageLoc(image['path']);
        console.log(imageLoc)
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

    const  handlePostRequest =async()=> {
      console.log(imageLoc);
      const formData = new FormData();
      formData.append('file', {
          uri: imageLoc!=null?imageLoc:'https://plus.unsplash.com/premium_photo-1675714692342-01dfd2e6b6b5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlyZHxlbnwwfHwwfHx8MA%3D%3D',
          type: 'image/jpeg', // Adjust the type as needed
          name: 'image.jpg'
      });
      try {
          const response = await axios.post('http://3.110.121.222:8000/analyze/small/20/30', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          console.log("Response JSON: ", response.data);
      } catch (error) {
          console.error('Error making POST request:', error);
      }
  }
  
    const uploadDataWithImage = async (food_weightage:String, age:number, weight:number, imageUri:String) => {
      console.log("intiiallly");
    
      try {
        console.log("intiiallly4");
    
          const response = await fetch("https://images.unsplash.com/photo-1486365227551-f3f90034a57c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlyZHxlbnwwfHwwfHx8MA%3D%3D");
          console.log("intiiallly2");
    
          const blob = await response.blob();
          console.log("intiiallly3");
    
          // Step 2: Create a File object from the Blob
          const file = new File([blob], 'downloaded-image.png', { type: blob.type ,lastModified: new Date().getTime()});
  
          // Step 3: Prepare FormData for the upload
          const formData = new FormData();
          formData.append("image", file);
          // Append image
          // formData.append('image', {
          //   uri: imageUri,
          //   name: 'photo.jpg', // You can change the name and extension accordingly
          //   type: 'image/jpeg', // Adjust based on the image type (e.g., 'image/png')
          // });
           const res = await fetch('http://3.110.121.222:8000/docs/analyzedr',{
            method: "POST", 
      
    // Adding body or contents to send 
    body: JSON.stringify({ 
      food_weightage:'small',
        age:20,
        Weight:40
    }),
    // body:formData,
      
    // Adding headers to the request 
    headers: {
      "Content-Type": "application/json",
    },
          });
          console.log("ooos");
          //  if (!res.ok) {
          //   console.log("Failed to check");
          // }
           const out = await res.json();
           console.log('json '+Object.keys(out)+" : "+out['age']);
    //       const response = await fetch('http://0.0.0.0:8000/analyze', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //         body: formData,
    //       });
      
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }
      
    //       const json = await response.json();
    //       console.log("json: "+json); // Adjust based on the API response
        } catch (error) {
          console.error('Error:', error);
        }
        finally{
            console.log("finnally");
        }
      };
      

      const imagePick = ()=>{
        ImagePicker.openPicker({
  width: 300,
  height: 400,
  cropping: true
}).then(image => {
  console.log(image);
});
      }
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Healthy Tomorrow</Text>
      </View>
      
      {/* Option Buttonsd */}
      <View style={{height:20}}>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={()=>openCamer()}>
          <Image
            style={styles.icon}
            source={{
              uri: imageLoc!=null?imageLoc:'https://cdn.pixabay.com/photo/2015/11/03/08/56/question-mark-1019820_960_720.jpg',
            }}
          />
          <Text style={styles.buttonText}>What you ate?</Text>
        </TouchableOpacity>
        <View style={{height:20}}>
      </View>
        <TouchableOpacity style={styles.button} onPress={()=>handlePostRequest()}>
          <Image
            style={styles.icon}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2015/11/03/08/56/question-mark-1019820_960_720.jpg',
            }}
          />
          <Text style={styles.buttonText}>Check if the food is healthy or not</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    height: height * 0.3,
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

export default ChooseOption;
