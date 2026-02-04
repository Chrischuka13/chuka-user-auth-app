import nodemailer from 'nodemailer'
import User from "@/models/userModel"
import bcrypt from 'bcryptjs'


export const sendEmail = async({email, emailType, userId} : {email:string, emailType: "VERIFY" | "RESET", userId:string}) => {
    try {
        // create a hash token
        const hashToken = await bcrypt.hash(userId.toString(), 10)

        //update a user
        if (emailType === "VERIFY") {
        await User.findByIdAndUpdate(userId,
        {verifyToken: hashToken,
        verifyTokenExpire: Date.now() + 3600000}) //1hr

        } else if (emailType === "RESET") {
        await User.findByIdAndUpdate(userId,
        {forgotPasswordToken: hashToken,
        forgotPaswordExpire: Date.now() + 3600000}) //1hr
        }

        
        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false,
        }
        });

        const actionUrl = emailType === "VERIFY"? `${process.env.domain}/verifymail?token=${hashToken}` : `${process.env.domain}/resetpassword?token=${hashToken}`;
        
        const mailOptions = {
            from: `"Chuka's Auth-Project": ${process.env.EMAIL_USER}`,
            to: email,
            subject: emailType === "VERIFY"? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${actionUrl}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser.
            <br> ${actionUrl}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions) 

        return mailResponse;
        
    } catch (error: unknown) {
        throw error instanceof Error 
        ? error : new Error("Unknown error occurred");
}

}