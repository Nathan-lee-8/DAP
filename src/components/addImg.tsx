import { launchImageLibrary } from "react-native-image-picker";
import { uploadData } from "@aws-amplify/storage";

const getImgURI = async ( filename: string) => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.didCancel || result.errorCode) {
        return null;
      }
      const file = result.assets?.[0];
      if (!file || !file.uri) {
        return null;
      }

      const fileType = file.type || 'image/jpeg'; // Default to 'image/jpeg' if type is missing
      const response = await fetch(file.uri);
      const arrayBuffer = await response.arrayBuffer();

      const uploadResult = await uploadData({
        path: `public/${filename}`,
        data: arrayBuffer,
        options: {
          contentType: fileType,
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              console.log(
                `Upload progress ${
                  Math.round((transferredBytes / totalBytes) * 100)
                } %`
              );
            }
          },
        },
      }).result;
      return uploadResult.path;
    } catch (error) {
      return null;
    }
};

export default getImgURI;