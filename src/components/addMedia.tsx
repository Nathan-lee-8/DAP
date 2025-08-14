import { launchImageLibrary } from 'react-native-image-picker';
import { uploadData } from '@aws-amplify/storage';
import { Video } from 'react-native-compressor';
import { Alert } from 'react-native';

/**
 * Open users Media library and allows user to select an image or video. Limits 
 * videos to 30s and compresses if necessary.
 * 
 * @returns file object of selected image/video
*/ 
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

  if(file.duration && file.duration > 30){
    Alert.alert('Max video length is 30 seconds');
    return null;
  }
  if(file.fileName?.endsWith('.mp4') || file.type?.startsWith('video')){
    const compressedUri = await Video.compress(file.uri, {compressionMethod: 'auto'});
    if(compressedUri) file.uri = compressedUri;
  }

  return file;
}

/**
 * Stores media in S3
 * 
 * @param fileURI - URI of image/video to be uploaded
 * @param filename - Name of image/video to be uploaded
 * @returns path of image/video in S3
*/
const getMediaURI = async (file: any, filename: string) => {
  try{
    const fileType = file.type || (file.fileName.endsWith('.mp4') ? 
      'video/mp4': 'image/jpeg');
    const response = await fetch(file.uri);
    const blob = await response.blob(); 

    let extension = file.fileName?.split('.').pop() || 
      (fileType.includes('video') ? 'mp4' : 'jpg');
    const key = `${filename}.${extension}`;

    const uploadResult = await uploadData({
      path: key,
      data: blob,
      options: {
        contentType: fileType,
      },
    }).result;

    return `https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/${uploadResult.path}`;
  } catch {
    return null;
  }
};


export { mediaPicker, getMediaURI };