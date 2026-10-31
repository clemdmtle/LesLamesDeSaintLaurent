const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true pour le port 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const erreur = (message, status) => {
    const err = new Error(message);
    err.status = status;
    return err;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const envoyerMessage = async ({ nom, email, sujet, message, siteWeb }) => {
    // Honeypot rempli : c'est un robot, on répond comme si tout allait bien
    if (siteWeb) return;

    if (!nom?.trim() || !sujet?.trim() || !message?.trim() || !EMAIL_REGEX.test(email ?? '')) {
        throw erreur('Merci de remplir tous les champs correctement.', 400);
    }
    if (nom.length > 100 || sujet.length > 150 || message.length > 3000) {
        throw erreur('Un des champs est trop long.', 400);
    }

    try {
        await transporter.sendMail({
            from: `"Site web" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_DESTINATAIRE,
            replyTo: email,
            subject: `[Contact] ${sujet.replace(/[\r\n]/g, ' ')}`,
            text: `De : ${nom} <${email}>\n\n${message}`,
        });
    } catch (e) {
        console.error('Erreur envoi email', e);
        throw erreur("Impossible d'envoyer le message pour le moment.", 502);
    }
};

module.exports = { envoyerMessage };