/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const userByEmail =
`query UserByEmail($email: AWSEmail!) {
  userByEmail(email: $email) {
    items {
      id
      email
      firstname
      fullname
      lastname
      profileURL
      description
      createdAt
    }
  }
}
` as GeneratedQuery<
  APITypes.UserByEmailQueryVariables,
  APITypes.UserByEmailQuery
>;
export const postsByUser =
`query PostsByUser(
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
      userID
      comments{
        items{
          id
        }
        nextToken
      }
      group {
        id
        groupName
      }
    }
    nextToken
  }
}
` as GeneratedQuery<
  APITypes.PostsByUserQueryVariables,
  APITypes.PostsByUserQuery
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
        description
        isPublic
        createdAt
        updatedAt
        owner
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
        senderID
        sender{
          id
          firstname
          fullname
          lastname
          email
          profileURL
          description
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
        lastMessageAt
        role
        isMuted
        userID
        chatID
        user{
          id
          firstname
          lastname
          email
          profileURL
          description
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
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetChatQueryVariables, APITypes.GetChatQuery>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    email
    firstname
    fullname
    lastname
    profileURL
    description
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
      profileURL
    }
    nextToken
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;