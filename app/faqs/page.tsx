"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/general-dashboard/whatsapp-button";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "Can a home depreciate in value?",
      answer:
        "It's important to note that while homes can depreciate, many factors influencing property values are cyclical or can be mitigated through proper maintenance and strategic improvements. Additionally, over longer periods, real estate has historically tended to appreciate in many markets, although past performance doesn't guarantee future results.",
    },
    {
      question: "Is an older home as good a value as a new home?",
      answer:
        "Ultimately, the better value depends on your priorities, budget, and specific circumstances. An older home might offer better value if you appreciate character, are willing to handle some renovations, and prioritize location. A new home could be a better value if you prefer modern amenities, energy efficiency, and minimal immediate maintenance.",
    },
    {
      question: "Who is a broker?",
      answer:
        "A real estate broker is a licensed professional who acts as an intermediary between buyers and sellers of real estate properties.",
    },
    {
      question: "Can I pay my own taxes and insurance?",
      answer:
        "Remember, while paying your own taxes and insurance offers more control, it also comes with added responsibility. Make sure you're prepared to handle these important payments consistently and on time to avoid any issues with your property ownership.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-white py-16 mt-20">
        <div className="container mx-auto px-6">
          <h1 className="text-2xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 ">Homes / For Rent</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-xl font-bold text-center mb-8">
          Questions About Renting
        </h2>

        <div className="max-w-6xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center gap-2 text-left hover:bg-gray-50 transition-colors"
              >
                <svg
                  className={`w-4 h-3 text-gray-500 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <h3 className="font-semibold text-lg text-gray-900">
                  {faq.question}
                </h3>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100  mt-30 py-30">
        <div className="container mx-auto px-2">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-semibold mb-2">
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
