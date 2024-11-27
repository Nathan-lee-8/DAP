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
    ChatRoom: { 
        user: {
            id: string;
            email: string;
            firstname?: string | null;
            lastname?: string | null;
            avatarUrl?: string | null;
            phonenumber?: string | null;
            createdAt: string;
            updatedAt: string;
        };
    };
    CreateChat: {
        user: {
            id: string;
            email: string;
            firstname?: string | null;
            lastname?: string | null;
            avatarUrl?: string | null;
            phonenumber?: string | null;
            createdAt: string;
            updatedAt: string;
        };
    }
}

export type FindUserParamList = {
    FindUsers: undefined;
    ViewProfiles: { 
        user: {
            id: string;
            email: string;
            firstname?: string | null;
            lastname?: string | null;
            avatarUrl?: string | null;
            phonenumber?: string | null;
            createdAt: string;
            updatedAt: string;
        };
    };
}