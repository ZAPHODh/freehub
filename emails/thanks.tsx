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
        < Preview > Welcome to Free Lance</Preview>
        < Tailwind >
            <Body className="bg-gray-100" >
                <Container className="mx-auto my-10 bg-white" >
                    <Section className="m-6" >
                        <Text className="mx-10 text-lg font-bold" > Hi {userName} 👋 , </Text>
                        < Text className="mx-10 text-base" >
                            Welcome to Free Lance. Now you can post your projects and find freelancers to work with you.
                        </Text>
                        < Section className="my-5 text-center" >
                            <Button
                                className="inline-block px-6 py-3 text-base text-white rounded-md bg-bg-white bg-slate-900"
                                href={process.env.NEXT_PUBLIC_APP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Go to Free Lance
                            </Button>
                        </Section>
                        < Text className="mx-10 text-base font-light" > Best, </Text>
                        < Text className="mx-10 text-base font-bold" > Free Lance </Text>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

export default ThanksTemp;