import { PrayerTimes, Coordinates, CalculationMethod, Madhab } from "adhan";
import moment from "moment";

export interface SalahTiming {
  name: string;
  azan: string;
}

export interface CalculatedPrayerTimes {
  salahTimings: SalahTiming[];
  sunrise: string;
  midnight: string;
  lastThird: string;
}

export const getLocalPrayerTimes = (
  latitude: number,
  longitude: number,
  date: Date = new Date()
): CalculatedPrayerTimes => {
  const coordinates = new Coordinates(latitude, longitude);
  const params = CalculationMethod.MuslimWorldLeague();
  params.madhab = Madhab.Shafi;

  const times = new PrayerTimes(coordinates, date, params);

  const format = (d: Date) => moment(d).format("HH:mm");

  const maghribTime = moment(times.maghrib);
  const fajrTomorrow = moment(new PrayerTimes(coordinates, moment(date).add(1, 'day').toDate(), params).fajr);

  const nightDuration = fajrTomorrow.diff(maghribTime);
  const midnightMoment = maghribTime.clone().add(nightDuration / 2);
  const lastThirdMoment = maghribTime.clone().add((nightDuration * 2) / 3);

  return {
    salahTimings: [
      { name: "fajr", azan: format(times.fajr) },
      { name: "zuhr", azan: format(times.dhuhr) },
      { name: "asr", azan: format(times.asr) },
      { name: "maghrib", azan: format(times.maghrib) },
      { name: "isha", azan: format(times.isha) },
    ],
    sunrise: format(times.sunrise),
    midnight: format(midnightMoment.toDate()),
    lastThird: format(lastThirdMoment.toDate()),
  };
};
