import ThanksTemp from "@/../emails/thanks";
import ThanksTempPt from "@/../emails/thanks-pt";
import VerificationTemp from "@/../emails/verification";
import VerificationTempPt from "@/../emails/verification-pt";
import { Resend } from "resend";
import { type SendOTPProps, type SendWelcomeEmailProps } from "@/types";
import { generateId } from "../utils";
import { ReactNode } from "react";
import { getCurrentLocale } from "@/locales/server";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async ({
    toMail,
    userName,
}: SendWelcomeEmailProps) => {
    const subject = "Obrigado por usar o Free Hub";
    const locale = await getCurrentLocale()
    const temp = locale === 'en' ? ThanksTemp({ userName }) as ReactNode : ThanksTempPt({ userName }) as ReactNode;

    await resend.emails.send({
        from: `Free Hub <no-reply@resend.dev>`,
        to: toMail,
        subject: subject,
        headers: {
            "X-Entity-Ref-ID": generateId(),
        },
        react: temp,
        text: "",
    });
};

export const sendOTP = async ({ toMail, code, userName }: SendOTPProps) => {
    const subject = "OTP for Free Hub";

    const locale = await getCurrentLocale()
    const temp = locale === 'en' ? VerificationTemp({ userName, code }) as ReactNode : VerificationTempPt({ userName, code }) as ReactNode;
    await resend.emails.send({
        from: `Free Hub <no-reply@resend.dev>`,
        to: toMail,
        subject: subject,
        headers: {
            "X-Entity-Ref-ID": generateId(),
        },
        react: temp,
        text: "",
    });

};