/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    email
    firstname
    lastname
    fullname
    profileURL
    description
    unreadChatCount
    unreadNotificationCount
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      email
      firstname
      lastname
      fullname
      profileURL
      description
      unreadChatCount
      unreadNotificationCount
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const userByEmail = /* GraphQL */ `query UserByEmail(
  $email: AWSEmail!
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  userByEmail(
    email: $email
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      email
      firstname
      lastname
      fullname
      profileURL
      description
      unreadChatCount
      unreadNotificationCount
      notificationSettings {
        id
        newPost
        joinGroup
        groupRequest
        newComment
        newReply
        newReplyComment
        newMessage
        joinChat
        userID
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserByEmailQueryVariables,
  APITypes.UserByEmailQuery
>;
export const getUserFeed = /* GraphQL */ `query GetUserFeed($id: ID!) {
  getUserFeed(id: $id) {
    id
    userID
    postID
    post {
      id
      content
      postURL
      groupID
      userID
      commentCount
      createdAt
      updatedAt
      userPostsId
      owner
      __typename
    }
    postCreatedAt
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserFeedQueryVariables,
  APITypes.GetUserFeedQuery
>;
export const listUserFeeds = /* GraphQL */ `query ListUserFeeds(
  $filter: ModelUserFeedFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserFeeds(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userID
      postID
      postCreatedAt
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserFeedsQueryVariables,
  APITypes.ListUserFeedsQuery
>;
export const postsByUserFeed = /* GraphQL */ `query PostsByUserFeed(
  $userID: ID!
  $postCreatedAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelUserFeedFilterInput
  $limit: Int
  $nextToken: String
) {
  postsByUserFeed(
    userID: $userID
    postCreatedAt: $postCreatedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      postID
      post {
        id
        content
        postURL
        groupID
        userID
        user{
          id
          email
          firstname
          lastname
          fullname
          profileURL
          description
          unreadChatCount
          unreadNotificationCount
          createdAt
          updatedAt
          owner
          __typename
        }
        group{
          id
          groupName
          nameLowercase
          groupURL
          description
          isPublic
          memberCount
          type
          createdAt
          updatedAt
          owner
          __typename
        }
        commentCount
        createdAt
        updatedAt
        userPostsId
        owner
        __typename
      }
      postCreatedAt
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PostsByUserFeedQueryVariables,
  APITypes.PostsByUserFeedQuery
>;
export const userFeedByPostID = /* GraphQL */ `query UserFeedByPostID(
  $postID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserFeedFilterInput
  $limit: Int
  $nextToken: String
) {
  userFeedByPostID(
    postID: $postID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      postID
      postCreatedAt
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserFeedByPostIDQueryVariables,
  APITypes.UserFeedByPostIDQuery
>;
export const getPost = /* GraphQL */ `query GetPost($id: ID!) {
  getPost(id: $id) {
    id
    content
    postURL
    groupID
    userID
    user {
      id
      email
      firstname
      lastname
      fullname
      profileURL
      description
      unreadChatCount
      unreadNotificationCount
      createdAt
      updatedAt
      owner
      __typename
    }
    comments{
      items{
        id
        content
        commentURL
        userID
        postID
        user {
          id
          email
          firstname
          lastname
          fullname
          profileURL
          description
          unreadChatCount
          unreadNotificationCount
          createdAt
          updatedAt
          owner
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    group {
      id
      groupName
      nameLowercase
      groupURL
      description
      isPublic
      memberCount
      type
      createdAt
      updatedAt
      owner
      __typename
    }
    commentCount
    createdAt
    updatedAt
    userPostsId
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetPostQueryVariables, APITypes.GetPostQuery>;
export const listPosts = /* GraphQL */ `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      postURL
      groupID
      userID
      commentCount
      createdAt
      updatedAt
      userPostsId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListPostsQueryVariables, APITypes.ListPostsQuery>;
export const postsByDate = /* GraphQL */ `query PostsByDate(
  $groupID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  postsByDate(
    groupID: $groupID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      content
      postURL
      groupID
      userID
      commentCount
      createdAt
      updatedAt
      userPostsId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PostsByDateQueryVariables,
  APITypes.PostsByDateQuery
>;
export const postsByUser = /* GraphQL */ `query PostsByUser(
  $userID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  postsByUser(
    userID: $userID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      content
      postURL
      groupID
      group{ 
        id
        groupName
        nameLowercase
        groupURL
        description
        isPublic
        memberCount
        type
        createdAt
        updatedAt
        owner
        __typename
      }
      userID
      commentCount
      createdAt
      updatedAt
      userPostsId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PostsByUserQueryVariables,
  APITypes.PostsByUserQuery
>;
export const getComment = /* GraphQL */ `query GetComment($id: ID!) {
  getComment(id: $id) {
    id
    content
    commentURL
    userID
    postID
    replies {
      nextToken
      __typename
    }
    user {
      id
      email
      firstname
      lastname
      fullname
      profileURL
      description
      unreadChatCount
      unreadNotificationCount
      createdAt
      updatedAt
      owner
      __typename
    }
    post {
      id
      content
      postURL
      groupID
      userID
      commentCount
      createdAt
      updatedAt
      userPostsId
      owner
      __typename
    }
    createdAt
    updatedAt
    userCommentsId
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCommentQueryVariables,
  APITypes.GetCommentQuery
>;
export const listComments = /* GraphQL */ `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      commentURL
      userID
      postID
      createdAt
      updatedAt
      userCommentsId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCommentsQueryVariables,
  APITypes.ListCommentsQuery
>;
export const commentsByUser = /* GraphQL */ `query CommentsByUser(
  $userID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  commentsByUser(
    userID: $userID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      content
      commentURL
      userID
      postID
      createdAt
      updatedAt
      userCommentsId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CommentsByUserQueryVariables,
  APITypes.CommentsByUserQuery
>;
export const commentsByPost = /* GraphQL */ `query CommentsByPost(
  $postID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  commentsByPost(
    postID: $postID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      content
      commentURL
      userID
      postID
      createdAt
      updatedAt
      userCommentsId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CommentsByPostQueryVariables,
  APITypes.CommentsByPostQuery
>;
export const getReply = /* GraphQL */ `query GetReply($id: ID!) {
  getReply(id: $id) {
    id
    content
    url
    userID
    commentID
    user {
      id
      email
      firstname
      lastname
      fullname
      profileURL
      description
      unreadChatCount
      unreadNotificationCount
      createdAt
      updatedAt
      owner
      __typename
    }
    comment {
      id
      content
      commentURL
      userID
      postID
      createdAt
      updatedAt
      userCommentsId
      owner
      __typename
    }
    createdAt
    updatedAt
    userRepliesId
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetReplyQueryVariables, APITypes.GetReplyQuery>;
export const listReplies = /* GraphQL */ `query ListReplies(
  $filter: ModelReplyFilterInput
  $limit: Int
  $nextToken: String
) {
  listReplies(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      url
      userID
      commentID
      createdAt
      updatedAt
      userRepliesId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRepliesQueryVariables,
  APITypes.ListRepliesQuery
>;
export const repliesByUser = /* GraphQL */ `query RepliesByUser(
  $userID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelReplyFilterInput
  $limit: Int
  $nextToken: String
) {
  repliesByUser(
    userID: $userID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      content
      url
      userID
      commentID
      createdAt
      updatedAt
      userRepliesId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.RepliesByUserQueryVariables,
  APITypes.RepliesByUserQuery
>;
export const repliesByComment = /* GraphQL */ `query RepliesByComment(
  $commentID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelReplyFilterInput
  $limit: Int
  $nextToken: String
) {
  repliesByComment(
    commentID: $commentID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      content
      url
      userID
      commentID
      createdAt
      updatedAt
      userRepliesId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.RepliesByCommentQueryVariables,
  APITypes.RepliesByCommentQuery
>;
export const getUserChat = /* GraphQL */ `query GetUserChat($id: ID!) {
  getUserChat(id: $id) {
    id
    unreadMessageCount
    lastMessage
    role
    active
    isMuted
    userID
    chatID
    user {
      id
      email
      firstname
      lastname
      fullname
      profileURL
      description
      unreadChatCount
      unreadNotificationCount
      createdAt
      updatedAt
      owner
      __typename
    }
    chat {
      id
      name
      url
      isGroup
      createdAt
      updatedAt
      owner
      __typename
    }
    lastMessageAt
    createdAt
    updatedAt
    userChatsId
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserChatQueryVariables,
  APITypes.GetUserChatQuery
>;
export const listUserChats = /* GraphQL */ `query ListUserChats(
  $filter: ModelUserChatFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      unreadMessageCount
      lastMessage
      role
      active
      isMuted
      userID
      chatID
      lastMessageAt
      createdAt
      updatedAt
      userChatsId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserChatsQueryVariables,
  APITypes.ListUserChatsQuery
>;
export const chatsByUser = /* GraphQL */ `query ChatsByUser(
  $userID: ID!
  $lastMessageAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelUserChatFilterInput
  $limit: Int
  $nextToken: String
) {
  chatsByUser(
    userID: $userID
    lastMessageAt: $lastMessageAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      unreadMessageCount
      lastMessage
      role
      active
      isMuted
      userID
      chatID
      lastMessageAt
      chat{
        id
        name
        url
        isGroup
        participants{
          items{
            id
            unreadMessageCount
            lastMessage
            role
            active
            isMuted
            userID
            user {
              id
              email
              firstname
              lastname
              fullname
              profileURL
              description
              unreadChatCount
              unreadNotificationCount
              createdAt
              updatedAt
              owner
              __typename
            }
            chatID
            lastMessageAt
            createdAt
            updatedAt
            owner
            __typename
          }
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      userChatsId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ChatsByUserQueryVariables,
  APITypes.ChatsByUserQuery
>;
export const userChatsByChatIDAndCreatedAt = /* GraphQL */ `query UserChatsByChatIDAndCreatedAt(
  $chatID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelUserChatFilterInput
  $limit: Int
  $nextToken: String
) {
  userChatsByChatIDAndCreatedAt(
    chatID: $chatID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      unreadMessageCount
      lastMessage
      role
      active
      isMuted
      userID
      chatID
      lastMessageAt
      createdAt
      updatedAt
      userChatsId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserChatsByChatIDAndCreatedAtQueryVariables,
  APITypes.UserChatsByChatIDAndCreatedAtQuery
>;
export const getChat = /* GraphQL */ `query GetChat( 
  $id: ID!
  $messagesLimit: Int,
  $messagesNextToken: String
) {
  getChat(id: $id) {
    id
    name
    url
    isGroup
    createdAt
    messages (limit: $messagesLimit, nextToken: $messagesNextToken, sortDirection: DESC) {
      items {
        id
        content
        msgURL
        senderID
        sender{
          id
          firstname
          lastname
          fullname
          email
          profileURL
          description
          unreadChatCount
          unreadNotificationCount
          createdAt
          updatedAt
          owner
          __typename
        }
        type
        chatID
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    participants {
      items{
        id
        unreadMessageCount
        lastMessage
        role
        active
        isMuted
        userID
        chatID
        user{
          id
          firstname
          fullname
          lastname
          email
          profileURL
          description
          unreadChatCount
          unreadNotificationCount
          createdAt
          updatedAt
          owner
          __typename
        }
        lastMessageAt
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetChatQueryVariables, APITypes.GetChatQuery>;
export const listChats = /* GraphQL */ `query ListChats(
  $filter: ModelChatFilterInput
  $limit: Int
  $nextToken: String
) {
  listChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      url
      isGroup
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListChatsQueryVariables, APITypes.ListChatsQuery>;
export const getMessage = /* GraphQL */ `query GetMessage($id: ID!) {
  getMessage(id: $id) {
    id
    content
    msgURL
    type
    senderID
    chatID
    sender {
      id
      email
      firstname
      lastname
      fullname
      profileURL
      description
      unreadChatCount
      unreadNotificationCount
      createdAt
      updatedAt
      owner
      __typename
    }
    chat {
      id
      name
      url
      isGroup
      createdAt
      updatedAt
      owner
      __typename
    }
    createdAt
    updatedAt
    userMessagesId
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMessageQueryVariables,
  APITypes.GetMessageQuery
>;
export const listMessages = /* GraphQL */ `query ListMessages(
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      msgURL
      type
      senderID
      chatID
      createdAt
      updatedAt
      userMessagesId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMessagesQueryVariables,
  APITypes.ListMessagesQuery
>;
export const messagesByUser = /* GraphQL */ `query MessagesByUser(
  $senderID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  messagesByUser(
    senderID: $senderID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      content
      msgURL
      type
      senderID
      chatID
      createdAt
      updatedAt
      userMessagesId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.MessagesByUserQueryVariables,
  APITypes.MessagesByUserQuery
>;
export const messagesByChat = /* GraphQL */ `query MessagesByChat(
  $chatID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  messagesByChat(
    chatID: $chatID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      content
      msgURL
      type
      senderID
      chatID
      createdAt
      updatedAt
      userMessagesId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.MessagesByChatQueryVariables,
  APITypes.MessagesByChatQuery
>;
export const getUserGroup = /* GraphQL */ `query GetUserGroup($id: ID!) {
  getUserGroup(id: $id) {
    id
    userID
    groupID
    role
    group {
      id
      groupName
      nameLowercase
      groupURL
      description
      isPublic
      memberCount
      type
      members{
        items{
          id
          userID
          groupID
          role
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    createdAt
    updatedAt
    userGroupsId
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserGroupQueryVariables,
  APITypes.GetUserGroupQuery
>;
export const listUserGroups = /* GraphQL */ `query ListUserGroups(
  $filter: ModelUserGroupFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userID
      groupID
      role
      createdAt
      updatedAt
      userGroupsId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserGroupsQueryVariables,
  APITypes.ListUserGroupsQuery
>;
export const groupsByUser = /* GraphQL */ `query GroupsByUser(
  $userID: ID!
  $updatedAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelUserGroupFilterInput
  $limit: Int
  $nextToken: String
) {
  groupsByUser(
    userID: $userID
    updatedAt: $updatedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      groupID
      role
      createdAt
      updatedAt
      userGroupsId
      group{
        id
        groupName
        nameLowercase
        groupURL
        description
        isPublic
        createdAt
        updatedAt
        owner
        memberCount
        type
        members{
          items{
            id
            userID
            groupID
            role
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        posts{
          items {
            id
            content
            postURL
            groupID
            userID
            user{
              id
              email
              firstname
              fullname
              lastname
              profileURL
              description
              unreadChatCount
              unreadNotificationCount
              createdAt
              updatedAt
              owner
              __typename
            }
            comments{
              items{
                id
                content
                commentURL
                userID
                postID
                createdAt
                updatedAt
                owner
                __typename
              }
              nextToken
              __typename
            }
            commentCount
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        __typename
      }
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GroupsByUserQueryVariables,
  APITypes.GroupsByUserQuery
>;
export const membersByGroup = /* GraphQL */ `query MembersByGroup(
  $groupID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserGroupFilterInput
  $limit: Int
  $nextToken: String
) {
  membersByGroup(
    groupID: $groupID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      groupID
      role
      createdAt
      updatedAt
      userGroupsId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.MembersByGroupQueryVariables,
  APITypes.MembersByGroupQuery
>;
export const getGroup = /* GraphQL */ `query GetGroup($id: ID!) {
  getGroup(id: $id) {
    id
    groupName
    nameLowercase
    groupURL
    description
    isPublic
    memberCount
    type
    members {
      items{
        id
        userID
        groupID
        role
        user{
          id
          email
          firstname
          lastname
          fullname
          profileURL
          description
          unreadChatCount
          unreadNotificationCount
          createdAt
          updatedAt
          owner
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    posts {
      items {
        id
        content
        postURL
        groupID
        userID
        user{
          id
          email
          firstname
          lastname
          fullname
          profileURL
          description
          unreadChatCount
          unreadNotificationCount
          createdAt
          updatedAt
          owner
          __typename
        }
        comments{
          items{
            id
            content
            commentURL
            userID
            postID
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        commentCount
        createdAt
        updatedAt
        userPostsId
        owner
        __typename
      }
      nextToken
      __typename
    }
    notifications{
      items{
        id
        type
        name
        content
        userID
        groupID
        targetUserID
        onClickID
        read
        targetUser{
          id
          email
          firstname
          lastname
          fullname
          profileURL
          description
          unreadChatCount
          unreadNotificationCount
          createdAt
          updatedAt
          owner
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetGroupQueryVariables, APITypes.GetGroupQuery>;
export const listGroups = /* GraphQL */ `query ListGroups(
  $filter: ModelGroupFilterInput
  $limit: Int
  $nextToken: String
) {
  listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      groupName
      nameLowercase
      groupURL
      description
      isPublic
      memberCount
      type
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListGroupsQueryVariables,
  APITypes.ListGroupsQuery
>;
export const groupsByMemberCount = /* GraphQL */ `query GroupsByMemberCount(
  $type: String!
  $memberCount: ModelIntKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelGroupFilterInput
  $limit: Int
  $nextToken: String
) {
  groupsByMemberCount(
    type: $type
    memberCount: $memberCount
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      groupName
      nameLowercase
      groupURL
      description
      isPublic
      memberCount
      type
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GroupsByMemberCountQueryVariables,
  APITypes.GroupsByMemberCountQuery
>;
export const getNotification = /* GraphQL */ `query GetNotification($id: ID!) {
  getNotification(id: $id) {
    id
    type
    name
    content
    userID
    groupID
    targetUserID
    onClickID
    read
    user {
      id
      email
      firstname
      lastname
      fullname
      profileURL
      description
      unreadChatCount
      unreadNotificationCount
      createdAt
      updatedAt
      owner
      __typename
    }
    group {
      id
      groupName
      nameLowercase
      groupURL
      description
      isPublic
      memberCount
      type
      createdAt
      updatedAt
      owner
      __typename
    }
    targetUser {
      id
      email
      firstname
      lastname
      fullname
      profileURL
      description
      unreadChatCount
      unreadNotificationCount
      createdAt
      updatedAt
      owner
      __typename
    }
    createdAt
    updatedAt
    userNotificationsId
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetNotificationQueryVariables,
  APITypes.GetNotificationQuery
>;
export const listNotifications = /* GraphQL */ `query ListNotifications(
  $filter: ModelNotificationFilterInput
  $limit: Int
  $nextToken: String
) {
  listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      type
      name
      content
      userID
      groupID
      targetUserID
      onClickID
      read
      createdAt
      updatedAt
      userNotificationsId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListNotificationsQueryVariables,
  APITypes.ListNotificationsQuery
>;
export const notificationsByUser = /* GraphQL */ `query NotificationsByUser(
  $userID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelNotificationFilterInput
  $limit: Int
  $nextToken: String
) {
  notificationsByUser(
    userID: $userID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      type
      name
      content
      userID
      groupID
      targetUserID
      onClickID
      read
      createdAt
      updatedAt
      userNotificationsId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.NotificationsByUserQueryVariables,
  APITypes.NotificationsByUserQuery
>;
export const notificationsByGroup = /* GraphQL */ `query NotificationsByGroup(
  $groupID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelNotificationFilterInput
  $limit: Int
  $nextToken: String
) {
  notificationsByGroup(
    groupID: $groupID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      type
      name
      content
      userID
      groupID
      targetUserID
      onClickID
      read
      createdAt
      updatedAt
      userNotificationsId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.NotificationsByGroupQueryVariables,
  APITypes.NotificationsByGroupQuery
>;
export const getReport = /* GraphQL */ `query GetReport($id: ID!) {
  getReport(id: $id) {
    id
    reporterID
    reportedItemID
    reportedItemType
    reason
    message
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetReportQueryVariables, APITypes.GetReportQuery>;
export const listReports = /* GraphQL */ `query ListReports(
  $filter: ModelReportFilterInput
  $limit: Int
  $nextToken: String
) {
  listReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      reporterID
      reportedItemID
      reportedItemType
      reason
      message
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListReportsQueryVariables,
  APITypes.ListReportsQuery
>;
export const getToken = /* GraphQL */ `query GetToken($id: ID!) {
  getToken(id: $id) {
    id
    tokenID
    userID
    user {
      id
      email
      firstname
      lastname
      fullname
      profileURL
      description
      unreadChatCount
      unreadNotificationCount
      createdAt
      updatedAt
      owner
      __typename
    }
    createdAt
    updatedAt
    userFcmTokensId
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTokenQueryVariables, APITypes.GetTokenQuery>;
export const listTokens = /* GraphQL */ `query ListTokens(
  $filter: ModelTokenFilterInput
  $limit: Int
  $nextToken: String
) {
  listTokens(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      tokenID
      userID
      createdAt
      updatedAt
      userFcmTokensId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTokensQueryVariables,
  APITypes.ListTokensQuery
>;
export const tokensByID = /* GraphQL */ `query TokensByID(
  $tokenID: String!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelTokenFilterInput
  $limit: Int
  $nextToken: String
) {
  tokensByID(
    tokenID: $tokenID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      tokenID
      userID
      createdAt
      updatedAt
      userFcmTokensId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TokensByIDQueryVariables,
  APITypes.TokensByIDQuery
>;
export const tokensByUser = /* GraphQL */ `query TokensByUser(
  $userID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelTokenFilterInput
  $limit: Int
  $nextToken: String
) {
  tokensByUser(
    userID: $userID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      tokenID
      userID
      createdAt
      updatedAt
      userFcmTokensId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TokensByUserQueryVariables,
  APITypes.TokensByUserQuery
>;
export const getNotificationSettings = /* GraphQL */ `query GetNotificationSettings($id: ID!) {
  getNotificationSettings(id: $id) {
    id
    newPost
    joinGroup
    groupRequest
    newComment
    newReply
    newReplyComment
    newMessage
    joinChat
    userID
    user {
      id
      email
      firstname
      lastname
      fullname
      profileURL
      description
      unreadChatCount
      unreadNotificationCount
      createdAt
      updatedAt
      owner
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetNotificationSettingsQueryVariables,
  APITypes.GetNotificationSettingsQuery
>;
export const listNotificationSettings = /* GraphQL */ `query ListNotificationSettings(
  $filter: ModelNotificationSettingsFilterInput
  $limit: Int
  $nextToken: String
) {
  listNotificationSettings(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      newPost
      joinGroup
      groupRequest
      newComment
      newReply
      newReplyComment
      newMessage
      joinChat
      userID
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListNotificationSettingsQueryVariables,
  APITypes.ListNotificationSettingsQuery
>;
export const notificationSettingsByUser = /* GraphQL */ `query NotificationSettingsByUser(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelNotificationSettingsFilterInput
  $limit: Int
  $nextToken: String
) {
  notificationSettingsByUser(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      newPost
      joinGroup
      groupRequest
      newComment
      newReply
      newReplyComment
      newMessage
      joinChat
      userID
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.NotificationSettingsByUserQueryVariables,
  APITypes.NotificationSettingsByUserQuery
>;
