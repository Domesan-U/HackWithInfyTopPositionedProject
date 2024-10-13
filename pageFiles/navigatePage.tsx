import React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image,Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker, { openCamera } from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import { AfterCamera } from './afterCamera';
import { WebView } from 'react-native-webview';

const HomeScreen: React.FC = () => {
    const navigation = useNavigation();
  
    const [imageLoc,setImageLoc] = useState<null|string>(null);
    const [isChatBotOpen,setChatBotOpen] = useState(false);
    const [isMusicOpen,setMusictOpen] = useState(false);

  const changeChatBotState = ()=>{
    setChatBotOpen(!isChatBotOpen);
  }
  const changeMusicState = ()=>{
    setMusictOpen(!isMusicOpen);
  }
  const handleWhatYouAtePress = () => {
    Alert.alert('Button Pressed', 'You pressed the "What you ate?" button!');
  };

  const handleCheckFoodPress = () => {
    Alert.alert('Button Pressed', 'You pressed the "Check if the food is healthy or not" button!');
  };

  return (
    <View style={styles.container}>
      <Modal
          animationType="slide"
          transparent={true}
          visible={isChatBotOpen}
          onRequestClose={() => setChatBotOpen(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.webViewContainer}>
              <WebView
                source={{ uri: 'https://hwi-health-chatbot.vercel.app/' }} // Replace with your ChatGPT URL
                style={{ flex: 1 }}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setChatBotOpen(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isMusicOpen}
          onRequestClose={() => setMusictOpen(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.webViewContainer}>
              <WebView
                source={{ uri: 'https://mind-tazaa-3bjn.vercel.app/' }} // Replace with your ChatGPT URL
                style={{ flex: 1 }}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setMusictOpen(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
  
        <TouchableOpacity onPress={()=>{changeChatBotState();}} style={styles.floatingButton}>
            <Image style={{width:40,height:40}}source={require('./assets/chatBot.png')}/>
        </TouchableOpacity>
      <LinearGradient
        colors={['#388E3C', '#4CAF50']} 
        style={styles.header}
      >  

      <Text style={styles.headerText}>SWASTH</Text>
      </LinearGradient>
      <View style={styles.content}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('AfterCamera')}>
            <LinearGradient
              colors={['#66BB6A', '#43A047']} // Green gradient for the button
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText} >NUTRITRACK</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('AfterIngredients')}}>
            <LinearGradient
              colors={['#66BB6A', '#43A047']} // Green gradient for the button
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>NUTRIVALUE</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>changeMusicState()}>
            <LinearGradient
              colors={['#66BB6A', '#43A047']} // Green gradient for the button
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText} >MENTAL RELIEF</Text>
            </LinearGradient>
          </TouchableOpacity>
         
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Stay Healthy, Stay Happy!</Text>
        </View>
      </View>
    </View>
  )
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
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 60, // Increased height for buttons
    marginVertical: 10,
    borderRadius: 30, // Fully rounded corners for a pill shape
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: to dim the background
  },
  webViewContainer: {
    height: '70%', // Make the WebView container occupy 50% of the window height
    width: '100%', // Full width
    backgroundColor: '#fff', // Background color of the WebView container
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  closeButton: {
    backgroundColor: '#FF5733',
    padding: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20, // Adjusted font size for balance
    textAlign: 'center',
    textShadowColor: '#388E3C', // Darker green shadow matching the button gradient color
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#388E3C',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  floatingButton: {
    backgroundColor:'green',
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
  floatingCloseButton: {
    backgroundColor:'green',
    position: 'absolute',
    top: 20,  // 20 units from the bottom of the screen
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

export default HomeScreen;