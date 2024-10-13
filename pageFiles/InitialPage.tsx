import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import ImagePicker, { openCamera } from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const ProfileScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [manualAllergy, setManualAllergy] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [imageLoc,setImageLoc] = useState<null|string>(null);

  const navigation = useNavigation();
  const openCamer = ()=>{
    ImagePicker.openCamera({
        width: 300,
        height: 400,
      }).then(image => {
        console.log(image);
        setImageLoc(image['path']);
        console.log("Behind: "+imageLoc)
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
        console.log("IMAGE:"+imageLoc);
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
        finally{
            console.log("FINALLY");
        }
    }
    
  const commonAllergies = [
    'Peanuts', 'Shellfish', 'Eggs', 'Milk', 'Soy', 'Wheat', 'Tree nuts',
    'Fish', 'Dust', 'Pollen', 'Pet dander', 'Mold', 'Latex', 'Bee stings', 
    'Insect bites', 'Gluten', 'Penicillin', 'Aspirin', 'Sulfites', 'Fragrance', 'Other'
  ];

  const healthConditions = [
    'Blood Pressure', 'Diabetes', 'Heart Disease', 'Asthma'
  ];

  const toggleAllergy = (allergy: string) => {
    if (allergy === 'Other') {
      setShowManualInput(!showManualInput);
      return;
    }
    setAllergies((prev) =>
      prev.includes(allergy)
        ? prev.filter((item) => item !== allergy)
        : [...prev, allergy]
    );
  };

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((item) => item !== condition)
        : [...prev, condition]
    );
  };

  const handleStartPress = async() => {
    let finalAllergies = [...allergies];
    if (showManualInput && manualAllergy.trim()) {
      finalAllergies = [...finalAllergies, manualAllergy.trim()];
    }
    await AsyncStorage.setItem('Weight', bloodGroup.toString());
      
      navigation.navigate('HomeScreen'); // Navigate to HomeScreen
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#388E3C', '#4CAF50']} // Green gradient for the header
        style={styles.header}
      >
        <Text style={styles.headerText}>Personal Information</Text>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#8E8E8E"
          />
        </View>
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Age:</Text>
            <TextInput
              style={styles.input}

              value={age}
              onChangeText={setAge}
              placeholder="Enter your age"
              placeholderTextColor="#8E8E8E"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Weight:</Text>
            <TextInput
              style={styles.input}
              value={bloodGroup}
              onChangeText={setBloodGroup}
              placeholder="Enter your blood group"
              placeholderTextColor="#8E8E8E"
            />
          </View>
        </View>
        <Text style={styles.label}>Health Conditions:</Text>
        <View style={styles.conditionsContainer}>
          {healthConditions.map((condition) => (
            <TouchableOpacity
              key={condition}
              style={[
                styles.conditionButton,
                selectedConditions.includes(condition) && styles.conditionButtonSelected,
              ]}
              onPress={() => toggleCondition(condition)}
            >
              <Text style={styles.conditionText}>{condition}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Common Allergies:</Text>
        <View style={styles.allergiesContainer}>
          {commonAllergies.map((allergy) => (
            <TouchableOpacity
              key={allergy}
              style={[
                styles.allergyButton,
                allergies.includes(allergy) && styles.allergyButtonSelected,
              ]}
              onPress={() => toggleAllergy(allergy)}
            >
              <Text style={styles.allergyText}>{allergy}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {showManualInput && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Specify Allergy:</Text>
            <TextInput
              style={styles.input}
              value={manualAllergy}
              onChangeText={setManualAllergy}
              placeholder="Enter allergy"
              placeholderTextColor="#8E8E8E"
            />
          </View>
        )}
        <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
          <LinearGradient
            colors={['#66BB6A', '#43A047']} // Green gradient for the button
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Start</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8E9', // Light green background for a soft look
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#81C784', // Light green border at the bottom
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: '#81C784', // Light green text shadow
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  content: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: '#388E3C',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#388E3C',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    color:'black',
    shadowOffset: { width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  conditionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  conditionButton: {
    width: '48%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#388E3C',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  conditionButtonSelected: {
    backgroundColor: '#66BB6A',
  },
  conditionText: {
    color: '#388E3C',
    fontSize: 16,
  },
  allergiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  allergyButton: {
    width: '48%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#388E3C',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  allergyButtonSelected: {
    backgroundColor: '#66BB6A',
  },
  allergyText: {
    color: '#388E3C',
    fontSize: 16,
  },
  startButton: {
    marginTop: 20,
    borderRadius: 10,
    height: 60,
    overflow: 'hidden',
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;