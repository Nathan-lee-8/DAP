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
    phonenumber
    profileURL
    location
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
    groups {
      nextToken
      __typename
    }
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
    phonenumber
    profileURL
    location
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
    groups {
      nextToken
      __typename
    }
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
    phonenumber
    profileURL
    location
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
    groups {
      nextToken
      __typename
    }
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
` as GeneratedSubscription<
  APITypes.OnDeletePostSubscriptionVariables,
  APITypes.OnDeletePostSubscription
>;
export const onCreateFollowing = /* GraphQL */ `subscription OnCreateFollowing(
  $filter: ModelSubscriptionFollowingFilterInput
) {
  onCreateFollowing(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateFollowingSubscriptionVariables,
  APITypes.OnCreateFollowingSubscription
>;
export const onUpdateFollowing = /* GraphQL */ `subscription OnUpdateFollowing(
  $filter: ModelSubscriptionFollowingFilterInput
) {
  onUpdateFollowing(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateFollowingSubscriptionVariables,
  APITypes.OnUpdateFollowingSubscription
>;
export const onDeleteFollowing = /* GraphQL */ `subscription OnDeleteFollowing(
  $filter: ModelSubscriptionFollowingFilterInput
) {
  onDeleteFollowing(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteFollowingSubscriptionVariables,
  APITypes.OnDeleteFollowingSubscription
>;
export const onCreateUserChat = /* GraphQL */ `subscription OnCreateUserChat(
  $filter: ModelSubscriptionUserChatFilterInput
  $ownerID: String
) {
  onCreateUserChat(filter: $filter, ownerID: $ownerID) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserChatSubscriptionVariables,
  APITypes.OnCreateUserChatSubscription
>;
export const onUpdateUserChat = /* GraphQL */ `subscription OnUpdateUserChat(
  $filter: ModelSubscriptionUserChatFilterInput
  $ownerID: String
) {
  onUpdateUserChat(filter: $filter, ownerID: $ownerID) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserChatSubscriptionVariables,
  APITypes.OnUpdateUserChatSubscription
>;
export const onDeleteUserChat = /* GraphQL */ `subscription OnDeleteUserChat(
  $filter: ModelSubscriptionUserChatFilterInput
  $ownerID: String
) {
  onDeleteUserChat(filter: $filter, ownerID: $ownerID) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserChatSubscriptionVariables,
  APITypes.OnDeleteUserChatSubscription
>;
export const onCreateChat = /* GraphQL */ `subscription OnCreateChat($filter: ModelSubscriptionChatFilterInput) {
  onCreateChat(filter: $filter) {
    id
    name
    isGroup
    createdAt
    messages {
      nextToken
      __typename
    }
    participants {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateChatSubscriptionVariables,
  APITypes.OnCreateChatSubscription
>;
export const onUpdateChat = /* GraphQL */ `subscription OnUpdateChat($filter: ModelSubscriptionChatFilterInput) {
  onUpdateChat(filter: $filter) {
    id
    name
    isGroup
    createdAt
    messages {
      nextToken
      __typename
    }
    participants {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateChatSubscriptionVariables,
  APITypes.OnUpdateChatSubscription
>;
export const onDeleteChat = /* GraphQL */ `subscription OnDeleteChat($filter: ModelSubscriptionChatFilterInput) {
  onDeleteChat(filter: $filter) {
    id
    name
    isGroup
    createdAt
    messages {
      nextToken
      __typename
    }
    participants {
      nextToken
      __typename
    }
    updatedAt
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
    chatID
    groupID
    createdAt
    updatedAt
    userMessagesId
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
` as GeneratedSubscription<
  APITypes.OnDeleteMessageSubscriptionVariables,
  APITypes.OnDeleteMessageSubscription
>;
export const onCreateUserGroup = /* GraphQL */ `subscription OnCreateUserGroup(
  $filter: ModelSubscriptionUserGroupFilterInput
  $ownerID: String
) {
  onCreateUserGroup(filter: $filter, ownerID: $ownerID) {
    id
    ownerID
    userID
    groupID
    role
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
    userGroupsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserGroupSubscriptionVariables,
  APITypes.OnCreateUserGroupSubscription
>;
export const onUpdateUserGroup = /* GraphQL */ `subscription OnUpdateUserGroup(
  $filter: ModelSubscriptionUserGroupFilterInput
  $ownerID: String
) {
  onUpdateUserGroup(filter: $filter, ownerID: $ownerID) {
    id
    ownerID
    userID
    groupID
    role
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
    userGroupsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserGroupSubscriptionVariables,
  APITypes.OnUpdateUserGroupSubscription
>;
export const onDeleteUserGroup = /* GraphQL */ `subscription OnDeleteUserGroup(
  $filter: ModelSubscriptionUserGroupFilterInput
  $ownerID: String
) {
  onDeleteUserGroup(filter: $filter, ownerID: $ownerID) {
    id
    ownerID
    userID
    groupID
    role
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
    userGroupsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserGroupSubscriptionVariables,
  APITypes.OnDeleteUserGroupSubscription
>;
export const onCreateGroup = /* GraphQL */ `subscription OnCreateGroup($filter: ModelSubscriptionGroupFilterInput) {
  onCreateGroup(filter: $filter) {
    id
    groupName
    groupURL
    createdAt
    members {
      nextToken
      __typename
    }
    messages {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateGroupSubscriptionVariables,
  APITypes.OnCreateGroupSubscription
>;
export const onUpdateGroup = /* GraphQL */ `subscription OnUpdateGroup($filter: ModelSubscriptionGroupFilterInput) {
  onUpdateGroup(filter: $filter) {
    id
    groupName
    groupURL
    createdAt
    members {
      nextToken
      __typename
    }
    messages {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateGroupSubscriptionVariables,
  APITypes.OnUpdateGroupSubscription
>;
export const onDeleteGroup = /* GraphQL */ `subscription OnDeleteGroup($filter: ModelSubscriptionGroupFilterInput) {
  onDeleteGroup(filter: $filter) {
    id
    groupName
    groupURL
    createdAt
    members {
      nextToken
      __typename
    }
    messages {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteGroupSubscriptionVariables,
  APITypes.OnDeleteGroupSubscription
>;
