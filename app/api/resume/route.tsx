import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const position = formData.get("position") as string
    const message = formData.get("message") as string
    const resume = formData.get("resume") as File

    if (!name || !email || !resume) {
      return NextResponse.json({ error: "Name, email, and resume are required" }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await resume.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "niranjan@trivixtechnoskills.com",
        pass: "Niranjan@2k25",
      },
    })

    // Email content
    const mailOptions = {
      from: "niranjan@trivixtechnoskills.com",
      to: "niranjan@trivixtechnoskills.com",
      subject: `Resume Submission - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            New Resume Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Candidate Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            ${position ? `<p><strong>Position of Interest:</strong> ${position}</p>` : ""}
          </div>
          
          ${
            message
              ? `
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Message</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          `
              : ""
          }
          
          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #065f46; margin: 0;">
              <strong>Resume attached:</strong> ${resume.name}
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            This resume was submitted through the Trivix Techno Skills website career section.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: resume.name,
          content: buffer,
        },
      ],
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({
      success: true,
      message: "Resume submitted successfully!",
    })
  } catch (error) {
    console.error("Resume submission error:", error)
    return NextResponse.json({ error: "Failed to submit resume. Please try again." }, { status: 500 })
  }
}
