import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";

interface ThanksTemplateProps {
    userName: string;
}

const ThanksTemp: React.FC<Readonly<ThanksTemplateProps>> = ({ userName }) => (
    <Html>
        <Head />
        < Preview > Bem vindo(a) a FreeHub.</Preview>
        < Tailwind >
            <Body className="bg-gray-100" >
                <Container className="mx-auto my-10 bg-white" >
                    <Section className="m-6" >
                        <Text className="mx-10 text-lg font-bold" > Hi {userName} 👋 , </Text>
                        < Text className="mx-10 text-base" >
                            Bem vindo(a) à FreeHub. Agora, você faz parte da nossa comunidade! Estamos felizes em ter você conosco e esperamos que aproveite ao máximo todos os recursos disponíveis.
                        </Text>
                        < Section className="my-5 text-center" >
                            <Button
                                className="inline-block px-6 py-3 text-base text-white rounded-md bg-bg-white bg-slate-900"
                                href={process.env.NEXT_PUBLIC_APP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Acessar minha conta
                            </Button>
                        </Section>
                        < Text className="mx-10 text-base font-light" > Lhe desejamos o melhor, </Text>
                        < Text className="mx-10 text-base font-bold" > FreeHub </Text>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

export default ThanksTemp;