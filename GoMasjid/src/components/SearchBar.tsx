import React from "react";
import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { searchBarStyles } from "../styles/masjids/searchBarStyles"; // import styles


const GOOGLE_API_KEY = 'AIzaSyCiTTGycmjIVUlPmYVG30Bsf-Ntm4UrbcQ';

interface SearchBarProps {
  fetchMasjidDB: (data: any) => Promise<any>;
  setSearchMasjids: (data: any) => void;
  setSearchMasjidData: (val: boolean) => void;
  setSearchVisible: (val: boolean) => void;
  setSearchErrMsg: (msg: string | null) => void;
  setErrorMessage: (msg: string | null) => void;
}

const SearchBar = ({
  fetchMasjidDB,
  setSearchMasjids,
  setSearchMasjidData,
  setSearchVisible,
  setSearchErrMsg,
  setErrorMessage,
}: SearchBarProps) => {
  const handlePlaceSelect = async (data: any, details: any = null) => {
    if (!details?.geometry?.location) {
      setSearchVisible(false);
      setSearchMasjidData(false);
      setSearchErrMsg("No details received for the selected place.");
      return;
    }

    const payload = {
      name: details.name,
      address: details.formatted_address || "",
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      url: details.url || "",
    };

    const masjid = await fetchMasjidDB(payload);
    console.log("Fetched Masjid:", masjid);

    setSearchVisible(false);
    setErrorMessage(null);

    if (masjid) {
      setSearchMasjids(masjid);
      setSearchMasjidData(true);
      setSearchErrMsg(null);
    } else {
      setSearchMasjidData(false);
      setSearchErrMsg(`${details.name} not registered with GoMasjid.`);
    }
  };

  return (
    <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
      <GooglePlacesAutocomplete
        placeholder="Search mosque or masjid"
        minLength={2}
        fetchDetails={true}
        debounce={300}
        enablePoweredByContainer={false}
        keyboardShouldPersistTaps="always"
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
          keyword: "mosque",
        }}
        predefinedPlaces={[]}
        textInputProps={{
          placeholderTextColor: "#999",
        }}
        onFail={(err) => console.log("Places API Error:", err)}
        onNotFound={() => setSearchErrMsg("No Masjid found")}
        onPress={handlePlaceSelect}
        styles={searchBarStyles}
      />
    </View>
  );
};

export default SearchBar;
