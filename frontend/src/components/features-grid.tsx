"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const FeatureCard = ({ href, title, description, image, className = "" }: { href: string, title: string, description?: string, image: string, className?: string }) => {
  return (
    <Link href={href}>
      <motion.div 
        className={`relative overflow-hidden rounded-lg ${className}`}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
        
        <div className="relative h-full p-6 flex flex-col justify-end">
          <h3 className="text-4xl font-bold text-white mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg max-w-md">
              {description}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export function FeaturesGrid() {
    const features = [
      {
        title: "Locations",
        description: "All critical efforts along the journey result in coffees that are a sum of choices made with the single goal in mind: how does the final product taste in your cup.",
        image: "/pexels-mikebirdy-244206.jpg",
        href: "/locations"
      },
      {
        title: "Menu",
        image: "/pexels-mikebirdy-244206.jpg",
        href: "/menu"
      },
      {
        title: "Shop",
        image: "/pexels-mikebirdy-244206.jpg",
        href: "/shop"
      },
      {
        title: "Work with us",
        image: "/pexels-mikebirdy-244206.jpg",
        href: "/careers"
      }
    ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          <FeatureCard {...features[0]} />
        </div>
        <div>
          <FeatureCard {...features[1]} />
        </div>
        <div>
          <FeatureCard {...features[2]} />
        </div>
        <div className="col-span-1 md:col-span-2">
          <FeatureCard {...features[3]} />
        </div>
      </div>
    </div>
  );
}

export default FeaturesGrid;

