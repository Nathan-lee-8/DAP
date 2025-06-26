import { View, Text } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Group } from "../API";
import styles from "../styles/Styles";
import ImgComponent from "./ImgComponent";


/**
 * Displays the given group in block format to display in the explore group section
 * 
 * @param group - The Group to display
 */
const FormatExploreGroup = ( {group} : {group: Group} ) => {
  if(!group) return;
  return (  
    <View style={styles.exploreGroupContainer}>
      <Text numberOfLines={6} style={styles.exploreDescription}>{group.description}</Text>
      <ImgComponent uri={group.groupURL || 'defaultGroup'} style={styles.exploreImg}/>
      <LinearGradient
        colors={['rgba(231, 229, 229, 0.94)', 'rgba(51, 47, 47, 0.1)', 'rgba(0,0,0,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
      <Text numberOfLines={1} style={styles.exploreTitle}>{group.groupName}</Text>
      <Text style={styles.exploreMembers}>{group.memberCount} Members</Text>
    </View>
  )
};

export default FormatExploreGroup;