import{ User, Group, Post, UserChat, Chat } from '../API';

export type SignInParamList = {
    Welcome: undefined;
    SignIn: undefined;
    SignUp: undefined;
    Verify: {email?: string, password?: string};
    ResetPassword: undefined;
    CreateUser: undefined;
};

export type GlobalParamList = {
    MainTabs: undefined;
    ViewProfile: {userID: string};
    ViewFollowing: {userID: string};
    ViewChat: {chatID: string};
    CreateChat: {user?: User};
    CreateGroup: undefined;
    CreatePost: {groupID: string, isPublic: boolean};
    ViewGroup: {groupID: string};
    ViewPost: {postID: string};
    EditGroup: {group: Group};
    ViewGroupMembers: {group: Group};
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