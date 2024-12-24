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

export type LoggedInParamList = {
    HomeScreen: undefined;
    MessageScreens: undefined;
    CreatePost: undefined;
    ProfileScreens: undefined;
    EditProfile: undefined;
};

export type HomeParamList = {
    Home: undefined;
    ViewHomeProf: { user: User };
}

export type MessagingStackParamList = {
    Messaging: undefined;
    ChatRoom: { userChat: UserChat};
    CreateChat: { user: User}
}

export type FindUserParamList = {
    FindUsers: undefined;
    ViewProfiles: { user: User };
}

export type TopTabParamList = { 
    Market: { category: string};
    Jobs: { category: string};
    Volunteer: { category: string};
}

export type PostsTopTabParamList = { 
    Market: { category: string, userID: string};
    Jobs: { category: string, userID: string};
    Volunteer: { category: string, userID: string};
}

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