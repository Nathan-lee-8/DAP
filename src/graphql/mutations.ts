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
    fullname
    profileURL
    description
    unreadChatCount
    unreadNotificationCount
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
    fullname
    profileURL
    description
    unreadChatCount
    unreadNotificationCount
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
    fullname
    profileURL
    description
    unreadChatCount
    unreadNotificationCount
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
export const createUserFeed = /* GraphQL */ `mutation CreateUserFeed(
  $input: CreateUserFeedInput!
  $condition: ModelUserFeedConditionInput
) {
  createUserFeed(input: $input, condition: $condition) {
    id
    userID
    postID
        postCreatedAt
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserFeedMutationVariables,
  APITypes.CreateUserFeedMutation
>;
export const updateUserFeed = /* GraphQL */ `mutation UpdateUserFeed(
  $input: UpdateUserFeedInput!
  $condition: ModelUserFeedConditionInput
) {
  updateUserFeed(input: $input, condition: $condition) {
    id
    userID
    postID
    postCreatedAt
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserFeedMutationVariables,
  APITypes.UpdateUserFeedMutation
>;
export const deleteUserFeed = /* GraphQL */ `mutation DeleteUserFeed(
  $input: DeleteUserFeedInput!
  $condition: ModelUserFeedConditionInput
) {
  deleteUserFeed(input: $input, condition: $condition) {
    id
    userID
    postID
    postCreatedAt
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserFeedMutationVariables,
  APITypes.DeleteUserFeedMutation
>;
export const createPost = /* GraphQL */ `mutation CreatePost(
  $input: CreatePostInput!
  $condition: ModelPostConditionInput
) {
  createPost(input: $input, condition: $condition) {
    id
    content
    postURL
    groupID
    userID
    commentCount
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
    content
    postURL
    groupID
    userID
    commentCount
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
    content
    postURL
    groupID
    userID
    commentCount
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
export const createComment = /* GraphQL */ `mutation CreateComment(
  $input: CreateCommentInput!
  $condition: ModelCommentConditionInput
) {
  createComment(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateCommentMutationVariables,
  APITypes.CreateCommentMutation
>;
export const updateComment = /* GraphQL */ `mutation UpdateComment(
  $input: UpdateCommentInput!
  $condition: ModelCommentConditionInput
) {
  updateComment(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateCommentMutationVariables,
  APITypes.UpdateCommentMutation
>;
export const deleteComment = /* GraphQL */ `mutation DeleteComment(
  $input: DeleteCommentInput!
  $condition: ModelCommentConditionInput
) {
  deleteComment(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteCommentMutationVariables,
  APITypes.DeleteCommentMutation
>;
export const createReply = /* GraphQL */ `mutation CreateReply(
  $input: CreateReplyInput!
  $condition: ModelReplyConditionInput
) {
  createReply(input: $input, condition: $condition) {
    id
    content
    url
    userID
    commentID
    createdAt
    updatedAt
    userRepliesId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateReplyMutationVariables,
  APITypes.CreateReplyMutation
>;
export const updateReply = /* GraphQL */ `mutation UpdateReply(
  $input: UpdateReplyInput!
  $condition: ModelReplyConditionInput
) {
  updateReply(input: $input, condition: $condition) {
    id
    content
    url
    userID
    commentID
    createdAt
    updatedAt
    userRepliesId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateReplyMutationVariables,
  APITypes.UpdateReplyMutation
>;
export const deleteReply = /* GraphQL */ `mutation DeleteReply(
  $input: DeleteReplyInput!
  $condition: ModelReplyConditionInput
) {
  deleteReply(input: $input, condition: $condition) {
    id
    content
    url
    userID
    commentID
    createdAt
    updatedAt
    userRepliesId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteReplyMutationVariables,
  APITypes.DeleteReplyMutation
>;
export const createUserChat = /* GraphQL */ `mutation CreateUserChat(
  $input: CreateUserChatInput!
  $condition: ModelUserChatConditionInput
) {
  createUserChat(input: $input, condition: $condition) {
    id
    unreadMessageCount
    lastMessage
    role
    isMuted
    userID
    chatID
    lastMessageAt
    createdAt
    updatedAt
    userChatsId
    owner
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
    unreadMessageCount
    lastMessage
    role
    isMuted
    userID
    chatID
    lastMessageAt
    createdAt
    updatedAt
    userChatsId
    owner
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
    unreadMessageCount
    lastMessage
    role
    isMuted
    userID
    chatID
    lastMessageAt
    createdAt
    updatedAt
    userChatsId
    owner
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
    url
    isGroup
    createdAt
    updatedAt
    owner
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
    url
    isGroup
    createdAt
    updatedAt
    owner
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
    url
    isGroup
    createdAt
    updatedAt
    owner
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
    msgURL
    type
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
    type
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
    type
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
` as GeneratedMutation<
  APITypes.UpdateUserGroupMutationVariables,
  APITypes.UpdateUserGroupMutation
>;
export const deleteUserGroup = /* GraphQL */ `mutation DeleteUserGroup(
  $input: DeleteUserGroupInput!
  $condition: ModelUserGroupConditionInput
) {
  deleteUserGroup(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserGroupMutationVariables,
  APITypes.DeleteUserGroupMutation
>;
export const createGroup = /* GraphQL */ `mutation CreateGroup(
  $input: CreateGroupInput!
  $condition: ModelGroupConditionInput
) {
  createGroup(input: $input, condition: $condition) {
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
}
` as GeneratedMutation<
  APITypes.UpdateGroupMutationVariables,
  APITypes.UpdateGroupMutation
>;
export const deleteGroup = /* GraphQL */ `mutation DeleteGroup(
  $input: DeleteGroupInput!
  $condition: ModelGroupConditionInput
) {
  deleteGroup(input: $input, condition: $condition) {
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
}
` as GeneratedMutation<
  APITypes.DeleteGroupMutationVariables,
  APITypes.DeleteGroupMutation
>;
export const createNotification = /* GraphQL */ `mutation CreateNotification(
  $input: CreateNotificationInput!
  $condition: ModelNotificationConditionInput
) {
  createNotification(input: $input, condition: $condition) {
    id
    type
    name
    content
    userID
    groupID
    targetUserID
    onClickID
    read
    createdAt
    updatedAt
    userNotificationsId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateNotificationMutationVariables,
  APITypes.CreateNotificationMutation
>;
export const updateNotification = /* GraphQL */ `mutation UpdateNotification(
  $input: UpdateNotificationInput!
  $condition: ModelNotificationConditionInput
) {
  updateNotification(input: $input, condition: $condition) {
    id
    type
    name
    content
    userID
    groupID
    targetUserID
    onClickID
    read
    createdAt
    updatedAt
    userNotificationsId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateNotificationMutationVariables,
  APITypes.UpdateNotificationMutation
>;
export const deleteNotification = /* GraphQL */ `mutation DeleteNotification(
  $input: DeleteNotificationInput!
  $condition: ModelNotificationConditionInput
) {
  deleteNotification(input: $input, condition: $condition) {
    id
    type
    name
    content
    userID
    groupID
    targetUserID
    onClickID
    read
    createdAt
    updatedAt
    userNotificationsId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteNotificationMutationVariables,
  APITypes.DeleteNotificationMutation
>;
export const createReport = /* GraphQL */ `mutation CreateReport(
  $input: CreateReportInput!
  $condition: ModelReportConditionInput
) {
  createReport(input: $input, condition: $condition) {
    id
    reporterID
    reportedItemID
    reportedItemType
    reason
    message
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateReportMutationVariables,
  APITypes.CreateReportMutation
>;
export const updateReport = /* GraphQL */ `mutation UpdateReport(
  $input: UpdateReportInput!
  $condition: ModelReportConditionInput
) {
  updateReport(input: $input, condition: $condition) {
    id
    reporterID
    reportedItemID
    reportedItemType
    reason
    message
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateReportMutationVariables,
  APITypes.UpdateReportMutation
>;
export const deleteReport = /* GraphQL */ `mutation DeleteReport(
  $input: DeleteReportInput!
  $condition: ModelReportConditionInput
) {
  deleteReport(input: $input, condition: $condition) {
    id
    reporterID
    reportedItemID
    reportedItemType
    reason
    message
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteReportMutationVariables,
  APITypes.DeleteReportMutation
>;
export const createToken = /* GraphQL */ `mutation CreateToken(
  $input: CreateTokenInput!
  $condition: ModelTokenConditionInput
) {
  createToken(input: $input, condition: $condition) {
    id
    tokenID
    userID
    createdAt
    updatedAt
    userFcmTokensId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTokenMutationVariables,
  APITypes.CreateTokenMutation
>;
export const updateToken = /* GraphQL */ `mutation UpdateToken(
  $input: UpdateTokenInput!
  $condition: ModelTokenConditionInput
) {
  updateToken(input: $input, condition: $condition) {
    id
    tokenID
    userID
    createdAt
    updatedAt
    userFcmTokensId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTokenMutationVariables,
  APITypes.UpdateTokenMutation
>;
export const deleteToken = /* GraphQL */ `mutation DeleteToken(
  $input: DeleteTokenInput!
  $condition: ModelTokenConditionInput
) {
  deleteToken(input: $input, condition: $condition) {
    id
    tokenID
    userID
    createdAt
    updatedAt
    userFcmTokensId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTokenMutationVariables,
  APITypes.DeleteTokenMutation
>;
export const createNotificationSettings = /* GraphQL */ `mutation CreateNotificationSettings(
  $input: CreateNotificationSettingsInput!
  $condition: ModelNotificationSettingsConditionInput
) {
  createNotificationSettings(input: $input, condition: $condition) {
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateNotificationSettingsMutationVariables,
  APITypes.CreateNotificationSettingsMutation
>;
export const updateNotificationSettings = /* GraphQL */ `mutation UpdateNotificationSettings(
  $input: UpdateNotificationSettingsInput!
  $condition: ModelNotificationSettingsConditionInput
) {
  updateNotificationSettings(input: $input, condition: $condition) {
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateNotificationSettingsMutationVariables,
  APITypes.UpdateNotificationSettingsMutation
>;
export const deleteNotificationSettings = /* GraphQL */ `mutation DeleteNotificationSettings(
  $input: DeleteNotificationSettingsInput!
  $condition: ModelNotificationSettingsConditionInput
) {
  deleteNotificationSettings(input: $input, condition: $condition) {
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteNotificationSettingsMutationVariables,
  APITypes.DeleteNotificationSettingsMutation
>;
