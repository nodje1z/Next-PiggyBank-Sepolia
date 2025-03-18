"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/lib/send-email";
import styles from "../styles/ContactForm.module.scss";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await sendEmail(data);
      setSubmitSuccess(true);
      setIsSubmitting(false);
      reset();
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to send email. Please try again.";
      
      setSubmitError(errorMessage);
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
          Your message has been sent! Thank you for contacting us.
        </div>
      )}
      
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
        <div className="mb-5">
          <label htmlFor="name" className={styles.label}>
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            className={`${styles.input} ${errors.name ? 'border-red-500' : ''}`}
            {...register("name", { 
              required: "Name is required" 
            })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        
        <div className="mb-5">
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@domain.com"
            className={`${styles.input} ${errors.email ? 'border-red-500' : ''}`}
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        
        <div className="mb-5">
          <label htmlFor="message" className={styles.label}>
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Type your message"
            className={`${styles.textarea} ${errors.message ? 'border-red-500' : ''}`}
            {...register("message", { 
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters"
              }
            })}
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>
        
        <div className={styles.submitButtonContainer}>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </div>
      </form>
    </>
  );
};

export default Contact;
