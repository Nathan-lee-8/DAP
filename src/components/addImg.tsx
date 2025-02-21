import { launchImageLibrary } from "react-native-image-picker";
import { uploadData } from "@aws-amplify/storage";

const imagePicker = async () => { 
  const result = await launchImageLibrary({
    mediaType: 'photo',
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

const getImgURI = async ( fileURI: string, filename: string) => {
  try{
    const fileType = 'image/jpeg';
    const response = await fetch(fileURI);
    const arrayBuffer = await response.arrayBuffer();

    const uploadResult = await uploadData({
      path: filename,
      data: arrayBuffer,
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

export  { getImgURI, imagePicker };