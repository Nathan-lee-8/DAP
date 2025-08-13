import { useState } from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from '../styles/Styles';

/**
 * Recieves a uri and returns an image component with default images if uri fails. Applies 
 * custom style with a default style if not provided and applies a resize mode if specified
 * 
 * @param uri - The S3 filepath of the given image
 * @param style - The style of the image
 * @param resizeMode - The resize mode of the image 
 */
const ImgComponent = ( {uri, style, resizeMode} : {uri: string; style?: any; resizeMode? : any} ) => {
  const [ error, setError ] = useState(false);
  if(error) uri = 'defaultUser';
  const getStyle = () => {
    if(style) return style;
    return { width: 30, height: 30, borderRadius: 15 };
  };
  const prefix = uri.startsWith('https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/public/') 
    ? uri.split('public/')[1].split('/')[0] : '';
  var filepath = require('../../images/DefaultAvatar.jpg');

  if(uri === "defaultUser"){
    filepath = require('../../images/DefaultAvatar.jpg');
  }else if(uri === "defaultGroup"){
    filepath = require('../../images/groupAvatar.jpg');
  }else if(uri === "logo"){
    filepath = require('../../images/dapLogo.jpg');
  } else if(prefix === 'processing' || prefix === 'quarantine'){
    filepath = require('../../images/groupAvatar.jpg')
  } else {
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
    <View>
      <FastImage
        style={getStyle()}
        source={filepath}
        resizeMode={FastImage.resizeMode.cover}
      />
      {prefix === 'quarantine' ? (
        <View style={styles.overlay}>
          <Text style={styles.processingText}>Flagged</Text> 
        </View>
      ) : prefix === 'processing' ? (
        <View style={styles.overlay}>
          <Text style={styles.processingText}>Processing</Text>
        </View>
      ) : (null)}
    </View>
  );
};

export default ImgComponent;