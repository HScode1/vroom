"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4"
    >
      <motion.div
        className={`w-full rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-[#C8EC66] transition-all duration-200`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 text-left flex justify-between items-center"
        >
          <span className="text-xl font-medium">{question}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-6 h-6 text-[#C8EC66]" />
          </motion.div>
        </button>
        
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-6 pb-6 text-gray-600 border-t border-gray-100">
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export const FaqSection = () => {
  const faqs = [
    {
      question: "Quels types de véhicules proposez-vous à la vente ?",
      answer: "Nous proposons une large gamme de véhicules incluant des citadines, berlines, SUV et utilitaires, aussi bien en neuf qu'en occasion. Chaque véhicule est soigneusement sélectionné et inspecté."
    },
    {
      question: "Les véhicules que vous vendez sont-ils garantis ?",
      answer: "Oui, tous nos véhicules sont garantis. La durée de garantie varie selon le type de véhicule et son ancienneté. Nous proposons également des extensions de garantie pour votre tranquillité."
    },
    {
      question: "Quels documents sont nécessaires pour acheter ou vendre un véhicule ?", 
      answer: "Pour acheter : pièce d'identité, justificatif de domicile, permis de conduire. Pour vendre : carte grise, contrôle technique de moins de 6 mois, certificat de non-gage."
    },
    {
      question: "Proposez-vous des solutions de financement ?",
      answer: "Oui, nous proposons plusieurs solutions de financement adaptées à votre situation : crédit classique, LOA, LLD. Nos conseillers vous accompagnent pour trouver la meilleure option."
    },
    {
      question: "Puis-je essayer le véhicule avant de l'acheter ?",
      answer: "Bien sûr ! Nous encourageons les essais avant tout achat. Il suffit de prendre rendez-vous avec un de nos conseillers et de présenter votre permis de conduire."
    },
    {
      question: "Puis-je acheter un véhicule à distance ?",
      answer: "Oui, nous proposons un service d'achat à distance. Nous pouvons vous envoyer des photos et vidéos détaillées, et organiser une livraison à domicile après finalisation de la vente."
    }
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          <span className="text-[#C8EC66]">F.A.Q</span>
        </motion.h2>
        
        <div>
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}