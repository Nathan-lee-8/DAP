/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onUpdateUser(filter: $filter, owner: $owner) {
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
    }
    fcmTokens{
      items{
        id
        tokenID
        userID
        createdAt
        updatedAt
      }
    }
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onCreateBlockList = /* GraphQL */ `subscription OnCreateBlockList(
  $filter: ModelSubscriptionBlockListFilterInput
  $owner: String
) {
  onCreateBlockList(filter: $filter, owner: $owner) {
    id
    blockerID
    blockedID
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateBlockListSubscriptionVariables,
  APITypes.OnCreateBlockListSubscription
>;
export const onDeleteBlockList = /* GraphQL */ `subscription OnDeleteBlockList(
  $filter: ModelSubscriptionBlockListFilterInput
  $owner: String
) {
  onDeleteBlockList(filter: $filter, owner: $owner) {
    id
    blockerID
    blockedID
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteBlockListSubscriptionVariables,
  APITypes.OnDeleteBlockListSubscription
>;
export const onCreateUserGroup = /* GraphQL */ `subscription OnCreateUserGroup(
  $filter: ModelSubscriptionUserGroupFilterInput
  $owner: String
) {
  onCreateUserGroup(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserGroupSubscriptionVariables,
  APITypes.OnCreateUserGroupSubscription
>;
export const onDeleteUserGroup = /* GraphQL */ `subscription OnDeleteUserGroup(
  $filter: ModelSubscriptionUserGroupFilterInput
  $owner: String
) {
  onDeleteUserGroup(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserGroupSubscriptionVariables,
  APITypes.OnDeleteUserGroupSubscription
>;