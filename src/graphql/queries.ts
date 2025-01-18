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
    phonenumber
    profileURL
    location
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
      phonenumber
      profileURL
      location
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
      phonenumber
      profileURL
      location
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
export const getPost = /* GraphQL */ `query GetPost($id: ID!) {
  getPost(id: $id) {
    id
    title
    content
    postURL
    type
    userID
    user {
      id
      email
      firstname
      lastname
      phonenumber
      profileURL
      location
      createdAt
      updatedAt
      owner
      __typename
    }
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
      title
      content
      postURL
      type
      userID
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
  $type: String!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  postsByDate(
    type: $type
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      title
      content
      postURL
      type
      userID
      user{
        id
        email
        firstname
        lastname
        phonenumber
        profileURL
        location
        followings{
          items {
            id
            userID
            followedUserID
            createdAt
            updatedAt
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
      title
      content
      postURL
      type
      userID
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
export const getFollowing = /* GraphQL */ `query GetFollowing($id: ID!) {
  getFollowing(id: $id) {
    id
    userID
    followedUserID
    followedUser {
      id
      email
      firstname
      lastname
      phonenumber
      profileURL
      location
      createdAt
      updatedAt
      owner
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetFollowingQueryVariables,
  APITypes.GetFollowingQuery
>;
export const listFollowings = /* GraphQL */ `query ListFollowings(
  $filter: ModelFollowingFilterInput
  $limit: Int
  $nextToken: String
) {
  listFollowings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userID
      followedUserID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListFollowingsQueryVariables,
  APITypes.ListFollowingsQuery
>;
export const followingsByUser = /* GraphQL */ `query FollowingsByUser(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelFollowingFilterInput
  $limit: Int
  $nextToken: String
) {
  followingsByUser(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      followedUserID
      createdAt
      updatedAt
      followedUser{
        id
        email
        firstname
        lastname
        phonenumber
        profileURL
        location
        createdAt
        updatedAt
        __typename
      }
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.FollowingsByUserQueryVariables,
  APITypes.FollowingsByUserQuery
>;
export const getUserChat = /* GraphQL */ `query GetUserChat($id: ID!) {
  getUserChat(id: $id) {
    id
    ownerID
    unreadMessageCount
    lastMessage
    lastReadAt
    isMuted
    userID
    chatID
    user {
      id
      email
      firstname
      lastname
      phonenumber
      profileURL
      location
      createdAt
      updatedAt
      owner
      __typename
    }
    chat {
      id
      name
      isGroup
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    userChatsId
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
      ownerID
      unreadMessageCount
      lastMessage
      lastReadAt
      isMuted
      userID
      chatID
      createdAt
      updatedAt
      userChatsId
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
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelUserChatFilterInput
  $limit: Int
  $nextToken: String
) {
  chatsByUser(
    userID: $userID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      ownerID
      unreadMessageCount
      lastMessage
      lastReadAt
      isMuted
      userID
      chatID
      chat{
        id
        name
        isGroup
        participants{
          items{
            id
            ownerID
            userID
            user {
              id
              email
              firstname
              lastname
              phonenumber
              profileURL
              location
              createdAt
              updatedAt
              owner
              __typename
            }
            chatID
            createdAt
            updatedAt
            __typename
          }
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      userChatsId
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
      ownerID
      unreadMessageCount
      lastMessage
      lastReadAt
      isMuted
      userID
      chatID
      createdAt
      updatedAt
      userChatsId
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
    isGroup
    createdAt
    messages (limit: $messagesLimit, nextToken: $messagesNextToken, sortDirection: DESC) {
      items {
        id
        content
        senderID
        chatID
        owner
        createdAt
        __typename
      }
      nextToken
      __typename
    }
    participants {
      items{
        id
        unreadMessageCount
        user{
          id
          firstname
          lastname
          profileURL
        }
        __typename
      }
      nextToken
      __typename
    }
    updatedAt
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
      isGroup
      createdAt
      updatedAt
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
    senderID
    chatID
    groupID
    sender {
      id
      email
      firstname
      lastname
      phonenumber
      profileURL
      location
      createdAt
      updatedAt
      owner
      __typename
    }
    chat {
      id
      name
      isGroup
      createdAt
      updatedAt
      __typename
    }
    group {
      id
      groupName
      groupURL
      createdAt
      updatedAt
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
      senderID
      chatID
      groupID
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
      senderID
      chatID
      groupID
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
      senderID
      chatID
      groupID
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
export const messageByGroup = /* GraphQL */ `query MessageByGroup(
  $groupID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  messageByGroup(
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
      msgURL
      senderID
      chatID
      groupID
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
  APITypes.MessageByGroupQueryVariables,
  APITypes.MessageByGroupQuery
>;
export const getUserGroup = /* GraphQL */ `query GetUserGroup($id: ID!) {
  getUserGroup(id: $id) {
    id
    ownerID
    userID
    groupID
    role
    group {
      id
      groupName
      groupURL
      members{
        items{
          id
          ownerID
          userID
          groupID
          role
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    userGroupsId
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
      ownerID
      userID
      groupID
      role
      createdAt
      updatedAt
      userGroupsId
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
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelUserGroupFilterInput
  $limit: Int
  $nextToken: String
) {
  groupsByUser(
    userID: $userID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      ownerID
      userID
      groupID
      role
      createdAt
      updatedAt
      userGroupsId
      group{
        id
        groupName
        groupURL
        createdAt
        updatedAt
        __typename
      }
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
      ownerID
      userID
      groupID
      role
      createdAt
      updatedAt
      userGroupsId
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
    groupURL
    createdAt
    members {
      items{
        id
        ownerID
        userID
        groupID
        role
        user{
          id
          email
          firstname
          lastname
          phonenumber
          profileURL
          location
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    messages {
      items{
        id
        content
        msgURL
        senderID
        chatID
        groupID
        sender{
          id
          email
          firstname
          lastname
          phonenumber
          profileURL
          location
          createdAt
          updatedAt
          __typename
        }
      }
      nextToken
      __typename
    }
    updatedAt
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
      groupURL
      createdAt
      updatedAt
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
