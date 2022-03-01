import nodemailer from 'nodemailer';

const emailOlvidePassword = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const {nombre, email, token} = datos;

    const info = await transporter.sendMail({
        from: "Veterinaria APV",
        to: email,
        subject: "Recupera tu contraseña",
        html: `
            <h1>Veterinaria APV</h1>
            <p>
                Hola ${nombre}! Para reestablece tu contraseña, pulsa en el siguiente enlace:
            </p>
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">
                Reestablecer contraseña
            </a>
        `,
    });
};

export default emailOlvidePassword;
