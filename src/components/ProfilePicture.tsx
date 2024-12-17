import FastImage from 'react-native-fast-image';

const ProfilePicture = ({ uri, size } : {uri?: string; size: number}) => {
    const defaultImage = require('../../images/DefaultAvatar.jpg'); // Replace with your default image path
  
    return (
      <FastImage
        style={{ width: size, height: size, borderRadius: size / 2 }}
        source={uri ? { uri: uri, priority: FastImage.priority.normal } : defaultImage}
        resizeMode={FastImage.resizeMode.cover}
      />
    );
};

export default ProfilePicture;