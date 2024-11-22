export type RootStackParamList = {
    SignIn: undefined;
    Verify: { 
        email: string,
        firstname: string,
        lastname: string,
    };
    ResetPassword: undefined;
    Home: undefined;
    CreatePost: undefined;
    FindUsers: undefined;
    Messaging: undefined;
    EditProfile: undefined;
};