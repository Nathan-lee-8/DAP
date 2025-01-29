import{ User, UserChat } from '../API';

export type SignInParamList = {
    SignIn: undefined;
    SignUp: undefined;
    Verify: {password: string};
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
    ChatRoom: { userChat: UserChat};
    CreateChat: { user: User};
    CreateGroup: undefined;
    CreatePost: {groupID: string};
    ViewGroup: {groupID: string};
}

export type LoggedInParamList = {
    Home: undefined;
    Messaging: undefined;
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