import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message } = body;

    // Validation basique
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nom, email et message sont requis' },
        { status: 400 }
      );
    }

    // Envoi de l'email
    const data = await resend.emails.send({
      from: 'Inori Web <onboarding@resend.dev>', // Change ça avec ton domaine vérifié
      to: ['inoritechlje@gmail.com'], // Ton email où tu reçois les messages
      subject: `Nouveau message de ${name} - Inori Web`,
      html: `
        <h2>Nouveau message depuis Inori Web</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Entreprise :</strong> ${company}</p>` : ''}
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
