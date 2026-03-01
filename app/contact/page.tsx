"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/general-dashboard/whatsapp-button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const offices = [
    {
      city: "Dubai",
      address: "1301 2nd Ave, Dubai, DU 98101",
      phone: "(315) 905-2321",
      mapLink: "https://maps.google.com",
    },
    {
      city: "Sharjah",
      address: "1301 2nd Ave, Sharjah, SHA 98101",
      phone: "(315) 905-2321",
      mapLink: "https://maps.google.com",
    },
    {
      city: "Ajman",
      address: "1301 2nd Ave, Ajman, AJ 98101",
      phone: "(315) 905-2321",
      mapLink: "https://maps.google.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content - Map with Form Overlay */}
      <div className="relative mt-20 h-[700px]">
        {/* Full Width Map Background */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.2280569949824!2d55.27125431500799!3d25.262491883858537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1675345678901!5m2!1sen!2sae"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        />

        {/* Form Overlay - Left Side */}
        <div className="relative h-full container mx-auto px-6 flex items-start pt-36">
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 max-w-xl w-full">
            <h2 className="text-3xl font-bold mb-8">
              Have questions? Get in touch!
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#FBDE02" }}
              >
                Submit
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* We'd Love To Hear From You Section */}
      <div className="bg-white  mt-40  py-16">
        <div className="container  pl-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              We'd Love To Hear From You.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We are here to answer any question you may have. As a partner of
              corporates, Property Banana has more than 9,000 offices of all
              sizes and all potential of session.
            </p>
          </div>
        </div>
      </div>

      {/* Visit Our Office Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Visit Our Office</h2>
            <p className="text-gray-600">
              Property Banana is spread across UAE with many branches in major
              cities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {offices.map((office, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-2xl font-bold mb-4">{office.city}</h3>
                <p className="text-gray-600 mb-3">{office.address}</p>
                <p className="font-semibold text-lg mb-4">{office.phone}</p>
                <a
                  href={office.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 underline hover:text-gray-700 font-medium"
                >
                  Open Google Map
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Need help Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Need help? Talk to our expert.
              </h2>
              <p className="text-gray-600">
                Talk to our experts or Browse through more properties.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 border-2 border-gray-900 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition-colors flex items-center gap-2">
                Contact Us
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                920 851 9087
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
