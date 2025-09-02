export default {
    header: {
        projects: "Projetos",
        freelancers: "Freelancers",
        login: "Entrar",
        account: "Conta",
        about: "Sobre",
        profile: 'Perfil',
        settings: 'Configurações',
        out: 'Sair'
    },
    auth: {
        emailPlaceholder: "nome@exemplo.com",
        emailError: "Por favor insira um e-mail válido.",
        sendOtp: "Enviar código",
        otpSent: "Código enviado!",
        otpSentDesc: "Verifique sua caixa de entrada",
        otpFailed: "Falha ao enviar o código",
        enterOtp: 'Digite o código',
        verifyOtp: "Verificar código",
        verifiedSuccess: "Verificado com sucesso!",
        verifyFailed: "Falha ao verificar o código",
        verifyDesc: "Insira-o abaixo para verificação.",
        otpSentTo: "Enviamos um código de 6 dígitos para {email}.",
        continueWith: "Continuar com",
        didNotReceive: "Não recebeu o código/expirou?",
        resendIn: "Reenviar em {countdown}s",
        resend: "Reenviar",
        resending: "Reenviando..."
    },
    shared: {
        goBack: 'Voltar',
        locales: {
            portuguese: "Português",
            english: "Inglês"
        },
        changeLocale: 'Mudar Localização',
        logout: 'Sair'
    },
    projects: {
        detail: {
            badges: {
                featured: "Destaque",
                urgent: "Urgente",
                more: "Mais"
            },
            stats: {
                views: "visualizações",
                proposals: "propostas",
                posted: "Publicado"
            },
            actions: {
                favorite: "Favoritar",
                favorited: "Favoritado",
                sendProposal: "Enviar Proposta",
                removeFavorites: "Remover dos Favoritos",
                addFavorites: "Adicionar aos Favoritos",
                contactClient: "Entrar em Contato"
            },
            sections: {
                projectDescription: "Descrição do Projeto",
                skillsTechnologies: "Habilidades e Tecnologias Necessárias",
                skillsRequired: "Habilidades Necessárias",
                technologies: "Tecnologias",
                projectDetails: "Detalhes do Projeto",
                aboutClient: "Sobre o Cliente",
                tags: "Tags"
            },
            details: {
                budget: "Orçamento",
                duration: "Duração",
                experienceLevel: "Nível de Experiência",
                deadline: "Prazo",
                notSpecified: "Não especificado"
            },
            client: {
                rating: "Avaliação",
                reviews: "avaliações",
                totalSpent: "Total Gasto",
                projectsPosted: "Projetos Publicados"
            }
        },
        listing: {
            title: "Encontre Seu Próximo Projeto",
            subtitle: "Descubra oportunidades que combinam com suas habilidades e experiência",
            newProject: "Novo Projeto",
            resultsCount: "projetos encontrados",
            noResults: {
                title: "Nenhum projeto encontrado",
                description: "Tente ajustar seus critérios de busca ou filtros."
            }
        },
        create: {
            title: "Criar Novo Projeto",
            sections: {
                basicInfo: {
                    title: "Informações Básicas",
                    description: "Forneça os detalhes essenciais sobre seu projeto"
                },
                budgetTimeline: {
                    title: "Orçamento e Cronograma",
                    description: "Defina seu orçamento e cronograma do projeto"
                },
                skillsRequirements: {
                    title: "Habilidades e Requisitos",
                    description: "Especifique as habilidades e tecnologias necessárias para seu projeto"
                },
                additionalOptions: {
                    title: "Opções Adicionais"
                }
            },
            fields: {
                projectTitle: {
                    label: "Título do Projeto",
                    placeholder: "Digite um título claro e descritivo para seu projeto"
                },
                projectDescription: {
                    label: "Descrição do Projeto",
                    placeholder:
                        "Descreva seu projeto detalhadamente. Inclua objetivos, requisitos e recursos específicos que você precisa...",
                    hint: "Mínimo de 50 caracteres. Seja específico sobre o que você precisa."
                },
                category: {
                    label: "Categoria",
                    placeholder: "Selecione uma categoria"
                },
                subcategory: {
                    label: "Subcategoria (Opcional)",
                    placeholder: "ex.: Desenvolvimento React, Design de Logo"
                },
                projectType: {
                    label: "Tipo de Projeto",
                    placeholder: "Selecione o tipo de projeto"
                },
                budgetType: {
                    label: "Tipo de Orçamento"
                },
                fixedBudget: {
                    label: "Orçamento Fixo (R$)",
                    placeholder: "5000"
                },
                minHourlyRate: {
                    label: "Taxa Mínima por Hora (R$)",
                    placeholder: "25"
                },
                maxHourlyRate: {
                    label: "Taxa Máxima por Hora (R$)",
                    placeholder: "75"
                },
                deadline: {
                    label: "Prazo (Opcional)"
                },
                estimatedDuration: {
                    label: "Duração Estimada (Opcional)",
                    placeholder: "ex.: 2 semanas, 1 mês"
                },
                experienceLevel: {
                    label: "Nível de Experiência Necessário"
                },
                skills: {
                    label: "Habilidades Necessárias",
                    placeholder: "Adicionar habilidade (ex.: React, Python, Photoshop)",
                    hint: "Adicione pelo menos uma habilidade necessária para seu projeto"
                },
                technologies: {
                    label: "Tecnologias (Opcional)",
                    placeholder: "Adicionar tecnologia (ex.: Node.js, PostgreSQL, AWS)"
                },
                tags: {
                    label: "Tags (Opcional)",
                    placeholder: "Adicione tags para ajudar a categorizar seu projeto"
                },
                isUrgent: {
                    label: "Este é um projeto urgente",
                    description: "Marque este projeto como urgente para atrair respostas mais rápidas"
                }
            },
            budgetTypes: {
                fixed: "Preço Fixo",
                hourly: "Taxa por Hora"
            },
            experienceLevels: {
                beginner: "Iniciante",
                intermediate: "Intermediário",
                advanced: "Avançado"
            },
            actions: {
                saveAsDraft: "Salvar como Rascunho",
                createProject: "Criar Projeto",
                creatingProject: "Criando Projeto..."
            },
            categories: [
                "Desenvolvimento Web",
                "Desenvolvimento Mobile",
                "Design",
                "Redação",
                "Marketing",
                "Ciência de Dados",
                "DevOps",
                "Outros"
            ],
            projectTypes: [
                "Website",
                "Aplicativo Mobile",
                "Aplicativo Desktop",
                "Desenvolvimento de API",
                "Design de Banco de Dados",
                "Design UI/UX",
                "Redação de Conteúdo",
                "SEO/Marketing",
                "Análise de Dados",
                "Outros"
            ],
            messages: {
                validationError: "Erro de Validação",
                validationErrorDescription: "Por favor, corrija os erros no formulário",
                success: "Sucesso!",
                successDescription: "Seu projeto foi criado com sucesso.",
                error: "Erro",
                errorDescription: "Falha ao criar projeto"
            }
        },
        card: {
            timeAgo: {
                justPosted: "Recém publicado",
                hoursAgo: "h atrás",
                daysAgo: "d atrás",
                weeksAgo: "sem atrás"
            },
            stats: {
                proposals: "propostas",
                views: "visualizações"
            },
            estimated: "Est."
        },
        filters: {
            categories: {
                all: "Todas as Categorias"
            },
            experienceLevels: {
                all: "Todos os Níveis",
                entry: "Nível Iniciante",
                intermediate: "Intermediário",
                advanced: "Avançado",
                expert: "Especialista"
            },
            sort: {
                newest: "Mais Recentes",
                budget: "Maior Orçamento",
                proposals: "Mais Propostas"
            },
            activeFilters: "filtro",
            activeFiltersPlural: "filtros",
            active: "ativo",
            clearAll: "Limpar tudo"
        },
        search: {
            placeholder: "Pesquisar projetos..."
        }
    }
} as const;