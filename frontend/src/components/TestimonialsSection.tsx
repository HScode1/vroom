import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Laurent L.",
    text: "Le concept et simple et ludique. Je suis satisfait de mon achat. Avec en prime un bon suivi du commercial jusqu'aux signatures des documents.",
    rating: 5
  },
  {
    name: "Philippe D.", 
    text: "Très satisfait du service de vente de voiture. Parcours client en ligne bien optimisé. Inspection très professionnelle. Service client par email très réactif. Intermédiation efficace et sympathique lors de la transaction.",
    rating: 5
  },
  {
    name: "John P.",
    text: "Très bien, très pro, notamment l'état des lieux. Pas de pression, tout s'est déroulé parfaitement. Merci !",
    rating: 5
  },
  {
    name: "Atif S.",
    text: "Franchement rien à dire, continuez comme ça.",
    rating: 5
  }
];

const TestimonialCard = ({ name, text, rating }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm w-[350px] mx-4 h-[250px] flex flex-col">
    <div className="flex gap-1 mb-3">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#C8EC66] text-[#C8EC66]" />
      ))}
    </div>
    
    <p className="text-gray-700 flex-1 overflow-y-auto text-base line-clamp-4">
      {text}
    </p>
    
    <div className="mt-4 pt-4 border-t border-gray-100">
      <p className="font-medium text-gray-900">{name}</p>
    </div>
  </div>
);

const InfiniteScroll = ({ children, direction = "left", speed = 20 }) => {
  return (
    <div className="overflow-hidden relative">
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{
          x: direction === "left" ? [0, -1920] : [-1920, 0]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#C8EC66]/20 to-transparent">
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <h2 className="text-2xl text-gray-700 mb-2">
          voyez ce qu'ils ont à dire ❤️
        </h2>
      </div>

      <div className="space-y-12">
        <InfiniteScroll direction="left" speed={30}>
          <div className="inline-flex py-4">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </InfiniteScroll>

        <InfiniteScroll direction="right" speed={25}>
          <div className="inline-flex py-4">
            {[...testimonials].reverse().map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </section>
  );
}