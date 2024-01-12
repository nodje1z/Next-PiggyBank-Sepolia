"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/lib/send-email";
import styles from "../styles/ContactForm.module.scss";


export type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
      <div className="mb-5">
        <label htmlFor="name" className={styles.label}>
          Full Name
        </label>
        <input
          type="text"
          placeholder="Full Name"
          className={styles.input}
          {...register("name", { required: true })}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className={styles.label}>
          Email Address
        </label>
        <input
          type="email"
          placeholder="example@domain.com"
          className={styles.input}
          {...register("email", { required: true })}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="message" className={styles.label}>
          Message
        </label>
        <textarea
          rows={4}
          placeholder="Type your message"
          className={styles.textarea}
          {...register("message", { required: true })}
        ></textarea>
      </div>
      <div className={styles.submitButtonContainer}>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default Contact;
