import { useContext, useEffect, useState } from 'react';
import { View, Alert } from 'react-native';

import client from '../client';
import { getPost } from '../customGraphql/customQueries';
import { Post } from '../API';

import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import FormatPost from '../components/FormatPost';
import Comments from '../components/ListComments';

/**
 * Displays the currnet post and it's comments in a full page view
 * 
 * @param postID - The ID of the post to view 
 */
const ViewPost = ( {route} : any) => {
  const postID = route.params.postID;
  const [postData, setPostData] = useState<Post>();
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

  useEffect(() => {
    fetchPost();
  }, [postID]);

  //Retreives and sets the current post
  const fetchPost = async () => {
    try {
      const { data } = await client.graphql({
        query: getPost,
        variables: { 
          id: postID 
        },
        authMode: 'userPool'
      });
      if(data.getPost) setPostData(data.getPost);
    } catch {
      Alert.alert('Error', 'Failed to fetch post');
    }
  };

  //header component for the current post (the post itself)
  const header = () => {
    return (
      <View style={{marginBottom: 5}}>
        {postData && <FormatPost post={postData} destination={'ViewPost'}/>}
      </View> 
    )
  }

  //The commments of the post with the header included to ensure header scorlls
  return (
    <View style={styles.container}>
      <View style={styles.header}/>
      <Comments postID={postID} header={header} customPadding={80}/>
    </View>
  )
}

export default ViewPost;