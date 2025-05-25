
//Importing necessary hooks and compnenets
import { useState, useRef } from "react";

import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing,
} from "react-native";

import {Audio} from "expo-av";


//Main App component
const App= () => {

  // State to keep track of the current coin side
  const [coinSide, setCoinSide] = useState("Heads");
  //state to keep track of the number of heads
  const [headsCounts, setHeadsCount] = useState(0);
  //state to keep track of the number of tails
  const [tailsCount, setTailsCount] = useState(0);

  //Animated value for the coin flip animation
  const flipAnimation = useRef(new Animated.Value(0)).current;

  //function  to handle coin flip  logic and animation with audio
  const flipCoin = async () => {
      //Play coin flip audio
      try {
          const { sound } = await Audio.Sound.createAsync(
            {uri: "https://media.geeksforgeeks.org/wp-content/uploads/20250524122236583887/coin-flip-audio.mp3"},
            {shouldPlay : true }
          );
          //Unload sound after playback
          sound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
              sound.unloadAsync();
            }
          });
      } catch (e) {
        //handle audio error
        console.error("Audio error:", e);
      }

      //Start the spin: animate rotateY form odeg to 720deg
      //over 1sec with a custom subic-bezier
      Animated.timing(flipAnimation, {
        toValue: 2,
        duration: 1000,
        easing: Easing.bezier(0.68, -0.55, 0.27, 1.55),
        useNativeDriver: true,
      }).start();

      //Change image at halfway point (500ms)
      setTimeout(() => {
        const randomSide = Math.floor(Math.random () * 2);
        if (randomSide === 0) {
           setCoinSide("Heads");
           setHeadsCount((prev) => prev +1);
        } else {
          setCoinSide("Tails");
          setTailsCount((prev) => prev +1);
        }
      }, 500)

      // Reset animation value after animation completes (1s)
      setTimeout(() => {
        flipAnimation.setValue(0);
      }, 1000);
  };

  //function to reset both heads and tails counts
  const resetCounts = () => {
    setHeadsCount(0);   //Resets heads count to 0
    setTailsCount(0);   //Resets tails count to 0
  };


  
  //Render the UI
  return (
    <View style={styles.container}>
      {/*App  title*/}
      <text style={styles.title}>Coin Flip App</text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                       // Take up full screen
    alignItems: 'center',          // Center items horizontally
    justifyContent: 'center',      // Center items vertically
  },
  title: {
    fontSize: 24,                 
    fontWeight: "bold",
    marginBottom: 20,              // Space below title
  },
  coinContainer: {
    marginBottom: 30,              // Space below coin Image
  },
  coinImage: {
    width: 150,
    height: 150,
  },
  countContainer: {
    flexDirection: "row",         // Arrange counts in a row
    marginBottom: 150,            // Space below counts
  },
  count: {
    marginRight: 20,              // Space between counts
  },
  countText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",             // Blue color
  },
  buttonRow: {
    flexDirection:  "row",        // Arrange buttons in a row
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,                  // Padding inside button
    margin: 10,                   // Space between buttons
    borderRadius: 5,              // Rounded corners
  },
   buttonText: {
    color: "white",
    fontWeight: "bold",
   },
});

//Expost the App component as default
export default App;
