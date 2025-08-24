/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  email: string,
  firstname: string,
  lastname: string,
  fullname: string,
  profileURL: string,
  description?: string | null,
  unreadChatCount: number,
  unreadNotificationCount: number,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  firstname?: ModelStringInput | null,
  lastname?: ModelStringInput | null,
  fullname?: ModelStringInput | null,
  profileURL?: ModelStringInput | null,
  description?: ModelStringInput | null,
  unreadChatCount?: ModelIntInput | null,
  unreadNotificationCount?: ModelIntInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
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

export type User = {
  __typename: "User",
  id: string,
  email: string,
  firstname: string,
  lastname: string,
  fullname: string,
  profileURL: string,
  description?: string | null,
  unreadChatCount: number,
  unreadNotificationCount: number,
  posts?: ModelPostConnection | null,
  chats?: ModelUserChatConnection | null,
  messages?: ModelMessageConnection | null,
  groups?: ModelUserGroupConnection | null,
  comments?: ModelCommentConnection | null,
  replies?: ModelReplyConnection | null,
  notifications?: ModelNotificationConnection | null,
  fcmTokens?: ModelTokenConnection | null,
  notificationSettings?: NotificationSettings | null,
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
  content: string,
  postURL?: Array< string | null > | null,
  groupID: string,
  userID: string,
  user?: User | null,
  group?: Group | null,
  comments?: ModelCommentConnection | null,
  commentCount: number,
  createdAt: string,
  updatedAt: string,
  userPostsId?: string | null,
  owner?: string | null,
};

export type Group = {
  __typename: "Group",
  id: string,
  groupName: string,
  nameLowercase: string,
  groupURL?: string | null,
  description?: string | null,
  isPublic: boolean,
  memberCount: number,
  type: string,
  members?: ModelUserGroupConnection | null,
  notifications?: ModelNotificationConnection | null,
  posts?: ModelPostConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelUserGroupConnection = {
  __typename: "ModelUserGroupConnection",
  items:  Array<UserGroup | null >,
  nextToken?: string | null,
};

export type UserGroup = {
  __typename: "UserGroup",
  id: string,
  userID: string,
  groupID: string,
  role?: string | null,
  user?: User | null,
  group?: Group | null,
  createdAt: string,
  updatedAt: string,
  userGroupsId?: string | null,
  owner?: string | null,
};

export type ModelNotificationConnection = {
  __typename: "ModelNotificationConnection",
  items:  Array<Notification | null >,
  nextToken?: string | null,
};

export type Notification = {
  __typename: "Notification",
  id: string,
  type: string,
  name: string,
  content: string,
  userID: string,
  groupID?: string | null,
  targetUserID?: string | null,
  onClickID: string,
  read?: boolean | null,
  user?: User | null,
  group?: Group | null,
  targetUser?: User | null,
  createdAt: string,
  updatedAt: string,
  userNotificationsId?: string | null,
  owner?: string | null,
};

export type ModelCommentConnection = {
  __typename: "ModelCommentConnection",
  items:  Array<Comment | null >,
  nextToken?: string | null,
};

export type Comment = {
  __typename: "Comment",
  id: string,
  content: string,
  commentURL?: Array< string | null > | null,
  userID: string,
  postID: string,
  replies?: ModelReplyConnection | null,
  user?: User | null,
  post?: Post | null,
  createdAt: string,
  updatedAt: string,
  userCommentsId?: string | null,
  owner?: string | null,
};

export type ModelReplyConnection = {
  __typename: "ModelReplyConnection",
  items:  Array<Reply | null >,
  nextToken?: string | null,
};

export type Reply = {
  __typename: "Reply",
  id: string,
  content: string,
  url?: Array< string | null > | null,
  userID: string,
  commentID: string,
  user?: User | null,
  comment?: Comment | null,
  createdAt: string,
  updatedAt: string,
  userRepliesId?: string | null,
  owner?: string | null,
};

export type ModelUserChatConnection = {
  __typename: "ModelUserChatConnection",
  items:  Array<UserChat | null >,
  nextToken?: string | null,
};

export type UserChat = {
  __typename: "UserChat",
  id: string,
  unreadMessageCount: number,
  lastMessage: string,
  role: string,
  active: boolean,
  isMuted?: boolean | null,
  userID: string,
  chatID: string,
  user?: User | null,
  chat?: Chat | null,
  lastMessageAt: string,
  createdAt: string,
  updatedAt: string,
  userChatsId?: string | null,
  owner?: string | null,
};

export type Chat = {
  __typename: "Chat",
  id: string,
  name: string,
  url?: string | null,
  isGroup: boolean,
  messages?: ModelMessageConnection | null,
  participants?: ModelUserChatConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
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
  type?: string | null,
  senderID: string,
  chatID: string,
  sender?: User | null,
  chat?: Chat | null,
  createdAt: string,
  updatedAt: string,
  userMessagesId?: string | null,
  owner?: string | null,
};

export type ModelTokenConnection = {
  __typename: "ModelTokenConnection",
  items:  Array<Token | null >,
  nextToken?: string | null,
};

export type Token = {
  __typename: "Token",
  id: string,
  tokenID: string,
  userID: string,
  user?: User | null,
  createdAt: string,
  updatedAt: string,
  userFcmTokensId?: string | null,
  owner?: string | null,
};

export type NotificationSettings = {
  __typename: "NotificationSettings",
  id: string,
  newPost: boolean,
  joinGroup: boolean,
  groupRequest: boolean,
  newComment: boolean,
  newReply: boolean,
  newReplyComment: boolean,
  newMessage: boolean,
  joinChat: boolean,
  userID: string,
  user?: User | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateUserInput = {
  id: string,
  email?: string | null,
  firstname?: string | null,
  lastname?: string | null,
  fullname?: string | null,
  profileURL?: string | null,
  description?: string | null,
  unreadChatCount?: number | null,
  unreadNotificationCount?: number | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateUserFeedInput = {
  id?: string | null,
  userID: string,
  postID: string,
  postCreatedAt: string,
  createdAt?: string | null,
};

export type ModelUserFeedConditionInput = {
  userID?: ModelIDInput | null,
  postID?: ModelIDInput | null,
  postCreatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelUserFeedConditionInput | null > | null,
  or?: Array< ModelUserFeedConditionInput | null > | null,
  not?: ModelUserFeedConditionInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
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

export type UserFeed = {
  __typename: "UserFeed",
  id: string,
  userID: string,
  postID: string,
  post?: Post | null,
  postCreatedAt: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateUserFeedInput = {
  id: string,
  userID?: string | null,
  postID?: string | null,
  postCreatedAt?: string | null,
  createdAt?: string | null,
};

export type DeleteUserFeedInput = {
  id: string,
};

export type CreatePostInput = {
  id?: string | null,
  content: string,
  postURL?: Array< string | null > | null,
  groupID: string,
  userID: string,
  commentCount: number,
  createdAt?: string | null,
  userPostsId?: string | null,
};

export type ModelPostConditionInput = {
  content?: ModelStringInput | null,
  postURL?: ModelStringInput | null,
  groupID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  commentCount?: ModelIntInput | null,
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
  content?: string | null,
  postURL?: Array< string | null > | null,
  groupID?: string | null,
  userID?: string | null,
  commentCount?: number | null,
  createdAt?: string | null,
  userPostsId?: string | null,
};

export type DeletePostInput = {
  id: string,
};

export type CreateCommentInput = {
  id?: string | null,
  content: string,
  commentURL?: Array< string | null > | null,
  userID: string,
  postID: string,
  createdAt?: string | null,
  userCommentsId?: string | null,
};

export type ModelCommentConditionInput = {
  content?: ModelStringInput | null,
  commentURL?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  postID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
  updatedAt?: ModelStringInput | null,
  userCommentsId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type UpdateCommentInput = {
  id: string,
  content?: string | null,
  commentURL?: Array< string | null > | null,
  userID?: string | null,
  postID?: string | null,
  createdAt?: string | null,
  userCommentsId?: string | null,
};

export type DeleteCommentInput = {
  id: string,
};

export type CreateReplyInput = {
  id?: string | null,
  content: string,
  url?: Array< string | null > | null,
  userID: string,
  commentID: string,
  createdAt?: string | null,
  userRepliesId?: string | null,
};

export type ModelReplyConditionInput = {
  content?: ModelStringInput | null,
  url?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  commentID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelReplyConditionInput | null > | null,
  or?: Array< ModelReplyConditionInput | null > | null,
  not?: ModelReplyConditionInput | null,
  updatedAt?: ModelStringInput | null,
  userRepliesId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type UpdateReplyInput = {
  id: string,
  content?: string | null,
  url?: Array< string | null > | null,
  userID?: string | null,
  commentID?: string | null,
  createdAt?: string | null,
  userRepliesId?: string | null,
};

export type DeleteReplyInput = {
  id: string,
};

export type CreateUserChatInput = {
  id?: string | null,
  unreadMessageCount: number,
  lastMessage: string,
  role: string,
  active: boolean,
  isMuted?: boolean | null,
  userID: string,
  chatID: string,
  lastMessageAt: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  userChatsId?: string | null,
};

export type ModelUserChatConditionInput = {
  unreadMessageCount?: ModelIntInput | null,
  lastMessage?: ModelStringInput | null,
  role?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  isMuted?: ModelBooleanInput | null,
  userID?: ModelIDInput | null,
  chatID?: ModelIDInput | null,
  lastMessageAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserChatConditionInput | null > | null,
  or?: Array< ModelUserChatConditionInput | null > | null,
  not?: ModelUserChatConditionInput | null,
  userChatsId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateUserChatInput = {
  id: string,
  unreadMessageCount?: number | null,
  lastMessage?: string | null,
  role?: string | null,
  active?: boolean | null,
  isMuted?: boolean | null,
  userID?: string | null,
  chatID?: string | null,
  lastMessageAt?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  userChatsId?: string | null,
};

export type DeleteUserChatInput = {
  id: string,
};

export type CreateChatInput = {
  id?: string | null,
  name: string,
  url?: string | null,
  isGroup: boolean,
  createdAt?: string | null,
};

export type ModelChatConditionInput = {
  name?: ModelStringInput | null,
  url?: ModelStringInput | null,
  isGroup?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelChatConditionInput | null > | null,
  or?: Array< ModelChatConditionInput | null > | null,
  not?: ModelChatConditionInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type UpdateChatInput = {
  id: string,
  name?: string | null,
  url?: string | null,
  isGroup?: boolean | null,
  createdAt?: string | null,
};

export type DeleteChatInput = {
  id: string,
};

export type CreateMessageInput = {
  id?: string | null,
  content: string,
  msgURL?: Array< string | null > | null,
  type?: string | null,
  senderID: string,
  chatID: string,
  createdAt?: string | null,
  userMessagesId?: string | null,
};

export type ModelMessageConditionInput = {
  content?: ModelStringInput | null,
  msgURL?: ModelStringInput | null,
  type?: ModelStringInput | null,
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
  type?: string | null,
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
  userID: string,
  groupID: string,
  role?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  userGroupsId?: string | null,
};

export type ModelUserGroupConditionInput = {
  userID?: ModelIDInput | null,
  groupID?: ModelIDInput | null,
  role?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserGroupConditionInput | null > | null,
  or?: Array< ModelUserGroupConditionInput | null > | null,
  not?: ModelUserGroupConditionInput | null,
  userGroupsId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type UpdateUserGroupInput = {
  id: string,
  userID?: string | null,
  groupID?: string | null,
  role?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  userGroupsId?: string | null,
};

export type DeleteUserGroupInput = {
  id: string,
};

export type CreateGroupInput = {
  id?: string | null,
  groupName: string,
  nameLowercase: string,
  groupURL?: string | null,
  description?: string | null,
  isPublic: boolean,
  memberCount: number,
  type: string,
  createdAt?: string | null,
};

export type ModelGroupConditionInput = {
  groupName?: ModelStringInput | null,
  nameLowercase?: ModelStringInput | null,
  groupURL?: ModelStringInput | null,
  description?: ModelStringInput | null,
  isPublic?: ModelBooleanInput | null,
  memberCount?: ModelIntInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelGroupConditionInput | null > | null,
  or?: Array< ModelGroupConditionInput | null > | null,
  not?: ModelGroupConditionInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type UpdateGroupInput = {
  id: string,
  groupName?: string | null,
  nameLowercase?: string | null,
  groupURL?: string | null,
  description?: string | null,
  isPublic?: boolean | null,
  memberCount?: number | null,
  type?: string | null,
  createdAt?: string | null,
};

export type DeleteGroupInput = {
  id: string,
};

export type CreateNotificationInput = {
  id?: string | null,
  type: string,
  name: string,
  content: string,
  userID: string,
  groupID?: string | null,
  targetUserID?: string | null,
  onClickID: string,
  read?: boolean | null,
  createdAt?: string | null,
  userNotificationsId?: string | null,
};

export type ModelNotificationConditionInput = {
  type?: ModelStringInput | null,
  name?: ModelStringInput | null,
  content?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  groupID?: ModelIDInput | null,
  targetUserID?: ModelIDInput | null,
  onClickID?: ModelIDInput | null,
  read?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelNotificationConditionInput | null > | null,
  or?: Array< ModelNotificationConditionInput | null > | null,
  not?: ModelNotificationConditionInput | null,
  updatedAt?: ModelStringInput | null,
  userNotificationsId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type UpdateNotificationInput = {
  id: string,
  type?: string | null,
  name?: string | null,
  content?: string | null,
  userID?: string | null,
  groupID?: string | null,
  targetUserID?: string | null,
  onClickID?: string | null,
  read?: boolean | null,
  createdAt?: string | null,
  userNotificationsId?: string | null,
};

export type DeleteNotificationInput = {
  id: string,
};

export type CreateReportInput = {
  id?: string | null,
  reporterID: string,
  reportedItemID: string,
  reportedItemType: string,
  reason: string,
  message: string,
};

export type ModelReportConditionInput = {
  reporterID?: ModelStringInput | null,
  reportedItemID?: ModelStringInput | null,
  reportedItemType?: ModelStringInput | null,
  reason?: ModelStringInput | null,
  message?: ModelStringInput | null,
  and?: Array< ModelReportConditionInput | null > | null,
  or?: Array< ModelReportConditionInput | null > | null,
  not?: ModelReportConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type Report = {
  __typename: "Report",
  id: string,
  reporterID: string,
  reportedItemID: string,
  reportedItemType: string,
  reason: string,
  message: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateReportInput = {
  id: string,
  reporterID?: string | null,
  reportedItemID?: string | null,
  reportedItemType?: string | null,
  reason?: string | null,
  message?: string | null,
};

export type DeleteReportInput = {
  id: string,
};

export type CreateTokenInput = {
  id?: string | null,
  tokenID: string,
  userID: string,
  createdAt?: string | null,
  userFcmTokensId?: string | null,
};

export type ModelTokenConditionInput = {
  tokenID?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelTokenConditionInput | null > | null,
  or?: Array< ModelTokenConditionInput | null > | null,
  not?: ModelTokenConditionInput | null,
  updatedAt?: ModelStringInput | null,
  userFcmTokensId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type UpdateTokenInput = {
  id: string,
  tokenID?: string | null,
  userID?: string | null,
  createdAt?: string | null,
  userFcmTokensId?: string | null,
};

export type DeleteTokenInput = {
  id: string,
};

export type CreateNotificationSettingsInput = {
  id?: string | null,
  newPost: boolean,
  joinGroup: boolean,
  groupRequest: boolean,
  newComment: boolean,
  newReply: boolean,
  newReplyComment: boolean,
  newMessage: boolean,
  joinChat: boolean,
  userID: string,
  createdAt?: string | null,
};

export type ModelNotificationSettingsConditionInput = {
  newPost?: ModelBooleanInput | null,
  joinGroup?: ModelBooleanInput | null,
  groupRequest?: ModelBooleanInput | null,
  newComment?: ModelBooleanInput | null,
  newReply?: ModelBooleanInput | null,
  newReplyComment?: ModelBooleanInput | null,
  newMessage?: ModelBooleanInput | null,
  joinChat?: ModelBooleanInput | null,
  userID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelNotificationSettingsConditionInput | null > | null,
  or?: Array< ModelNotificationSettingsConditionInput | null > | null,
  not?: ModelNotificationSettingsConditionInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type UpdateNotificationSettingsInput = {
  id: string,
  newPost?: boolean | null,
  joinGroup?: boolean | null,
  groupRequest?: boolean | null,
  newComment?: boolean | null,
  newReply?: boolean | null,
  newReplyComment?: boolean | null,
  newMessage?: boolean | null,
  joinChat?: boolean | null,
  userID?: string | null,
  createdAt?: string | null,
};

export type DeleteNotificationSettingsInput = {
  id: string,
};

export type CreateBlockListInput = {
  id?: string | null,
  blockerID: string,
  blockedID: string,
  createdAt?: string | null,
};

export type ModelBlockListConditionInput = {
  blockerID?: ModelIDInput | null,
  blockedID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelBlockListConditionInput | null > | null,
  or?: Array< ModelBlockListConditionInput | null > | null,
  not?: ModelBlockListConditionInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type BlockList = {
  __typename: "BlockList",
  id: string,
  blockerID: string,
  blockedID: string,
  blockedUser?: User | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateBlockListInput = {
  id: string,
  blockerID?: string | null,
  blockedID?: string | null,
  createdAt?: string | null,
};

export type DeleteBlockListInput = {
  id: string,
};

export type ModerationResult = {
  __typename: "ModerationResult",
  flagged?: boolean | null,
  categories?: string | null,
  category_scores?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  firstname?: ModelStringInput | null,
  lastname?: ModelStringInput | null,
  fullname?: ModelStringInput | null,
  profileURL?: ModelStringInput | null,
  description?: ModelStringInput | null,
  unreadChatCount?: ModelIntInput | null,
  unreadNotificationCount?: ModelIntInput | null,
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


export type ModelUserFeedFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  postID?: ModelIDInput | null,
  postCreatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFeedFilterInput | null > | null,
  or?: Array< ModelUserFeedFilterInput | null > | null,
  not?: ModelUserFeedFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelUserFeedConnection = {
  __typename: "ModelUserFeedConnection",
  items:  Array<UserFeed | null >,
  nextToken?: string | null,
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

export type ModelPostFilterInput = {
  id?: ModelIDInput | null,
  content?: ModelStringInput | null,
  postURL?: ModelStringInput | null,
  groupID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  commentCount?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
  userPostsId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
  content?: ModelStringInput | null,
  commentURL?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  postID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
  userCommentsId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelReplyFilterInput = {
  id?: ModelIDInput | null,
  content?: ModelStringInput | null,
  url?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  commentID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelReplyFilterInput | null > | null,
  or?: Array< ModelReplyFilterInput | null > | null,
  not?: ModelReplyFilterInput | null,
  userRepliesId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelUserChatFilterInput = {
  id?: ModelIDInput | null,
  unreadMessageCount?: ModelIntInput | null,
  lastMessage?: ModelStringInput | null,
  role?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  isMuted?: ModelBooleanInput | null,
  userID?: ModelIDInput | null,
  chatID?: ModelIDInput | null,
  lastMessageAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserChatFilterInput | null > | null,
  or?: Array< ModelUserChatFilterInput | null > | null,
  not?: ModelUserChatFilterInput | null,
  userChatsId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelChatFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  url?: ModelStringInput | null,
  isGroup?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelChatFilterInput | null > | null,
  or?: Array< ModelChatFilterInput | null > | null,
  not?: ModelChatFilterInput | null,
  owner?: ModelStringInput | null,
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
  type?: ModelStringInput | null,
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
  userID?: ModelIDInput | null,
  groupID?: ModelIDInput | null,
  role?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserGroupFilterInput | null > | null,
  or?: Array< ModelUserGroupFilterInput | null > | null,
  not?: ModelUserGroupFilterInput | null,
  userGroupsId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelGroupFilterInput = {
  id?: ModelIDInput | null,
  groupName?: ModelStringInput | null,
  nameLowercase?: ModelStringInput | null,
  groupURL?: ModelStringInput | null,
  description?: ModelStringInput | null,
  isPublic?: ModelBooleanInput | null,
  memberCount?: ModelIntInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelGroupFilterInput | null > | null,
  or?: Array< ModelGroupFilterInput | null > | null,
  not?: ModelGroupFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelGroupConnection = {
  __typename: "ModelGroupConnection",
  items:  Array<Group | null >,
  nextToken?: string | null,
};

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelNotificationFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelStringInput | null,
  name?: ModelStringInput | null,
  content?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  groupID?: ModelIDInput | null,
  targetUserID?: ModelIDInput | null,
  onClickID?: ModelIDInput | null,
  read?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelNotificationFilterInput | null > | null,
  or?: Array< ModelNotificationFilterInput | null > | null,
  not?: ModelNotificationFilterInput | null,
  userNotificationsId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelReportFilterInput = {
  id?: ModelIDInput | null,
  reporterID?: ModelStringInput | null,
  reportedItemID?: ModelStringInput | null,
  reportedItemType?: ModelStringInput | null,
  reason?: ModelStringInput | null,
  message?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelReportFilterInput | null > | null,
  or?: Array< ModelReportFilterInput | null > | null,
  not?: ModelReportFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelReportConnection = {
  __typename: "ModelReportConnection",
  items:  Array<Report | null >,
  nextToken?: string | null,
};

export type ModelTokenFilterInput = {
  id?: ModelIDInput | null,
  tokenID?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTokenFilterInput | null > | null,
  or?: Array< ModelTokenFilterInput | null > | null,
  not?: ModelTokenFilterInput | null,
  userFcmTokensId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelNotificationSettingsFilterInput = {
  id?: ModelIDInput | null,
  newPost?: ModelBooleanInput | null,
  joinGroup?: ModelBooleanInput | null,
  groupRequest?: ModelBooleanInput | null,
  newComment?: ModelBooleanInput | null,
  newReply?: ModelBooleanInput | null,
  newReplyComment?: ModelBooleanInput | null,
  newMessage?: ModelBooleanInput | null,
  joinChat?: ModelBooleanInput | null,
  userID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelNotificationSettingsFilterInput | null > | null,
  or?: Array< ModelNotificationSettingsFilterInput | null > | null,
  not?: ModelNotificationSettingsFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelNotificationSettingsConnection = {
  __typename: "ModelNotificationSettingsConnection",
  items:  Array<NotificationSettings | null >,
  nextToken?: string | null,
};

export type ModelBlockListFilterInput = {
  id?: ModelIDInput | null,
  blockerID?: ModelIDInput | null,
  blockedID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelBlockListFilterInput | null > | null,
  or?: Array< ModelBlockListFilterInput | null > | null,
  not?: ModelBlockListFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelBlockListConnection = {
  __typename: "ModelBlockListConnection",
  items:  Array<BlockList | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  email?: ModelSubscriptionStringInput | null,
  firstname?: ModelSubscriptionStringInput | null,
  lastname?: ModelSubscriptionStringInput | null,
  fullname?: ModelSubscriptionStringInput | null,
  profileURL?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  unreadChatCount?: ModelSubscriptionIntInput | null,
  unreadNotificationCount?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  userPostsId?: ModelSubscriptionIDInput | null,
  userChatsId?: ModelSubscriptionIDInput | null,
  userMessagesId?: ModelSubscriptionIDInput | null,
  userGroupsId?: ModelSubscriptionIDInput | null,
  userCommentsId?: ModelSubscriptionIDInput | null,
  userRepliesId?: ModelSubscriptionIDInput | null,
  userNotificationsId?: ModelSubscriptionIDInput | null,
  userFcmTokensId?: ModelSubscriptionIDInput | null,
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

export type ModelSubscriptionUserFeedFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  postID?: ModelSubscriptionIDInput | null,
  postCreatedAt?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFeedFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFeedFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionPostFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  content?: ModelSubscriptionStringInput | null,
  postURL?: ModelSubscriptionStringInput | null,
  groupID?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  commentCount?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPostFilterInput | null > | null,
  or?: Array< ModelSubscriptionPostFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionCommentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  content?: ModelSubscriptionStringInput | null,
  commentURL?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  postID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCommentFilterInput | null > | null,
  or?: Array< ModelSubscriptionCommentFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionReplyFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  content?: ModelSubscriptionStringInput | null,
  url?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  commentID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionReplyFilterInput | null > | null,
  or?: Array< ModelSubscriptionReplyFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionUserChatFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  unreadMessageCount?: ModelSubscriptionIntInput | null,
  lastMessage?: ModelSubscriptionStringInput | null,
  role?: ModelSubscriptionStringInput | null,
  active?: ModelSubscriptionBooleanInput | null,
  isMuted?: ModelSubscriptionBooleanInput | null,
  userID?: ModelSubscriptionIDInput | null,
  chatID?: ModelSubscriptionIDInput | null,
  lastMessageAt?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserChatFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserChatFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionChatFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  url?: ModelSubscriptionStringInput | null,
  isGroup?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionChatFilterInput | null > | null,
  or?: Array< ModelSubscriptionChatFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionMessageFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  content?: ModelSubscriptionStringInput | null,
  msgURL?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
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
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionGroupFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  groupName?: ModelSubscriptionStringInput | null,
  nameLowercase?: ModelSubscriptionStringInput | null,
  groupURL?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  isPublic?: ModelSubscriptionBooleanInput | null,
  memberCount?: ModelSubscriptionIntInput | null,
  type?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionGroupFilterInput | null > | null,
  or?: Array< ModelSubscriptionGroupFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionNotificationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  type?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  content?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  groupID?: ModelSubscriptionIDInput | null,
  targetUserID?: ModelSubscriptionIDInput | null,
  onClickID?: ModelSubscriptionIDInput | null,
  read?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionNotificationFilterInput | null > | null,
  or?: Array< ModelSubscriptionNotificationFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionReportFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  reporterID?: ModelSubscriptionStringInput | null,
  reportedItemID?: ModelSubscriptionStringInput | null,
  reportedItemType?: ModelSubscriptionStringInput | null,
  reason?: ModelSubscriptionStringInput | null,
  message?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionReportFilterInput | null > | null,
  or?: Array< ModelSubscriptionReportFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionTokenFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  tokenID?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTokenFilterInput | null > | null,
  or?: Array< ModelSubscriptionTokenFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionNotificationSettingsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  newPost?: ModelSubscriptionBooleanInput | null,
  joinGroup?: ModelSubscriptionBooleanInput | null,
  groupRequest?: ModelSubscriptionBooleanInput | null,
  newComment?: ModelSubscriptionBooleanInput | null,
  newReply?: ModelSubscriptionBooleanInput | null,
  newReplyComment?: ModelSubscriptionBooleanInput | null,
  newMessage?: ModelSubscriptionBooleanInput | null,
  joinChat?: ModelSubscriptionBooleanInput | null,
  userID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionNotificationSettingsFilterInput | null > | null,
  or?: Array< ModelSubscriptionNotificationSettingsFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionBlockListFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  blockerID?: ModelSubscriptionIDInput | null,
  blockedID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionBlockListFilterInput | null > | null,
  or?: Array< ModelSubscriptionBlockListFilterInput | null > | null,
  owner?: ModelStringInput | null,
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
    firstname: string,
    lastname: string,
    fullname: string,
    profileURL: string,
    description?: string | null,
    unreadChatCount: number,
    unreadNotificationCount: number,
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
    firstname: string,
    lastname: string,
    fullname: string,
    profileURL: string,
    description?: string | null,
    unreadChatCount: number,
    unreadNotificationCount: number,
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
    firstname: string,
    lastname: string,
    fullname: string,
    profileURL: string,
    description?: string | null,
    unreadChatCount: number,
    unreadNotificationCount: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateUserFeedMutationVariables = {
  input: CreateUserFeedInput,
  condition?: ModelUserFeedConditionInput | null,
};

export type CreateUserFeedMutation = {
  createUserFeed?:  {
    __typename: "UserFeed",
    id: string,
    userID: string,
    postID: string,
    post?:  {
      __typename: "Post",
      id: string,
      content: string,
      postURL?: Array< string | null > | null,
      groupID: string,
      userID: string,
      commentCount: number,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
      owner?: string | null,
    } | null,
    postCreatedAt: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserFeedMutationVariables = {
  input: UpdateUserFeedInput,
  condition?: ModelUserFeedConditionInput | null,
};

export type UpdateUserFeedMutation = {
  updateUserFeed?:  {
    __typename: "UserFeed",
    id: string,
    userID: string,
    postID: string,
    postCreatedAt: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteUserFeedMutationVariables = {
  input: DeleteUserFeedInput,
  condition?: ModelUserFeedConditionInput | null,
};

export type DeleteUserFeedMutation = {
  deleteUserFeed?:  {
    __typename: "UserFeed",
    id: string,
    userID: string,
    postID: string,
    postCreatedAt: string,
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
    content: string,
    postURL?: Array< string | null > | null,
    groupID: string,
    userID: string,
    commentCount: number,
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
    content: string,
    postURL?: Array< string | null > | null,
    groupID: string,
    userID: string,
    commentCount: number,
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
    content: string,
    postURL?: Array< string | null > | null,
    groupID: string,
    userID: string,
    commentCount: number,
    createdAt: string,
    updatedAt: string,
    userPostsId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type CreateCommentMutation = {
  createComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    commentURL?: Array< string | null > | null,
    userID: string,
    postID: string,
    createdAt: string,
    updatedAt: string,
    userCommentsId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type UpdateCommentMutation = {
  updateComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    commentURL?: Array< string | null > | null,
    userID: string,
    postID: string,
    createdAt: string,
    updatedAt: string,
    userCommentsId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type DeleteCommentMutation = {
  deleteComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    commentURL?: Array< string | null > | null,
    userID: string,
    postID: string,
    createdAt: string,
    updatedAt: string,
    userCommentsId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateReplyMutationVariables = {
  input: CreateReplyInput,
  condition?: ModelReplyConditionInput | null,
};

export type CreateReplyMutation = {
  createReply?:  {
    __typename: "Reply",
    id: string,
    content: string,
    url?: Array< string | null > | null,
    userID: string,
    commentID: string,
    createdAt: string,
    updatedAt: string,
    userRepliesId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateReplyMutationVariables = {
  input: UpdateReplyInput,
  condition?: ModelReplyConditionInput | null,
};

export type UpdateReplyMutation = {
  updateReply?:  {
    __typename: "Reply",
    id: string,
    content: string,
    url?: Array< string | null > | null,
    userID: string,
    commentID: string,
    createdAt: string,
    updatedAt: string,
    userRepliesId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteReplyMutationVariables = {
  input: DeleteReplyInput,
  condition?: ModelReplyConditionInput | null,
};

export type DeleteReplyMutation = {
  deleteReply?:  {
    __typename: "Reply",
    id: string,
    content: string,
    url?: Array< string | null > | null,
    userID: string,
    commentID: string,
    createdAt: string,
    updatedAt: string,
    userRepliesId?: string | null,
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
    unreadMessageCount: number,
    lastMessage: string,
    role: string,
    active: boolean,
    isMuted?: boolean | null,
    userID: string,
    chatID: string,
    lastMessageAt: string,
    createdAt: string,
    updatedAt: string,
    userChatsId?: string | null,
    owner?: string | null,
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
    unreadMessageCount: number,
    lastMessage: string,
    role: string,
    active: boolean,
    isMuted?: boolean | null,
    userID: string,
    chatID: string,
    lastMessageAt: string,
    createdAt: string,
    updatedAt: string,
    userChatsId?: string | null,
    owner?: string | null,
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
    unreadMessageCount: number,
    lastMessage: string,
    role: string,
    active: boolean,
    isMuted?: boolean | null,
    userID: string,
    chatID: string,
    lastMessageAt: string,
    createdAt: string,
    updatedAt: string,
    userChatsId?: string | null,
    owner?: string | null,
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
    url?: string | null,
    isGroup: boolean,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    url?: string | null,
    isGroup: boolean,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    url?: string | null,
    isGroup: boolean,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    type?: string | null,
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
    type?: string | null,
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
    type?: string | null,
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
    userID: string,
    groupID: string,
    role?: string | null,
    createdAt: string,
    updatedAt: string,
    userGroupsId?: string | null,
    owner?: string | null,
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
    userID: string,
    groupID: string,
    role?: string | null,
    createdAt: string,
    updatedAt: string,
    userGroupsId?: string | null,
    owner?: string | null,
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
    userID: string,
    groupID: string,
    role?: string | null,
    createdAt: string,
    updatedAt: string,
    userGroupsId?: string | null,
    owner?: string | null,
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
    nameLowercase: string,
    groupURL?: string | null,
    description?: string | null,
    isPublic: boolean,
    memberCount: number,
    type: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    nameLowercase: string,
    groupURL?: string | null,
    description?: string | null,
    isPublic: boolean,
    memberCount: number,
    type: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    nameLowercase: string,
    groupURL?: string | null,
    description?: string | null,
    isPublic: boolean,
    memberCount: number,
    type: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateNotificationMutationVariables = {
  input: CreateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type CreateNotificationMutation = {
  createNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    name: string,
    content: string,
    userID: string,
    groupID?: string | null,
    targetUserID?: string | null,
    onClickID: string,
    read?: boolean | null,
    createdAt: string,
    updatedAt: string,
    userNotificationsId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateNotificationMutationVariables = {
  input: UpdateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type UpdateNotificationMutation = {
  updateNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    name: string,
    content: string,
    userID: string,
    groupID?: string | null,
    targetUserID?: string | null,
    onClickID: string,
    read?: boolean | null,
    createdAt: string,
    updatedAt: string,
    userNotificationsId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteNotificationMutationVariables = {
  input: DeleteNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type DeleteNotificationMutation = {
  deleteNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    name: string,
    content: string,
    userID: string,
    groupID?: string | null,
    targetUserID?: string | null,
    onClickID: string,
    read?: boolean | null,
    createdAt: string,
    updatedAt: string,
    userNotificationsId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateReportMutationVariables = {
  input: CreateReportInput,
  condition?: ModelReportConditionInput | null,
};

export type CreateReportMutation = {
  createReport?:  {
    __typename: "Report",
    id: string,
    reporterID: string,
    reportedItemID: string,
    reportedItemType: string,
    reason: string,
    message: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateReportMutationVariables = {
  input: UpdateReportInput,
  condition?: ModelReportConditionInput | null,
};

export type UpdateReportMutation = {
  updateReport?:  {
    __typename: "Report",
    id: string,
    reporterID: string,
    reportedItemID: string,
    reportedItemType: string,
    reason: string,
    message: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteReportMutationVariables = {
  input: DeleteReportInput,
  condition?: ModelReportConditionInput | null,
};

export type DeleteReportMutation = {
  deleteReport?:  {
    __typename: "Report",
    id: string,
    reporterID: string,
    reportedItemID: string,
    reportedItemType: string,
    reason: string,
    message: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateTokenMutationVariables = {
  input: CreateTokenInput,
  condition?: ModelTokenConditionInput | null,
};

export type CreateTokenMutation = {
  createToken?:  {
    __typename: "Token",
    id: string,
    tokenID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    userFcmTokensId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateTokenMutationVariables = {
  input: UpdateTokenInput,
  condition?: ModelTokenConditionInput | null,
};

export type UpdateTokenMutation = {
  updateToken?:  {
    __typename: "Token",
    id: string,
    tokenID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    userFcmTokensId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteTokenMutationVariables = {
  input: DeleteTokenInput,
  condition?: ModelTokenConditionInput | null,
};

export type DeleteTokenMutation = {
  deleteToken?:  {
    __typename: "Token",
    id: string,
    tokenID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    userFcmTokensId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateNotificationSettingsMutationVariables = {
  input: CreateNotificationSettingsInput,
  condition?: ModelNotificationSettingsConditionInput | null,
};

export type CreateNotificationSettingsMutation = {
  createNotificationSettings?:  {
    __typename: "NotificationSettings",
    id: string,
    newPost: boolean,
    joinGroup: boolean,
    groupRequest: boolean,
    newComment: boolean,
    newReply: boolean,
    newReplyComment: boolean,
    newMessage: boolean,
    joinChat: boolean,
    userID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateNotificationSettingsMutationVariables = {
  input: UpdateNotificationSettingsInput,
  condition?: ModelNotificationSettingsConditionInput | null,
};

export type UpdateNotificationSettingsMutation = {
  updateNotificationSettings?:  {
    __typename: "NotificationSettings",
    id: string,
    newPost: boolean,
    joinGroup: boolean,
    groupRequest: boolean,
    newComment: boolean,
    newReply: boolean,
    newReplyComment: boolean,
    newMessage: boolean,
    joinChat: boolean,
    userID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteNotificationSettingsMutationVariables = {
  input: DeleteNotificationSettingsInput,
  condition?: ModelNotificationSettingsConditionInput | null,
};

export type DeleteNotificationSettingsMutation = {
  deleteNotificationSettings?:  {
    __typename: "NotificationSettings",
    id: string,
    newPost: boolean,
    joinGroup: boolean,
    groupRequest: boolean,
    newComment: boolean,
    newReply: boolean,
    newReplyComment: boolean,
    newMessage: boolean,
    joinChat: boolean,
    userID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateBlockListMutationVariables = {
  input: CreateBlockListInput,
  condition?: ModelBlockListConditionInput | null,
};

export type CreateBlockListMutation = {
  createBlockList?:  {
    __typename: "BlockList",
    id: string,
    blockerID: string,
    blockedID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateBlockListMutationVariables = {
  input: UpdateBlockListInput,
  condition?: ModelBlockListConditionInput | null,
};

export type UpdateBlockListMutation = {
  updateBlockList?:  {
    __typename: "BlockList",
    id: string,
    blockerID: string,
    blockedID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteBlockListMutationVariables = {
  input: DeleteBlockListInput,
  condition?: ModelBlockListConditionInput | null,
};

export type DeleteBlockListMutation = {
  deleteBlockList?:  {
    __typename: "BlockList",
    id: string,
    blockerID: string,
    blockedID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ModerateTextQueryVariables = {
  text: string,
};

export type ModerateTextQuery = {
  moderateText?:  {
    __typename: "ModerationResult",
    flagged?: boolean | null,
    categories?: string | null,
    category_scores?: string | null,
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
    firstname: string,
    lastname: string,
    fullname: string,
    profileURL: string,
    description?: string | null,
    unreadChatCount: number,
    unreadNotificationCount: number,
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
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
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
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      notificationSettings?:  {
        __typename: "NotificationSettings",
        id: string,
        newPost: boolean,
        joinGroup: boolean,
        groupRequest: boolean,
        newComment: boolean,
        newReply: boolean,
        newReplyComment: boolean,
        newMessage: boolean,
        joinChat: boolean,
        userID: string,
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
};

export type GetUserFeedQueryVariables = {
  id: string,
};

export type GetUserFeedQuery = {
  getUserFeed?:  {
    __typename: "UserFeed",
    id: string,
    userID: string,
    postID: string,
    post?:  {
      __typename: "Post",
      id: string,
      content: string,
      postURL?: Array< string | null > | null,
      groupID: string,
      userID: string,
      commentCount: number,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
      owner?: string | null,
    } | null,
    postCreatedAt: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUserFeedsQueryVariables = {
  filter?: ModelUserFeedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserFeedsQuery = {
  listUserFeeds?:  {
    __typename: "ModelUserFeedConnection",
    items:  Array< {
      __typename: "UserFeed",
      id: string,
      userID: string,
      postID: string,
      postCreatedAt: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PostsByUserFeedQueryVariables = {
  userID: string,
  postCreatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFeedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostsByUserFeedQuery = {
  postsByUserFeed?:  {
    __typename: "ModelUserFeedConnection",
    items:  Array< {
      __typename: "UserFeed",
      id: string,
      userID: string,
      postID: string,
      post?:  {
        __typename: "Post",
        id: string,
        content: string,
        postURL?: Array< string | null > | null,
        groupID: string,
        userID: string,
        user?:  {
          __typename: "User",
          id: string,
          email: string,
          firstname: string,
          lastname: string,
          fullname: string,
          profileURL: string,
          description?: string | null,
          unreadChatCount: number,
          unreadNotificationCount: number,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        group?:  {
          __typename: "Group",
          id: string,
          groupName: string,
          nameLowercase: string,
          groupURL?: string | null,
          description?: string | null,
          isPublic: boolean,
          memberCount: number,
          type: string,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        commentCount: number,
        createdAt: string,
        updatedAt: string,
        userPostsId?: string | null,
        owner?: string | null,
      } | null,
      postCreatedAt: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserFeedByPostIDQueryVariables = {
  postID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFeedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserFeedByPostIDQuery = {
  userFeedByPostID?:  {
    __typename: "ModelUserFeedConnection",
    items:  Array< {
      __typename: "UserFeed",
      id: string,
      userID: string,
      postID: string,
      postCreatedAt: string,
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
    content: string,
    postURL?: Array< string | null > | null,
    groupID: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string,
        commentURL?: Array< string | null > | null,
        userID: string,
        postID: string,
        user?:  {
          __typename: "User",
          id: string,
          email: string,
          firstname: string,
          lastname: string,
          fullname: string,
          profileURL: string,
          description?: string | null,
          unreadChatCount: number,
          unreadNotificationCount: number,
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
    group?:  {
      __typename: "Group",
      id: string,
      groupName: string,
      nameLowercase: string,
      groupURL?: string | null,
      description?: string | null,
      isPublic: boolean,
      memberCount: number,
      type: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    commentCount: number,
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
      content: string,
      postURL?: Array< string | null > | null,
      groupID: string,
      userID: string,
      commentCount: number,
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
      content: string,
      postURL?: Array< string | null > | null,
      user?:  {
        __typename: "User",
        id: string,
        email: string,
        firstname: string,
        lastname: string,
        fullname: string,
        profileURL: string,
        description?: string | null,
        unreadChatCount: number,
        unreadNotificationCount: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      groupID: string,
      userID: string,
      commentCount: number,
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
      content: string,
      postURL?: Array< string | null > | null,
      groupID: string,
      group?:  {
        __typename: "Group",
        id: string,
        groupName: string,
        nameLowercase: string,
        groupURL?: string | null,
        description?: string | null,
        isPublic: boolean,
        memberCount: number,
        type: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      userID: string,
      commentCount: number,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id: string,
};

export type GetCommentQuery = {
  getComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    commentURL?: Array< string | null > | null,
    userID: string,
    postID: string,
    replies?:  {
      __typename: "ModelReplyConnection",
      nextToken?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    post?:  {
      __typename: "Post",
      id: string,
      content: string,
      postURL?: Array< string | null > | null,
      groupID: string,
      userID: string,
      commentCount: number,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userCommentsId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments?:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      content: string,
      commentURL?: Array< string | null > | null,
      userID: string,
      postID: string,
      createdAt: string,
      updatedAt: string,
      userCommentsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CommentsByUserQueryVariables = {
  userID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CommentsByUserQuery = {
  commentsByUser?:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      content: string,
      commentURL?: Array< string | null > | null,
      userID: string,
      postID: string,
      createdAt: string,
      updatedAt: string,
      userCommentsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CommentsByPostQueryVariables = {
  postID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CommentsByPostQuery = {
  commentsByPost?:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      content: string,
      commentURL?: Array< string | null > | null,
      userID: string,
      postID: string,
      createdAt: string,
      updatedAt: string,
      userCommentsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetReplyQueryVariables = {
  id: string,
};

export type GetReplyQuery = {
  getReply?:  {
    __typename: "Reply",
    id: string,
    content: string,
    url?: Array< string | null > | null,
    userID: string,
    commentID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    comment?:  {
      __typename: "Comment",
      id: string,
      content: string,
      commentURL?: Array< string | null > | null,
      userID: string,
      postID: string,
      createdAt: string,
      updatedAt: string,
      userCommentsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userRepliesId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListRepliesQueryVariables = {
  filter?: ModelReplyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRepliesQuery = {
  listReplies?:  {
    __typename: "ModelReplyConnection",
    items:  Array< {
      __typename: "Reply",
      id: string,
      content: string,
      url?: Array< string | null > | null,
      userID: string,
      commentID: string,
      createdAt: string,
      updatedAt: string,
      userRepliesId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RepliesByUserQueryVariables = {
  userID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelReplyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RepliesByUserQuery = {
  repliesByUser?:  {
    __typename: "ModelReplyConnection",
    items:  Array< {
      __typename: "Reply",
      id: string,
      content: string,
      url?: Array< string | null > | null,
      userID: string,
      commentID: string,
      createdAt: string,
      updatedAt: string,
      userRepliesId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RepliesByCommentQueryVariables = {
  commentID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelReplyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RepliesByCommentQuery = {
  repliesByComment?:  {
    __typename: "ModelReplyConnection",
    items:  Array< {
      __typename: "Reply",
      id: string,
      content: string,
      url?: Array< string | null > | null,
      userID: string,
      commentID: string,
      createdAt: string,
      updatedAt: string,
      userRepliesId?: string | null,
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
    unreadMessageCount: number,
    lastMessage: string,
    role: string,
    active: boolean,
    isMuted?: boolean | null,
    userID: string,
    chatID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      url?: string | null,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    lastMessageAt: string,
    createdAt: string,
    updatedAt: string,
    userChatsId?: string | null,
    owner?: string | null,
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
      unreadMessageCount: number,
      lastMessage: string,
      role: string,
      active: boolean,
      isMuted?: boolean | null,
      userID: string,
      chatID: string,
      lastMessageAt: string,
      createdAt: string,
      updatedAt: string,
      userChatsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ChatsByUserQueryVariables = {
  userID: string,
  lastMessageAt?: ModelStringKeyConditionInput | null,
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
      unreadMessageCount: number,
      lastMessage: string,
      role: string,
      active: boolean,
      isMuted?: boolean | null,
      userID: string,
      chatID: string,
      lastMessageAt: string,
      chat?:  {
        __typename: "Chat",
        id: string,
        name: string,
        url?: string | null,
        isGroup: boolean,
        participants?:  {
          __typename: "ModelUserChatConnection",
          items:  Array< {
            __typename: "UserChat",
            id: string,
            unreadMessageCount: number,
            lastMessage: string,
            role: string,
            active: boolean,
            isMuted?: boolean | null,
            userID: string,
            user?:  {
              __typename: "User",
              id: string,
              email: string,
              firstname: string,
              lastname: string,
              fullname: string,
              profileURL: string,
              description?: string | null,
              unreadChatCount: number,
              unreadNotificationCount: number,
              createdAt: string,
              updatedAt: string,
              owner?: string | null,
            } | null,
            chatID: string,
            lastMessageAt: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userChatsId?: string | null,
      owner?: string | null,
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
      unreadMessageCount: number,
      lastMessage: string,
      role: string,
      active: boolean,
      isMuted?: boolean | null,
      userID: string,
      chatID: string,
      lastMessageAt: string,
      createdAt: string,
      updatedAt: string,
      userChatsId?: string | null,
      owner?: string | null,
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
    url?: string | null,
    isGroup: boolean,
    messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        content: string,
        msgURL?: Array< string | null > | null,
        senderID: string,
        sender?:  {
          __typename: "User",
          id: string,
          firstname: string,
          lastname: string,
          fullname: string,
          email: string,
          profileURL: string,
          description?: string | null,
          unreadChatCount: number,
          unreadNotificationCount: number,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        type?: string | null,
        chatID: string,
        owner?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    participants?:  {
      __typename: "ModelUserChatConnection",
      items:  Array< {
        __typename: "UserChat",
        id: string,
        unreadMessageCount: number,
        lastMessage: string,
        role: string,
        active: boolean,
        isMuted?: boolean | null,
        userID: string,
        chatID: string,
        user?:  {
          __typename: "User",
          id: string,
          firstname: string,
          fullname: string,
          lastname: string,
          email: string,
          profileURL: string,
          description?: string | null,
          unreadChatCount: number,
          unreadNotificationCount: number,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        lastMessageAt: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
      url?: string | null,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
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
    type?: string | null,
    senderID: string,
    chatID: string,
    sender?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      url?: string | null,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
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
      type?: string | null,
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
      type?: string | null,
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
      type?: string | null,
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
    userID: string,
    groupID: string,
    role?: string | null,
    group?:  {
      __typename: "Group",
      id: string,
      groupName: string,
      nameLowercase: string,
      groupURL?: string | null,
      description?: string | null,
      isPublic: boolean,
      memberCount: number,
      type: string,
      members?:  {
        __typename: "ModelUserGroupConnection",
        items:  Array< {
          __typename: "UserGroup",
          id: string,
          userID: string,
          groupID: string,
          role?: string | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userGroupsId?: string | null,
    owner?: string | null,
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
      userID: string,
      groupID: string,
      role?: string | null,
      createdAt: string,
      updatedAt: string,
      userGroupsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GroupsByUserQueryVariables = {
  userID: string,
  updatedAt?: ModelStringKeyConditionInput | null,
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
        nameLowercase: string,
        groupURL?: string | null,
        description?: string | null,
        isPublic: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
        memberCount: number,
        type: string,
        members?:  {
          __typename: "ModelUserGroupConnection",
          items:  Array< {
            __typename: "UserGroup",
            id: string,
            userID: string,
            groupID: string,
            role?: string | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        posts?:  {
          __typename: "ModelPostConnection",
          items:  Array< {
            __typename: "Post",
            id: string,
            content: string,
            postURL?: Array< string | null > | null,
            groupID: string,
            userID: string,
            user?:  {
              __typename: "User",
              id: string,
              email: string,
              firstname: string,
              fullname: string,
              lastname: string,
              profileURL: string,
              description?: string | null,
              unreadChatCount: number,
              unreadNotificationCount: number,
              createdAt: string,
              updatedAt: string,
              owner?: string | null,
            } | null,
            comments?:  {
              __typename: "ModelCommentConnection",
              items:  Array< {
                __typename: "Comment",
                id: string,
                content: string,
                commentURL?: Array< string | null > | null,
                userID: string,
                postID: string,
                createdAt: string,
                updatedAt: string,
                owner?: string | null,
              } | null >,
              nextToken?: string | null,
            } | null,
            commentCount: number,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
      } | null,
      owner?: string | null,
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
      userID: string,
      groupID: string,
      role?: string | null,
      createdAt: string,
      updatedAt: string,
      userGroupsId?: string | null,
      owner?: string | null,
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
    nameLowercase: string,
    groupURL?: string | null,
    description?: string | null,
    isPublic: boolean,
    memberCount: number,
    type: string,
    members?:  {
      __typename: "ModelUserGroupConnection",
      items:  Array< {
        __typename: "UserGroup",
        id: string,
        userID: string,
        groupID: string,
        role?: string | null,
        user?:  {
          __typename: "User",
          id: string,
          email: string,
          firstname: string,
          lastname: string,
          fullname: string,
          profileURL: string,
          description?: string | null,
          unreadChatCount: number,
          unreadNotificationCount: number,
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
    posts?:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        content: string,
        postURL?: Array< string | null > | null,
        groupID: string,
        userID: string,
        user?:  {
          __typename: "User",
          id: string,
          email: string,
          firstname: string,
          lastname: string,
          fullname: string,
          profileURL: string,
          description?: string | null,
          unreadChatCount: number,
          unreadNotificationCount: number,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        comments?:  {
          __typename: "ModelCommentConnection",
          items:  Array< {
            __typename: "Comment",
            id: string,
            content: string,
            commentURL?: Array< string | null > | null,
            userID: string,
            postID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        commentCount: number,
        createdAt: string,
        updatedAt: string,
        userPostsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      items:  Array< {
        __typename: "Notification",
        id: string,
        type: string,
        name: string,
        content: string,
        userID: string,
        groupID?: string | null,
        targetUserID?: string | null,
        onClickID: string,
        read?: boolean | null,
        targetUser?:  {
          __typename: "User",
          id: string,
          email: string,
          firstname: string,
          lastname: string,
          fullname: string,
          profileURL: string,
          description?: string | null,
          unreadChatCount: number,
          unreadNotificationCount: number,
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
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
      nameLowercase: string,
      groupURL?: string | null,
      description?: string | null,
      isPublic: boolean,
      memberCount: number,
      type: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GroupsByMemberCountQueryVariables = {
  type: string,
  memberCount?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GroupsByMemberCountQuery = {
  groupsByMemberCount?:  {
    __typename: "ModelGroupConnection",
    items:  Array< {
      __typename: "Group",
      id: string,
      groupName: string,
      nameLowercase: string,
      groupURL?: string | null,
      description?: string | null,
      isPublic: boolean,
      memberCount: number,
      type: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetNotificationQueryVariables = {
  id: string,
};

export type GetNotificationQuery = {
  getNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    name: string,
    content: string,
    userID: string,
    groupID?: string | null,
    targetUserID?: string | null,
    onClickID: string,
    read?: boolean | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    group?:  {
      __typename: "Group",
      id: string,
      groupName: string,
      nameLowercase: string,
      groupURL?: string | null,
      description?: string | null,
      isPublic: boolean,
      memberCount: number,
      type: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    targetUser?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userNotificationsId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListNotificationsQueryVariables = {
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotificationsQuery = {
  listNotifications?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      type: string,
      name: string,
      content: string,
      userID: string,
      groupID?: string | null,
      targetUserID?: string | null,
      onClickID: string,
      read?: boolean | null,
      createdAt: string,
      updatedAt: string,
      userNotificationsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type NotificationsByUserQueryVariables = {
  userID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type NotificationsByUserQuery = {
  notificationsByUser?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      type: string,
      name: string,
      content: string,
      userID: string,
      groupID?: string | null,
      targetUserID?: string | null,
      onClickID: string,
      read?: boolean | null,
      createdAt: string,
      updatedAt: string,
      userNotificationsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type NotificationsByGroupQueryVariables = {
  groupID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type NotificationsByGroupQuery = {
  notificationsByGroup?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      type: string,
      name: string,
      content: string,
      userID: string,
      groupID?: string | null,
      targetUserID?: string | null,
      onClickID: string,
      read?: boolean | null,
      createdAt: string,
      updatedAt: string,
      userNotificationsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetReportQueryVariables = {
  id: string,
};

export type GetReportQuery = {
  getReport?:  {
    __typename: "Report",
    id: string,
    reporterID: string,
    reportedItemID: string,
    reportedItemType: string,
    reason: string,
    message: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListReportsQueryVariables = {
  filter?: ModelReportFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReportsQuery = {
  listReports?:  {
    __typename: "ModelReportConnection",
    items:  Array< {
      __typename: "Report",
      id: string,
      reporterID: string,
      reportedItemID: string,
      reportedItemType: string,
      reason: string,
      message: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTokenQueryVariables = {
  id: string,
};

export type GetTokenQuery = {
  getToken?:  {
    __typename: "Token",
    id: string,
    tokenID: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userFcmTokensId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListTokensQueryVariables = {
  filter?: ModelTokenFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTokensQuery = {
  listTokens?:  {
    __typename: "ModelTokenConnection",
    items:  Array< {
      __typename: "Token",
      id: string,
      tokenID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      userFcmTokensId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type TokensByIDQueryVariables = {
  tokenID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTokenFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TokensByIDQuery = {
  tokensByID?:  {
    __typename: "ModelTokenConnection",
    items:  Array< {
      __typename: "Token",
      id: string,
      tokenID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      userFcmTokensId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type TokensByUserQueryVariables = {
  userID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTokenFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TokensByUserQuery = {
  tokensByUser?:  {
    __typename: "ModelTokenConnection",
    items:  Array< {
      __typename: "Token",
      id: string,
      tokenID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      userFcmTokensId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetNotificationSettingsQueryVariables = {
  id: string,
};

export type GetNotificationSettingsQuery = {
  getNotificationSettings?:  {
    __typename: "NotificationSettings",
    id: string,
    newPost: boolean,
    joinGroup: boolean,
    groupRequest: boolean,
    newComment: boolean,
    newReply: boolean,
    newReplyComment: boolean,
    newMessage: boolean,
    joinChat: boolean,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListNotificationSettingsQueryVariables = {
  filter?: ModelNotificationSettingsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotificationSettingsQuery = {
  listNotificationSettings?:  {
    __typename: "ModelNotificationSettingsConnection",
    items:  Array< {
      __typename: "NotificationSettings",
      id: string,
      newPost: boolean,
      joinGroup: boolean,
      groupRequest: boolean,
      newComment: boolean,
      newReply: boolean,
      newReplyComment: boolean,
      newMessage: boolean,
      joinChat: boolean,
      userID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type NotificationSettingsByUserQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelNotificationSettingsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type NotificationSettingsByUserQuery = {
  notificationSettingsByUser?:  {
    __typename: "ModelNotificationSettingsConnection",
    items:  Array< {
      __typename: "NotificationSettings",
      id: string,
      newPost: boolean,
      joinGroup: boolean,
      groupRequest: boolean,
      newComment: boolean,
      newReply: boolean,
      newReplyComment: boolean,
      newMessage: boolean,
      joinChat: boolean,
      userID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetBlockListQueryVariables = {
  id: string,
};

export type GetBlockListQuery = {
  getBlockList?:  {
    __typename: "BlockList",
    id: string,
    blockerID: string,
    blockedID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListBlockListsQueryVariables = {
  filter?: ModelBlockListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBlockListsQuery = {
  listBlockLists?:  {
    __typename: "ModelBlockListConnection",
    items:  Array< {
      __typename: "BlockList",
      id: string,
      blockerID: string,
      blockedID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type BlockListByBlockerQueryVariables = {
  blockerID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelBlockListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type BlockListByBlockerQuery = {
  blockListByBlocker?:  {
    __typename: "ModelBlockListConnection",
    items:  Array< {
      __typename: "BlockList",
      id: string,
      blockerID: string,
      blockedID: string,
      blockedUser?:  {
        __typename: "User",
        id: string,
        email: string,
        firstname: string,
        lastname: string,
        fullname: string,
        profileURL: string,
        description?: string | null,
        unreadChatCount: number,
        unreadNotificationCount: number,
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
};

export type BlockListByBlockedQueryVariables = {
  blockedID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelBlockListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type BlockListByBlockedQuery = {
  blockListByBlocked?:  {
    __typename: "ModelBlockListConnection",
    items:  Array< {
      __typename: "BlockList",
      id: string,
      blockerID: string,
      blockedID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
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
    firstname: string,
    lastname: string,
    fullname: string,
    profileURL: string,
    description?: string | null,
    unreadChatCount: number,
    unreadNotificationCount: number,
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
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    replies?:  {
      __typename: "ModelReplyConnection",
      nextToken?: string | null,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
    } | null,
    fcmTokens?:  {
      __typename: "ModelTokenConnection",
      nextToken?: string | null,
    } | null,
    notificationSettings?:  {
      __typename: "NotificationSettings",
      id: string,
      newPost: boolean,
      joinGroup: boolean,
      groupRequest: boolean,
      newComment: boolean,
      newReply: boolean,
      newReplyComment: boolean,
      newMessage: boolean,
      joinChat: boolean,
      userID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
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
    firstname: string,
    lastname: string,
    fullname: string,
    profileURL: string,
    description?: string | null,
    unreadChatCount: number,
    unreadNotificationCount: number,
    notificationSettings?:  {
      __typename: "NotificationSettings",
      id: string,
      newPost: boolean,
      joinGroup: boolean,
      groupRequest: boolean,
      newComment: boolean,
      newReply: boolean,
      newReplyComment: boolean,
      newMessage: boolean,
      joinChat: boolean,
      userID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    fcmTokens?:  {
      __typename: "ModelTokenConnection",
      items:  Array< {
        __typename: "Token",
        id: string,
        tokenID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
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
    firstname: string,
    lastname: string,
    fullname: string,
    profileURL: string,
    description?: string | null,
    unreadChatCount: number,
    unreadNotificationCount: number,
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
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    replies?:  {
      __typename: "ModelReplyConnection",
      nextToken?: string | null,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
    } | null,
    fcmTokens?:  {
      __typename: "ModelTokenConnection",
      nextToken?: string | null,
    } | null,
    notificationSettings?:  {
      __typename: "NotificationSettings",
      id: string,
      newPost: boolean,
      joinGroup: boolean,
      groupRequest: boolean,
      newComment: boolean,
      newReply: boolean,
      newReplyComment: boolean,
      newMessage: boolean,
      joinChat: boolean,
      userID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateUserFeedSubscriptionVariables = {
  filter?: ModelSubscriptionUserFeedFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserFeedSubscription = {
  onCreateUserFeed?:  {
    __typename: "UserFeed",
    id: string,
    userID: string,
    postID: string,
    post?:  {
      __typename: "Post",
      id: string,
      content: string,
      postURL?: Array< string | null > | null,
      groupID: string,
      userID: string,
      commentCount: number,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
      owner?: string | null,
    } | null,
    postCreatedAt: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserFeedSubscriptionVariables = {
  filter?: ModelSubscriptionUserFeedFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserFeedSubscription = {
  onUpdateUserFeed?:  {
    __typename: "UserFeed",
    id: string,
    userID: string,
    postID: string,
    post?:  {
      __typename: "Post",
      id: string,
      content: string,
      postURL?: Array< string | null > | null,
      groupID: string,
      userID: string,
      commentCount: number,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
      owner?: string | null,
    } | null,
    postCreatedAt: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserFeedSubscriptionVariables = {
  filter?: ModelSubscriptionUserFeedFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserFeedSubscription = {
  onDeleteUserFeed?:  {
    __typename: "UserFeed",
    id: string,
    userID: string,
    postID: string,
    post?:  {
      __typename: "Post",
      id: string,
      content: string,
      postURL?: Array< string | null > | null,
      groupID: string,
      userID: string,
      commentCount: number,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
      owner?: string | null,
    } | null,
    postCreatedAt: string,
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
    content: string,
    postURL?: Array< string | null > | null,
    groupID: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    group?:  {
      __typename: "Group",
      id: string,
      groupName: string,
      nameLowercase: string,
      groupURL?: string | null,
      description?: string | null,
      isPublic: boolean,
      memberCount: number,
      type: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    commentCount: number,
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
    content: string,
    postURL?: Array< string | null > | null,
    groupID: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    group?:  {
      __typename: "Group",
      id: string,
      groupName: string,
      nameLowercase: string,
      groupURL?: string | null,
      description?: string | null,
      isPublic: boolean,
      memberCount: number,
      type: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    commentCount: number,
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
    content: string,
    postURL?: Array< string | null > | null,
    groupID: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    group?:  {
      __typename: "Group",
      id: string,
      groupName: string,
      nameLowercase: string,
      groupURL?: string | null,
      description?: string | null,
      isPublic: boolean,
      memberCount: number,
      type: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    commentCount: number,
    createdAt: string,
    updatedAt: string,
    userPostsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
  owner?: string | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    commentURL?: Array< string | null > | null,
    userID: string,
    postID: string,
    replies?:  {
      __typename: "ModelReplyConnection",
      nextToken?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    post?:  {
      __typename: "Post",
      id: string,
      content: string,
      postURL?: Array< string | null > | null,
      groupID: string,
      userID: string,
      commentCount: number,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userCommentsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
  owner?: string | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    commentURL?: Array< string | null > | null,
    userID: string,
    postID: string,
    replies?:  {
      __typename: "ModelReplyConnection",
      nextToken?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    post?:  {
      __typename: "Post",
      id: string,
      content: string,
      postURL?: Array< string | null > | null,
      groupID: string,
      userID: string,
      commentCount: number,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userCommentsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
  owner?: string | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    commentURL?: Array< string | null > | null,
    userID: string,
    postID: string,
    replies?:  {
      __typename: "ModelReplyConnection",
      nextToken?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    post?:  {
      __typename: "Post",
      id: string,
      content: string,
      postURL?: Array< string | null > | null,
      groupID: string,
      userID: string,
      commentCount: number,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userCommentsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateReplySubscriptionVariables = {
  filter?: ModelSubscriptionReplyFilterInput | null,
  owner?: string | null,
};

export type OnCreateReplySubscription = {
  onCreateReply?:  {
    __typename: "Reply",
    id: string,
    content: string,
    url?: Array< string | null > | null,
    userID: string,
    commentID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    comment?:  {
      __typename: "Comment",
      id: string,
      content: string,
      commentURL?: Array< string | null > | null,
      userID: string,
      postID: string,
      createdAt: string,
      updatedAt: string,
      userCommentsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userRepliesId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateReplySubscriptionVariables = {
  filter?: ModelSubscriptionReplyFilterInput | null,
  owner?: string | null,
};

export type OnUpdateReplySubscription = {
  onUpdateReply?:  {
    __typename: "Reply",
    id: string,
    content: string,
    url?: Array< string | null > | null,
    userID: string,
    commentID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    comment?:  {
      __typename: "Comment",
      id: string,
      content: string,
      commentURL?: Array< string | null > | null,
      userID: string,
      postID: string,
      createdAt: string,
      updatedAt: string,
      userCommentsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userRepliesId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteReplySubscriptionVariables = {
  filter?: ModelSubscriptionReplyFilterInput | null,
  owner?: string | null,
};

export type OnDeleteReplySubscription = {
  onDeleteReply?:  {
    __typename: "Reply",
    id: string,
    content: string,
    url?: Array< string | null > | null,
    userID: string,
    commentID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    comment?:  {
      __typename: "Comment",
      id: string,
      content: string,
      commentURL?: Array< string | null > | null,
      userID: string,
      postID: string,
      createdAt: string,
      updatedAt: string,
      userCommentsId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userRepliesId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateUserChatSubscriptionVariables = {
  filter?: ModelSubscriptionUserChatFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserChatSubscription = {
  onCreateUserChat?:  {
    __typename: "UserChat",
    id: string,
    unreadMessageCount: number,
    lastMessage: string,
    role: string,
    active: boolean,
    isMuted?: boolean | null,
    userID: string,
    chatID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      url?: string | null,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    lastMessageAt: string,
    createdAt: string,
    updatedAt: string,
    userChatsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserChatSubscriptionVariables = {
  filter?: ModelSubscriptionUserChatFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserChatSubscription = {
  onUpdateUserChat?:  {
    __typename: "UserChat",
    id: string,
    unreadMessageCount: number,
    lastMessage: string,
    role: string,
    active: boolean,
    isMuted?: boolean | null,
    userID: string,
    chatID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      url?: string | null,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    lastMessageAt: string,
    createdAt: string,
    updatedAt: string,
    userChatsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserChatSubscriptionVariables = {
  filter?: ModelSubscriptionUserChatFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserChatSubscription = {
  onDeleteUserChat?:  {
    __typename: "UserChat",
    id: string,
    unreadMessageCount: number,
    lastMessage: string,
    role: string,
    active: boolean,
    isMuted?: boolean | null,
    userID: string,
    chatID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      url?: string | null,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    lastMessageAt: string,
    createdAt: string,
    updatedAt: string,
    userChatsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateChatSubscriptionVariables = {
  filter?: ModelSubscriptionChatFilterInput | null,
  owner?: string | null,
};

export type OnCreateChatSubscription = {
  onCreateChat?:  {
    __typename: "Chat",
    id: string,
    name: string,
    url?: string | null,
    isGroup: boolean,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    participants?:  {
      __typename: "ModelUserChatConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateChatSubscriptionVariables = {
  filter?: ModelSubscriptionChatFilterInput | null,
  owner?: string | null,
};

export type OnUpdateChatSubscription = {
  onUpdateChat?:  {
    __typename: "Chat",
    id: string,
    name: string,
    url?: string | null,
    isGroup: boolean,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    participants?:  {
      __typename: "ModelUserChatConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteChatSubscriptionVariables = {
  filter?: ModelSubscriptionChatFilterInput | null,
  owner?: string | null,
};

export type OnDeleteChatSubscription = {
  onDeleteChat?:  {
    __typename: "Chat",
    id: string,
    name: string,
    url?: string | null,
    isGroup: boolean,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    participants?:  {
      __typename: "ModelUserChatConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    type?: string | null,
    senderID: string,
    chatID: string,
    sender?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      url?: string | null,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
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
    type?: string | null,
    senderID: string,
    chatID: string,
    sender?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      url?: string | null,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
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
    type?: string | null,
    senderID: string,
    chatID: string,
    sender?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    chat?:  {
      __typename: "Chat",
      id: string,
      name: string,
      url?: string | null,
      isGroup: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userMessagesId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateUserGroupSubscriptionVariables = {
  filter?: ModelSubscriptionUserGroupFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserGroupSubscription = {
  onCreateUserGroup?:  {
    __typename: "UserGroup",
    id: string,
    userID: string,
    groupID: string,
    role?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    group?:  {
      __typename: "Group",
      id: string,
      groupName: string,
      nameLowercase: string,
      groupURL?: string | null,
      description?: string | null,
      isPublic: boolean,
      memberCount: number,
      type: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userGroupsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserGroupSubscriptionVariables = {
  filter?: ModelSubscriptionUserGroupFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserGroupSubscription = {
  onUpdateUserGroup?:  {
    __typename: "UserGroup",
    id: string,
    userID: string,
    groupID: string,
    role?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    group?:  {
      __typename: "Group",
      id: string,
      groupName: string,
      nameLowercase: string,
      groupURL?: string | null,
      description?: string | null,
      isPublic: boolean,
      memberCount: number,
      type: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userGroupsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserGroupSubscriptionVariables = {
  filter?: ModelSubscriptionUserGroupFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserGroupSubscription = {
  onDeleteUserGroup?:  {
    __typename: "UserGroup",
    id: string,
    userID: string,
    groupID: string,
    role?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    group?:  {
      __typename: "Group",
      id: string,
      groupName: string,
      nameLowercase: string,
      groupURL?: string | null,
      description?: string | null,
      isPublic: boolean,
      memberCount: number,
      type: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userGroupsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateGroupSubscriptionVariables = {
  filter?: ModelSubscriptionGroupFilterInput | null,
  owner?: string | null,
};

export type OnCreateGroupSubscription = {
  onCreateGroup?:  {
    __typename: "Group",
    id: string,
    groupName: string,
    nameLowercase: string,
    groupURL?: string | null,
    description?: string | null,
    isPublic: boolean,
    memberCount: number,
    type: string,
    members?:  {
      __typename: "ModelUserGroupConnection",
      nextToken?: string | null,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
    } | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateGroupSubscriptionVariables = {
  filter?: ModelSubscriptionGroupFilterInput | null,
  owner?: string | null,
};

export type OnUpdateGroupSubscription = {
  onUpdateGroup?:  {
    __typename: "Group",
    id: string,
    groupName: string,
    nameLowercase: string,
    groupURL?: string | null,
    description?: string | null,
    isPublic: boolean,
    memberCount: number,
    type: string,
    members?:  {
      __typename: "ModelUserGroupConnection",
      nextToken?: string | null,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
    } | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteGroupSubscriptionVariables = {
  filter?: ModelSubscriptionGroupFilterInput | null,
  owner?: string | null,
};

export type OnDeleteGroupSubscription = {
  onDeleteGroup?:  {
    __typename: "Group",
    id: string,
    groupName: string,
    nameLowercase: string,
    groupURL?: string | null,
    description?: string | null,
    isPublic: boolean,
    memberCount: number,
    type: string,
    members?:  {
      __typename: "ModelUserGroupConnection",
      nextToken?: string | null,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
    } | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
  owner?: string | null,
};

export type OnCreateNotificationSubscription = {
  onCreateNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    name: string,
    content: string,
    userID: string,
    groupID?: string | null,
    targetUserID?: string | null,
    onClickID: string,
    read?: boolean | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    group?:  {
      __typename: "Group",
      id: string,
      groupName: string,
      nameLowercase: string,
      groupURL?: string | null,
      description?: string | null,
      isPublic: boolean,
      memberCount: number,
      type: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    targetUser?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userNotificationsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
  owner?: string | null,
};

export type OnUpdateNotificationSubscription = {
  onUpdateNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    name: string,
    content: string,
    userID: string,
    groupID?: string | null,
    targetUserID?: string | null,
    onClickID: string,
    read?: boolean | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    group?:  {
      __typename: "Group",
      id: string,
      groupName: string,
      nameLowercase: string,
      groupURL?: string | null,
      description?: string | null,
      isPublic: boolean,
      memberCount: number,
      type: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    targetUser?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userNotificationsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
  owner?: string | null,
};

export type OnDeleteNotificationSubscription = {
  onDeleteNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    name: string,
    content: string,
    userID: string,
    groupID?: string | null,
    targetUserID?: string | null,
    onClickID: string,
    read?: boolean | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    group?:  {
      __typename: "Group",
      id: string,
      groupName: string,
      nameLowercase: string,
      groupURL?: string | null,
      description?: string | null,
      isPublic: boolean,
      memberCount: number,
      type: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    targetUser?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userNotificationsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateReportSubscriptionVariables = {
  filter?: ModelSubscriptionReportFilterInput | null,
  owner?: string | null,
};

export type OnCreateReportSubscription = {
  onCreateReport?:  {
    __typename: "Report",
    id: string,
    reporterID: string,
    reportedItemID: string,
    reportedItemType: string,
    reason: string,
    message: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateReportSubscriptionVariables = {
  filter?: ModelSubscriptionReportFilterInput | null,
  owner?: string | null,
};

export type OnUpdateReportSubscription = {
  onUpdateReport?:  {
    __typename: "Report",
    id: string,
    reporterID: string,
    reportedItemID: string,
    reportedItemType: string,
    reason: string,
    message: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteReportSubscriptionVariables = {
  filter?: ModelSubscriptionReportFilterInput | null,
  owner?: string | null,
};

export type OnDeleteReportSubscription = {
  onDeleteReport?:  {
    __typename: "Report",
    id: string,
    reporterID: string,
    reportedItemID: string,
    reportedItemType: string,
    reason: string,
    message: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateTokenSubscriptionVariables = {
  filter?: ModelSubscriptionTokenFilterInput | null,
  owner?: string | null,
};

export type OnCreateTokenSubscription = {
  onCreateToken?:  {
    __typename: "Token",
    id: string,
    tokenID: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userFcmTokensId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateTokenSubscriptionVariables = {
  filter?: ModelSubscriptionTokenFilterInput | null,
  owner?: string | null,
};

export type OnUpdateTokenSubscription = {
  onUpdateToken?:  {
    __typename: "Token",
    id: string,
    tokenID: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userFcmTokensId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteTokenSubscriptionVariables = {
  filter?: ModelSubscriptionTokenFilterInput | null,
  owner?: string | null,
};

export type OnDeleteTokenSubscription = {
  onDeleteToken?:  {
    __typename: "Token",
    id: string,
    tokenID: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userFcmTokensId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateNotificationSettingsSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationSettingsFilterInput | null,
  owner?: string | null,
};

export type OnCreateNotificationSettingsSubscription = {
  onCreateNotificationSettings?:  {
    __typename: "NotificationSettings",
    id: string,
    newPost: boolean,
    joinGroup: boolean,
    groupRequest: boolean,
    newComment: boolean,
    newReply: boolean,
    newReplyComment: boolean,
    newMessage: boolean,
    joinChat: boolean,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateNotificationSettingsSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationSettingsFilterInput | null,
  owner?: string | null,
};

export type OnUpdateNotificationSettingsSubscription = {
  onUpdateNotificationSettings?:  {
    __typename: "NotificationSettings",
    id: string,
    newPost: boolean,
    joinGroup: boolean,
    groupRequest: boolean,
    newComment: boolean,
    newReply: boolean,
    newReplyComment: boolean,
    newMessage: boolean,
    joinChat: boolean,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteNotificationSettingsSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationSettingsFilterInput | null,
  owner?: string | null,
};

export type OnDeleteNotificationSettingsSubscription = {
  onDeleteNotificationSettings?:  {
    __typename: "NotificationSettings",
    id: string,
    newPost: boolean,
    joinGroup: boolean,
    groupRequest: boolean,
    newComment: boolean,
    newReply: boolean,
    newReplyComment: boolean,
    newMessage: boolean,
    joinChat: boolean,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      firstname: string,
      lastname: string,
      fullname: string,
      profileURL: string,
      description?: string | null,
      unreadChatCount: number,
      unreadNotificationCount: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateBlockListSubscriptionVariables = {
  filter?: ModelSubscriptionBlockListFilterInput | null,
  owner?: string | null,
};

export type OnCreateBlockListSubscription = {
  onCreateBlockList?:  {
    __typename: "BlockList",
    id: string,
    blockerID: string,
    blockedID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateBlockListSubscriptionVariables = {
  filter?: ModelSubscriptionBlockListFilterInput | null,
  owner?: string | null,
};

export type OnUpdateBlockListSubscription = {
  onUpdateBlockList?:  {
    __typename: "BlockList",
    id: string,
    blockerID: string,
    blockedID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteBlockListSubscriptionVariables = {
  filter?: ModelSubscriptionBlockListFilterInput | null,
  owner?: string | null,
};

export type OnDeleteBlockListSubscription = {
  onDeleteBlockList?:  {
    __typename: "BlockList",
    id: string,
    blockerID: string,
    blockedID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
