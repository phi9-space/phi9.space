import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

const Contact = () => {
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="h-6 w-6 text-primary-600" />,
      title: 'Our Location',
      description: 'Defense Technology Park, New Delhi, India',
      link: 'https://maps.google.com',
      linkText: 'View on Map'
    },
    {
      icon: <FaPhoneAlt className="h-5 w-5 text-primary-600" />,
      title: 'Phone',
      description: '+91 12345 67890',
      link: 'tel:+911234567890',
      linkText: 'Call Now'
    },
    {
      icon: <FaEnvelope className="h-5 w-5 text-primary-600" />,
      title: 'Email',
      description: 'contact@phi9.space',
      link: 'mailto:contact@phi9.space',
      linkText: 'Send Email'
    },
    {
      icon: <FaClock className="h-5 w-5 text-primary-600" />,
      title: 'Working Hours',
      description: 'Monday - Friday: 9:00 - 18:00',
      details: 'Saturday: 10:00 - 15:00',
      link: '',
      linkText: ''
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="gradient-text">Get in Touch</span> With Us
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Have questions about our defense solutions? We're here to help and answer any questions you might have.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-8">
                  Contact <span className="gradient-text">Information</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  We're committed to providing exceptional support. Reach out to us with your inquiries, and our team will get back to you as soon as possible.
                </p>
                
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                        {item.details && <p className="text-gray-600">{item.details}</p>}
                        {item.link && (
                          <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center mt-1"
                          >
                            {item.linkText}
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                      <a
                        key={social}
                        href={`https://${social.toLowerCase()}.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        <span className="sr-only">{social}</span>
                        <span>{social === 'GitHub' ? '🔗' : social[0]}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* Contact Form */}
              <motion.div
                className="bg-gray-50 rounded-2xl p-8 shadow-md"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6">
                  Send Us a <span className="gradient-text">Message</span>
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        name="first-name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="careers">Careers</option>
                      <option value="press">Press & Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                      defaultValue={''}
                    />
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="privacy"
                        name="privacy"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="privacy" className="text-gray-600">
                        I agree to the <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a> and 
                        <a href="/terms" className="text-primary-600 hover:underline ml-1">Terms of Service</a>.
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-opacity"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="h-96 w-full bg-gray-200">
        <div className="h-full w-full flex items-center justify-center text-gray-500">
          <p>Map Integration Would Go Here</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
