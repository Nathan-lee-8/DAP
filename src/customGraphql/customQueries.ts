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
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
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
    }
  }
}
` as GeneratedQuery<
  APITypes.UserByEmailQueryVariables,
  APITypes.UserByEmailQuery
>;
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
      description
      isPublic
      createdAt
      updatedAt
      owner
    }
    nextToken
  }
}
` as GeneratedQuery<
  APITypes.ListGroupsQueryVariables,
  APITypes.ListGroupsQuery
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
      commentCount
      group {
        id
        groupName
        isPublic
      }
      createdAt
    }
    nextToken
  }
}
` as GeneratedQuery<
  APITypes.PostsByUserQueryVariables,
  APITypes.PostsByUserQuery
>;
export const groupPosts = /* GraphQL */ `query GroupsByUser(
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
      group{
        id
        groupName
        posts{
          items {
            id
            content
            postURL
            groupID
            user{
              id
              email
              firstname
              lastname
              profileURL
            }
            commentCount
            createdAt
          }
          nextToken
        }
      }
    }
    nextToken
  }
}
` as GeneratedQuery<
  APITypes.GroupsByUserQueryVariables,
  APITypes.GroupsByUserQuery
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
      group{
        id
        groupName
        groupURL
        description
        isPublic
        members{
          items{
            id
          }
          nextToken
        }
      }
    }
    nextToken
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
    messages (limit: $messagesLimit, nextToken: $messagesNextToken, sortDirection: DESC) {
      items {
        id
        content
        senderID
        sender{
          id
          firstname
          lastname
          profileURL
        }
        type
        chatID
        createdAt
        updatedAt
      }
      nextToken
    }
    participants {
      items{
        id
        role
        lastMessage
        userID
        chatID
        user{
          id
          firstname
          lastname
          profileURL
        }
      }
      nextToken
    }
    updatedAt
  }
}
` as GeneratedQuery<APITypes.GetChatQueryVariables, APITypes.GetChatQuery>;
export const chatsByUser = /* GraphQL */ `query ChatsByUser(
  $userID: ID!
  $updatedAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelUserChatFilterInput
  $limit: Int
  $nextToken: String
) {
  chatsByUser(
    userID: $userID
    updatedAt: $updatedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      unreadMessageCount
      lastMessage
      isMuted
      userID
      chatID
      chat{
        id
        name
        url
        isGroup
        participants{
          items{
            id
            userID
            user {
              id
              firstname
              lastname
              profileURL
            }
          }
        }
      }
      updatedAt
    }
    nextToken
  }
}
` as GeneratedQuery<
  APITypes.ChatsByUserQueryVariables,
  APITypes.ChatsByUserQuery
>;
export const getGroup = /* GraphQL */ `query GetGroup($id: ID!) {
  getGroup(id: $id) {
    id
    groupName
    groupURL
    description
    isPublic
    members {
      items{
        id
        userID
        groupID
        role
        user{
          id
          firstname
          lastname
          profileURL
        }
      }
      nextToken
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
          firstname
          lastname
          profileURL
        }
        commentCount
        createdAt
        updatedAt
      }
      nextToken
    }
  }
}
` as GeneratedQuery<APITypes.GetGroupQueryVariables, APITypes.GetGroupQuery>;
export const getPost = /* GraphQL */ `query GetPost($id: ID!) {
  getPost(id: $id) {
    id
    content
    postURL
    groupID
    userID
    commentCount
    user {
      id
      firstname
      lastname
      profileURL
    }
    comments{
      items{
        id
        content
        commentURL
        user {
          id
          firstname
          lastname
          profileURL
        }
        createdAt
      }
      nextToken
    }
    group {
      id
      groupName
    }
    createdAt
  }
}
` as GeneratedQuery<APITypes.GetPostQueryVariables, APITypes.GetPostQuery>;