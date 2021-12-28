import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image,Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React,{ useState, useEffect } from 'react';

export default function App() {

  const [Url, setUrl] = useState('Loading....');

  const [Title, setTitle] = useState('Loading....');

  const [isLoading, setIsLoading] = useState(false);

  const randomMeme = () => {
    setIsLoading(true);

    fetch("https://meme-api.herokuapp.com/gimme").then(res => res.json()).then(result => {
      console.log(result.url);

      setUrl(result.url);
      setTitle(result.title);
      setIsLoading(false);
      
    })
  }

  useEffect(() => {
    randomMeme();
  }, []);

  const tweetNow = () => {
    const url = "https://twitter.com/intent/tweet?text=" + Url;
    Linking.openURL(url);
  }

  const whatsApp = () => {
    Linking.openURL("whatsapp://send?text="+ Url);
  }


  return (
    <View style={styles.container}>
      <View style={styles.main}>
      <Text style={styles.headertxt}>MemeLand🤤🤣</Text>
      <Text style={styles.memeTxt}>{Title}</Text>
      <Image source={{ uri:Url}} style={styles.meme} />
      <TouchableOpacity style={styles.button} onPress={randomMeme}>
      <Text style={styles.buttonTxt}>{isLoading ? "Loading...." : "New Meme"}</Text>
      </TouchableOpacity>

      <View style={styles.bottomButton}>
      <TouchableOpacity style={styles.logo} onPress={whatsApp}>
      <FontAwesome name="whatsapp" size={30} color="#2F4F4F" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.logo} onPress={tweetNow}>
      <FontAwesome name='twitter' size={30} color="#2F4F4F"/>
      </TouchableOpacity>
      </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F4F4F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main:{
    width:'90%',
    backgroundColor:'#F0FFF0',
    borderRadius:20,
    padding:20
  },
  headertxt:{
    textAlign:'center',
    fontSize:26,
    fontWeight:'700',
    color:'#708090',
    marginBottom:20,
  },
  meme:{
    resizeMode:'contain',
    width:350,
    height:350,
    
    
  },
  memeTxt:{
    textAlign:'center',
    fontWeight:'300',
    fontStyle:'italic',
    fontSize:16,
    color:'#008080',
    marginBottom:8
  },
  button:{
    backgroundColor:'#778899',
    padding:20,
    borderRadius:30,
    marginVertical:20
  },
  buttonTxt:{
    color:'#F5F5F5',
    fontSize:20,
    fontWeight:'700',
    textAlign:'center'
  },
  bottomButton:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  logo:{
    borderWidth: 2,
    borderColor:'#2F4F4F',
    borderRadius:50,
    padding:15,
  }, 
});
