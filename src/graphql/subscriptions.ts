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
    fullname
    profileURL
    description
    unreadChatCount
    unreadNotificationCount
    posts {
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
    comments {
      nextToken
      __typename
    }
    replies {
      nextToken
      __typename
    }
    notifications {
      nextToken
      __typename
    }
    fcmTokens {
      nextToken
      __typename
    }
    notificationSettings {
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
    fullname
    profileURL
    description
    unreadChatCount
    unreadNotificationCount
    notificationSettings {
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
    }
    fcmTokens{
      items{
        id
        tokenID
        userID
        createdAt
        updatedAt
      }
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
    fullname
    profileURL
    description
    unreadChatCount
    unreadNotificationCount
    posts {
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
    comments {
      nextToken
      __typename
    }
    replies {
      nextToken
      __typename
    }
    notifications {
      nextToken
      __typename
    }
    fcmTokens {
      nextToken
      __typename
    }
    notificationSettings {
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
export const onCreateUserFeed = /* GraphQL */ `subscription OnCreateUserFeed(
  $filter: ModelSubscriptionUserFeedFilterInput
  $owner: String
) {
  onCreateUserFeed(filter: $filter, owner: $owner) {
    id
    userID
    postID
    post {
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
    postCreatedAt
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserFeedSubscriptionVariables,
  APITypes.OnCreateUserFeedSubscription
>;
export const onUpdateUserFeed = /* GraphQL */ `subscription OnUpdateUserFeed(
  $filter: ModelSubscriptionUserFeedFilterInput
  $owner: String
) {
  onUpdateUserFeed(filter: $filter, owner: $owner) {
    id
    userID
    postID
    post {
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
    postCreatedAt
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserFeedSubscriptionVariables,
  APITypes.OnUpdateUserFeedSubscription
>;
export const onDeleteUserFeed = /* GraphQL */ `subscription OnDeleteUserFeed(
  $filter: ModelSubscriptionUserFeedFilterInput
  $owner: String
) {
  onDeleteUserFeed(filter: $filter, owner: $owner) {
    id
    userID
    postID
    post {
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
    postCreatedAt
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserFeedSubscriptionVariables,
  APITypes.OnDeleteUserFeedSubscription
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
    user{
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
    }
    commentCount
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
    user {
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
    group {
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
    comments {
      nextToken
      __typename
    }
    commentCount
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
    user {
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
    group {
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
    comments {
      nextToken
      __typename
    }
    commentCount
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
    replies {
      nextToken
      __typename
    }
    user {
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
    post {
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
    replies {
      nextToken
      __typename
    }
    user {
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
    post {
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
    replies {
      nextToken
      __typename
    }
    user {
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
    post {
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
export const onCreateReply = /* GraphQL */ `subscription OnCreateReply(
  $filter: ModelSubscriptionReplyFilterInput
  $owner: String
) {
  onCreateReply(filter: $filter, owner: $owner) {
    id
    content
    url
    userID
    commentID
    user {
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
    comment {
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
    createdAt
    updatedAt
    userRepliesId
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateReplySubscriptionVariables,
  APITypes.OnCreateReplySubscription
>;
export const onUpdateReply = /* GraphQL */ `subscription OnUpdateReply(
  $filter: ModelSubscriptionReplyFilterInput
  $owner: String
) {
  onUpdateReply(filter: $filter, owner: $owner) {
    id
    content
    url
    userID
    commentID
    user {
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
    comment {
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
    createdAt
    updatedAt
    userRepliesId
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateReplySubscriptionVariables,
  APITypes.OnUpdateReplySubscription
>;
export const onDeleteReply = /* GraphQL */ `subscription OnDeleteReply(
  $filter: ModelSubscriptionReplyFilterInput
  $owner: String
) {
  onDeleteReply(filter: $filter, owner: $owner) {
    id
    content
    url
    userID
    commentID
    user {
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
    comment {
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
    createdAt
    updatedAt
    userRepliesId
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteReplySubscriptionVariables,
  APITypes.OnDeleteReplySubscription
>;
export const onCreateUserChat = /* GraphQL */ `subscription OnCreateUserChat(
  $filter: ModelSubscriptionUserChatFilterInput
  $owner: String
) {
  onCreateUserChat(filter: $filter, owner: $owner) {
    id
    unreadMessageCount
    lastMessage
    role
    active
    isMuted
    userID
    chatID
    user {
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
    chat {
      id
      name
      url
      isGroup
      createdAt
      updatedAt
      owner
      __typename
    }
    lastMessageAt
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
    role
    active
    isMuted
    userID
    chatID
    user {
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
    chat {
      id
      name
      url
      isGroup
      createdAt
      updatedAt
      owner
      __typename
    }
    lastMessageAt
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
    role
    active
    isMuted
    userID
    chatID
    user {
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
    chat {
      id
      name
      url
      isGroup
      createdAt
      updatedAt
      owner
      __typename
    }
    lastMessageAt
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
    messages {
      nextToken
      __typename
    }
    participants {
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
    messages {
      nextToken
      __typename
    }
    participants {
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
    messages {
      nextToken
      __typename
    }
    participants {
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
    type
    senderID
    chatID
    sender {
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
    chat {
      id
      name
      url
      isGroup
      createdAt
      updatedAt
      owner
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
    type
    senderID
    chatID
    sender {
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
    chat {
      id
      name
      url
      isGroup
      createdAt
      updatedAt
      owner
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
    type
    senderID
    chatID
    sender {
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
    chat {
      id
      name
      url
      isGroup
      createdAt
      updatedAt
      owner
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
  $owner: String
) {
  onCreateUserGroup(filter: $filter, owner: $owner) {
    id
    userID
    groupID
    role
    group {
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
    createdAt
    updatedAt
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
    user {
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
    group {
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
    user {
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
    group {
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
    nameLowercase
    groupURL
    description
    isPublic
    memberCount
    type
    members {
      nextToken
      __typename
    }
    notifications {
      nextToken
      __typename
    }
    posts {
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
    nameLowercase
    groupURL
    description
    isPublic
    memberCount
    type
    members {
      nextToken
      __typename
    }
    notifications {
      nextToken
      __typename
    }
    posts {
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
    nameLowercase
    groupURL
    description
    isPublic
    memberCount
    type
    members {
      nextToken
      __typename
    }
    notifications {
      nextToken
      __typename
    }
    posts {
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
  APITypes.OnDeleteGroupSubscriptionVariables,
  APITypes.OnDeleteGroupSubscription
>;
export const onCreateNotification = /* GraphQL */ `subscription OnCreateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
  $owner: String
) {
  onCreateNotification(filter: $filter, owner: $owner) {
    id
    type
    name
    content
    userID
    groupID
    targetUserID
    onClickID
    read
    user {
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
    group {
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
    targetUser {
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
    createdAt
    updatedAt
    userNotificationsId
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateNotificationSubscriptionVariables,
  APITypes.OnCreateNotificationSubscription
>;
export const onUpdateNotification = /* GraphQL */ `subscription OnUpdateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
  $owner: String
) {
  onUpdateNotification(filter: $filter, owner: $owner) {
    id
    type
    name
    content
    userID
    groupID
    targetUserID
    onClickID
    read
    user {
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
    group {
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
    targetUser {
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
    createdAt
    updatedAt
    userNotificationsId
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateNotificationSubscriptionVariables,
  APITypes.OnUpdateNotificationSubscription
>;
export const onDeleteNotification = /* GraphQL */ `subscription OnDeleteNotification(
  $filter: ModelSubscriptionNotificationFilterInput
  $owner: String
) {
  onDeleteNotification(filter: $filter, owner: $owner) {
    id
    type
    name
    content
    userID
    groupID
    targetUserID
    onClickID
    read
    user {
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
    group {
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
    targetUser {
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
    createdAt
    updatedAt
    userNotificationsId
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteNotificationSubscriptionVariables,
  APITypes.OnDeleteNotificationSubscription
>;
export const onCreateReport = /* GraphQL */ `subscription OnCreateReport(
  $filter: ModelSubscriptionReportFilterInput
  $owner: String
) {
  onCreateReport(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateReportSubscriptionVariables,
  APITypes.OnCreateReportSubscription
>;
export const onUpdateReport = /* GraphQL */ `subscription OnUpdateReport(
  $filter: ModelSubscriptionReportFilterInput
  $owner: String
) {
  onUpdateReport(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateReportSubscriptionVariables,
  APITypes.OnUpdateReportSubscription
>;
export const onDeleteReport = /* GraphQL */ `subscription OnDeleteReport(
  $filter: ModelSubscriptionReportFilterInput
  $owner: String
) {
  onDeleteReport(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteReportSubscriptionVariables,
  APITypes.OnDeleteReportSubscription
>;
export const onCreateToken = /* GraphQL */ `subscription OnCreateToken(
  $filter: ModelSubscriptionTokenFilterInput
  $owner: String
) {
  onCreateToken(filter: $filter, owner: $owner) {
    id
    tokenID
    userID
    user {
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
    createdAt
    updatedAt
    userFcmTokensId
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTokenSubscriptionVariables,
  APITypes.OnCreateTokenSubscription
>;
export const onUpdateToken = /* GraphQL */ `subscription OnUpdateToken(
  $filter: ModelSubscriptionTokenFilterInput
  $owner: String
) {
  onUpdateToken(filter: $filter, owner: $owner) {
    id
    tokenID
    userID
    user {
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
    createdAt
    updatedAt
    userFcmTokensId
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTokenSubscriptionVariables,
  APITypes.OnUpdateTokenSubscription
>;
export const onDeleteToken = /* GraphQL */ `subscription OnDeleteToken(
  $filter: ModelSubscriptionTokenFilterInput
  $owner: String
) {
  onDeleteToken(filter: $filter, owner: $owner) {
    id
    tokenID
    userID
    user {
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
    createdAt
    updatedAt
    userFcmTokensId
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTokenSubscriptionVariables,
  APITypes.OnDeleteTokenSubscription
>;
export const onCreateNotificationSettings = /* GraphQL */ `subscription OnCreateNotificationSettings(
  $filter: ModelSubscriptionNotificationSettingsFilterInput
  $owner: String
) {
  onCreateNotificationSettings(filter: $filter, owner: $owner) {
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
    user {
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
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateNotificationSettingsSubscriptionVariables,
  APITypes.OnCreateNotificationSettingsSubscription
>;
export const onUpdateNotificationSettings = /* GraphQL */ `subscription OnUpdateNotificationSettings(
  $filter: ModelSubscriptionNotificationSettingsFilterInput
  $owner: String
) {
  onUpdateNotificationSettings(filter: $filter, owner: $owner) {
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
    user {
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
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateNotificationSettingsSubscriptionVariables,
  APITypes.OnUpdateNotificationSettingsSubscription
>;
export const onDeleteNotificationSettings = /* GraphQL */ `subscription OnDeleteNotificationSettings(
  $filter: ModelSubscriptionNotificationSettingsFilterInput
  $owner: String
) {
  onDeleteNotificationSettings(filter: $filter, owner: $owner) {
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
    user {
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
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteNotificationSettingsSubscriptionVariables,
  APITypes.OnDeleteNotificationSettingsSubscription
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
export const onUpdateBlockList = /* GraphQL */ `subscription OnUpdateBlockList(
  $filter: ModelSubscriptionBlockListFilterInput
  $owner: String
) {
  onUpdateBlockList(filter: $filter, owner: $owner) {
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
  APITypes.OnUpdateBlockListSubscriptionVariables,
  APITypes.OnUpdateBlockListSubscription
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
