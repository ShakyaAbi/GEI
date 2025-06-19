import React from 'react';
import { MapPin, Phone, Mail, Clock, Send, Building } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with us to explore collaboration opportunities, research partnerships, 
              or learn more about our planetary health research.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">Address</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Planetary Health Research Center<br />
                        123 Sustainability Drive<br />
                        Health Campus, HC 12345<br />
                        United States
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">Phone</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-gray-600">+1 (555) 123-4568 (Fax)</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-purple-700" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-600">info@phrc.org</p>
                      <p className="text-gray-600">partnerships@phrc.org</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-orange-700" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">Office Hours</h4>
                      <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Departments */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Building className="w-5 h-5 mr-2 text-green-700" />
                  Department Contacts
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Research Partnerships:</span>
                    <span className="text-gray-900 font-medium">partnerships@phrc.org</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Student Inquiries:</span>
                    <span className="text-gray-900 font-medium">students@phrc.org</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Media Relations:</span>
                    <span className="text-gray-900 font-medium">media@phrc.org</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Faculty Positions:</span>
                    <span className="text-gray-900 font-medium">careers@phrc.org</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                    Organization (Optional)
                  </label>
                  <input
                    type="text"
                    id="organization"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter your organization name"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="partnership">Research Partnership</option>
                    <option value="collaboration">Collaboration Opportunity</option>
                    <option value="student">Student Inquiry</option>
                    <option value="media">Media Request</option>
                    <option value="general">General Information</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your inquiry or how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-700 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-800 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group"
                >
                  Send Message
                  <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-16">
            <div className="bg-gray-200 rounded-3xl h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Interactive Map</p>
                <p className="text-gray-500 text-sm">Location: Health Campus, HC 12345</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;