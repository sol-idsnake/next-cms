import { createTransport, getTestMessageUrl } from 'nodemailer'

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

const formattedEmail = (text: string) => `
	  <div className="email" style="
		border: 1px solid black;
		padding: 20px;
		font-family: sans-serif;
		line-height: 2;
		font-size: 20px;
	  ">
		<h2>Hello There!</h2>
		<p>${text}</p>
		<p>😘, Wes Bos</p>
	  </div>
	`

export interface MailResponse {
  accepted?: string[] | null
  rejected?: null[] | null
  envelopeTime: number
  messageTime: number
  messageSize: number
  response: string
  envelope: Envelope
  messageId: string
}

export interface Envelope {
  from: string
  to: string[] | null
}

export const sendEmailConfirmation = async (to: string, emailToken: string): Promise<void> => {
  const info = (await transporter.sendMail({
    to,
    from: 'hendrikw@phoscreative.com',
    subject: 'Please verify your email',
    html: formattedEmail(`Your account was created!
		<a href="${process.env.FRONTEND_URL}/api/user/email?email=${to}&token=${emailToken}">Click here to confirm your email address</a>
	`),
  })) as MailResponse

  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`)
  }
}
