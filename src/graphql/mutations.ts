/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const deleteUserChat = /* GraphQL */ `mutation DeleteUserChat(
  $input: DeleteUserChatInput!
  $condition: ModelUserChatConditionInput
) {
  deleteUserChat(input: $input, condition: $condition) {
    id
    ownerID
    unreadMessageCount
    lastMessage
    lastReadAt
    isMuted
    userID
    chatID
    createdAt
    updatedAt
    userChatsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserChatMutationVariables,
  APITypes.DeleteUserChatMutation
>;
export const updateChat = /* GraphQL */ `mutation UpdateChat(
  $input: UpdateChatInput!
  $condition: ModelChatConditionInput
) {
  updateChat(input: $input, condition: $condition) {
    id
    name
    isGroup
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateChatMutationVariables,
  APITypes.UpdateChatMutation
>;
export const deleteChat = /* GraphQL */ `mutation DeleteChat(
  $input: DeleteChatInput!
  $condition: ModelChatConditionInput
) {
  deleteChat(input: $input, condition: $condition) {
    id
    name
    isGroup
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteChatMutationVariables,
  APITypes.DeleteChatMutation
>;
export const deleteUserGroup = /* GraphQL */ `mutation DeleteUserGroup(
  $input: DeleteUserGroupInput!
  $condition: ModelUserGroupConditionInput
) {
  deleteUserGroup(input: $input, condition: $condition) {
    id
    ownerID
    userID
    groupID
    role
    createdAt
    updatedAt
    userGroupsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserGroupMutationVariables,
  APITypes.DeleteUserGroupMutation
>;
export const deleteGroup = /* GraphQL */ `mutation DeleteGroup(
  $input: DeleteGroupInput!
  $condition: ModelGroupConditionInput
) {
  deleteGroup(input: $input, condition: $condition) {
    id
    groupName
    groupURL
    description
    createdAt
    members {
      nextToken
      __typename
    }
    posts {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteGroupMutationVariables,
  APITypes.DeleteGroupMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
    id
    email
    firstname
    lastname
    profileURL
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
    id
    email
    firstname
    lastname
    profileURL
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
    id
    email
    firstname
    lastname
    profileURL
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createPost = /* GraphQL */ `mutation CreatePost(
  $input: CreatePostInput!
  $condition: ModelPostConditionInput
) {
  createPost(input: $input, condition: $condition) {
    id
    title
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
` as GeneratedMutation<
  APITypes.CreatePostMutationVariables,
  APITypes.CreatePostMutation
>;
export const updatePost = /* GraphQL */ `mutation UpdatePost(
  $input: UpdatePostInput!
  $condition: ModelPostConditionInput
) {
  updatePost(input: $input, condition: $condition) {
    id
    title
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
` as GeneratedMutation<
  APITypes.UpdatePostMutationVariables,
  APITypes.UpdatePostMutation
>;
export const deletePost = /* GraphQL */ `mutation DeletePost(
  $input: DeletePostInput!
  $condition: ModelPostConditionInput
) {
  deletePost(input: $input, condition: $condition) {
    id
    title
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
` as GeneratedMutation<
  APITypes.DeletePostMutationVariables,
  APITypes.DeletePostMutation
>;
export const createUserChat = /* GraphQL */ `mutation CreateUserChat(
  $input: CreateUserChatInput!
  $condition: ModelUserChatConditionInput
) {
  createUserChat(input: $input, condition: $condition) {
    id
    ownerID
    unreadMessageCount
    lastMessage
    lastReadAt
    isMuted
    userID
    chatID
    createdAt
    updatedAt
    userChatsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserChatMutationVariables,
  APITypes.CreateUserChatMutation
>;
export const updateUserChat = /* GraphQL */ `mutation UpdateUserChat(
  $input: UpdateUserChatInput!
  $condition: ModelUserChatConditionInput
) {
  updateUserChat(input: $input, condition: $condition) {
    id
    ownerID
    unreadMessageCount
    lastMessage
    lastReadAt
    isMuted
    userID
    chatID
    createdAt
    updatedAt
    userChatsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserChatMutationVariables,
  APITypes.UpdateUserChatMutation
>;
export const createChat = /* GraphQL */ `mutation CreateChat(
  $input: CreateChatInput!
  $condition: ModelChatConditionInput
) {
  createChat(input: $input, condition: $condition) {
    id
    name
    isGroup
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateChatMutationVariables,
  APITypes.CreateChatMutation
>;
export const createMessage = /* GraphQL */ `mutation CreateMessage(
  $input: CreateMessageInput!
  $condition: ModelMessageConditionInput
) {
  createMessage(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateMessageMutationVariables,
  APITypes.CreateMessageMutation
>;
export const updateMessage = /* GraphQL */ `mutation UpdateMessage(
  $input: UpdateMessageInput!
  $condition: ModelMessageConditionInput
) {
  updateMessage(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateMessageMutationVariables,
  APITypes.UpdateMessageMutation
>;
export const deleteMessage = /* GraphQL */ `mutation DeleteMessage(
  $input: DeleteMessageInput!
  $condition: ModelMessageConditionInput
) {
  deleteMessage(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteMessageMutationVariables,
  APITypes.DeleteMessageMutation
>;
export const createUserGroup = /* GraphQL */ `mutation CreateUserGroup(
  $input: CreateUserGroupInput!
  $condition: ModelUserGroupConditionInput
) {
  createUserGroup(input: $input, condition: $condition) {
    id
    ownerID
    userID
    groupID
    role
    createdAt
    updatedAt
    userGroupsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserGroupMutationVariables,
  APITypes.CreateUserGroupMutation
>;
export const updateUserGroup = /* GraphQL */ `mutation UpdateUserGroup(
  $input: UpdateUserGroupInput!
  $condition: ModelUserGroupConditionInput
) {
  updateUserGroup(input: $input, condition: $condition) {
    id
    ownerID
    userID
    groupID
    role
    createdAt
    updatedAt
    userGroupsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserGroupMutationVariables,
  APITypes.UpdateUserGroupMutation
>;
export const createGroup = /* GraphQL */ `mutation CreateGroup(
  $input: CreateGroupInput!
  $condition: ModelGroupConditionInput
) {
  createGroup(input: $input, condition: $condition) {
    id
    groupName
    groupURL
    description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateGroupMutationVariables,
  APITypes.CreateGroupMutation
>;
export const updateGroup = /* GraphQL */ `mutation UpdateGroup(
  $input: UpdateGroupInput!
  $condition: ModelGroupConditionInput
) {
  updateGroup(input: $input, condition: $condition) {
    id
    groupName
    groupURL
    description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateGroupMutationVariables,
  APITypes.UpdateGroupMutation
>;
