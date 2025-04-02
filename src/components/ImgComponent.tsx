import { useState } from 'react';
import FastImage from 'react-native-fast-image';

const ImgComponent = ({ uri, style, resizeMode} : {uri: string; style?: any; resizeMode? : any}) => {
  const [error, setError] = useState(false);
  if(error) uri = 'defaultUser';
  const getStyle = () => {
    if(style) return style;
    return { width: 30, height: 30, borderRadius: 15 };
  };

  var filepath = require('../../images/DefaultAvatar.jpg');

  if(uri === "defaultUser"){
    filepath = require('../../images/DefaultAvatar.jpg');
  }else if(uri === "defaultGroup"){
    filepath = require('../../images/groupAvatar.jpg');
  }else if(uri === "logo"){
    filepath = require('../../images/dapLogo.jpg');
  }else{
    return (
      <FastImage
        style={getStyle()}
        source={{ uri: uri, priority: FastImage.priority.normal }}
        resizeMode={resizeMode === 'contain' ? FastImage.resizeMode.contain : FastImage.resizeMode.cover}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <FastImage
      style={getStyle()}
      source={filepath}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

export default ImgComponent;