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
    owner
    __typename
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