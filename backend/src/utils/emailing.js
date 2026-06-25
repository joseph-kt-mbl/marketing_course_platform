import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  // host: "127.0.0.1",
  host:"mailhog",
  port: 1025,
  secure: false, 
});

  
const sendEmail = async (email,message , html) => {
    const info = await transporter.sendMail({
      from: 'youcefabdellaouidev@gmail.com',
      to: email,
      subject: message,
      html,
    });
    console.log("Message sent:", info.messageId);
    return info
}

export default sendEmail

