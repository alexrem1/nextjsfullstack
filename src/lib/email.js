import nodemailer from "nodemailer";

export async function sendOrderConfirmation(session) {
  // Send email notification
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: session.customer_details.email,
    subject: "Your Order Confirmation",
    html: `
              <p>We are delighted to inform you that your order has been successfully placed.</p>

              <ul>
              <li><p>You have purchased: ${session.line_items.data
                .filter(
                  (product) => !product.description.includes("Delivery Cost")
                )
                .map((product) => `${product.quantity}x ${product.description}`)
                .join(", ")}</p></li>
                <li><p>It'll be sent to the provided shipping address:  ${
                  session.shipping_details.address.line1
                }, ${
      session.shipping_details.address.line2 !== null
        ? `${session.shipping_details.address.line2}, `
        : ""
    } ${session.shipping_details.address.city}, ${
      session.shipping_details.address.postal_code
    } </p></li>
      <li> <p>We'll be in touch with you soon to confirm your order on the number provided: ${
        session.customer_details.phone
      }</p></li>
              </ul>

        <p>If you have any questions or need further assistance, please don't hesitate to reply to this email. We're here to help!</p>

        <p>Thank you for choosing us for your purchase.</p>

        <p>Yours, <br />Alex</p>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Order confirmation sent successfully");
    return { success: true, message: "Order confirmation sent successfully" };
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    return {
      success: false,
      message: "Error sending order confirmation email",
    };
  }
}

export async function sendPasswordResetEmail(email, resetToken) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const resetLink = `${process.env.NEXTAUTH_URL}reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Request Reset Password",
    text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Reset password sent successfully");
    return { success: true, message: "Password reset sent successfully" };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return { success: false, message: "Error sending password reset email" };
  }
}

export async function passwordResetEmail(email) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const loginLink = `${process.env.NEXTAUTH_URL}login`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password reset successfully",
    text: `You have successfully reset your password. Login here:\n\n${loginLink}\n\nIf you did not reset your password, contact us immediately.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset successfully");
    return { success: true, message: "Password reset successfully" };
  } catch (error) {
    console.error("Error resetting password:", error);
    return { success: false, message: "Error resetting password" };
  }
}

export async function registered(email) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const loginLink = `${process.env.NEXTAUTH_URL}login`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Alexquisite Registration",
    text: `You have officially joined the Alexquisite family.\n\nLogin here: ${loginLink}
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Registered successfully");
    return { success: true, message: "Registered successfully" };
  } catch (error) {
    console.error("Error registering:", error);
    return { success: false, message: "Error registering" };
  }
}
