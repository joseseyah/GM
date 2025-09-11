import {Share} from 'react-native';

export const handleShare = async (title: string, url: any, message: string) => {
  try {
    const result = await Share.share({
      title,
      url,
      message,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log(`Shared via ${result.activityType}`);
      } else {
        console.log('Shared');
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('Dismissed');
    }
  } catch (error) {
    console.error(error);
  }
};

// export const signOut = async (
//   userInfo: {emailAddress: any},
//   navigation: any,
// ) => {
//   userInfo.emailAddress && (await auth().signOut());

//   AsyncStorage.setItem('userInfo', JSON.stringify(''));

//   navigation.reset({
//     index: 0,
//     routes: [{name: 'AuthStack'}],
//   });
// };
