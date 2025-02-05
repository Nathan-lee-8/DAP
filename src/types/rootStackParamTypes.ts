import{ User, Group } from '../API';

export type SignInParamList = {
    SignIn: undefined;
    Verify: {password?: string};
    ResetPassword: undefined;
};

export type SignInTopTabParamList = {
    SignInRoute: undefined;
    SignUpRoute: undefined;
}

export type GlobalParamList = {
    MainTabs: undefined;
    ViewProfile: {user: User};
    ViewFollowing: {userID: string};
    ChatRoom: { chatID: string};
    CreateChat: { user: User};
    CreateGroup: undefined;
    CreatePost: {groupID: string};
    ViewGroup: {groupID: string};
    ViewPost: {postID: string};
    EditGroup: {group: Group};
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