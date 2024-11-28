"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface FeatureCardProps {
  title: string
  description?: string
  image: string
  href: string
  className?: string
}

export function FeatureCard({ title, description, image, href, className = "" }: FeatureCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`group relative overflow-hidden rounded-3xl ${className}`}
      >
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <motion.h3 
              className="text-4xl font-bold text-white mb-2"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              {title}
            </motion.h3>
            {description && (
              <p className="text-gray-200 text-lg max-w-[80%]">
                {description}
              </p>
            )}
          </div>
          <motion.div
            className="absolute right-6 top-6 bg-white rounded-full p-3 opacity-0 scale-50 rotate-[25deg]"
            initial={false}
            whileHover={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-black"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  )
}

