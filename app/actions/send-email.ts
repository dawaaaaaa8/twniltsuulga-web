'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(formData: FormData) {
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string
  const message = formData.get('message') as string

  // Validation
  if (!name || !phone || !message) {
    return { success: false, error: 'Бүх талбарыг бөглөнө үү' }
  }

  try {
    await resend.emails.send({
      from: 'BBD <onboarding@resend.dev>', // verify хийсэн домэйн
      to: process.env.EMAIL_TO!,
      subject: `BBD сайтаас: ${name}`,
      html: `
        <h2>Шинэ захиалга</h2>
        <p><strong>Нэр:</strong> ${name}</p>
        <p><strong>Утас:</strong> ${phone}</p>
        <p><strong>Төслийн тухай:</strong></p>
        <p>${message}</p>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error: 'Илгээхэд алдаа гарлаа' }
  }
}