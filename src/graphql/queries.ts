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
export const getUserChat = /* GraphQL */ `query GetUserChat($id: ID!) {
  getUserChat(id: $id) {
    id
    userID
    chatID
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
    chat {
      id
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
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
      createdAt
      updatedAt
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
    messages {
      nextToken
      __typename
    }
    createdAt
    participants {
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
    createdAt
    updatedAt
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
      createdAt
      userID
      user{
        id
        email
        firstname
        lastname
        phonenumber
      }
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
export const followingsByUserID = /* GraphQL */ `query FollowingsByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelFollowingFilterInput
  $limit: Int
  $nextToken: String
) {
  followingsByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.FollowingsByUserIDQueryVariables,
  APITypes.FollowingsByUserIDQuery
>;
export const userChatsByUserID = /* GraphQL */ `query UserChatsByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserChatFilterInput
  $limit: Int
  $nextToken: String
) {
  userChatsByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      chatID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserChatsByUserIDQueryVariables,
  APITypes.UserChatsByUserIDQuery
>;
export const userChatsByChatID = /* GraphQL */ `query UserChatsByChatID(
  $chatID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserChatFilterInput
  $limit: Int
  $nextToken: String
) {
  userChatsByChatID(
    chatID: $chatID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      chatID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserChatsByChatIDQueryVariables,
  APITypes.UserChatsByChatIDQuery
>;
export const messagesBySenderID = /* GraphQL */ `query MessagesBySenderID(
  $senderID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  messagesBySenderID(
    senderID: $senderID
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
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.MessagesBySenderIDQueryVariables,
  APITypes.MessagesBySenderIDQuery
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
