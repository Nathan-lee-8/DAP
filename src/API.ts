/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  email: string,
  firstname?: string | null,
  lastname?: string | null,
  phonenumber?: string | null,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  firstname?: ModelStringInput | null,
  lastname?: ModelStringInput | null,
  phonenumber?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type User = {
  __typename: "User",
  id: string,
  email: string,
  firstname?: string | null,
  lastname?: string | null,
  phonenumber?: string | null,
  posts?: ModelPostConnection | null,
  followings?: ModelFollowingConnection | null,
  chats?: ModelUserChatConnection | null,
  messages?: ModelMessageConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection",
  items:  Array<Post | null >,
  nextToken?: string | null,
};

export type Post = {
  __typename: "Post",
  id: string,
  title: string,
  content: string,
  type: string,
  createdAt: string,
  userID: string,
  user?: User | null,
  updatedAt: string,
  userPostsId?: string | null,
};

export type ModelFollowingConnection = {
  __typename: "ModelFollowingConnection",
  items:  Array<Following | null >,
  nextToken?: string | null,
};

export type Following = {
  __typename: "Following",
  id: string,
  userID: string,
  followedUserID: string,
  followedUser?: User | null,
  followedAt: string,
  createdAt: string,
  updatedAt: string,
  userFollowingsId?: string | null,
};

export type ModelUserChatConnection = {
  __typename: "ModelUserChatConnection",
  items:  Array<UserChat | null >,
  nextToken?: string | null,
};

export type UserChat = {
  __typename: "UserChat",
  id: string,
  userID: string,
  user?: User | null,
  chatID: string,
  chat?: Chat | null,
  joinedAt: string,
  unreadMessageCount?: number | null,
  lastReadAt?: string | null,
  isMuted?: boolean | null,
  createdAt: string,
  updatedAt: string,
  userChatsId?: string | null,
  chatParticipantsId?: string | null,
};

export type Chat = {
  __typename: "Chat",
  id: string,
  name: string,
  isGroup: boolean,
  createdAt: string,
  messages?: ModelMessageConnection | null,
  participants?: ModelUserChatConnection | null,
  updatedAt: string,
};

export type ModelMessageConnection = {
  __typename: "ModelMessageConnection",
  items:  Array<Message | null >,
  nextToken?: string | null,
};

export type Message = {
  __typename: "Message",
  id: string,
  content: string,
  senderID: string,
  sender?: User | null,
  chatID: string,
  chat?: Chat | null,
  createdAt: string,
  updatedAt: string,
  userMessagesId?: string | null,
  chatMessagesId?: string | null,
};

export type UpdateUserInput = {
  id: string,
  email?: string | null,
  firstname?: string | null,
  lastname?: string | null,
  phonenumber?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreatePostInput = {
  id?: string | null,
  title: string,
  content: string,
  type: string,
  createdAt?: string | null,
  userID: string,
  userPostsId?: string | null,
};

export type ModelPostConditionInput = {
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
  updatedAt?: ModelStringInput | null,
  userPostsId?: ModelIDInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdatePostInput = {
  id: string,
  title?: string | null,
  content?: string | null,
  type?: string | null,
  createdAt?: string | null,
  userID?: string | null,
  userPostsId?: string | null,
};

export type DeletePostInput = {
  id: string,
};

export type CreateFollowingInput = {
  id?: string | null,
  userID: string,
  followedUserID: string,
  followedAt: string,
  userFollowingsId?: string | null,
};

export type ModelFollowingConditionInput = {
  userID?: ModelIDInput | null,
  followedUserID?: ModelIDInput | null,
  followedAt?: ModelStringInput | null,
  and?: Array< ModelFollowingConditionInput | null > | null,
  or?: Array< ModelFollowingConditionInput | null > | null,
  not?: ModelFollowingConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userFollowingsId?: ModelIDInput | null,
};

export type UpdateFollowingInput = {
  id: string,
  userID?: string | null,
  followedUserID?: string | null,
  followedAt?: string | null,
  userFollowingsId?: string | null,
};

export type DeleteFollowingInput = {
  id: string,
};

export type CreateUserChatInput = {
  id?: string | null,
  userID: string,
  chatID: string,
  joinedAt: string,
  unreadMessageCount?: number | null,
  lastReadAt?: string | null,
  isMuted?: boolean | null,
  userChatsId?: string | null,
  chatParticipantsId?: string | null,
};

export type ModelUserChatConditionInput = {
  userID?: ModelIDInput | null,
  chatID?: ModelIDInput | null,
  joinedAt?: ModelStringInput | null,
  unreadMessageCount?: ModelIntInput | null,
  lastReadAt?: ModelStringInput | null,
  isMuted?: ModelBooleanInput | null,
  and?: Array< ModelUserChatConditionInput | null > | null,
  or?: Array< ModelUserChatConditionInput | null > | null,
  not?: ModelUserChatConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userChatsId?: ModelIDInput | null,
  chatParticipantsId?: ModelIDInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateUserChatInput = {
  id: string,
  userID?: string | null,
  chatID?: string | null,
  joinedAt?: string | null,
  unreadMessageCount?: number | null,
  lastReadAt?: string | null,
  isMuted?: boolean | null,
  userChatsId?: string | null,
  chatParticipantsId?: string | null,
};

export type DeleteUserChatInput = {
  id: string,
};

export type CreateChatInput = {
  id?: string | null,
  name: string,
  isGroup: boolean,
  createdAt?: string | null,
};

export type ModelChatConditionInput = {
  name?: ModelStringInput | null,
  isGroup?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelChatConditionInput | null > | null,
  or?: Array< ModelChatConditionInput | null > | null,
  not?: ModelChatConditionInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateChatInput = {
  id: string,
  name?: string | null,
  isGroup?: boolean | null,
  createdAt?: string | null,
};

export type DeleteChatInput = {
  id: string,
};

export type CreateMessageInput = {
  id?: string | null,
  content: string,
  senderID: string,
  chatID: string,
  createdAt?: string | null,
  userMessagesId?: string | null,
  chatMessagesId?: string | null,
};

export type ModelMessageConditionInput = {
  content?: ModelStringInput | null,
  senderID?: ModelIDInput | null,
  chatID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelMessageConditionInput | null > | null,
  or?: Array< ModelMessageConditionInput | null > | null,
  not?: ModelMessageConditionInput | null,
  updatedAt?: ModelStringInput | null,
  userMessagesId?: ModelIDInput | null,
  chatMessagesId?: ModelIDInput | null,
};

export type UpdateMessageInput = {
  id: string,
  content?: string | null,
  senderID?: string | null,
  chatID?: string | null,
  createdAt?: string | null,
  userMessagesId?: string | null,
  chatMessagesId?: string | null,
};

export type DeleteMessageInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  firstname?: ModelStringInput | null,
  lastname?: ModelStringInput | null,
  phonenumber?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelPostFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
  userPostsId?: ModelIDInput | null,
};

export type ModelFollowingFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  followedUserID?: ModelIDInput | null,
  followedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelFollowingFilterInput | null > | null,
  or?: Array< ModelFollowingFilterInput | null > | null,
  not?: ModelFollowingFilterInput | null,
  userFollowingsId?: ModelIDInput | null,
};

export type ModelUserChatFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  chatID?: ModelIDInput | null,
  joinedAt?: ModelStringInput | null,
  unreadMessageCount?: ModelIntInput | null,
  lastReadAt?: ModelStringInput | null,
  isMuted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserChatFilterInput | null > | null,
  or?: Array< ModelUserChatFilterInput | null > | null,
  not?: ModelUserChatFilterInput | null,
  userChatsId?: ModelIDInput | null,
  chatParticipantsId?: ModelIDInput | null,
};

export type ModelChatFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  isGroup?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelChatFilterInput | null > | null,
  or?: Array< ModelChatFilterInput | null > | null,
  not?: ModelChatFilterInput | null,
};

export type ModelChatConnection = {
  __typename: "ModelChatConnection",
  items:  Array<Chat | null >,
  nextToken?: string | null,
};

export type ModelMessageFilterInput = {
  id?: ModelIDInput | null,
  content?: ModelStringInput | null,
  senderID?: ModelIDInput | null,
  chatID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMessageFilterInput | null > | null,
  or?: Array< ModelMessageFilterInput | null > | null,
  not?: ModelMessageFilterInput | null,
  userMessagesId?: ModelIDInput | null,
  chatMessagesId?: ModelIDInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  email?: ModelSubscriptionStringInput | null,
  firstname?: ModelSubscriptionStringInput | null,
  lastname?: ModelSubscriptionStringInput | null,
  phonenumber?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  userPostsId?: ModelSubscriptionIDInput | null,
  userFollowingsId?: ModelSubscriptionIDInput | null,
  userChatsId?: ModelSubscriptionIDInput | null,
  userMessagesId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionPostFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  content?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPostFilterInput | null > | null,
  or?: Array< ModelSubscriptionPostFilterInput | null > | null,
};

export type ModelSubscriptionFollowingFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  followedUserID?: ModelSubscriptionIDInput | null,
  followedAt?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionFollowingFilterInput | null > | null,
  or?: Array< ModelSubscriptionFollowingFilterInput | null > | null,
};

export type ModelSubscriptionUserChatFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  chatID?: ModelSubscriptionIDInput | null,
  joinedAt?: ModelSubscriptionStringInput | null,
  unreadMessageCount?: ModelSubscriptionIntInput | null,
  lastReadAt?: ModelSubscriptionStringInput | null,
  isMuted?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserChatFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserChatFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionChatFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  isGroup?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionChatFilterInput | null > | null,
  or?: Array< ModelSubscriptionChatFilterInput | null > | null,
  chatMessagesId?: ModelSubscriptionIDInput | null,
  chatParticipantsId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionMessageFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  content?: ModelSubscriptionStringInput | null,
  senderID?: ModelSubscriptionIDInput | null,
  chatID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMessageFilterInput | null > | null,
  or?: Array< ModelSubscriptionMessageFilterInput | null > | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    email: string,
    firstname?: string | null,
    lastname?: string | null,
    phonenumber?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    followings?:  {
      __typename: "ModelFollowingConnection",
      nextToken?: string | null,
    } | null,
    chats?:  {
      __typename: "ModelUserChatConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    firstname?: string | null,
    lastname?: string | null,
    phonenumber?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    followings?:  {
      __typename: "ModelFollowingConnection",
      nextToken?: string | null,
    } | null,
    chats?:  {
      __typename: "ModelUserChatConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    firstname?: string | null,
    lastname?: string | null,
    phonenumber?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    followings?:  {
      __typename: "ModelFollowingConnection",
      nextToken?: string | null,
    } | null,
    chats?:  {
      __typename: "ModelUserChatConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePostMutationVariables = {
  input: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    type: string,
    createdAt: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
    userPostsId?: string | null,
  } | null,
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    type: string,
    createdAt: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
    userPostsId?: string | null,
  } | null,
};

export type DeletePostMutationVariables = {
  input: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    type: string,
    createdAt: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
    userPostsId?: string | null,
  } | null,
};

export type CreateFollowingMutationVariables = {
  input: CreateFollowingInput,
  condition?: ModelFollowingConditionInput | null,
};

export type CreateFollowingMutation = {
  createFollowing?:  {
    __typename: "Following",
    id: string,
    userID: string,
    followedUserID: string,
    followedUser?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    followedAt: string,
    createdAt: string,
    updatedAt: string,
    userFollowingsId?: string | null,
  } | null,
};

export type UpdateFollowingMutationVariables = {
  input: UpdateFollowingInput,
  condition?: ModelFollowingConditionInput | null,
};

export type UpdateFollowingMutation = {
  updateFollowing?:  {
    __typename: "Following",
    id: string,
    userID: string,
    followedUserID: string,
    followedUser?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    followedAt: string,
    createdAt: string,
    updatedAt: string,
    userFollowingsId?: string | null,
  } | null,
};

export type DeleteFollowingMutationVariables = {
  input: DeleteFollowingInput,
  condition?: ModelFollowingConditionInput | null,
};

export type DeleteFollowingMutation = {
  deleteFollowing?:  {
    __typename: "Following",
    id: string,
    userID: string,
    followedUserID: string,
    followedUser?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    followedAt: string,
    createdAt: string,
    updatedAt: string,
    userFollowingsId?: string | null,
  } | null,
};

export type CreateUserChatMutationVariables = {
  input: CreateUserChatInput,
  condition?: ModelUserChatConditionInput | null,
};

export type CreateUserChatMutation = {
  createUserChat?:  {
    __typename: "UserChat",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatID: string,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    joinedAt: string,
    unreadMessageCount?: number | null,
    lastReadAt?: string | null,
    isMuted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    userChatsId?: string | null,
    chatParticipantsId?: string | null,
  } | null,
};

export type UpdateUserChatMutationVariables = {
  input: UpdateUserChatInput,
  condition?: ModelUserChatConditionInput | null,
};

export type UpdateUserChatMutation = {
  updateUserChat?:  {
    __typename: "UserChat",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatID: string,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    joinedAt: string,
    unreadMessageCount?: number | null,
    lastReadAt?: string | null,
    isMuted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    userChatsId?: string | null,
    chatParticipantsId?: string | null,
  } | null,
};

export type DeleteUserChatMutationVariables = {
  input: DeleteUserChatInput,
  condition?: ModelUserChatConditionInput | null,
};

export type DeleteUserChatMutation = {
  deleteUserChat?:  {
    __typename: "UserChat",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatID: string,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    joinedAt: string,
    unreadMessageCount?: number | null,
    lastReadAt?: string | null,
    isMuted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    userChatsId?: string | null,
    chatParticipantsId?: string | null,
  } | null,
};

export type CreateChatMutationVariables = {
  input: CreateChatInput,
  condition?: ModelChatConditionInput | null,
};

export type CreateChatMutation = {
  createChat?:  {
    __typename: "Chat",
    id: string,
    name: string,
    isGroup: boolean,
    createdAt: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    participants?:  {
      __typename: "ModelUserChatConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateChatMutationVariables = {
  input: UpdateChatInput,
  condition?: ModelChatConditionInput | null,
};

export type UpdateChatMutation = {
  updateChat?:  {
    __typename: "Chat",
    id: string,
    name: string,
    isGroup: boolean,
    createdAt: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    participants?:  {
      __typename: "ModelUserChatConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteChatMutationVariables = {
  input: DeleteChatInput,
  condition?: ModelChatConditionInput | null,
};

export type DeleteChatMutation = {
  deleteChat?:  {
    __typename: "Chat",
    id: string,
    name: string,
    isGroup: boolean,
    createdAt: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    participants?:  {
      __typename: "ModelUserChatConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateMessageMutationVariables = {
  input: CreateMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type CreateMessageMutation = {
  createMessage?:  {
    __typename: "Message",
    id: string,
    content: string,
    senderID: string,
    sender?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatID: string,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    userMessagesId?: string | null,
    chatMessagesId?: string | null,
  } | null,
};

export type UpdateMessageMutationVariables = {
  input: UpdateMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type UpdateMessageMutation = {
  updateMessage?:  {
    __typename: "Message",
    id: string,
    content: string,
    senderID: string,
    sender?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatID: string,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    userMessagesId?: string | null,
    chatMessagesId?: string | null,
  } | null,
};

export type DeleteMessageMutationVariables = {
  input: DeleteMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type DeleteMessageMutation = {
  deleteMessage?:  {
    __typename: "Message",
    id: string,
    content: string,
    senderID: string,
    sender?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatID: string,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    userMessagesId?: string | null,
    chatMessagesId?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    email: string,
    firstname?: string | null,
    lastname?: string | null,
    phonenumber?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    followings?:  {
      __typename: "ModelFollowingConnection",
      nextToken?: string | null,
    } | null,
    chats?:  {
      __typename: "ModelUserChatConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPostQueryVariables = {
  id: string,
};

export type GetPostQuery = {
  getPost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    type: string,
    createdAt: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
    userPostsId?: string | null,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      type: string,
      createdAt: string,
      userID: string,
      updatedAt: string,
      userPostsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetFollowingQueryVariables = {
  id: string,
};

export type GetFollowingQuery = {
  getFollowing?:  {
    __typename: "Following",
    id: string,
    userID: string,
    followedUserID: string,
    followedUser?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    followedAt: string,
    createdAt: string,
    updatedAt: string,
    userFollowingsId?: string | null,
  } | null,
};

export type ListFollowingsQueryVariables = {
  filter?: ModelFollowingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFollowingsQuery = {
  listFollowings?:  {
    __typename: "ModelFollowingConnection",
    items:  Array< {
      __typename: "Following",
      id: string,
      userID: string,
      followedUserID: string,
      followedAt: string,
      createdAt: string,
      updatedAt: string,
      userFollowingsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserChatQueryVariables = {
  id: string,
};

export type GetUserChatQuery = {
  getUserChat?:  {
    __typename: "UserChat",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatID: string,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    joinedAt: string,
    unreadMessageCount?: number | null,
    lastReadAt?: string | null,
    isMuted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    userChatsId?: string | null,
    chatParticipantsId?: string | null,
  } | null,
};

export type ListUserChatsQueryVariables = {
  filter?: ModelUserChatFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserChatsQuery = {
  listUserChats?:  {
    __typename: "ModelUserChatConnection",
    items:  Array< {
      __typename: "UserChat",
      id: string,
      userID: string,
      chatID: string,
      joinedAt: string,
      unreadMessageCount?: number | null,
      lastReadAt?: string | null,
      isMuted?: boolean | null,
      createdAt: string,
      updatedAt: string,
      userChatsId?: string | null,
      chatParticipantsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetChatQueryVariables = {
  id: string,
};

export type GetChatQuery = {
  getChat?:  {
    __typename: "Chat",
    id: string,
    name: string,
    isGroup: boolean,
    createdAt: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    participants?:  {
      __typename: "ModelUserChatConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type ListChatsQueryVariables = {
  filter?: ModelChatFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChatsQuery = {
  listChats?:  {
    __typename: "ModelChatConnection",
    items:  Array< {
      __typename: "Chat",
      id: string,
      name: string,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMessageQueryVariables = {
  id: string,
};

export type GetMessageQuery = {
  getMessage?:  {
    __typename: "Message",
    id: string,
    content: string,
    senderID: string,
    sender?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatID: string,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    userMessagesId?: string | null,
    chatMessagesId?: string | null,
  } | null,
};

export type ListMessagesQueryVariables = {
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesQuery = {
  listMessages?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      content: string,
      senderID: string,
      chatID: string,
      createdAt: string,
      updatedAt: string,
      userMessagesId?: string | null,
      chatMessagesId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserByEmailQueryVariables = {
  email: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserByEmailQuery = {
  userByEmail?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PostsByDateQueryVariables = {
  type: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostsByDateQuery = {
  postsByDate?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      type: string,
      createdAt: string,
      userID: string,
      updatedAt: string,
      userPostsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type FollowingsByUserQueryVariables = {
  userID: string,
  followedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFollowingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FollowingsByUserQuery = {
  followingsByUser?:  {
    __typename: "ModelFollowingConnection",
    items:  Array< {
      __typename: "Following",
      id: string,
      userID: string,
      followedUserID: string,
      followedAt: string,
      createdAt: string,
      updatedAt: string,
      userFollowingsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ChatsByUserQueryVariables = {
  userID: string,
  joinedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserChatFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ChatsByUserQuery = {
  chatsByUser?:  {
    __typename: "ModelUserChatConnection",
    items:  Array< {
      __typename: "UserChat",
      id: string,
      userID: string,
      chatID: string,
      joinedAt: string,
      unreadMessageCount?: number | null,
      lastReadAt?: string | null,
      isMuted?: boolean | null,
      createdAt: string,
      updatedAt: string,
      userChatsId?: string | null,
      chatParticipantsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type MessagesByUserQueryVariables = {
  senderID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type MessagesByUserQuery = {
  messagesByUser?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      content: string,
      senderID: string,
      chatID: string,
      createdAt: string,
      updatedAt: string,
      userMessagesId?: string | null,
      chatMessagesId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type MessagesByChatQueryVariables = {
  chatID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type MessagesByChatQuery = {
  messagesByChat?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      content: string,
      senderID: string,
      chatID: string,
      createdAt: string,
      updatedAt: string,
      userMessagesId?: string | null,
      chatMessagesId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    firstname?: string | null,
    lastname?: string | null,
    phonenumber?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    followings?:  {
      __typename: "ModelFollowingConnection",
      nextToken?: string | null,
    } | null,
    chats?:  {
      __typename: "ModelUserChatConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    firstname?: string | null,
    lastname?: string | null,
    phonenumber?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    followings?:  {
      __typename: "ModelFollowingConnection",
      nextToken?: string | null,
    } | null,
    chats?:  {
      __typename: "ModelUserChatConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    firstname?: string | null,
    lastname?: string | null,
    phonenumber?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    followings?:  {
      __typename: "ModelFollowingConnection",
      nextToken?: string | null,
    } | null,
    chats?:  {
      __typename: "ModelUserChatConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
};

export type OnCreatePostSubscription = {
  onCreatePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    type: string,
    createdAt: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
    userPostsId?: string | null,
  } | null,
};

export type OnUpdatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    type: string,
    createdAt: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
    userPostsId?: string | null,
  } | null,
};

export type OnDeletePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
};

export type OnDeletePostSubscription = {
  onDeletePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    type: string,
    createdAt: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
    userPostsId?: string | null,
  } | null,
};

export type OnCreateFollowingSubscriptionVariables = {
  filter?: ModelSubscriptionFollowingFilterInput | null,
};

export type OnCreateFollowingSubscription = {
  onCreateFollowing?:  {
    __typename: "Following",
    id: string,
    userID: string,
    followedUserID: string,
    followedUser?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    followedAt: string,
    createdAt: string,
    updatedAt: string,
    userFollowingsId?: string | null,
  } | null,
};

export type OnUpdateFollowingSubscriptionVariables = {
  filter?: ModelSubscriptionFollowingFilterInput | null,
};

export type OnUpdateFollowingSubscription = {
  onUpdateFollowing?:  {
    __typename: "Following",
    id: string,
    userID: string,
    followedUserID: string,
    followedUser?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    followedAt: string,
    createdAt: string,
    updatedAt: string,
    userFollowingsId?: string | null,
  } | null,
};

export type OnDeleteFollowingSubscriptionVariables = {
  filter?: ModelSubscriptionFollowingFilterInput | null,
};

export type OnDeleteFollowingSubscription = {
  onDeleteFollowing?:  {
    __typename: "Following",
    id: string,
    userID: string,
    followedUserID: string,
    followedUser?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    followedAt: string,
    createdAt: string,
    updatedAt: string,
    userFollowingsId?: string | null,
  } | null,
};

export type OnCreateUserChatSubscriptionVariables = {
  filter?: ModelSubscriptionUserChatFilterInput | null,
};

export type OnCreateUserChatSubscription = {
  onCreateUserChat?:  {
    __typename: "UserChat",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatID: string,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    joinedAt: string,
    unreadMessageCount?: number | null,
    lastReadAt?: string | null,
    isMuted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    userChatsId?: string | null,
    chatParticipantsId?: string | null,
  } | null,
};

export type OnUpdateUserChatSubscriptionVariables = {
  filter?: ModelSubscriptionUserChatFilterInput | null,
};

export type OnUpdateUserChatSubscription = {
  onUpdateUserChat?:  {
    __typename: "UserChat",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatID: string,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    joinedAt: string,
    unreadMessageCount?: number | null,
    lastReadAt?: string | null,
    isMuted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    userChatsId?: string | null,
    chatParticipantsId?: string | null,
  } | null,
};

export type OnDeleteUserChatSubscriptionVariables = {
  filter?: ModelSubscriptionUserChatFilterInput | null,
};

export type OnDeleteUserChatSubscription = {
  onDeleteUserChat?:  {
    __typename: "UserChat",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatID: string,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    joinedAt: string,
    unreadMessageCount?: number | null,
    lastReadAt?: string | null,
    isMuted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    userChatsId?: string | null,
    chatParticipantsId?: string | null,
  } | null,
};

export type OnCreateChatSubscriptionVariables = {
  filter?: ModelSubscriptionChatFilterInput | null,
};

export type OnCreateChatSubscription = {
  onCreateChat?:  {
    __typename: "Chat",
    id: string,
    name: string,
    isGroup: boolean,
    createdAt: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    participants?:  {
      __typename: "ModelUserChatConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateChatSubscriptionVariables = {
  filter?: ModelSubscriptionChatFilterInput | null,
};

export type OnUpdateChatSubscription = {
  onUpdateChat?:  {
    __typename: "Chat",
    id: string,
    name: string,
    isGroup: boolean,
    createdAt: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    participants?:  {
      __typename: "ModelUserChatConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteChatSubscriptionVariables = {
  filter?: ModelSubscriptionChatFilterInput | null,
};

export type OnDeleteChatSubscription = {
  onDeleteChat?:  {
    __typename: "Chat",
    id: string,
    name: string,
    isGroup: boolean,
    createdAt: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    participants?:  {
      __typename: "ModelUserChatConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnCreateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
};

export type OnCreateMessageSubscription = {
  onCreateMessage?:  {
    __typename: "Message",
    id: string,
    content: string,
    senderID: string,
    sender?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatID: string,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    userMessagesId?: string | null,
    chatMessagesId?: string | null,
  } | null,
};

export type OnUpdateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
};

export type OnUpdateMessageSubscription = {
  onUpdateMessage?:  {
    __typename: "Message",
    id: string,
    content: string,
    senderID: string,
    sender?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatID: string,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    userMessagesId?: string | null,
    chatMessagesId?: string | null,
  } | null,
};

export type OnDeleteMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
};

export type OnDeleteMessageSubscription = {
  onDeleteMessage?:  {
    __typename: "Message",
    id: string,
    content: string,
    senderID: string,
    sender?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      phonenumber?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    chatID: string,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    userMessagesId?: string | null,
    chatMessagesId?: string | null,
  } | null,
};
