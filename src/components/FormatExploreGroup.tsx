import { View, Text } from "react-native";
import { useState } from "react";
import LinearGradient from 'react-native-linear-gradient';
import { Group } from "../API";
import styles from "../styles/Styles";
import ImgComponent from "./ImgComponent";
import Icon from "@react-native-vector-icons/ionicons";


/**
 * Displays the given group in block format to display in the explore group section
 * 
 * @param group - The Group to display
 */
const FormatExploreGroup = ( {group} : {group: Group} ) => {
  const [ showDescription, setShowDescription ] = useState(false); 

  if(!group) return;
  return (  
    <View style={styles.exploreGroupContainer}>
      <Icon name={showDescription ? "return-down-back" : "information-circle-outline"}
        style={styles.showDescriptionIcon} 
        size={20}
        onPress={() => setShowDescription(!showDescription)}
      />
      { showDescription ? (
        <Text numberOfLines={6} style={styles.exploreDescription}>{group.description}</Text>
      ) : (
        <ImgComponent uri={group.groupURL || 'defaultGroup'} style={styles.exploreImg}/>
      )}
      <Text numberOfLines={1} style={styles.exploreTitle}>{group.groupName}</Text>
      <Text style={styles.exploreMembers}>{group.memberCount} Members</Text>
    </View>
  )
};

export default FormatExploreGroup;