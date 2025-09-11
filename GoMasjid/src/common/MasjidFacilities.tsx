import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export interface Facility {
  [key: string]: {
    label: string;
    component: React.ReactElement;
  };
}

export const MasjidFacilities: Facility = {
  FemalePrayingArea: {
    label: "Women's Prayer Area",
    component: <FontAwesome5 name="female" />,
  },
  PrayerHall: {
    label: "Main Prayer Hall",
    component: <FontAwesome5 name="mosque" />,
  },
  AblutionArea: {
    label: "Ablution Area",
    component: <MaterialCommunityIcons name="water-pump" />,
  },
  Toilets: {
    label: "Toilets",
    component: <FontAwesome5 name="restroom" />,
  },
  MinbarMihrab: {
    label: "Minbar & Mihrab",
    component: <FontAwesome5 name="kaaba" />,
  },
  AdhanSystem: {
    label: "Adhan System",
    component: <FontAwesome5 name="broadcast-tower" />,
  },
  Library: {
    label: "Islamic Library",
    component: <FontAwesome5 name="book" />,
  },
  EducationalCentre: {
    label: "Educational Centre",
    component: <FontAwesome5 name="chalkboard-teacher" />,
  },
  Madrasa: {
    label: "Islamic Classes",
    component: <FontAwesome5 name="book-open" />,
  },
  NikahServices: {
    label: "Nikah Services",
    component: <FontAwesome5 name="heart" />,
  },
  FuneralServices: {
    label: "Funeral Services",
    component: <FontAwesome5 name="hands-helping" />,
  },
  CommunityHall: {
    label: "Community Hall",
    component: <FontAwesome5 name="users" />,
  },
  ZakatCollection: {
    label: "Charity Collection",
    component: <FontAwesome5 name="donate" />,
  },
  FoodBank: {
    label: "Food Bank",
    component: <FontAwesome5 name="utensils" />,
  },
  CounselingServices: {
    label: "Counselling Services",
    component: <FontAwesome5 name="user-md" />,
  },
  ChildrenPlayArea: {
    label: "Children's Play Area",
    component: <FontAwesome5 name="child" />,
  },
  Parking: {
    label: "Parking Area",
    component: <FontAwesome5 name="parking" />,
  },
  Cafeteria: {
    label: "Cafeteria",
    component: <FontAwesome5 name="coffee" />,
  },
  LiveStreaming: {
    label: "Online Services",
    component: <FontAwesome5 name="video" />,
  },
  DisabledAccess: {
    label: "Accessible Facilities",
    component: <FontAwesome5 name="wheelchair" />,
  },
  JummahPrayers: {
    label: "Jummah Prayer",
    component: <FontAwesome5 name="calendar-day" />,
  },
};
