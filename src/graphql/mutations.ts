/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
    messages {
      nextToken
      __typename
    }
    createdAt
    updatedAt
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
    messages {
      nextToken
      __typename
    }
    createdAt
    updatedAt
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
    messages {
      nextToken
      __typename
    }
    createdAt
    updatedAt
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
` as GeneratedMutation<
  APITypes.DeletePostMutationVariables,
  APITypes.DeletePostMutation
>;
export const createFollowing = /* GraphQL */ `mutation CreateFollowing(
  $input: CreateFollowingInput!
  $condition: ModelFollowingConditionInput
) {
  createFollowing(input: $input, condition: $condition) {
    id
    userID
    followedUserID
    followedUser {
      id
      email
      firstname
      lastname
      phonenumber
      createdAt
      updatedAt
      __typename
    }
    followedAt
    createdAt
    updatedAt
    userFollowingsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateFollowingMutationVariables,
  APITypes.CreateFollowingMutation
>;
export const updateFollowing = /* GraphQL */ `mutation UpdateFollowing(
  $input: UpdateFollowingInput!
  $condition: ModelFollowingConditionInput
) {
  updateFollowing(input: $input, condition: $condition) {
    id
    userID
    followedUserID
    followedUser {
      id
      email
      firstname
      lastname
      phonenumber
      createdAt
      updatedAt
      __typename
    }
    followedAt
    createdAt
    updatedAt
    userFollowingsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateFollowingMutationVariables,
  APITypes.UpdateFollowingMutation
>;
export const deleteFollowing = /* GraphQL */ `mutation DeleteFollowing(
  $input: DeleteFollowingInput!
  $condition: ModelFollowingConditionInput
) {
  deleteFollowing(input: $input, condition: $condition) {
    id
    userID
    followedUserID
    followedUser {
      id
      email
      firstname
      lastname
      phonenumber
      createdAt
      updatedAt
      __typename
    }
    followedAt
    createdAt
    updatedAt
    userFollowingsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteFollowingMutationVariables,
  APITypes.DeleteFollowingMutation
>;
export const createUserChat = /* GraphQL */ `mutation CreateUserChat(
  $input: CreateUserChatInput!
  $condition: ModelUserChatConditionInput
) {
  createUserChat(input: $input, condition: $condition) {
    id
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
    chatID
    chat {
      id
      name
      isGroup
      createdAt
      updatedAt
      __typename
    }
    joinedAt
    unreadMessageCount
    lastReadAt
    isMuted
    createdAt
    updatedAt
    userChatsId
    chatParticipantsId
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
    chatID
    chat {
      id
      name
      isGroup
      createdAt
      updatedAt
      __typename
    }
    joinedAt
    unreadMessageCount
    lastReadAt
    isMuted
    createdAt
    updatedAt
    userChatsId
    chatParticipantsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserChatMutationVariables,
  APITypes.UpdateUserChatMutation
>;
export const deleteUserChat = /* GraphQL */ `mutation DeleteUserChat(
  $input: DeleteUserChatInput!
  $condition: ModelUserChatConditionInput
) {
  deleteUserChat(input: $input, condition: $condition) {
    id
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
    chatID
    chat {
      id
      name
      isGroup
      createdAt
      updatedAt
      __typename
    }
    joinedAt
    unreadMessageCount
    lastReadAt
    isMuted
    createdAt
    updatedAt
    userChatsId
    chatParticipantsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserChatMutationVariables,
  APITypes.DeleteUserChatMutation
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
` as GeneratedMutation<
  APITypes.CreateChatMutationVariables,
  APITypes.CreateChatMutation
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
` as GeneratedMutation<
  APITypes.DeleteChatMutationVariables,
  APITypes.DeleteChatMutation
>;
export const createMessage = /* GraphQL */ `mutation CreateMessage(
  $input: CreateMessageInput!
  $condition: ModelMessageConditionInput
) {
  createMessage(input: $input, condition: $condition) {
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
    userMessagesId
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
    userMessagesId
    chatMessagesId
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
    userMessagesId
    chatMessagesId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMessageMutationVariables,
  APITypes.DeleteMessageMutation
>;
