export interface Masjid {
    id: number;
    name: string;
    about: string;
    address: string;
    latitude: number;
    longitude: number;
    distance: string;
    verified: boolean;
    masjidLogo: string;
    is_primary: boolean;
    masjidImages: string[];
    masjidCoverImage: string;
    contact_numbers: string[];
    website: string;
    facilities: string[];
    prayerTimes: Array<{
      name: string;
      start: string;
      jamaat: string;
    }>;
    opening_hours: {
      openingTime: string;
      closingTime: string;
    };
    DonationInfo: [{
      bank_name: string;
      SortCode: string;
      AccountNumber: string;
    }];
    masjidInfo: {
      masjidfacilities: string[];
      PrayerTimes: {};
      events: {}[];
    };
    masjidImamInfo: {
      imam_id: number;
      name: string;
      image: string;
    };
  }
  