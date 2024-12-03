import{ User, UserChat } from '../API';

export type RootStackParamList = {
    SignIn: undefined;
    Verify: undefined;
    ResetPassword: undefined;
};

export type SignedInTabParamList = {
    Home: undefined;
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