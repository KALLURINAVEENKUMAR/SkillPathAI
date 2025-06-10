import emailjs from 'emailjs-com';

const EMAIL_SERVICE_ID = 'your_service_id'; // Replace with your EmailJS service ID
const EMAIL_TEMPLATE_ID = 'your_template_id'; // Replace with your EmailJS template ID
const EMAIL_USER_ID = 'your_user_id'; // Replace with your EmailJS public key

export const sendEmail = async (name, email, message) => {
  try {
    const response = await emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, {
      from_name: name,
      from_email: email,
      message,
      to_name: 'Naveenkumar Kalluri'
    }, EMAIL_USER_ID);
    
    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};