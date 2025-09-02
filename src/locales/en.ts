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
    },
    projects: {
        detail: {
            badges: {
                featured: "Featured",
                urgent: "Urgent",
                more: "More"
            },
            stats: {
                views: "views",
                proposals: "proposals",
                posted: "Posted"
            },
            actions: {
                favorite: "Favorite",
                favorited: "Favorited",
                sendProposal: "Send Proposal",
                removeFavorites: "Remove from Favorites",
                addFavorites: "Add to Favorites",
                contactClient: "Contact Client"
            },
            sections: {
                projectDescription: "Project Description",
                skillsTechnologies: "Skills & Technologies Required",
                skillsRequired: "Skills Required",
                technologies: "Technologies",
                projectDetails: "Project Details",
                aboutClient: "About the Client",
                tags: "Tags"
            },
            details: {
                budget: "Budget",
                duration: "Duration",
                experienceLevel: "Experience Level",
                deadline: "Deadline",
                notSpecified: "Not specified"
            },
            client: {
                rating: "Rating",
                reviews: "reviews",
                totalSpent: "Total Spent",
                projectsPosted: "Projects Posted"
            }
        },
        listing: {
            title: "Find Your Next Project",
            subtitle: "Discover opportunities that match your skills and expertise",
            newProject: "New Project",
            resultsCount: "projects found",
            noResults: {
                title: "No projects found",
                description: "Try adjusting your search criteria or filters."
            }
        },
        create: {
            title: "Create New Project",
            sections: {
                basicInfo: {
                    title: "Basic Information",
                    description: "Provide the essential details about your project"
                },
                budgetTimeline: {
                    title: "Budget & Timeline",
                    description: "Set your budget and project timeline"
                },
                skillsRequirements: {
                    title: "Skills & Requirements",
                    description: "Specify the skills and technologies needed for your project"
                },
                additionalOptions: {
                    title: "Additional Options"
                }
            },
            fields: {
                projectTitle: {
                    label: "Project Title",
                    placeholder: "Enter a clear, descriptive title for your project"
                },
                projectDescription: {
                    label: "Project Description",
                    placeholder:
                        "Describe your project in detail. Include goals, requirements, and any specific features you need...",
                    hint: "Minimum 50 characters. Be specific about what you need."
                },
                category: {
                    label: "Category",
                    placeholder: "Select a category"
                },
                subcategory: {
                    label: "Subcategory (Optional)",
                    placeholder: "e.g., React Development, Logo Design"
                },
                projectType: {
                    label: "Project Type",
                    placeholder: "Select project type"
                },
                budgetType: {
                    label: "Budget Type"
                },
                fixedBudget: {
                    label: "Fixed Budget ($)",
                    placeholder: "5000"
                },
                minHourlyRate: {
                    label: "Min Hourly Rate ($)",
                    placeholder: "25"
                },
                maxHourlyRate: {
                    label: "Max Hourly Rate ($)",
                    placeholder: "75"
                },
                deadline: {
                    label: "Deadline (Optional)"
                },
                estimatedDuration: {
                    label: "Estimated Duration (Optional)",
                    placeholder: "e.g., 2 weeks, 1 month"
                },
                experienceLevel: {
                    label: "Required Experience Level"
                },
                skills: {
                    label: "Required Skills",
                    placeholder: "Add a skill (e.g., React, Python, Photoshop)",
                    hint: "Add at least one required skill for your project"
                },
                technologies: {
                    label: "Technologies (Optional)",
                    placeholder: "Add a technology (e.g., Node.js, PostgreSQL, AWS)"
                },
                tags: {
                    label: "Tags (Optional)",
                    placeholder: "Add tags to help categorize your project"
                },
                isUrgent: {
                    label: "This is an urgent project",
                    description: "Mark this project as urgent to attract faster responses"
                }
            },
            budgetTypes: {
                fixed: "Fixed Price",
                hourly: "Hourly Rate"
            },
            experienceLevels: {
                beginner: "Beginner",
                intermediate: "Intermediate",
                advanced: "Advanced"
            },
            actions: {
                saveAsDraft: "Save as Draft",
                createProject: "Create Project",
                creatingProject: "Creating Project..."
            },
            categories: [
                "Web Development",
                "Mobile Development",
                "Design",
                "Writing",
                "Marketing",
                "Data Science",
                "DevOps",
                "Other"
            ],
            projectTypes: [
                "Website",
                "Mobile App",
                "Desktop App",
                "API Development",
                "Database Design",
                "UI/UX Design",
                "Content Writing",
                "SEO/Marketing",
                "Data Analysis",
                "Other"
            ],
            messages: {
                validationError: "Validation Error",
                validationErrorDescription: "Please fix the errors in the form",
                success: "Success!",
                successDescription: "Your project has been created successfully.",
                error: "Error",
                errorDescription: "Failed to create project"
            }
        },
        card: {
            timeAgo: {
                justPosted: "Just posted",
                hoursAgo: "h ago",
                daysAgo: "d ago",
                weeksAgo: "w ago"
            },
            stats: {
                proposals: "proposals",
                views: "views"
            },
            estimated: "Est."
        },
        filters: {
            categories: {
                all: "All Categories"
            },
            experienceLevels: {
                all: "All Levels",
                entry: "Entry Level",
                intermediate: "Intermediate",
                advanced: "Advanced",
                expert: "Expert"
            },
            sort: {
                newest: "Newest First",
                budget: "Highest Budget",
                proposals: "Most Proposals"
            },
            activeFilters: "filter",
            activeFiltersPlural: "filters",
            active: "active",
            clearAll: "Clear all"
        },
        search: {
            placeholder: "Search projects..."
        }
    }
} as const;