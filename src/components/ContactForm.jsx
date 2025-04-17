import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormState({
        ...formState,
        error: 'Por favor, completa todos los campos.'
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormState({
        ...formState,
        error: 'Por favor, ingresa un email válido.'
      });
      return;
    }

    setFormState({
      ...formState,
      isSubmitting: true,
      error: null
    });

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }

      // Success!
      setFormState({
        isSubmitting: false,
        isSubmitted: true,
        error: null
      });
      
      // Reset form data
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSubmitted: false,
        error: error.message || 'Error al enviar el mensaje'
      });
    }
  };

  // If form was successfully submitted, show thank you message
  if (formState.isSubmitted) {
    return (
      <div className="success-message">
        <div className="terminal-output">
          <p className="success-title">$ echo "¡Mensaje enviado con éxito!"</p>
          <div className="success-content">
            <p>Gracias por contactarme. Te responderé lo antes posible.</p>
            <p className="command-prompt">user@portfolio:~$ <span className="cursor">_</span></p>
          </div>
        </div>
        <button 
          onClick={() => setFormState(prev => ({ ...prev, isSubmitted: false }))}
          className="submit-btn"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          className="form-input" 
          placeholder="Tu nombre"
          value={formData.name}
          onChange={handleChange}
          disabled={formState.isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          className="form-input" 
          placeholder="tu@email.com"
          value={formData.email}
          onChange={handleChange}
          disabled={formState.isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="subject">Asunto:</label>
        <input 
          type="text" 
          id="subject" 
          name="subject" 
          className="form-input" 
          placeholder="Asunto del mensaje"
          value={formData.subject}
          onChange={handleChange}
          disabled={formState.isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Mensaje:</label>
        <textarea 
          id="message" 
          name="message" 
          className="form-textarea" 
          placeholder="Escribe tu mensaje aquí..."
          value={formData.message}
          onChange={handleChange}
          disabled={formState.isSubmitting}
        />
      </div>

      {formState.error && (
        <div className="error-message">
          <p>Error: {formState.error}</p>
        </div>
      )}

      <button 
        type="submit" 
        className="submit-btn"
        disabled={formState.isSubmitting}
      >
        {formState.isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
      </button>
    </form>
  );
};

export default ContactForm;
