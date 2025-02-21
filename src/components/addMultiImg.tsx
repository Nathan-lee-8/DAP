import * as ImagePicker from 'expo-image-picker';

const getMultiImgURIs = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'images',
    allowsMultipleSelection: true,
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets.map(asset => asset.uri);
  } 
  return null;
}

export default getMultiImgURIs;