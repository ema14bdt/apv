import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
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
        subject: "Confirmación de registro",
        html: `
            <h1>Bienvenido a Veterinaria APV</h1>
            <p>
                Gracias por registrarte en nuestra veterinaria ${nombre}.
                Para confirmar tu registro, pulsa en el siguiente enlace:
            </p>
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">
                Confirmar registro
            </a>
        `,
    });
};

export default emailRegistro;
