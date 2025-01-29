import FastImage from 'react-native-fast-image';

const ProfilePicture = ({ uri, size, style } : {uri?: string; size: number, style?: any}) => {
    const defaultImage = require('../../images/DefaultAvatar.jpg');

    const getStyle = () => {
      if(style) return style;
      return {
            width: size,
            height: size,
            borderRadius: size / 2,
      };
    };
  
    return (
      <FastImage
        style={getStyle()}
        source={uri ? { uri: uri, priority: FastImage.priority.normal } : defaultImage}
        resizeMode={FastImage.resizeMode.cover}
      />
    );
};

export default ProfilePicture;