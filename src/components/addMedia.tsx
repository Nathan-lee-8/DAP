import { launchImageLibrary } from 'react-native-image-picker';
import { uploadData } from '@aws-amplify/storage';

const mediaPicker = async () => {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    presentationStyle: 'fullScreen',
    quality: 0.8,
  });

  if (result.didCancel || result.errorCode) {
    return null;
  }
  const file = result.assets?.[0];
  if (!file?.uri) {
    return null;
  }
  return file;
}

const getMediaURI = async (file: any, filename: string) => {
  try{
    const fileType = file.type || 'image/jpeg';
    const response = await fetch(file.uri);
    const blob = await response.blob(); 

    const key = filename || file.fileName || `media-${Date.now()}.jpg`;

    const uploadResult = await uploadData({
      path: key,
      data: blob,
      options: {
        contentType: fileType,
      },
    }).result;

    return uploadResult.path;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export { mediaPicker, getMediaURI };