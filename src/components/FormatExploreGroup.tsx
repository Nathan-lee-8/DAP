import { useContext, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Dimensions, Alert, 
  Modal } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GlobalParamList } from "../types/rootStackParamTypes";

import client from "../client";
import { deletePost, deleteComment } from "../customGraphql/customMutations";
import { Post } from "../API";

import { AuthContext } from "../context/AuthContext";
import moment from "moment";
import styles from "../styles/Styles";
import ImgComponent from "./ImgComponent";
import Icon from "@react-native-vector-icons/ionicons";

const FormatExploreGroup = (item: any) => {
  return (  
    <View>

      <Text> {item.id}</Text>
    </View>
  )
};

export default FormatExploreGroup;