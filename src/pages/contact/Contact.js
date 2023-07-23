import { useRef } from "react";
import Card from "../../components/card/Card";
import styles from "./Contact.module.scss";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Contact = () => {

  // form validation rules 
  const validationSchema = Yup.object().shape({
    user_name: Yup.string().required('Name is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
    user_email: Yup.string()
      .required('Email is required')
      .email('Email is invalid')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const form = useRef();
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;



  const handleError = (errors) => { };

  // const registerOptions = {
  //   name: { required: "Name is required" },
  //   email: { required: "Email is required" },
  //   password: {
  //     required: "Password is required",
  //     minLength: {
  //       value: 8,
  //       message: "Password must have at least 8 characters"
  //     }
  //   }
  // };

  const sendEmail = (e) => {
    // e.preventDefault();
    console.log(form.current);

    emailjs
      .sendForm(
        "service_ssnu11o",
        "template_601ubuc",
        form.current,
        "98y4w2T69m5Hu0Yt-"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully");
        },
        (error) => {
          toast.error(error.text);
        }
      );
    //e.target.reset();
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact Us</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={handleSubmit(sendEmail, handleError)}>
            <Card cardClass={styles.card}>
              <label>Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                {...register('user_name')}
              />
              <div className={styles.danger}>
                {errors.name?.message}
              </div>
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Your active email"
                {...register('user_email')}
              //  {...register('email',  registerOptions.email) }
              />
              <div className={styles.danger}>
                {errors.email?.message}
              </div>
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                {...register('subject')}
              />
              <div className={styles.danger}>
                {errors.subject?.message}
              </div>
              <label>Message</label>
              <textarea name="message" cols="30" rows="10" {...register('message')}></textarea>
              <div className={styles.danger}>
                {errors.message?.message}
              </div>
              <button className="--btn --btn-primary">Send Message</button>
            </Card>
          </form>

          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+234 705 141 6545</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>Support@eshop.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Abuja, Nigeria</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@ZinoTrust</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
