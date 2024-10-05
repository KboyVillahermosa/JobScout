import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'

export default function JobScreen() {
  return (
   <>
   <ScrollView>
   <View style={styles.header}>
     <View style={styles.headerContent}>
      <Image source={require("../assets/header.jpg")} style={styles.headerImage}/>
      <Text style={styles.textHeader}>hellosssssxxxxsss</Text>
     </View>
   </View>
   </ScrollView>
   </>
  )
}

const styles = StyleSheet.create({
  headerImage:{
    width: 400,
    height: 400,
},
textHeader: {
  alignItems: 'center',
  flex: 1,
  textAlign: 'center',
}
});