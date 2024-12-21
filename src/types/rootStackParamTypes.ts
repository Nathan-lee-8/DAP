import{ User, UserChat } from '../API';

export type RootStackParamList = {
    SignIn: undefined;
    Verify: {password: string};
    ResetPassword: undefined;
};

export type SignedInTabParamList = {
    HomeScreen: undefined;
    MessageScreens: undefined;
    CreatePost: undefined;
    ProfileScreens: undefined;
    EditProfile: undefined;
};

export type MessagingStackParamList = {
    Messaging: undefined;
    ChatRoom: { userChat: UserChat};
    CreateChat: { user: User}
}

export type FindUserParamList = {
    FindUsers: undefined;
    ViewProfiles: { user: User; };
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