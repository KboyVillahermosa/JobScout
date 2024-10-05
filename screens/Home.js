import * as React from "react";
import {
  Text,
  Animated,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../firebase";
import {
  BottomNavigation,
  IconButton,
  PaperProvider,
} from "react-native-paper";

import JobBoard from "./JobBoard";
import RecentsScreen from "./RecentsScreen";
import NotificationsScreen from "./NotificationsScreen";
import Profile from "./Profile"; // Ensure this import is present

export default function Home({ navigation }) {
  const [user, setUser] = React.useState(null);
  const [sidebarVisible, setSidebarVisible] = React.useState(false); // Initialize sidebarVisible state
  const slideAnim = React.useRef(new Animated.Value(-Dimensions.get("window").width * 0.7)).current;

  React.useEffect(() => {
    const currentUser = getAuth().currentUser;
    if (currentUser) {
      setUser({
        email: currentUser.email,
        nickname: currentUser.displayName || "User",
      });
    }
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "jobBoard",
      title: "Home",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    { key: "recents", title: "Recents", focusedIcon: "history" },
    { key: "profile", title: "Profile", focusedIcon: "account" },
    {
      key: "notifications",
      title: "Notifications",
      focusedIcon: "bell",
      unfocusedIcon: "bell-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    profile: Profile,
    jobBoard: JobBoard,
    recents: RecentsScreen,
    notifications: NotificationsScreen,
  });

  const toggleSidebar = () => {
    if (sidebarVisible) {
      Animated.timing(slideAnim, {
        toValue: -Dimensions.get("window").width * 0.7,
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
        {/* Conditionally render the header */}
        {index !== 1 && (  
          <View style={styles.header}>
            <IconButton
              icon="menu"
              iconColor="black"
              size={30}
              onPress={toggleSidebar}
            />
            <Image source={require("../assets/logoFinal.png")} style={styles.image} />
            <Text style={styles.titles}>JobScout</Text>
          </View>
        )}
        <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.header}>
              <Image source={require("../assets/logoFinal.png")} style={styles.image} />
              <Text style={styles.titles}>JobScout</Text>
              <TouchableOpacity style={styles.xItem} onPress={toggleSidebar}>
                <IconButton icon="close" style={styles.xBtn} iconColor="black" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          
          {user && (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.nickname}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("JobCategory")}
          >
            <Text style={styles.menuText}>Job Categories</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              toggleSidebar(); // Close sidebar after navigation
              if (user) {
                navigation.navigate("Profile", { userId: user.email }); // Pass the user email as userId
              }
            }}
          >
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={styles.menuText}>LogOut</Text>
          </TouchableOpacity>
        </Animated.View>

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
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "white",
    paddingHorizontal: 5,
    zIndex: 100,
    marginTop: 50,
  },
  titles: {
    fontSize: 24,
    color: "black",
    marginLeft: 10,
  },
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: Dimensions.get("window").width * 0.7,
    backgroundColor: "white",
    padding: 20,
    zIndex: 1000,
  },
  userInfo: {
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 16,
    color: "gray",
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomColor: "white",
  },
  menuText: {
    fontSize: 18,
    color: "black",
  },
  xItem: {
    alignItems: "flex-end",
  },
  xBtn: {
    fontSize: 24,
    color: "#000",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 900,
  },
  image: {
    width: 50,
    height: 50,
  },
});
