import AsyncStorage from '@react-native-async-storage/async-storage';

export const setFontSize = (key: any, value: any) => {
  AsyncStorage.getItem('settings').then((data: any) => {
    let asyncData = JSON.parse(data) || {};
    console.log('async data++', asyncData);

    asyncData[key] = value;
    console.log('vslu', asyncData);

    AsyncStorage.setItem('settings', JSON.stringify(asyncData));
  });
};

export const storeBookmarkData = (verse_data: any) => {
  console.log('verse_data service1', verse_data);
  
  AsyncStorage.getItem('quran_bookmarks').then((data: any) => {
    let asyncData = JSON.parse(data) || [];
    console.log("asyn");
    console.log(asyncData);

    // Check if the bookmark already exists
    const bookmarkExists = asyncData.some(
      (x: any) => x.verse_key === verse_data.verse_key
    );

    if (!bookmarkExists) {
      // Add the new bookmark if it doesn't exist
      asyncData.push(verse_data);
      AsyncStorage.setItem('quran_bookmarks', JSON.stringify(asyncData));
    }
  });

  return 'after';
};

export const removeQuranBookmarkData = async (verse_data: any) => {
  // console.log('verse_data service', verse_data);
  await AsyncStorage.getItem('quran_bookmarks').then((data: any) => {
    let asyncData = JSON.parse(data) || [];
    const newVar = [...asyncData];
    let verse = newVar.findIndex(
      (x: any) => x.verse_key == verse_data.verse_key,
    );
    if (verse > -1) {
      newVar.splice(verse, 1);
    }
    AsyncStorage.setItem('quran_bookmarks', JSON.stringify(newVar));
    return newVar;
  });
  // return 'ts';
};

export const storeLastReadAyah = (verse_data: any) => {
  // console.log('storeLastReadAyah', verse_data);
  AsyncStorage.setItem('LastReadAyah', JSON.stringify(verse_data));   
  return 'after';
};
export const storeDuaBookmarkData = (dua_data: any) => {
  // console.log('bookmark service', dua_data);
  AsyncStorage.getItem('Dua_bookmark').then((data: any) => {
    let asyncData = JSON.parse(data) || [];
    if (asyncData && asyncData.length > 0) {

      let DuaBook = asyncData.find(
        (x: any) => x.duaId == dua_data.duaId && x.duaCat == dua_data.duaCat && x.duaSubCat == dua_data.duaSubCat
      );
      if (!DuaBook) {
        asyncData.push(dua_data);
      }
    } else {
      asyncData.push(dua_data);
    }
    // console.log('verse_data service', asyncData);
    AsyncStorage.setItem('Dua_bookmark', JSON.stringify(asyncData));
  });
};

export const storeFavouriteMasjidsData = (
  Favourite_data: any,
  // userId: String,
  // userName: String,
) => {
  // const {userInfo} = useContext(UserContext);

  console.log('Favourite_Masjids_Data', Favourite_data);
  const masjid_id = Favourite_data.id;
  console.log(masjid_id)

  // AsyncStorage.getItem('Favourite_Masjid').then((data: any) => {
  //   let asyncData = JSON.parse(data) || [];
  //   if (asyncData && asyncData.length > 0) {
  
  //     const FavouriteMasjidExists = asyncData.some(
  //       (x: any) => x.id === masjid_id
  //     );

  //     if (!FavouriteMasjidExists) {
  //       // Add the new Favourite_Masjid if it doesn't exist
  //       asyncData.push(Favourite_data);
  //       }
  //   } else {
  //     asyncData.push(Favourite_data);
  //   }
  //   AsyncStorage.setItem('Favourite_Masjid', JSON.stringify(asyncData));
      
  // });   


  
  AsyncStorage.getItem('Favourite_Masjid').then((data: any) => {
    let asyncData = JSON.parse(data) || [];
  
    if (Array.isArray(asyncData)) {
      const index = asyncData.findIndex((x: any) => x.id === masjid_id);
  
      if (index !== -1) {
        // Update the existing entry
        asyncData[index] = Favourite_data;
      } else {
        // Add new entry if not found
        asyncData.push(Favourite_data);
      }
    } else {
      asyncData = [Favourite_data];
    }
  
    AsyncStorage.setItem('Favourite_Masjid', JSON.stringify(asyncData));
  });
  
};

export const removeFavouriteMasjidsData = async (
  Favourite_data: any,
) => {
  // console.log('verse_data service', verse_data);
  // await AsyncStorage.getItem('Favourite_Masjid').then((data: any) => {
  //   let asyncData = JSON.parse(data) || [];
  //   const newVar = [...asyncData];
  //   let masjid = newVar.findIndex(
  //     (x: any) => x.id == Favourite_data.id,
  //   );
  //   if (masjid > -1) {
  //     newVar.splice(masjid, 1);
  //   }
  //   AsyncStorage.setItem('Favourite_Masjid', JSON.stringify(newVar));
  //   return newVar;
  // });
  try {
    const data = await AsyncStorage.getItem('Favourite_Masjid');
    const asyncData = data ? JSON.parse(data) : [];

    const updatedData = asyncData.filter(
      (item: any) => item.id !== Favourite_data.id
    );

    await AsyncStorage.setItem('Favourite_Masjid', JSON.stringify(updatedData));
    
    return updatedData;
  } catch (error) {
    console.error('Error removing favourite masjid:', error);
    return [];
  }
};
export const removeDuaBookMark = (bookmarkData: any) => {

  AsyncStorage.getItem('Dua_bookmark').then((data: any) => {
    let asyncData = JSON.parse(data) || [];

    if (asyncData && asyncData.length > 0) {

      let DuaBook = asyncData.find(
        (x: any) => x.duaId == bookmarkData.duaId && x.duaCat == bookmarkData.duaCat && x.duaSubCat == bookmarkData.duaSubCat
      );
      if (DuaBook) {
        asyncData.splice(bookmarkData, 1);
      }
    } 
    AsyncStorage.setItem('Dua_bookmark', JSON.stringify(asyncData));
  });
};  

export const storeZakatData = async (zakat: any, editIndex: number) => {
  // console.log('zakattttttt', zakat);
  // let data = [];
  let arrayData: any = [];
  try {
    console.log('i am check', editIndex);
    const asyncData = await AsyncStorage.getItem('ZakatHistory'); //then((data: any) => {
    if (asyncData) {
      let data = JSON.parse(asyncData);
      // let arrayData= [];
      if (Array.isArray(data)) {
        if (editIndex > -1) {
          data[editIndex] = zakat;
          console.log('i am index', editIndex);
        } else {
          data.push(zakat);
        }
        console.log('zakat', data);
      } else {
        data = [zakat];
      }
      //   arrayData = [...data, zakat];
      // } else if (data) {
      //   arrayData.push(data, zakat);
      // }
      // arrayData.push(zakat);
      // console.log('zakatttt', [zakat]);
      console.log('dataaaaaaaaaa', data);
      AsyncStorage.setItem('ZakatHistory', JSON.stringify(data));
      // data = JSON.parse(asyncData);
      // if (Array.isArray(data)) {
      //   arrayData = data.push(zakat);
      // }
    } else {
      AsyncStorage.setItem('ZakatHistory', JSON.stringify([zakat]));
    }
    // AsyncStorage.setItem('ZakatHistory', JSON.stringify(arrayData));
    // console.log('zakathistory', zakat);

    // return arrayData;
    //});
  } catch (error) {
    console.error('Error saving zakat data:', error);
  }
};
