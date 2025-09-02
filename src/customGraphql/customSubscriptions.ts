/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};
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
export const onCreatePost = /* GraphQL */ `subscription OnCreatePost(
  $filter: ModelSubscriptionPostFilterInput
  $owner: String
) {
  onCreatePost(filter: $filter, owner: $owner) {
    id    
    content
    groupID
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
}
` as GeneratedSubscription<
  APITypes.OnCreatePostSubscriptionVariables,
  APITypes.OnCreatePostSubscription
>;