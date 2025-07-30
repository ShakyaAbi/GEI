import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Footer from '../components/Footer';

const subjects = [
  'General Inquiry',
  'Collaboration',
  'Media',
  'Support',
  'Other'
];

const JoinUsPage = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="pt-32 pb-16 text-center px-6">
        <h1 className="text-4xl lg:text-6xl font-bold font-playfair text-gray-900 mb-4">
          Collaborate With Us
        </h1>
        <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We value partnerships that drive meaningful impact. Reach out to explore collaboration opportunities, share ideas, or ask questions.
        </p>
      </section>

      {/* Contact Form */}
      <section className="flex items-center justify-center pb-16 px-6">
        <form className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <h2 className="text-3xl font-bold mb-2">Send us a Message</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Organization (Optional)</label>
            <input
              name="organization"
              value={form.organization}
              onChange={handleChange}
              placeholder="Enter your organization name"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            >
              <option value="">Select a subject</option>
              {subjects.map((subj) => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your inquiry or how we can help you..."
              className="w-full border rounded-lg px-4 py-2 min-h-[120px]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg py-3 mt-2 hover:from-blue-600 hover:to-blue-800 transition-all"
          >
            Send Message <Send className="w-5 h-5" />
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default JoinUsPage;
