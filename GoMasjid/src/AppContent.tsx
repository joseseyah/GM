import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import Bookmark from './screens/QuranScreens/Bookmark';
import QuranDashboard from './screens/QuranScreens/QuranDashboard';
import QuranNavigation from './screens/QuranScreens/QuranNavigation';
import ReadQuran from './screens/QuranScreens/ReadQuran';
import Reciters from './screens/QuranScreens/Reciters';
import Masjid from './screens/Masjid/Masjid';
import FavouriteMasjids from './screens/Masjid/FavouriteMasjids';
import MasjidDetails from './screens/Masjid/MasjidDetailsOld';
import unClaimedMasjidDetails from './screens/Masjid/unClaimedMasjidDetailsOld';
import AuthTest from './screens/AuthTest';
import ClaimMasjid from './screens/Masjid/ClaimMasjid';
// import TrackPlayer, { State, Capability } from 'react-native-track-player';
import DuaDashboard from './screens/Dua/DuaDashboard';
import DuaCategories from './screens/Dua/Categories';
import DuaSubCategory from './screens/Dua/SubCategory';
import DuaScreen from './screens/Dua/Dua';
import DuaBookmark from './screens/Dua/DuaBookmark';
import MasjidPortal from './screens/MasjidAdmin/AdminPortal';
import EditMasjidInfo from './screens/MasjidAdmin/EditMasjidInfo';
import SalahTimes from './screens/MasjidAdmin/SalahTimes';
import Announcement from './screens/MasjidAdmin/Announcement';
import AddAnnouncement from './screens/MasjidAdmin/AddAnnouncement';
import Temp from './screens/MasjidAdmin/Temp';

enableScreens();

// async function isPlayerInitialized() {
//   let isPlayerInitialized = false;

//   try {
//     await TrackPlayer.setupPlayer();
//     await TrackPlayer.updateOptions({
//       capabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext, Capability.SkipToPrevious]
//     });

//     isPlayerInitialized = true;
//   } catch (e) {
//     // intentionally leaved as blank
//   }
//   return isPlayerInitialized
// }
// console.log("here")
// console.log(isPlayerInitialized())

const Stack = createStackNavigator();
 function AppContent(): React.JSX.Element {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="QuranDashboard">
          <Stack.Screen
            name="QuranDashboard"
            component={QuranDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QuranNavigation"
            component={QuranNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ReadQuran"
            component={ReadQuran}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Bookmark"
            component={Bookmark}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Reciters"
            component={Reciters}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Masjid"
            component={Masjid}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FavouriteMasjids"
            component={FavouriteMasjids}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MasjidDetails"
            component={MasjidDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="unClaimedMasjidDetails"
            component={unClaimedMasjidDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ClaimMasjid"
            component={ClaimMasjid}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AuthTest"
            component={AuthTest}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DuaDashboard"
            component={DuaDashboard}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DuaCategories"
            component={DuaCategories}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DuaSubCategory"
            component={DuaSubCategory}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DuaScreen"
            component={DuaScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DuaBookmark"
            component={DuaBookmark}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="MasjidPortal"
            component={MasjidPortal}
            options={{headerShown: false}}
          />    
          <Stack.Screen
            name="EditMasjidInfo"
            component={EditMasjidInfo}
            options={{headerShown: false}}
          />    
          <Stack.Screen
            name="Announcement"
            component={Announcement}
            options={{headerShown: false}}
          />    
          <Stack.Screen
            name="AddAnnouncement"
            component={AddAnnouncement}
            options={{headerShown: false}}
          />    
          <Stack.Screen
            name="SalahTimes"
            component={SalahTimes}
            options={{headerShown: false}}
          />    
          <Stack.Screen
            name="Temp"
            component={Temp}
            options={{headerShown: false}}
          />    
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

export default AppContent;