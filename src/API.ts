/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type DeleteUserChatInput = {
  id: string,
};

export type ModelUserChatConditionInput = {
  ownerID?: ModelIDInput | null,
  unreadMessageCount?: ModelIntInput | null,
  lastMessage?: ModelStringInput | null,
  lastReadAt?: ModelStringInput | null,
  isMuted?: ModelBooleanInput | null,
  userID?: ModelIDInput | null,
  chatID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelUserChatConditionInput | null > | null,
  or?: Array< ModelUserChatConditionInput | null > | null,
  not?: ModelUserChatConditionInput | null,
  updatedAt?: ModelStringInput | null,
  userChatsId?: ModelIDInput | null,
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

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UserChat = {
  __typename: "UserChat",
  id: string,
  ownerID: string,
  unreadMessageCount?: number | null,
  lastMessage?: string | null,
  lastReadAt?: string | null,
  isMuted?: boolean | null,
  userID: string,
  chatID: string,
  user?: User | null,
  chat?: Chat | null,
  createdAt: string,
  updatedAt: string,
  userChatsId?: string | null,
};

export type User = {
  __typename: "User",
  id: string,
  email: string,
  firstname?: string | null,
  lastname?: string | null,
  profileURL?: string | null,
  posts?: ModelPostConnection | null,
  chats?: ModelUserChatConnection | null,
  messages?: ModelMessageConnection | null,
  groups?: ModelUserGroupConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
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
  postURL?: Array< string | null > | null,
  groupID: string,
  userID: string,
  user?: User | null,
  group?: Group | null,
  createdAt: string,
  updatedAt: string,
  userPostsId?: string | null,
  owner?: string | null,
};

export type Group = {
  __typename: "Group",
  id: string,
  groupName: string,
  groupURL?: string | null,
  description?: string | null,
  createdAt: string,
  members?: ModelUserGroupConnection | null,
  posts?: ModelPostConnection | null,
  updatedAt: string,
};

export type ModelUserGroupConnection = {
  __typename: "ModelUserGroupConnection",
  items:  Array<UserGroup | null >,
  nextToken?: string | null,
};

export type UserGroup = {
  __typename: "UserGroup",
  id: string,
  ownerID: string,
  userID: string,
  groupID: string,
  role?: string | null,
  user?: User | null,
  group?: Group | null,
  createdAt: string,
  updatedAt: string,
  userGroupsId?: string | null,
};

export type ModelUserChatConnection = {
  __typename: "ModelUserChatConnection",
  items:  Array<UserChat | null >,
  nextToken?: string | null,
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
  msgURL?: Array< string | null > | null,
  senderID: string,
  chatID: string,
  sender?: User | null,
  chat?: Chat | null,
  createdAt: string,
  updatedAt: string,
  userMessagesId?: string | null,
  owner?: string | null,
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

export type UpdateChatInput = {
  id: string,
  name?: string | null,
  isGroup?: boolean | null,
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

export type DeleteChatInput = {
  id: string,
};

export type DeleteUserGroupInput = {
  id: string,
};

export type ModelUserGroupConditionInput = {
  ownerID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  groupID?: ModelIDInput | null,
  role?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelUserGroupConditionInput | null > | null,
  or?: Array< ModelUserGroupConditionInput | null > | null,
  not?: ModelUserGroupConditionInput | null,
  updatedAt?: ModelStringInput | null,
  userGroupsId?: ModelIDInput | null,
};

export type DeleteGroupInput = {
  id: string,
};

export type ModelGroupConditionInput = {
  groupName?: ModelStringInput | null,
  groupURL?: ModelStringInput | null,
  description?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelGroupConditionInput | null > | null,
  or?: Array< ModelGroupConditionInput | null > | null,
  not?: ModelGroupConditionInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateUserInput = {
  id?: string | null,
  email: string,
  firstname?: string | null,
  lastname?: string | null,
  profileURL?: string | null,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  firstname?: ModelStringInput | null,
  lastname?: ModelStringInput | null,
  profileURL?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type UpdateUserInput = {
  id: string,
  email?: string | null,
  firstname?: string | null,
  lastname?: string | null,
  profileURL?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreatePostInput = {
  id?: string | null,
  title: string,
  content: string,
  postURL?: Array< string | null > | null,
  groupID: string,
  userID: string,
  createdAt?: string | null,
  userPostsId?: string | null,
};

export type ModelPostConditionInput = {
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  postURL?: ModelStringInput | null,
  groupID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
  updatedAt?: ModelStringInput | null,
  userPostsId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type UpdatePostInput = {
  id: string,
  title?: string | null,
  content?: string | null,
  postURL?: Array< string | null > | null,
  groupID?: string | null,
  userID?: string | null,
  createdAt?: string | null,
  userPostsId?: string | null,
};

export type DeletePostInput = {
  id: string,
};

export type CreateUserChatInput = {
  id?: string | null,
  ownerID: string,
  unreadMessageCount?: number | null,
  lastMessage?: string | null,
  lastReadAt?: string | null,
  isMuted?: boolean | null,
  userID: string,
  chatID: string,
  createdAt?: string | null,
  userChatsId?: string | null,
};

export type UpdateUserChatInput = {
  id: string,
  ownerID?: string | null,
  unreadMessageCount?: number | null,
  lastMessage?: string | null,
  lastReadAt?: string | null,
  isMuted?: boolean | null,
  userID?: string | null,
  chatID?: string | null,
  createdAt?: string | null,
  userChatsId?: string | null,
};

export type CreateChatInput = {
  id?: string | null,
  name: string,
  isGroup: boolean,
  createdAt?: string | null,
};

export type CreateMessageInput = {
  id?: string | null,
  content: string,
  msgURL?: Array< string | null > | null,
  senderID: string,
  chatID: string,
  createdAt?: string | null,
  userMessagesId?: string | null,
};

export type ModelMessageConditionInput = {
  content?: ModelStringInput | null,
  msgURL?: ModelStringInput | null,
  senderID?: ModelIDInput | null,
  chatID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelMessageConditionInput | null > | null,
  or?: Array< ModelMessageConditionInput | null > | null,
  not?: ModelMessageConditionInput | null,
  updatedAt?: ModelStringInput | null,
  userMessagesId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type UpdateMessageInput = {
  id: string,
  content?: string | null,
  msgURL?: Array< string | null > | null,
  senderID?: string | null,
  chatID?: string | null,
  createdAt?: string | null,
  userMessagesId?: string | null,
};

export type DeleteMessageInput = {
  id: string,
};

export type CreateUserGroupInput = {
  id?: string | null,
  ownerID: string,
  userID: string,
  groupID: string,
  role?: string | null,
  createdAt?: string | null,
  userGroupsId?: string | null,
};

export type UpdateUserGroupInput = {
  id: string,
  ownerID?: string | null,
  userID?: string | null,
  groupID?: string | null,
  role?: string | null,
  createdAt?: string | null,
  userGroupsId?: string | null,
};

export type CreateGroupInput = {
  id?: string | null,
  groupName: string,
  groupURL?: string | null,
  description?: string | null,
  createdAt?: string | null,
};

export type UpdateGroupInput = {
  id: string,
  groupName?: string | null,
  groupURL?: string | null,
  description?: string | null,
  createdAt?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  firstname?: ModelStringInput | null,
  lastname?: ModelStringInput | null,
  profileURL?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelPostFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  postURL?: ModelStringInput | null,
  groupID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
  userPostsId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelUserChatFilterInput = {
  id?: ModelIDInput | null,
  ownerID?: ModelIDInput | null,
  unreadMessageCount?: ModelIntInput | null,
  lastMessage?: ModelStringInput | null,
  lastReadAt?: ModelStringInput | null,
  isMuted?: ModelBooleanInput | null,
  userID?: ModelIDInput | null,
  chatID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserChatFilterInput | null > | null,
  or?: Array< ModelUserChatFilterInput | null > | null,
  not?: ModelUserChatFilterInput | null,
  userChatsId?: ModelIDInput | null,
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
  msgURL?: ModelStringInput | null,
  senderID?: ModelIDInput | null,
  chatID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMessageFilterInput | null > | null,
  or?: Array< ModelMessageFilterInput | null > | null,
  not?: ModelMessageFilterInput | null,
  userMessagesId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelUserGroupFilterInput = {
  id?: ModelIDInput | null,
  ownerID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  groupID?: ModelIDInput | null,
  role?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserGroupFilterInput | null > | null,
  or?: Array< ModelUserGroupFilterInput | null > | null,
  not?: ModelUserGroupFilterInput | null,
  userGroupsId?: ModelIDInput | null,
};

export type ModelGroupFilterInput = {
  id?: ModelIDInput | null,
  groupName?: ModelStringInput | null,
  groupURL?: ModelStringInput | null,
  description?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelGroupFilterInput | null > | null,
  or?: Array< ModelGroupFilterInput | null > | null,
  not?: ModelGroupFilterInput | null,
};

export type ModelGroupConnection = {
  __typename: "ModelGroupConnection",
  items:  Array<Group | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  email?: ModelSubscriptionStringInput | null,
  firstname?: ModelSubscriptionStringInput | null,
  lastname?: ModelSubscriptionStringInput | null,
  profileURL?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  userPostsId?: ModelSubscriptionIDInput | null,
  userChatsId?: ModelSubscriptionIDInput | null,
  userMessagesId?: ModelSubscriptionIDInput | null,
  userGroupsId?: ModelSubscriptionIDInput | null,
  owner?: ModelStringInput | null,
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
  postURL?: ModelSubscriptionStringInput | null,
  groupID?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPostFilterInput | null > | null,
  or?: Array< ModelSubscriptionPostFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionUserChatFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  unreadMessageCount?: ModelSubscriptionIntInput | null,
  lastMessage?: ModelSubscriptionStringInput | null,
  lastReadAt?: ModelSubscriptionStringInput | null,
  isMuted?: ModelSubscriptionBooleanInput | null,
  userID?: ModelSubscriptionIDInput | null,
  chatID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserChatFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserChatFilterInput | null > | null,
  ownerID?: ModelStringInput | null,
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
};

export type ModelSubscriptionMessageFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  content?: ModelSubscriptionStringInput | null,
  msgURL?: ModelSubscriptionStringInput | null,
  senderID?: ModelSubscriptionIDInput | null,
  chatID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMessageFilterInput | null > | null,
  or?: Array< ModelSubscriptionMessageFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionUserGroupFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  groupID?: ModelSubscriptionIDInput | null,
  role?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserGroupFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserGroupFilterInput | null > | null,
  ownerID?: ModelStringInput | null,
};

export type ModelSubscriptionGroupFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  groupName?: ModelSubscriptionStringInput | null,
  groupURL?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionGroupFilterInput | null > | null,
  or?: Array< ModelSubscriptionGroupFilterInput | null > | null,
};

export type DeleteUserChatMutationVariables = {
  input: DeleteUserChatInput,
  condition?: ModelUserChatConditionInput | null,
};

export type DeleteUserChatMutation = {
  deleteUserChat?:  {
    __typename: "UserChat",
    id: string,
    ownerID: string,
    unreadMessageCount?: number | null,
    lastMessage?: string | null,
    lastReadAt?: string | null,
    isMuted?: boolean | null,
    userID: string,
    chatID: string,
    createdAt: string,
    updatedAt: string,
    userChatsId?: string | null,
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
    updatedAt: string,
  } | null,
};

export type DeleteUserGroupMutationVariables = {
  input: DeleteUserGroupInput,
  condition?: ModelUserGroupConditionInput | null,
};

export type DeleteUserGroupMutation = {
  deleteUserGroup?:  {
    __typename: "UserGroup",
    id: string,
    ownerID: string,
    userID: string,
    groupID: string,
    role?: string | null,
    createdAt: string,
    updatedAt: string,
    userGroupsId?: string | null,
  } | null,
};

export type DeleteGroupMutationVariables = {
  input: DeleteGroupInput,
  condition?: ModelGroupConditionInput | null,
};

export type DeleteGroupMutation = {
  deleteGroup?:  {
    __typename: "Group",
    id: string,
    groupName: string,
    groupURL?: string | null,
    description?: string | null,
    createdAt: string,
    members?:  {
      __typename: "ModelUserGroupConnection",
      nextToken?: string | null,
    } | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
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
    profileURL?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    profileURL?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    profileURL?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    postURL?: Array< string | null > | null,
    groupID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    userPostsId?: string | null,
    owner?: string | null,
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
    postURL?: Array< string | null > | null,
    groupID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    userPostsId?: string | null,
    owner?: string | null,
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
    postURL?: Array< string | null > | null,
    groupID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    userPostsId?: string | null,
    owner?: string | null,
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
    ownerID: string,
    unreadMessageCount?: number | null,
    lastMessage?: string | null,
    lastReadAt?: string | null,
    isMuted?: boolean | null,
    userID: string,
    chatID: string,
    createdAt: string,
    updatedAt: string,
    userChatsId?: string | null,
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
    ownerID: string,
    unreadMessageCount?: number | null,
    lastMessage?: string | null,
    lastReadAt?: string | null,
    isMuted?: boolean | null,
    userID: string,
    chatID: string,
    createdAt: string,
    updatedAt: string,
    userChatsId?: string | null,
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
    msgURL?: Array< string | null > | null,
    senderID: string,
    chatID: string,
    createdAt: string,
    updatedAt: string,
    userMessagesId?: string | null,
    owner?: string | null,
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
    msgURL?: Array< string | null > | null,
    senderID: string,
    chatID: string,
    createdAt: string,
    updatedAt: string,
    userMessagesId?: string | null,
    owner?: string | null,
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
    msgURL?: Array< string | null > | null,
    senderID: string,
    chatID: string,
    createdAt: string,
    updatedAt: string,
    userMessagesId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateUserGroupMutationVariables = {
  input: CreateUserGroupInput,
  condition?: ModelUserGroupConditionInput | null,
};

export type CreateUserGroupMutation = {
  createUserGroup?:  {
    __typename: "UserGroup",
    id: string,
    ownerID: string,
    userID: string,
    groupID: string,
    role?: string | null,
    createdAt: string,
    updatedAt: string,
    userGroupsId?: string | null,
  } | null,
};

export type UpdateUserGroupMutationVariables = {
  input: UpdateUserGroupInput,
  condition?: ModelUserGroupConditionInput | null,
};

export type UpdateUserGroupMutation = {
  updateUserGroup?:  {
    __typename: "UserGroup",
    id: string,
    ownerID: string,
    userID: string,
    groupID: string,
    role?: string | null,
    createdAt: string,
    updatedAt: string,
    userGroupsId?: string | null,
  } | null,
};

export type CreateGroupMutationVariables = {
  input: CreateGroupInput,
  condition?: ModelGroupConditionInput | null,
};

export type CreateGroupMutation = {
  createGroup?:  {
    __typename: "Group",
    id: string,
    groupName: string,
    groupURL?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateGroupMutationVariables = {
  input: UpdateGroupInput,
  condition?: ModelGroupConditionInput | null,
};

export type UpdateGroupMutation = {
  updateGroup?:  {
    __typename: "Group",
    id: string,
    groupName: string,
    groupURL?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
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
    profileURL?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
      profileURL?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
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
      profileURL?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
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
    postURL?: Array< string | null > | null,
    groupID: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      profileURL?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userPostsId?: string | null,
    owner?: string | null,
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
      postURL?: Array< string | null > | null,
      groupID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PostsByDateQueryVariables = {
  groupID: string,
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
      postURL?: Array< string | null > | null,
      groupID: string,
      userID: string,
      user?:  {
        __typename: "User",
        id: string,
        email: string,
        firstname?: string | null,
        lastname?: string | null,
        profileURL?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PostsByUserQueryVariables = {
  userID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostsByUserQuery = {
  postsByUser?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      postURL?: Array< string | null > | null,
      groupID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
      owner?: string | null,
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
    ownerID: string,
    unreadMessageCount?: number | null,
    lastMessage?: string | null,
    lastReadAt?: string | null,
    isMuted?: boolean | null,
    userID: string,
    chatID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      profileURL?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
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
    userChatsId?: string | null,
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
      ownerID: string,
      unreadMessageCount?: number | null,
      lastMessage?: string | null,
      lastReadAt?: string | null,
      isMuted?: boolean | null,
      userID: string,
      chatID: string,
      createdAt: string,
      updatedAt: string,
      userChatsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ChatsByUserQueryVariables = {
  userID: string,
  createdAt?: ModelStringKeyConditionInput | null,
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
      ownerID: string,
      unreadMessageCount?: number | null,
      lastMessage?: string | null,
      lastReadAt?: string | null,
      isMuted?: boolean | null,
      userID: string,
      chatID: string,
      chat?:  {
        __typename: "Chat",
        id: string,
        name: string,
        isGroup: boolean,
        participants?:  {
          __typename: "ModelUserChatConnection",
          items:  Array< {
            __typename: "UserChat",
            id: string,
            ownerID: string,
            userID: string,
            user?:  {
              __typename: "User",
              id: string,
              email: string,
              firstname?: string | null,
              lastname?: string | null,
              profileURL?: string | null,
              createdAt: string,
              updatedAt: string,
              owner?: string | null,
            } | null,
            chatID: string,
            createdAt: string,
            updatedAt: string,
          } | null >,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      userChatsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserChatsByChatIDAndCreatedAtQueryVariables = {
  chatID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserChatFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserChatsByChatIDAndCreatedAtQuery = {
  userChatsByChatIDAndCreatedAt?:  {
    __typename: "ModelUserChatConnection",
    items:  Array< {
      __typename: "UserChat",
      id: string,
      ownerID: string,
      unreadMessageCount?: number | null,
      lastMessage?: string | null,
      lastReadAt?: string | null,
      isMuted?: boolean | null,
      userID: string,
      chatID: string,
      createdAt: string,
      updatedAt: string,
      userChatsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetChatQueryVariables = {
  id: string,
  messagesLimit?: number | null,
  messagesNextToken?: string | null,
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
      items:  Array< {
        __typename: "Message",
        id: string,
        content: string,
        senderID: string,
        chatID: string,
        owner?: string | null,
        createdAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    participants?:  {
      __typename: "ModelUserChatConnection",
      items:  Array< {
        __typename: "UserChat",
        id: string,
        unreadMessageCount?: number | null,
        user?:  {
          __typename: "User",
          id: string,
          firstname?: string | null,
          lastname?: string | null,
          profileURL?: string | null,
        } | null,
      } | null >,
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
    msgURL?: Array< string | null > | null,
    senderID: string,
    chatID: string,
    sender?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      profileURL?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
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
    owner?: string | null,
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
      msgURL?: Array< string | null > | null,
      senderID: string,
      chatID: string,
      createdAt: string,
      updatedAt: string,
      userMessagesId?: string | null,
      owner?: string | null,
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
      msgURL?: Array< string | null > | null,
      senderID: string,
      chatID: string,
      createdAt: string,
      updatedAt: string,
      userMessagesId?: string | null,
      owner?: string | null,
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
      msgURL?: Array< string | null > | null,
      senderID: string,
      chatID: string,
      createdAt: string,
      updatedAt: string,
      userMessagesId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserGroupQueryVariables = {
  id: string,
};

export type GetUserGroupQuery = {
  getUserGroup?:  {
    __typename: "UserGroup",
    id: string,
    ownerID: string,
    userID: string,
    groupID: string,
    role?: string | null,
    group?:  {
      __typename: "Group",
      id: string,
      groupName: string,
      groupURL?: string | null,
      description?: string | null,
      members?:  {
        __typename: "ModelUserGroupConnection",
        items:  Array< {
          __typename: "UserGroup",
          id: string,
          ownerID: string,
          userID: string,
          groupID: string,
          role?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    userGroupsId?: string | null,
  } | null,
};

export type ListUserGroupsQueryVariables = {
  filter?: ModelUserGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserGroupsQuery = {
  listUserGroups?:  {
    __typename: "ModelUserGroupConnection",
    items:  Array< {
      __typename: "UserGroup",
      id: string,
      ownerID: string,
      userID: string,
      groupID: string,
      role?: string | null,
      createdAt: string,
      updatedAt: string,
      userGroupsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GroupsByUserQueryVariables = {
  userID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GroupsByUserQuery = {
  groupsByUser?:  {
    __typename: "ModelUserGroupConnection",
    items:  Array< {
      __typename: "UserGroup",
      id: string,
      ownerID: string,
      userID: string,
      groupID: string,
      role?: string | null,
      createdAt: string,
      updatedAt: string,
      userGroupsId?: string | null,
      group?:  {
        __typename: "Group",
        id: string,
        groupName: string,
        groupURL?: string | null,
        createdAt: string,
        updatedAt: string,
        members?:  {
          __typename: "ModelUserGroupConnection",
          items:  Array< {
            __typename: "UserGroup",
            id: string,
            ownerID: string,
            userID: string,
            groupID: string,
            role?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null >,
          nextToken?: string | null,
        } | null,
        posts?:  {
          __typename: "ModelPostConnection",
          items:  Array< {
            __typename: "Post",
            id: string,
            title: string,
            content: string,
            postURL?: Array< string | null > | null,
            groupID: string,
            userID: string,
            user?:  {
              __typename: "User",
              id: string,
              email: string,
              firstname?: string | null,
              lastname?: string | null,
              profileURL?: string | null,
              createdAt: string,
              updatedAt: string,
              owner?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type MembersByGroupQueryVariables = {
  groupID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type MembersByGroupQuery = {
  membersByGroup?:  {
    __typename: "ModelUserGroupConnection",
    items:  Array< {
      __typename: "UserGroup",
      id: string,
      ownerID: string,
      userID: string,
      groupID: string,
      role?: string | null,
      createdAt: string,
      updatedAt: string,
      userGroupsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetGroupQueryVariables = {
  id: string,
};

export type GetGroupQuery = {
  getGroup?:  {
    __typename: "Group",
    id: string,
    groupName: string,
    groupURL?: string | null,
    description?: string | null,
    createdAt: string,
    members?:  {
      __typename: "ModelUserGroupConnection",
      items:  Array< {
        __typename: "UserGroup",
        id: string,
        ownerID: string,
        userID: string,
        groupID: string,
        role?: string | null,
        user?:  {
          __typename: "User",
          id: string,
          email: string,
          firstname?: string | null,
          lastname?: string | null,
          profileURL?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    posts?:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        title: string,
        content: string,
        postURL?: Array< string | null > | null,
        groupID: string,
        userID: string,
        user?:  {
          __typename: "User",
          id: string,
          email: string,
          firstname?: string | null,
          lastname?: string | null,
          profileURL?: string | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userPostsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type ListGroupsQueryVariables = {
  filter?: ModelGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGroupsQuery = {
  listGroups?:  {
    __typename: "ModelGroupConnection",
    items:  Array< {
      __typename: "Group",
      id: string,
      groupName: string,
      groupURL?: string | null,
      description?: string | null,
      members?:  {
        __typename: "ModelUserGroupConnection",
        items:  Array< {
          __typename: "UserGroup",
          id: string,
          ownerID: string,
          userID: string,
          groupID: string,
          role?: string | null,
          user?:  {
            __typename: "User",
            id: string,
            email: string,
            firstname?: string | null,
            lastname?: string | null,
            profileURL?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    firstname?: string | null,
    lastname?: string | null,
    profileURL?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
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
    groups?:  {
      __typename: "ModelUserGroupConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    firstname?: string | null,
    lastname?: string | null,
    profileURL?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
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
    groups?:  {
      __typename: "ModelUserGroupConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    firstname?: string | null,
    lastname?: string | null,
    profileURL?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
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
    groups?:  {
      __typename: "ModelUserGroupConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
  owner?: string | null,
};

export type OnCreatePostSubscription = {
  onCreatePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    postURL?: Array< string | null > | null,
    groupID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    userPostsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
  owner?: string | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    postURL?: Array< string | null > | null,
    groupID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    userPostsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeletePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
  owner?: string | null,
};

export type OnDeletePostSubscription = {
  onDeletePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    postURL?: Array< string | null > | null,
    groupID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    userPostsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateUserChatSubscriptionVariables = {
  filter?: ModelSubscriptionUserChatFilterInput | null,
  ownerID?: string | null,
};

export type OnCreateUserChatSubscription = {
  onCreateUserChat?:  {
    __typename: "UserChat",
    id: string,
    ownerID: string,
    unreadMessageCount?: number | null,
    lastMessage?: string | null,
    lastReadAt?: string | null,
    isMuted?: boolean | null,
    userID: string,
    chatID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      profileURL?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
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
    userChatsId?: string | null,
  } | null,
};

export type OnUpdateUserChatSubscriptionVariables = {
  filter?: ModelSubscriptionUserChatFilterInput | null,
  ownerID?: string | null,
};

export type OnUpdateUserChatSubscription = {
  onUpdateUserChat?:  {
    __typename: "UserChat",
    id: string,
    ownerID: string,
    unreadMessageCount?: number | null,
    lastMessage?: string | null,
    lastReadAt?: string | null,
    isMuted?: boolean | null,
    userID: string,
    chatID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      profileURL?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
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
    userChatsId?: string | null,
  } | null,
};

export type OnDeleteUserChatSubscriptionVariables = {
  filter?: ModelSubscriptionUserChatFilterInput | null,
  ownerID?: string | null,
};

export type OnDeleteUserChatSubscription = {
  onDeleteUserChat?:  {
    __typename: "UserChat",
    id: string,
    ownerID: string,
    unreadMessageCount?: number | null,
    lastMessage?: string | null,
    lastReadAt?: string | null,
    isMuted?: boolean | null,
    userID: string,
    chatID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      profileURL?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
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
    userChatsId?: string | null,
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
  owner?: string | null,
};

export type OnCreateMessageSubscription = {
  onCreateMessage?:  {
    __typename: "Message",
    id: string,
    content: string,
    msgURL?: Array< string | null > | null,
    senderID: string,
    chatID: string,
    createdAt: string,
    updatedAt: string,
    userMessagesId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
  owner?: string | null,
};

export type OnUpdateMessageSubscription = {
  onUpdateMessage?:  {
    __typename: "Message",
    id: string,
    content: string,
    msgURL?: Array< string | null > | null,
    senderID: string,
    chatID: string,
    sender?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      profileURL?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
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
    owner?: string | null,
  } | null,
};

export type OnDeleteMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
  owner?: string | null,
};

export type OnDeleteMessageSubscription = {
  onDeleteMessage?:  {
    __typename: "Message",
    id: string,
    content: string,
    msgURL?: Array< string | null > | null,
    senderID: string,
    chatID: string,
    sender?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      profileURL?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
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
    owner?: string | null,
  } | null,
};

export type OnCreateUserGroupSubscriptionVariables = {
  filter?: ModelSubscriptionUserGroupFilterInput | null,
  ownerID?: string | null,
};

export type OnCreateUserGroupSubscription = {
  onCreateUserGroup?:  {
    __typename: "UserGroup",
    id: string,
    ownerID: string,
    userID: string,
    groupID: string,
    role?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      profileURL?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    group?:  {
      __typename: "Group",
      id: string,
      groupName: string,
      groupURL?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    userGroupsId?: string | null,
  } | null,
};

export type OnUpdateUserGroupSubscriptionVariables = {
  filter?: ModelSubscriptionUserGroupFilterInput | null,
  ownerID?: string | null,
};

export type OnUpdateUserGroupSubscription = {
  onUpdateUserGroup?:  {
    __typename: "UserGroup",
    id: string,
    ownerID: string,
    userID: string,
    groupID: string,
    role?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      profileURL?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    group?:  {
      __typename: "Group",
      id: string,
      groupName: string,
      groupURL?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    userGroupsId?: string | null,
  } | null,
};

export type OnDeleteUserGroupSubscriptionVariables = {
  filter?: ModelSubscriptionUserGroupFilterInput | null,
  ownerID?: string | null,
};

export type OnDeleteUserGroupSubscription = {
  onDeleteUserGroup?:  {
    __typename: "UserGroup",
    id: string,
    ownerID: string,
    userID: string,
    groupID: string,
    role?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      profileURL?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    group?:  {
      __typename: "Group",
      id: string,
      groupName: string,
      groupURL?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    userGroupsId?: string | null,
  } | null,
};

export type OnCreateGroupSubscriptionVariables = {
  filter?: ModelSubscriptionGroupFilterInput | null,
};

export type OnCreateGroupSubscription = {
  onCreateGroup?:  {
    __typename: "Group",
    id: string,
    groupName: string,
    groupURL?: string | null,
    description?: string | null,
    createdAt: string,
    members?:  {
      __typename: "ModelUserGroupConnection",
      nextToken?: string | null,
    } | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateGroupSubscriptionVariables = {
  filter?: ModelSubscriptionGroupFilterInput | null,
};

export type OnUpdateGroupSubscription = {
  onUpdateGroup?:  {
    __typename: "Group",
    id: string,
    groupName: string,
    groupURL?: string | null,
    description?: string | null,
    createdAt: string,
    members?:  {
      __typename: "ModelUserGroupConnection",
      nextToken?: string | null,
    } | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteGroupSubscriptionVariables = {
  filter?: ModelSubscriptionGroupFilterInput | null,
};

export type OnDeleteGroupSubscription = {
  onDeleteGroup?:  {
    __typename: "Group",
    id: string,
    groupName: string,
    groupURL?: string | null,
    description?: string | null,
    createdAt: string,
    members?:  {
      __typename: "ModelUserGroupConnection",
      nextToken?: string | null,
    } | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};
