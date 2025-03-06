/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onCreateUser(filter: $filter, owner: $owner) {
    id
    email
    firstname
    lastname
    profileURL
    description
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onUpdateUser(filter: $filter, owner: $owner) {
    id
    email
    firstname
    lastname
    profileURL
    description
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onDeleteUser(filter: $filter, owner: $owner) {
    id
    email
    firstname
    lastname
    profileURL
    description
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreatePost = /* GraphQL */ `subscription OnCreatePost(
  $filter: ModelSubscriptionPostFilterInput
  $owner: String
) {
  onCreatePost(filter: $filter, owner: $owner) {
    id
    content
    postURL
    groupID
    userID
    createdAt
    updatedAt
    userPostsId
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePostSubscriptionVariables,
  APITypes.OnCreatePostSubscription
>;
export const onUpdatePost = /* GraphQL */ `subscription OnUpdatePost(
  $filter: ModelSubscriptionPostFilterInput
  $owner: String
) {
  onUpdatePost(filter: $filter, owner: $owner) {
    id
    content
    postURL
    groupID
    userID
    createdAt
    updatedAt
    userPostsId
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePostSubscriptionVariables,
  APITypes.OnUpdatePostSubscription
>;
export const onDeletePost = /* GraphQL */ `subscription OnDeletePost(
  $filter: ModelSubscriptionPostFilterInput
  $owner: String
) {
  onDeletePost(filter: $filter, owner: $owner) {
    id
    content
    postURL
    groupID
    userID
    createdAt
    updatedAt
    userPostsId
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePostSubscriptionVariables,
  APITypes.OnDeletePostSubscription
>;
export const onCreateComment = /* GraphQL */ `subscription OnCreateComment(
  $filter: ModelSubscriptionCommentFilterInput
  $owner: String
) {
  onCreateComment(filter: $filter, owner: $owner) {
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
}
` as GeneratedSubscription<
  APITypes.OnCreateCommentSubscriptionVariables,
  APITypes.OnCreateCommentSubscription
>;
export const onUpdateComment = /* GraphQL */ `subscription OnUpdateComment(
  $filter: ModelSubscriptionCommentFilterInput
  $owner: String
) {
  onUpdateComment(filter: $filter, owner: $owner) {
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
}
` as GeneratedSubscription<
  APITypes.OnUpdateCommentSubscriptionVariables,
  APITypes.OnUpdateCommentSubscription
>;
export const onDeleteComment = /* GraphQL */ `subscription OnDeleteComment(
  $filter: ModelSubscriptionCommentFilterInput
  $owner: String
) {
  onDeleteComment(filter: $filter, owner: $owner) {
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
}
` as GeneratedSubscription<
  APITypes.OnDeleteCommentSubscriptionVariables,
  APITypes.OnDeleteCommentSubscription
>;
export const onCreateUserChat = /* GraphQL */ `subscription OnCreateUserChat(
  $filter: ModelSubscriptionUserChatFilterInput
  $owner: String
) {
  onCreateUserChat(filter: $filter, owner: $owner) {
    id
    unreadMessageCount
    lastMessage
    lastMessageAt
    role
    isMuted
    userID
    chatID
    createdAt
    updatedAt
    userChatsId
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserChatSubscriptionVariables,
  APITypes.OnCreateUserChatSubscription
>;
export const onUpdateUserChat = /* GraphQL */ `subscription OnUpdateUserChat(
  $filter: ModelSubscriptionUserChatFilterInput
  $owner: String
) {
  onUpdateUserChat(filter: $filter, owner: $owner) {
    id
    unreadMessageCount
    lastMessage
    lastMessageAt
    role
    isMuted
    userID
    chatID
    createdAt
    updatedAt
    userChatsId
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserChatSubscriptionVariables,
  APITypes.OnUpdateUserChatSubscription
>;
export const onDeleteUserChat = /* GraphQL */ `subscription OnDeleteUserChat(
  $filter: ModelSubscriptionUserChatFilterInput
  $owner: String
) {
  onDeleteUserChat(filter: $filter, owner: $owner) {
    id
    unreadMessageCount
    lastMessage
    lastMessageAt
    role
    isMuted
    userID
    chatID
    createdAt
    updatedAt
    userChatsId
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserChatSubscriptionVariables,
  APITypes.OnDeleteUserChatSubscription
>;
export const onCreateChat = /* GraphQL */ `subscription OnCreateChat(
  $filter: ModelSubscriptionChatFilterInput
  $owner: String
) {
  onCreateChat(filter: $filter, owner: $owner) {
    id
    name
    url
    isGroup
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateChatSubscriptionVariables,
  APITypes.OnCreateChatSubscription
>;
export const onUpdateChat = /* GraphQL */ `subscription OnUpdateChat(
  $filter: ModelSubscriptionChatFilterInput
  $owner: String
) {
  onUpdateChat(filter: $filter, owner: $owner) {
    id
    name
    url
    isGroup
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateChatSubscriptionVariables,
  APITypes.OnUpdateChatSubscription
>;
export const onDeleteChat = /* GraphQL */ `subscription OnDeleteChat(
  $filter: ModelSubscriptionChatFilterInput
  $owner: String
) {
  onDeleteChat(filter: $filter, owner: $owner) {
    id
    name
    url
    isGroup
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteChatSubscriptionVariables,
  APITypes.OnDeleteChatSubscription
>;
export const onCreateMessage = /* GraphQL */ `subscription OnCreateMessage(
  $filter: ModelSubscriptionMessageFilterInput
  $owner: String
) {
  onCreateMessage(filter: $filter, owner: $owner) {
    id
    content
    msgURL
    senderID
    sender{
      id
      email
      firstname
      lastname
      profileURL
      description
      createdAt
      updatedAt
      owner
      __typename
    }
    chatID
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMessageSubscriptionVariables,
  APITypes.OnCreateMessageSubscription
>;
export const onUpdateMessage = /* GraphQL */ `subscription OnUpdateMessage(
  $filter: ModelSubscriptionMessageFilterInput
  $owner: String
) {
  onUpdateMessage(filter: $filter, owner: $owner) {
    id
    content
    msgURL
    senderID
    chatID
    createdAt
    updatedAt
    userMessagesId
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMessageSubscriptionVariables,
  APITypes.OnUpdateMessageSubscription
>;
export const onDeleteMessage = /* GraphQL */ `subscription OnDeleteMessage(
  $filter: ModelSubscriptionMessageFilterInput
  $owner: String
) {
  onDeleteMessage(filter: $filter, owner: $owner) {
    id
    content
    msgURL
    senderID
    chatID
    createdAt
    updatedAt
    userMessagesId
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMessageSubscriptionVariables,
  APITypes.OnDeleteMessageSubscription
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
    createdAt
    updatedAt
    userGroupsId
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserGroupSubscriptionVariables,
  APITypes.OnCreateUserGroupSubscription
>;
export const onUpdateUserGroup = /* GraphQL */ `subscription OnUpdateUserGroup(
  $filter: ModelSubscriptionUserGroupFilterInput
  $owner: String
) {
  onUpdateUserGroup(filter: $filter, owner: $owner) {
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
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserGroupSubscriptionVariables,
  APITypes.OnUpdateUserGroupSubscription
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
    createdAt
    updatedAt
    userGroupsId
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserGroupSubscriptionVariables,
  APITypes.OnDeleteUserGroupSubscription
>;
export const onCreateGroup = /* GraphQL */ `subscription OnCreateGroup(
  $filter: ModelSubscriptionGroupFilterInput
  $owner: String
) {
  onCreateGroup(filter: $filter, owner: $owner) {
    id
    groupName
    groupURL
    description
    isPublic
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateGroupSubscriptionVariables,
  APITypes.OnCreateGroupSubscription
>;
export const onUpdateGroup = /* GraphQL */ `subscription OnUpdateGroup(
  $filter: ModelSubscriptionGroupFilterInput
  $owner: String
) {
  onUpdateGroup(filter: $filter, owner: $owner) {
    id
    groupName
    groupURL
    description
    isPublic
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateGroupSubscriptionVariables,
  APITypes.OnUpdateGroupSubscription
>;
export const onDeleteGroup = /* GraphQL */ `subscription OnDeleteGroup(
  $filter: ModelSubscriptionGroupFilterInput
  $owner: String
) {
  onDeleteGroup(filter: $filter, owner: $owner) {
    id
    groupName
    groupURL
    description
    isPublic
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteGroupSubscriptionVariables,
  APITypes.OnDeleteGroupSubscription
>;
