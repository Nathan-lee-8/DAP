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
    posts {
      nextToken
      __typename
    }
    followings {
      nextToken
      __typename
    }
    chats {
      nextToken
      __typename
    }
    messages {
      nextToken
      __typename
    }
    createdAt
    updatedAt
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
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getPost = /* GraphQL */ `query GetPost($id: ID!) {
  getPost(id: $id) {
    id
    title
    content
    type
    createdAt
    userID
    user {
      id
      email
      firstname
      lastname
      phonenumber
      createdAt
      updatedAt
      __typename
    }
    updatedAt
    userPostsId
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
      type
      createdAt
      userID
      updatedAt
      userPostsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListPostsQueryVariables, APITypes.ListPostsQuery>;
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
      createdAt
      updatedAt
      __typename
    }
    followedAt
    createdAt
    updatedAt
    userFollowingsId
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
      followedAt
      createdAt
      updatedAt
      userFollowingsId
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
export const getUserChat = /* GraphQL */ `query GetUserChat($id: ID!) {
  getUserChat(id: $id) {
    id
    userID
    user {
      id
      email
      firstname
      lastname
      phonenumber
      createdAt
      updatedAt
      __typename
    }
    chatID
    chat {
      id
      name
      isGroup
      createdAt
      updatedAt
      __typename
    }
    joinedAt
    unreadMessageCount
    lastReadAt
    isMuted
    createdAt
    updatedAt
    userChatsId
    chatParticipantsId
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
      userID
      chatID
      joinedAt
      unreadMessageCount
      lastReadAt
      isMuted
      createdAt
      updatedAt
      userChatsId
      chatParticipantsId
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
export const getChat = /* GraphQL */ `query GetChat($id: ID!) {
  getChat(id: $id) {
    id
    name
    isGroup
    createdAt
    messages {
      items {
        id
        content
        senderID
        sender{
          id
          email
          firstname
          lastname
        }
        chatID
        createdAt
        __typename
      }
      nextToken
      __typename
    }
    participants {
      items{
        user{
          id
          email
          firstname
          lastname
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
    senderID
    sender {
      id
      email
      firstname
      lastname
      phonenumber
      createdAt
      updatedAt
      __typename
    }
    chatID
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
    userMessagesId
    chatMessagesId
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
      senderID
      chatID
      createdAt
      updatedAt
      userMessagesId
      chatMessagesId
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
      createdAt
      updatedAt
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
      type
      user{
        id
        email
        firstname
        lastname
        __typename
      }
      createdAt
      userID
      updatedAt
      userPostsId
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
export const followingsByUser = /* GraphQL */ `query FollowingsByUser(
  $userID: ID!
  $followedAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelFollowingFilterInput
  $limit: Int
  $nextToken: String
) {
  followingsByUser(
    userID: $userID
    followedAt: $followedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      followedUserID
      followedAt
      createdAt
      updatedAt
      userFollowingsId
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
export const chatsByUser = /* GraphQL */ `query ChatsByUser(
  $userID: ID!
  $joinedAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelUserChatFilterInput
  $limit: Int
  $nextToken: String
) {
  chatsByUser(
    userID: $userID
    joinedAt: $joinedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      chatID
      chat{
        id
        name
        isGroup
        createdAt
        participants {
          items{
            user{
              id
              email
              firstname
              lastname
              __typename
            }
          }
          nextToken
          __typename
        }
      }
      joinedAt
      unreadMessageCount
      lastReadAt
      isMuted
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
      senderID
      chatID
      createdAt
      updatedAt
      userMessagesId
      chatMessagesId
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
      senderID
      chatID
      createdAt
      updatedAt
      userMessagesId
      chatMessagesId
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