
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useContactInfo } from '@/hooks/usePortfolioData';
import { getContactByType } from '@/utils/portfolioHelpers';

const Contact = () => {
  const { data: contactInfo, isLoading } = useContactInfo();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  if (isLoading) {
    return (
      <section id="contact" className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
        </div>
      </section>
    );
  }

  const emailContact = getContactByType(contactInfo, 'email');
  const phoneContact = getContactByType(contactInfo, 'phone');
  const locationContact = getContactByType(contactInfo, 'location');

  const contactInfoList = [
    {
      icon: Mail,
      label: 'Email Address',
      value: emailContact?.display_text || 'your.email@example.com',
      href: emailContact?.href || 'mailto:your.email@example.com',
      color: 'orange',
    },
    {
      icon: Phone,
      label: 'Phone Number',
      value: phoneContact?.display_text || '+91 98765 43210',
      href: phoneContact?.href || 'tel:+919876543210',
      color: 'amber',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: locationContact?.display_text || 'Your City, State',
      href: locationContact?.href || '#',
      color: 'yellow',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Let's discuss opportunities and how we can work together
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-semibold text-gray-800 mb-8">Contact Information</h3>
              <div className="space-y-6">
                {contactInfoList.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center space-x-6 p-6 bg-white rounded-2xl border border-orange-200 hover:border-orange-400 transition-all duration-300 group shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-r from-${info.color}-400 to-${info.color}-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <info.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">{info.label}</div>
                      <div className="text-lg text-gray-800 group-hover:text-orange-600 transition-colors duration-200 font-medium">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-100 to-amber-100 p-8 rounded-2xl border border-orange-200">
              <div className="flex items-center space-x-3 mb-4">
                <MessageCircle className="w-8 h-8 text-orange-600" />
                <h3 className="text-2xl font-semibold text-gray-800">Let's Connect!</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                I'm always interested in discussing new opportunities, innovative projects, 
                and potential collaborations. Whether you have a job opportunity, project idea, 
                or just want to connect, feel free to reach out!
              </p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-orange-200 shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 outline-none"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 outline-none"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 outline-none"
                  placeholder="Tell me about your project or idea..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
