import {
    Body,
    Container,
    Head,
    Html,
    Preview,
    Section,
    Tailwind,
    Text
} from "@react-email/components";

const siteUrl =
    process.env.NEXT_PUBLIC_URL ?? "https://chadnext.moinulmoin.com";

interface VerificationTemplateProps {
    userName: string;
    code: string;
}

const VerificationTemp: React.FC<Readonly<VerificationTemplateProps>> = ({
    userName = "X",
    code = "46590",
}) => (
    <Html>
        <Head />
        <Preview>Verifique seu e-mail</Preview>
        <Tailwind>
            <Body className="bg-gray-100">
                <Container className="p-6 m-10 mx-auto bg-white">
                    <Text className="mb-4 text-lg">Hi, {userName.split(" ")[0]}</Text>
                    <Text className="text-base font-semibold text-center">
                        Aqui está o seu código de verificação.
                    </Text>
                    <Section className="mt-4 text-center">
                        <div className="inline-block px-6 py-3 text-xl font-bold tracking-[10px] text-slate-900">
                            {code}
                        </div>
                        <Text className="mt-2.5 text-sm">
                            Este código expira em 3 minutos e só pode ser usado uma vez.
                        </Text>
                    </Section>
                    <Text className="mt-8 text-base">
                        Lhe desejo o melhor,
                        <br />
                        <span className="font-bold">FreeHub</span>
                    </Text>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

export default VerificationTemp;