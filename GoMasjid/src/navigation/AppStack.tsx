import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// App Screens
import DuaCategories from '../screens/Dua/Categories';
import DuaScreen from '../screens/Dua/Dua';
import DuaBookmark from '../screens/Dua/DuaBookmark';
import DuaDashboard from '../screens/Dua/DuaDashboard';
import DuaSubCategory from '../screens/Dua/SubCategory';
import ClaimMasjid from '../screens/Masjid/ClaimMasjid';
import AddAnnouncement from '../screens/MasjidAdmin/AddAnnouncement';
import AddEvent from '../screens/MasjidAdmin/AddEvent';
import AddImam from '../screens/MasjidAdmin/AddImam';
import MasjidPortal from '../screens/MasjidAdmin/AdminPortal';
import Announcement from '../screens/MasjidAdmin/Announcement';
import EditMasjidInfo from '../screens/MasjidAdmin/EditMasjidInfo';
import MasjidImaams from '../screens/MasjidAdmin/MasjidImaams';
import SalahTimes from '../screens/MasjidAdmin/SalahTimes';
import Temp from '../screens/MasjidAdmin/Temp';

import UpdateSalahTime from '../screens/MasjidAdmin/UpdateSalahTime';
import Qibla from '../screens/QiblaScreens/Qibla';
import Bookmark from '../screens/QuranScreens/Bookmark';
import QuranDashboard from '../screens/QuranScreens/QuranDashboard';
import QuranNavigation from '../screens/QuranScreens/QuranNavigation';
import ReadQuran from '../screens/QuranScreens/ReadQuran';
import Reciters from '../screens/QuranScreens/Reciters';

import AskImamDashboard from '../screens/AskImam/Dashboard'
import FAQ from '../screens/AskImam/FAQ';
import AskQuestion from '../screens/AskImam/AskQuestion'
import ConversationScreen from '../screens/AskImam/ConversationScreen';
import UserQuestions from '../screens/AskImam/UserQuestions';
import ChangeImam from '../screens/AskImam/ChangeImam';

import unClaimedMasjidDetails from '../screens/Masjid/unClaimedMasjidDetailsOld';
import MasjidDetails from '../screens/Masjid/MasjidDetailsOld';

import FavouriteMasjids from '../screens/Masjid/FavouriteMasjids';
import Masjid from '../screens/Masjid/Masjid';
import MasjidDetailsScreen from '../screens/Masjid/MasjidDetailsScreen';


import withBottomTab from '../components/withBottomTab';
import Zakaat from '../screens/ZakaatScreens/Zakaat';
import ZakatDashboard from '../screens/ZakaatScreens/ZakatDashboard';
import ZakatFaq from '../screens/ZakaatScreens/ZakatFaq';
import ZakatNisab from '../screens/ZakaatScreens/ZakatNisab';

import ImamDashboard from '../screens/ImamDashboard/ImamDashboard';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import UnderConstruction from '../screens/UnderConstruction/UnderConstruction';
import EventDashboard from '../screens/Events/Dashboard';
import EventInfo from '../screens/Events/EventInfo';
import ProfileScreen from '../screens/ProfileScreens/ProfileScreen';
import NotificationSettings from '../screens/ProfileScreens/NotificationSettings';
import Feedback from '../screens/ProfileScreens/Feedback';
import Support from '../screens/ProfileScreens/Support';
import userAnnouncement from '../screens/ProfileScreens/Announcement';
import HelpCenter from '../screens/ProfileScreens/HelpCenter';
import ReportUser from '../screens/ImamDashboard/ReportUser';

import Resturants from '../screens/Resturants/Resturants';

import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

// App Navigator (Quran Section)
export const AppStack = () => {
  return (
  
    <Stack.Navigator initialRouteName="QuranDashboard" screenOptions={{ headerShown: false }}>
   
      {/* Masjid Admin */}
      <Stack.Screen name="MasjidPortal" component={MasjidPortal} options={{headerShown: false}}/>    
      <Stack.Screen name="EditMasjidInfo" component={EditMasjidInfo} options={{headerShown: false}}/>    
      <Stack.Screen name="Announcement" component={Announcement} options={{headerShown: false}}/>    
      <Stack.Screen name="AddAnnouncement" component={AddAnnouncement} options={{headerShown: false}}/>    
      <Stack.Screen name="MasjidImaams" component={MasjidImaams} options={{headerShown: false}}/>
      <Stack.Screen name="AddImam" component={AddImam} options={{headerShown: false}}/>
      <Stack.Screen name="SalahTimes" component={SalahTimes} options={{headerShown: false}}/>    
      <Stack.Screen name="UpdateSalahTime" component={UpdateSalahTime} options={{headerShown: false}}/>    
      <Stack.Screen name="Temp" component={Temp} options={{headerShown: false}}/>    
      {/* Masjid Events */}
      <Stack.Screen name="EventDashboard" component={EventDashboard} options={{headerShown: false}}/>
      <Stack.Screen name="AddEvent" component={AddEvent} options={{headerShown: false}}/> 
      {/* Ask Imam */}
      <Stack.Screen name="AskImamDashboard" component={AskImamDashboard} options={{headerShown: false}}/>   
      <Stack.Screen name="FAQ" component={FAQ} options={{headerShown: false}}/> 
      <Stack.Screen name="AskQuestion" component={AskQuestion} options={{headerShown: false}}/>   
      <Stack.Screen name="ConversationScreen" component={ConversationScreen} options={{headerShown: false}}/>   
      <Stack.Screen name="UserQuestions" component={UserQuestions} options={{headerShown: false}}/>   

      {/* Masjid */}
      {/* <Stack.Screen name="Masjid" component={Masjid} options={{headerShown: false}} />
      <Stack.Screen name="MasjidDetailsScreen" component={MasjidDetailsScreen} options={{headerShown: false}} />
      
      <Stack.Screen name="FavouriteMasjids" component={FavouriteMasjids} options={{headerShown: false}} />
      {/* <Stack.Screen  name="MasjidDetails" component={MasjidDetails} options={{headerShown: false}} />
      <Stack.Screen name="unClaimedMasjidDetails" component={unClaimedMasjidDetails} options={{headerShown: false}} /> */}
      <Stack.Screen name="ClaimMasjid" component={ClaimMasjid} options={{headerShown: false}} /> */}
  
       {/* Imam Dashboard  */}
       

    </Stack.Navigator>
  );
};

export const QuranStack = () => {
  return (
    <Stack.Navigator initialRouteName="QuranDashboard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="QuranDashboard" component={QuranDashboard} />
      <Stack.Screen name="ReadQuran" component={ReadQuran} />
      <Stack.Screen name="Bookmark" component={Bookmark} />
      <Stack.Screen name="Reciters" component={Reciters} />
      <Stack.Screen name="Qibla" component={Qibla} />
    </Stack.Navigator>
  );
};


export const QuranPagesStack = () => {
  return (
    <Stack.Navigator initialRouteName="ReadQuran" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReadQuran" component={ReadQuran} />
    </Stack.Navigator>
  );
};

export const PagesStack = withBottomTab(() => {
  return (
    <Stack.Navigator initialRouteName="Qibla" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Qibla" component={Qibla} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="UnderConstruction" component={UnderConstruction} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="userAnnouncement" component={userAnnouncement} />
      <Stack.Screen name="HelpCenter" component={HelpCenter} />
    </Stack.Navigator>
  );
});

export const MasjidStack = () => {
  return (
    <Stack.Navigator initialRouteName="Masjid" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Masjid" component={Masjid} />
      <Stack.Screen name="MasjidDetailsScreen" component={MasjidDetailsScreen} />
    </Stack.Navigator>
  );
};


export const MasjidAdminStack = () => {
  return (
    <Stack.Navigator initialRouteName="MasjidPortal" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MasjidPortal"
        component={MasjidPortal}
        options={{ title: 'Admin Portal' }} // removes `headerShown: false`
      />

      <Stack.Screen name="EditMasjidInfo" component={EditMasjidInfo} options={{headerShown: false}}/>    
      <Stack.Screen name="Announcement" component={Announcement} options={{headerShown: false}}/>    
      <Stack.Screen name="AddAnnouncement" component={AddAnnouncement} options={{headerShown: false}}/>    
      <Stack.Screen name="MasjidImaams" component={MasjidImaams} options={{headerShown: false}}/>
      <Stack.Screen name="AddImam" component={AddImam} options={{headerShown: false}}/>
      <Stack.Screen name="SalahTimes" component={SalahTimes} options={{headerShown: false}}/>    
      <Stack.Screen name="UpdateSalahTime" component={UpdateSalahTime} options={{headerShown: false}}/>    
      <Stack.Screen name="Temp" component={Temp} options={{headerShown: false}}/>  
      {/* Masjid Events */}
      {/* <Stack.Screen name="EventDashboard" component={EventDashboard} options={{headerShown: false}}/> */}
      <Stack.Screen name="AddEvent" component={AddEvent} options={{headerShown: false}}/>  
    </Stack.Navigator>
  );
};

export const EventsStack = withBottomTab(() => {
  return (
    <Stack.Navigator initialRouteName="EventDashboard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EventDashboard" component={EventDashboard} options={{headerShown: false}}/>
      <Stack.Screen name="EventInfo" component={EventInfo} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
});

export const AskImaamStack = withBottomTab(() => {
  return (
    <Stack.Navigator initialRouteName="AskImamDashboard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AskImamDashboard" component={AskImamDashboard} options={{headerShown: false}}/>   
      <Stack.Screen name="FAQ" component={FAQ} options={{headerShown: false}}/> 
      <Stack.Screen name="AskQuestion" component={AskQuestion} options={{headerShown: false}}/>   
      <Stack.Screen name="ConversationScreen" component={ConversationScreen} options={{headerShown: false}}/>   
      <Stack.Screen name="UserQuestions" component={UserQuestions} options={{headerShown: false}}/>      
      <Stack.Screen name="ChangeImam" component={ChangeImam} options={{headerShown: false}}/>      
    </Stack.Navigator>
  );
});

export const ImamDashboardStack = withBottomTab(() => {
  return (
    <Stack.Navigator initialRouteName="ImamDashboard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ImamDashboard" component={ImamDashboard} options={{headerShown: false}}/> 
      <Stack.Screen name="ReportUser" component={ReportUser} options={{headerShown: false}} />
    </Stack.Navigator>
  );
});

export const DuaStack = withBottomTab(() => {
  return (
    <Stack.Navigator initialRouteName="DuaDashboard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DuaDashboard" component={DuaDashboard} options={{headerShown: false}}/>
      <Stack.Screen name="DuaCategories" component={DuaCategories} options={{headerShown: false}}/>
      <Stack.Screen name="DuaSubCategory" component={DuaSubCategory} options={{headerShown: false}}/>
      <Stack.Screen name="DuaScreen" component={DuaScreen} options={{headerShown: false}}/>
      <Stack.Screen name="DuaBookmark" component={DuaBookmark} options={{headerShown: false}}/>

    </Stack.Navigator>
  );
});

export const ResturantStack = withBottomTab(() => {
  return (
    <Stack.Navigator initialRouteName="Resturants" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Resturants" component={Resturants} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
});

// ZakaatStack navigator (as shown above)
export const ZakaatStack = () => {
  return (
    <Stack.Navigator initialRouteName="Zakaat" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Zakaat" component={Zakaat} options={{headerShown: false}}/>
      <Stack.Screen name="ZakatCalulator" component={ZakatDashboard} options={{headerShown: false}}/>
      <Stack.Screen name="ZakatFaq" component={ZakatFaq} options={{headerShown: false}}/>
      <Stack.Screen name="ZakatNisab" component={ZakatNisab} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

export const ZakaatWithTab = withBottomTab(ZakaatStack);
// export const DuaWithTab = withBottomTab(DuaStack);
// export const ImamDashboardWithTab = withBottomTab(ImamDashboardStack);
// export const AskImaamWithTab = withBottomTab(AskImaamStack);
// export const MasjidAdminWithTab = withBottomTab(MasjidAdminStack);
// export const MasjidWithTab = withBottomTab(MasjidStack);
// export const QuranWithTab = withBottomTab(QuranStack);
// export const PagesWithTab = withBottomTab(PagesStack);
// export const EventsWithTab = withBottomTab(EventsStack);
