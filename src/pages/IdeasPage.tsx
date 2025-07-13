import React from 'react';
import Footer from '../components/Footer';

const IdeasPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <main className="flex-1 flex items-center justify-center py-24">
        <div className="max-w-lg w-full mx-auto bg-white rounded-2xl shadow-lg p-10 border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-brand-dark-blue mb-6 font-playfair">Contact Us for Collaboration</h1>
          <p className="text-gray-700 text-center mb-8">
            Interested in collaborating with GEI? Fill out the form below and our team will get in touch with you soon.
            </p>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea id="message" name="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" required />
            </div>
            <button type="submit" className="w-full py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-dark-blue transition-colors">Send Message</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IdeasPage;