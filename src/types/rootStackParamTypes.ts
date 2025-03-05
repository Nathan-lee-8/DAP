import{ User, Group, UserGroup, Post, UserChat, Chat } from '../API';

export type SignInParamList = {
    Welcome: undefined;
    SignIn: undefined;
    SignUp: undefined;
    Verify: {password?: string};
    ResetPassword: undefined;
};

export type GlobalParamList = {
    MainTabs: undefined;
    ViewProfile: {user: User};
    ViewFollowing: {userID: string};
    ChatRoom: {chatID: string};
    CreateChat: {user?: User};
    CreateGroup: undefined;
    CreatePost: {groupID: string};
    ViewGroup: {groupID: string};
    ViewPost: {postID: string};
    EditGroup: {group: Group};
    ViewMembers: {group: Group};
    ViewChatMembers: {chatData: Chat | undefined, userChats: UserChat[]};
    EditPost: {currPost: Post};
    EditChat: {currChat: Chat};
}

export type LoggedInParamList = {
    Home: undefined;
    Messages: undefined;
    Groups: undefined;
    Search: undefined;
    Profile: undefined;
};

export type Participant = {
    __typename: "UserChat";
    user?: {
      __typename: "User";
      id: string,
      firstname?: string | null;
      lastname?: string | null;
      profileURL?: string | null;
    } | null;
} | null;