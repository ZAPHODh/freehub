export default {
    header: {
        projects: "Projects",
        freelancers: "Freelancers",
        login: "Login",
        account: "Account",
        about: "About",
        profile: 'Profile',
        settings: 'Settings',
        out: 'Out'
    },
    auth: {
        emailPlaceholder: "name@example.com",
        emailError: "Please enter a valid email address.",
        sendOtp: "Send OTP",
        otpSent: "OTP sent!",
        otpSentDesc: "Please check your mail inbox",
        otpFailed: "Failed to send OTP",
        enterOtp: 'Enter OTP',
        verifyOtp: "Verify OTP",
        verifiedSuccess: "Successfully verified!",
        verifyFailed: "Failed to verify OTP",
        verifyDesc: "Please enter it below for verification.",
        otpSentTo: "We've sent a 6-digit code to {email}.",
        continueWith: "Continue with",
        didNotReceive: "Didn't receive the code/expired?",
        resendIn: "Resend in {countdown}s",
        resend: "Resend",
        resending: "Resending..."


    },
    shared: {
        goBack: 'Go Back',
        locales: {
            portuguese: 'Portuguese',
            english: 'English'
        },
        changeLocale: 'Change Locale',
        logout: 'Log out',
        toggleTheme: 'Toggle Theme',
        light: 'Light',
        dark: 'Dark'
    }
} as const;