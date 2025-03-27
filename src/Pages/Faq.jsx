import { useState } from "react";

const faqs = [
  {
    question: "What is EduCatalyst and how does it work?",
    answer:
      "EduCatalyst is a decentralized funding platform that connects educators with sponsors through a smart matching algorithm.",
  },
  {
    question: "Is EduCatalyst secure and trustworthy?",
    answer:
      "Yes, we prioritize transparency and use blockchain-backed solutions for secure transactions.",
  },
  {
    question: "How do I get started with EduCatalyst?",
    answer:
      "You can start by creating an account, building your profile, and submitting funding requests.",
  },
  {
    question: "What types of funding requests can I submit?",
    answer:
      "You can request funding for a wide range of educational projects such as organizing hackathons, bootcamps, workshops, community training sessions, or any initiative that empowers learning and innovation in your field.",
  },
  {
    question: "How do I track the progress of my funding request?",
    answer:
      "You can track real-time progress via your EduCatalyst dashboard after logging in.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">FAQs</h2>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-b border-gray-300 py-4 cursor-pointer"
          onClick={() => setOpenIndex(index === openIndex ? null : index)}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">{faq.question}</h3>
            <span>{index === openIndex ? "−" : "+"}</span>
          </div>
          {index === openIndex && (
            <p className="mt-2 text-gray-600 transition-all duration-300 ease-in-out">
              {faq.answer}
            </p>
          )}
        </div>
      ))}
    </section>
  );
}