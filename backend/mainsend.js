const nodemailer = require("nodemailer");
const config = require('./config');
// Create a transporter with the provided SMTP configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.user,
    pass: config.pass,
  },
});

// Function to send email
async function sendWelcomeEmail(userEmail, userName) {
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
      to: userEmail,
      subject: `Welcome to our Tek Media, ${userName} ✔`, // Subject line with dynamic user name
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Our Tek Media</title>
          <style>
              /* Body styles */
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f9f9f9;
                  text-align: center;
              }
      
              /* Container styles */
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
      
              /* Header styles */
              .header {
                  background-color: #007bff;
                  color: #fff;
                  padding: 20px;
                  border-top-left-radius: 10px;
                  border-top-right-radius: 10px;
              }
      
              /* Body content styles */
              .content {
                  padding: 20px;
              }
      
              /* Footer styles */
              .footer {
                  background-color: #007bff;
                  color: #fff;
                  padding: 10px;
                  border-bottom-left-radius: 10px;
                  border-bottom-right-radius: 10px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <!-- Header -->
              <div class="header">
                  <h1>Welcome to Our Tek Media</h1>
              </div>
              <!-- Body Content -->
              <div class="content">
                  <p>Hello <strong>${userName}</strong>,</p>
                  <p>Welcome to the best media platform where you can add, read, and expand your knowledge.</p>
                  <p>Here are some key features of our platform:</p>
                  <ul style="text-align: left;">
                      <li>Discover and share articles, tutorials, and insights on a wide range of topics</li>
                      <li>Connect with like-minded individuals and experts in your field</li>
                      <li>Participate in discussions, ask questions, and get answers from the community</li>
                      <li>Create your own profile and showcase your expertise</li>
                      <li>Stay updated with the latest trends and news in technology, web development, programming, and more</li>
                  </ul>
                  <p>We're excited to have you join our community! Start exploring and learning today.</p>
                  <!-- Add more content here as needed -->
              </div>
              <!-- Footer -->
              <div class="footer">
                  <p>Best regards,<br> The Tek Media Team</p>
              </div>
          </div>
      </body>
      </html>
      
      `,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = {
  sendWelcomeEmail
};
