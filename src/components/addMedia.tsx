import { launchImageLibrary } from 'react-native-image-picker';
import { uploadData } from '@aws-amplify/storage';

const mediaPicker = async () => {
  const result = await launchImageLibrary({
    mediaType: 'mixed',
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
    const fileType = file.type || (file.fileName.endsWith('.mp4') ? 'video/mp4': 'image/jpeg');
    const response = await fetch(file.uri);
    const blob = await response.blob(); 

    let extension = file.fileName?.split('.').pop() || (fileType.includes('video') ? 'mp4' : 'jpg')
    const key = filename ? filename + extension : `media-${Date.now()}.${extension}`;

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