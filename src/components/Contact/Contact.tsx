import Alert from "@mui/material/Alert";
import { FormEvent, useRef, useState } from "react";

import emailjs from "@emailjs/browser";
import Stack from "@mui/material/Stack";
import SocialMedia from "../SocialMedia/SocialMedia";
import "./contact.css";

const Contact = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();

    const messageTextarea = formRef.current?.querySelector(
      'textarea[name="message"]'
    ) as HTMLTextAreaElement;
    const message = messageTextarea.value.trim();

    if (!message) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        formRef.current!,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      );
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      console.error("FAILED...", error);
    }
  };

  return (
    <div>
      <section id="contact">
        <h1 className="contactTitle">Contact me</h1>
        <span className="contactDesc">Please fill in the fields below</span>
        <form className="contactForm" ref={formRef} onSubmit={sendEmail}>
          <input
            type="text"
            className="name"
            placeholder="Your Name"
            name="your_name"
          />
          <input
            type="email"
            className="email"
            placeholder="Your Email"
            name="your_email"
          />
          <textarea
            name="message"
            rows={5}
            className="msg"
            placeholder="Send a message"
          />
          <span className="messageStatus">
            {error && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert variant="filled" severity="error">
                  An error occurred, please try again!
                </Alert>
              </Stack>
            )}
            {success && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert variant="filled" severity="success">
                  Sent with success
                </Alert>
              </Stack>
            )}
          </span>
          <button type="submit" value="send" className="submitBtn">
            Send
          </button>
          <SocialMedia />
        </form>
      </section>
    </div>
  );
};

export default Contact;
