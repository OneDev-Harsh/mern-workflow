import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,        // your email
    pass: process.env.GMAIL_APP_PASS,        // app password
  },
});

export const sendTaskAssignedEmail = async (userEmail, userName, task) => {
  const mailOptions = {
    from: `"Workflow App" <${process.env.GMAIL_USER}>`,
    to: userEmail,
    subject: `You have been assigned a new task: ${task.title}`,
    html: `
      <div style="font-family: Arial; padding: 10px;">
        <h2>Hello ${userName},</h2>
        <p>You have been assigned a new task in the workflow system.</p>

        <h3>${task.title}</h3>
        <p><strong>Description:</strong> ${task.description}</p>
        <p><strong>Priority:</strong> ${task.priority}</p>
        <p><strong>Status:</strong> ${task.status}</p>
        <p><strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>

        <br />
        <a href="${process.env.CLIENT_URL}/user/task-details/${task._id}"
           style="background: #4f46e5; color: white; padding: 10px 20px;
                  border-radius: 6px; text-decoration: none;">
          View Task
        </a>

        <br /><br />
        <p>— Workflow App</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
