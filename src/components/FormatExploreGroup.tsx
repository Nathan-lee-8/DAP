import { View, Text } from "react-native";
import styles from "../styles/Styles";
import ImgComponent from "./ImgComponent";
import LinearGradient from 'react-native-linear-gradient';

const FormatExploreGroup = ( {item} : any ) => {
  return (  
    <View style={styles.exploreGroupContainer}>
      <Text numberOfLines={6} style={styles.exploreDescription}>{item.description}</Text>
      <ImgComponent uri={item.groupURL} style={styles.exploreImg}/>
      <LinearGradient
        colors={['rgba(231, 229, 229, 0.94)', 'rgba(51, 47, 47, 0.1)', 'rgba(0,0,0,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
      <Text numberOfLines={1} style={styles.exploreTitle}>{item.groupName}</Text>
      <Text style={styles.exploreMembers}>{item.memberCount} Members</Text>
    </View>
  )
};

export default FormatExploreGroup;