import { RNS3 } from 'react-native-aws3';

const accessKeyId = "AKIA4RCAOVDBFY25PBHJ";
const secretAccessKey = "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";
const region = "us-east-1";
const bucket = "gomasjid1";

export const uploadImage = async (file: {fileName: any; uri: any; type: any;}, masjidId: number ) => {
  
  const options = {
    keyPrefix: `masjids/${masjidId}/`,
    bucket: `${bucket}`,
    region: `${region}`, 
    accessKey: `${accessKeyId}`,
    secretKey: `${secretAccessKey}`,
    successActionStatus: 201
  };

  try {
    const response = await RNS3.put({
      uri: file.uri,
      name: file.fileName,
      type: file.type
    }, options);

    if (response.status === 201) {
      // console.log("Successfully uploaded:", response.body.postResponse.location);
      const decodedUrl = decodeURIComponent(response.body.postResponse.location);
      console.log("Decoded URL:", decodedUrl);
      return decodedUrl;
    } else {
      console.error("Failed to upload image with status", response.status);
      throw new Error("Failed to upload image");
    }
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

export const uploadProfileImage = async (file: {fileName: any; uri: any; type: any;} ) => {
  
  const options = {
    keyPrefix: `profiles/`,
    bucket: `${bucket}`,
    region: `${region}`, 
    accessKey: `${accessKeyId}`,
    secretKey: `${secretAccessKey}`,
    successActionStatus: 201
  };

  try {
    const response = await RNS3.put({
      uri: file.uri,
      name: file.fileName,
      type: file.type
    }, options);

    if (response.status === 201) {
      // console.log("Successfully uploaded:", response.body.postResponse.location);
      const decodedUrl = decodeURIComponent(response.body.postResponse.location);
      console.log("Decoded URL:", decodedUrl);
      return decodedUrl;
    } else {
      console.error("Failed to upload image with status", response.status);
      throw new Error("Failed to upload image");
    }
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

// AWS.config.update({
//   accessKeyId: "AKIA4RCAOVDBFY25PBHJ",
//   secretAccessKey: "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",
//   region: "us-east-1",
// });

// const s3 = new AWS.S3();
// import AWS from "aws-sdk";
// import RNFS from "react-native-fs";
// import RNFetchBlob from "react-native-blob-util";
// import { Platform } from "react-native";
// export const uploadImage = async (file: {fileName: any; uri: any; type: any;}, masjidId: number ) => {
  
//   const fileContent = await RNFS.readFile(
//     Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
//     'base64'
//   );

//   // console.log("binaryData", fileContent);
//   const params = {
//     Bucket: "gomasjid1",
//     Key: `masjids/${masjidId}/${file.fileName}`,
//     Body: fileContent,
//     ContentEncoding: "base64",
//     ContentType: file.type,
//   };

//   try {
//     const { Location } = await s3.upload(params).promise();
//     console.log("Uploaded to S3:", Location);
//     return Location;
//   } catch (error) {
//     console.error("Upload failed", error);
//   }
// };