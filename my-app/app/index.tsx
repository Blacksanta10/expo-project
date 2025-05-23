import { Text, View, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";

export default function Index() {
  return ( 
    <SafeAreaProvider>

      <SafeAreaView style={{height: 100, flexDirection: 'row'}}>
        <View style={{backgroundColor: 'blue', flex: 0.2}} />
        <View style={{backgroundColor: 'red', flex: 0.4}} />
        <Text>Hello World!</Text>
      </SafeAreaView>

    </SafeAreaProvider>
  );
}

 export function DisplayImage () {
   return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Image
           style= {{width: 200, height: 200}} 
           source={require('../assets/images/Chiyo.png')}
           />
      </SafeAreaView>
    </SafeAreaProvider>
   )


 }
