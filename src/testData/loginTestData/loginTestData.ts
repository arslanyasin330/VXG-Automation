export const loginTestData = {
    signInUrl: "http://cloudtwo.cloud-vms.com/sign-in",
    landingPageTitle: "VXG Web Client",
    title: "CloudOne",
    emailLabel: "Email",
    passwordLabel: "Password",
    error: {
        invalidEmail: "Invalid email address",
        toShortPassword: "Too short password",
        invalidCredentials: "Invalid credentials",
    },
    invalidEmailAddress: "dev",
    invalidPassword: "112233",
    incompleteEmailAddress: "dev@",
    invalidEmailDialog: (error: string): string => {
        return `Please include and '@' in the email address. '${error}' is missing an '@'.`;
    },
    incompleteEmailDialog: (error: string): string => {
        return `Please enter a part following '@'. '${error}' is incomplete.`;
    },
};
