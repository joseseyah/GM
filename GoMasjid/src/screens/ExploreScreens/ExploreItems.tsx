import QuranImg from '../../assets/images/exploreQuran.png';
import mosqueImg from '../../assets/images/homeMasjid.png';
import DuaImg from '../../assets/images/ReadDua.png';
import QiblaImg from '../../assets/images/QiblaIcon.png';
import askImamImg from '../../assets/images/Imamicon.png';
import ZakaatImg from '../../assets/images/Zakaat.png';
import RestaurantsImg from '../../assets/images/RestaurantIcon.png';
import EventsImg from '../../assets/images/calender.png';
import AnnouncementImg from '../../assets/images/AnnouncementImg.png';

const ExploreItems = [
  {
    id: 1,
    title: 'Mosque',
    img: mosqueImg,
    stack: 'MasjidStack',
    screen: 'Masjid',
  },
  {
    id: 2,
    title: 'Quran',
    img: QuranImg,
    stack: 'QuranStack',
    screen: 'QuranDashboard',
  },
  {
    id: 3,
    title: 'Dua',
    img: DuaImg,
    stack: 'DuaStack',
    screen: 'DuaDashboard',
  },
  {
    id: 4,
    title: 'Qibla',
    img: QiblaImg,
    stack: 'PagesStack',
    screen: 'Qibla',
  },
  {
    id: 5,
    title: 'Events',
    img: EventsImg,
    stack: 'EventsStack',
    screen: 'EventDashboard',
  },
  {
    id: 6,
    title: 'Restaurants',
    img: RestaurantsImg,
    stack: 'ResturantStack',
    screen: 'Resturants',
  },
  {
    id: 7,
    title: 'Ask Imam',
    img: askImamImg,
    stack: 'AskImaamStack',
    screen: 'AskImamDashboard',
  },
  {
    id: 8,
    title: 'Zakaat',
    img: ZakaatImg,
    stack: 'ZakaatStack',
    screen: '',
  },
  {
    id: 9,
    title: 'Community',
    img: AnnouncementImg,
    stack: '',
    screen: '',
  },
];

export default ExploreItems;
