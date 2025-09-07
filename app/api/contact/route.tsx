import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, company, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Create transporter with Hostinger SMTP settings
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: Number.parseInt(process.env.SMTP_PORT || "465"),
      secure: true, // Use SSL
      auth: {
        user: process.env.SMTP_USER || "niranjan@trivixtechnoskills.com",
        pass: process.env.SMTP_PASS || "Niranjan@2k25",
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER || "niranjan@trivixtechnoskills.com",
      to: "niranjan@trivixtechnoskills.com",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
          </div>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #1e40af;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #4b5563;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>This email was sent from the Trivix Techno Skills website contact form.</p>
            <p>Submitted on: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
          </div>
        </div>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
