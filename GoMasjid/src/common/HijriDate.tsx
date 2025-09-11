import moment from 'moment-hijri';

const hijriMonthNames = [
  'Muh.',       // 1
  'Saf.',       // 2
  'Rab. I',     // 3
  'Rab. II',    // 4
  'Jmd. I',     // 5
  'Jmd. II',    // 6
  'Raj.',       // 7
  'Sha.',       // 8
  'Ram.',       // 9
  'Shw.',       // 10
  'Qid.',       // 11
  'Hij.'        // 12
];

const hijri = moment();
const day = hijri.iDate();
const month = hijriMonthNames[hijri.iMonth()];
const year = hijri.iYear();

export const formattedHijri = `${day} ${month} ${year} AH`;