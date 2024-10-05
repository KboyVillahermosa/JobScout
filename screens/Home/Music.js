import * as React from 'react';
import { Text, Animated, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { BottomNavigation, IconButton, PaperProvider } from 'react-native-paper';


const MusicRoute = () => <Text>Music</Text>;
const AlbumsRoute = () => <Text>Albums</Text>;
const RecentsRoute = () => <Text>Recents</Text>;
const NotificationsRoute = () => <Text>Notifications</Text>;

export default function Home({ navigation }) {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Error signing out:', error.message);
      });
  };

  // BottomNavigation State
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
    { key: 'albums', title: 'Albums', focusedIcon: 'album' },
    { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
  });

  // Sidebar Animation
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const slideAnim = React.useRef(new Animated.Value(-Dimensions.get('window').width)).current; // Sidebar starts off-screen

  const toggleSidebar = () => {
    if (sidebarVisible) {
      Animated.timing(slideAnim, {
        toValue: -Dimensions.get('window').width * 0.7, 
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSidebarVisible(false));
    } else {
      setSidebarVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0, 
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <IconButton
            icon="menu"
            iconColor='white'
            size={30}
            onPress={toggleSidebar}
          />
          <Text style={styles.titles}>Music Page</Text>
        </View>

        {/* Sidebar - Hidden by default */}
        <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
            
        <TouchableOpacity style={styles.xItem}  onPress={toggleSidebar}>
            <Text ><IconButton icon="close" style={styles.xBtn} iconColor='black'/></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("JobBoard")}>
            <Text style={styles.menuText}>Search Job</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Music")}>
            <Text style={styles.menuText}>Music</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={styles.menuText}>LogOut</Text>
          </TouchableOpacity>
         
        </Animated.View>

        {/* Bottom Navigation at the bottom of the Home screen */}
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50, // Add some margin for bottom navigation
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#D61F69',
  },
  titles: {
   fontSize: 24,
   color: 'white',
   marginLeft: 10,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 80,
    width: Dimensions.get('window').width * 0.5, // Sidebar width
    backgroundColor: 'white',
    padding: 20,
    zIndex: 1000, 
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomColor: 'white',
  },
  menuText: {
    fontSize: 18,
    color: 'black',
    shadowColor: 'black',
  },
  xItem: {
    alignItems: 'flex-end',

  },
  xBtn: {
    fontSize: 24,
  }
});
