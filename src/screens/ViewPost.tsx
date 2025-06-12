import { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import client from '../client';
import { getPost } from '../customGraphql/customQueries';
import { Post } from '../API';

import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import FormatPost from '../components/FormatPost';
import Comments from '../components/ListComments';

const ViewPost = ( {route} : any) => {
  const postID = route.params.postID;
  const [postData, setPostData] = useState<Post>();
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

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
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };
  
  useEffect(() => {
    fetchPost();
  }, [postID]);

  const header = () => {
    return (
      <View style={{marginBottom: 5}}>
        {postData && <FormatPost post={postData} destination={'ViewPost'}/>}
      </View> 
    )
  }

  return (
    <View style={styles.container}>
      <Comments postID={postID} header={header} customPadding={80}/>
    </View>
  )
}

export default ViewPost;