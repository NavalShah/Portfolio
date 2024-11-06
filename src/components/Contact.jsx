import emailjs from "@emailjs/browser";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";


import styled from "styled-components";

// npm i @emailjs/browser

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4gonohp",
        "template_pdrnbuq",
        form.current,
        "HTIHW2ymNW_nQuR5m"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <StyledContactForm>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    </StyledContactForm>
  );
};

export default Contact;

// Styles
const StyledContactForm = styled.div`
  width: 400px;

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;











// const Contact = () => {

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });


//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [error, setError] = useState(null);

//   // Handle form data change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     emailjs
//       .send('service_4gonohp', 'template_pdrnbuq', formData, {
//         publicKey: 'HTIHW2ymNW_nQuR5m',
//       })
//       .then(
//         () => {
//           console.log('SUCCESS!');
//           setIsSubmitted(true)
//         },
//         (error) => {
//           console.log('FAILED...', error.text);
//           setError('An error occurred, please try again.'); // Set error state
//         },
//       );
//   };

//   return (
//     <div styles={styles.container}>
//       <h2 styles={styles.title}>Contact Me</h2>
//       {isSubmitted ? (
//         <p styles={styles.successMessage}>Thank you for your message! I will get back to you soon.</p>
//       ) : (
//         <form onSubmit={handleSubmit} styles={styles.form}>
//           <div styles={styles.formGroup}>
//             <label styles={styles.label}>Name:</label>
//             <input
//               type="text" 
//               name="user_name"
//               value={formData.name}
//               onChange={handleChange}
//               styles={styles.input}
//               required
//             />
//           </div>
//           <div styles={styles.formGroup}>
//             <label styles={styles.label}>Email:</label>
//             <input
//               type="email"
//               name="user_email"
//               value={formData.email}
//               onChange={handleChange}
//               styles={styles.input}
//               required
//             />
//           </div>
//           <div styles={styles.formGroup}>
//             <label styles={styles.label}>Message:</label>
//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               style={{ ...styles.input, ...styles.textarea }}
//               required
//             />
//           </div>
//           <button type="submit">Send</button>
//           {error && <p style={styles.errorMessage}>{error}</p>}
//         </form>
//       )}
//     </div>
//   );
// }


// const styles = {
//   container: {
//     maxWidth: '600px',
//     margin: '0 auto',
//     padding: '2rem',
//     borderRadius: '8px',
//     background: 'linear-gradient(to right, #cce0ff, #e6f0ff)',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     fontFamily: 'Arial, sans-serif',
//   },
//   title: {
//     textAlign: 'center',
//     color: '#003366',
//     fontSize: '24px',
//     marginBottom: '1.5rem',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   formGroup: {
//     marginBottom: '1rem',
//   },
//   label: {
//     fontSize: '16px',
//     color: '#003366',
//     marginBottom: '0.5rem',
//     display: 'block',
//   },
//   input: {
//     width: '100%',
//     padding: '10px',
//     borderRadius: '4px',
//     border: '1px solid #b3c6ff',
//     fontSize: '16px',
//     backgroundColor: '#f0f7ff',
//   },
//   textarea: {
//     minHeight: '100px',
//     resize: 'vertical',
//   },
//   button: {
//     padding: '12px',
//     borderRadius: '4px',
//     border: 'none',
//     backgroundColor: '#3366ff',
//     color: '#fff',
//     fontSize: '16px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s ease',
//     marginTop: '1rem',
//   },
//   buttonHover: {
//     backgroundColor: '#264d99',
//   },
//   successMessage: {
//     color: '#006600',
//     textAlign: 'center',
//     fontSize: '18px',
//   },
//   errorMessage: {
//     color: 'red',
//     textAlign: 'center',
//     fontSize: '16px',
//   },
// };


// export default Contact;