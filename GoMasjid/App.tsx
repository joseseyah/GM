import React from 'react';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigation from './src/AppNavigation';

import { SettingsProvider } from './src/context/SettingsProvider';
import { ThemeProvider } from './src/context/ThemeProvider';
import { UserProvider } from './src/context/UserProvider';
import { SidebarVisibilityProvider } from './src/context/SidebarContext';

import QiblaSheet from './src/screens/HomeScreens/qibla';
import { registerSheet, SheetProvider } from 'react-native-actions-sheet';
import MoreSheet from './src/screens/Masjid/MoreSheet';
import ViewGallery from './src/screens/Masjid/ViewGallery';
import ClaimMasjidSheet from './src/screens/Masjid/ClaimMasjidSheet';
import EditFacilitiesSheet from './src/screens/MasjidAdmin/EditFacilitiesSheet';
import EditSalahSheet from './src/screens/MasjidAdmin/EditSalahSheet';
import UpdateSalahTimeSheet from './src/screens/MasjidAdmin/UpdateSalahTimeSheet';
import UpdatemasjidInfoSheet from './src/screens/MasjidAdmin/UpdatemasjidInfoSheet';
import SearchSheet from './src/screens/Search/search';

// ✅ Register bottom sheets
registerSheet('qibla_sheet', QiblaSheet);
registerSheet('more_sheet', MoreSheet);
registerSheet('view_gallery_sheet', ViewGallery);
registerSheet('claim_masjid_sheet', ClaimMasjidSheet);
registerSheet('edit_facilities_sheet', EditFacilitiesSheet);
registerSheet('salah_times_sheet', EditSalahSheet);
registerSheet('upload_salah_times_sheet', UpdateSalahTimeSheet)
registerSheet('update_masjid_info_sheet', UpdatemasjidInfoSheet)
registerSheet('search_sheet', SearchSheet)


// ✅ Ignore warning logs
LogBox.ignoreLogs([
  'Support for defaultProps will be removed from function components in a future major release',
]);

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      {/* ✅ Moved SheetProvider *inside* the context providers */}
      <UserProvider>
        <SettingsProvider>
          <ThemeProvider>
            <SidebarVisibilityProvider>
              <SheetProvider>
                <AppNavigation />
              </SheetProvider>
            </SidebarVisibilityProvider>
          </ThemeProvider>
        </SettingsProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}

export default App;
