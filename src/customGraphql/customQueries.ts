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
      }
      fcmTokens{
        items{
          id
          tokenID
        }
      }
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
      nameLowercase
      groupURL
      description
      isPublic
      memberCount
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
        type
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
        memberCount
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
        msgURL
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
        unreadMessageCount
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
      lastMessageAt
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
          firstname
          lastname
          profileURL
        }
      }
      nextToken
    }
    notifications {
      items{
        id
        type
        name
        content
        onClickID
        targetUser{
          id
          firstname
          lastname
          profileURL
        }
      }
      nextToken
    }
  }
}
` as GeneratedQuery<APITypes.GetGroupQueryVariables, APITypes.GetGroupQuery>;
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
` as GeneratedQuery<
  APITypes.PostsByDateQueryVariables,
  APITypes.PostsByDateQuery
>;
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
      groupURL
      description
      memberCount
      type
    }
    nextToken
  }
}
` as GeneratedQuery<
  APITypes.GroupsByMemberCountQueryVariables,
  APITypes.GroupsByMemberCountQuery
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
      createdAt
      onClickID
      read
    }
    nextToken
  }
}
` as GeneratedQuery<
  APITypes.NotificationsByUserQueryVariables,
  APITypes.NotificationsByUserQuery
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
      user{
        id
        firstname
        lastname
        profileURL
      }
      postID
      createdAt
      replies{
        items{
          id
          content
          userID
          user{
            id
            firstname
            lastname
            profileURL
          }
          createdAt
        }
        nextToken
      }
    }
    nextToken
  }
}
` as GeneratedQuery<
  APITypes.CommentsByPostQueryVariables,
  APITypes.CommentsByPostQuery
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
    }
  }
}
` as GeneratedQuery<
  APITypes.TokensByUserQueryVariables,
  APITypes.TokensByUserQuery
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
    }
  }
}
` as GeneratedQuery<
  APITypes.TokensByIDQueryVariables,
  APITypes.TokensByIDQuery
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
      post {
        id
        content
        postURL
        user{
          id
          email
          firstname
          lastname
          profileURL
        }
        group{
          id
          groupName
        }
        commentCount
        createdAt
        updatedAt
      }
      postCreatedAt
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PostsByUserFeedQueryVariables,
  APITypes.PostsByUserFeedQuery
>;
export const blockListByBlocker = /* GraphQL */ `query BlockListByBlocker(
  $blockerID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelBlockListFilterInput
  $limit: Int
  $nextToken: String
) {
  blockListByBlocker(
    blockerID: $blockerID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      blockerID
      blockedID
      blockedUser{
        id
        firstname
        lastname
        profileURL
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
  APITypes.BlockListByBlockerQueryVariables,
  APITypes.BlockListByBlockerQuery
>;
export const blockListByBlocked = /* GraphQL */ `query BlockListByBlocked(
  $blockedID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelBlockListFilterInput
  $limit: Int
  $nextToken: String
) {
  blockListByBlocked(
    blockedID: $blockedID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      blockerID
      blockedID
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
  APITypes.BlockListByBlockedQueryVariables,
  APITypes.BlockListByBlockedQuery
>;