import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";

const Email_form = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const loadingToast = toast.loading("Sending message...");

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY // e.g. xKf5y_aBcD
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("Message sent successfully!");
          form.current.reset();
          toast.dismiss(loadingToast); // remove loading
          toast.success("Message sent successfully!");
        },
        (error) => {
          console.log(error.text);
          setStatus("Failed to send message. Please try again later.");
          toast.dismiss(loadingToast);
          toast.error("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <div className="bg-[#1e293b] p-8 rounded-xl shadow-lg max-w-2xl mx-auto mt-10">
        <Toaster
        position="top-right" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#ffffff",
            fontWeight: "500",
          },
        }}
      />
      <h3 className="text-2xl font-bold mb-6 text-center">Send Me a Message</h3>
      <form ref={form} onSubmit={sendEmail} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full p-3 rounded-md bg-[#0f172a] border border-gray-600 focus:outline-none focus:border-blue-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full p-3 rounded-md bg-[#0f172a] border border-gray-600 focus:outline-none focus:border-blue-400"
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          required
          className="w-full p-3 rounded-md bg-[#0f172a] border border-gray-600 focus:outline-none focus:border-blue-400"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition duration-200"
        >
          Send Message
        </button>
      </form>
      
    </div>
  );
};

export default Email_form;
