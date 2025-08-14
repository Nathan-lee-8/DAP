import { launchImageLibrary } from "react-native-image-picker";
import { uploadData } from "@aws-amplify/storage";
import { Alert } from "react-native";

/**
 * Open users image library and allows user to select an image
 * 
 * @returns URI of the image
*/ 
const imagePicker = async () => { 
  const result = await launchImageLibrary({
    mediaType: 'photo',
    presentationStyle:'fullScreen',
    quality: 0.8,
  });

  if (result.didCancel || result.errorCode) {
    return null;
  }
  const file = result.assets?.[0];
  if (!file?.uri) {
    return null;
  }
  return file.uri;
}

/**
 * Stores image in S3
 * 
 * @param fileURI - URI of image to be uploaded
 * @param filename - Name of image to be uploaded
 * @returns path of image in S3
*/
const getImgURI = async (fileURI: string, filename: string) => {
  try{
    const fileType = 'image/jpeg';
    const response = await fetch(fileURI);
    const blob = await response.blob(); 

    const uploadResult = await uploadData({
      path: filename,
      data: blob,
      options: {
        contentType: fileType,
      },
    }).result;
    return `https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/${uploadResult.path}`;
  } catch {
    Alert.alert('Error', 'Failed to save image');
    return null;
  }
};

export  { getImgURI, imagePicker };