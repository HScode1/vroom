import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
// Removed unused import: import Image from 'next/image';

const ProcessCard = ({ title, image, className }: { title: string; image: string; className?: string }) => {
  // Removed unused description prop from component definition and props destructuring
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }} // Slightly faster transition
      className={`relative rounded-3xl overflow-hidden group cursor-pointer ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          // Using style for aspect-ratio might be more robust depending on container constraints
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        {/* Optional: Add a subtle overlay for text contrast if needed */}
        {/* <div className="absolute inset-0 bg-black/10" /> */}
      </div>

      {/* Content */}
      {/* Adjusted padding for closer match */}
      <div className="relative h-full p-6 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <h3 className="text-2xl md:text-3xl font-semibold text-white drop-shadow-md max-w-[80%]">
            {/* Use font-semibold instead of bold, adjust size slightly */}
            {/* Added drop-shadow for better readability */}
            {title}
          </h3>
          {/* Adjusted background opacity and padding */}
          <div className="bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors group-hover:bg-white/50">
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
        </div>

        {/* Removed the motion.div for the description as it's not visible in the target style */}
        {/* If hover description is desired, it could be added back here */}
      </div>
    </motion.div>
  );
};

export default function ProcessGridSection() {
  // Use image paths that correspond to the original image
  // NOTE: Replace these placeholders with the actual paths to your images
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
    // Adjust padding and max-width as needed for page layout
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
       {/* Adjusted grid columns for responsiveness - 1 column on small screens, 3 on larger */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {processes.map((process, index) => (
          <ProcessCard
            key={index}
            title={process.title}
            image={process.image}
            className={process.className}
            // Removed passing description prop
          />
        ))}
      </div>
    </section>
  );
}