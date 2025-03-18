import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const ProcessCard = ({ title, description, image, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-3xl overflow-hidden group cursor-pointer ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 " />
      </div>

      {/* Content */}
      <div className="relative h-full p-8 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <h3 className="text-3xl font-bold text-white max-w-[80%]">
            {title}
          </h3>
          <div className="bg-white/20 rounded-full p-2">
            <ChevronRight className="w-6 h-6 text-white" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="mt-auto"
        >
          <p className="text-white/90 text-lg">
            {description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function ProcessGridSection() {
  const processes = [
    {
      title: "Locations",
      description: "All critical efforts along the journey result in coffees that are a sum of choices made with the single goal in mind: how does the final product taste in your cup.",
      image: "/images/chevrolet4.jpg",
      className: "col-span-2 h-96"
    },
    {
      title: "Menu",
      description: "Discover our carefully curated selection of specialty coffee drinks and treats.",
      image: "/images/gari2.jpg",
      className: "h-96"
    },
    {
      title: "Shop",
      description: "Browse our collection of premium coffee beans and brewing equipment.",
      image: "/images/chevrolet2.jpg",
      className: "h-96"
    },
    {
      title: "Work with us",
      description: "Join our team of passionate coffee professionals.",
      image: "/images/gari.jpg",
      className: "col-span-2 h-96"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-3 gap-6">
        {processes.map((process, index) => (
          <ProcessCard
            key={index}
            {...process}
          />
        ))}
      </div>
    </section>
  );
}