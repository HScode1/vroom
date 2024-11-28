"use client"

import { MapPin } from 'lucide-react'
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface LocationCardProps {
  title: string
  description: string
  hours: string
  image: string
  href: string
  index: number
}

export function LocationCard({ title, description, hours, image, href, index }: LocationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      <Link href={href}>
        <motion.div
          className="group relative overflow-hidden rounded-3xl bg-black origin-left"
          whileHover={{ 
            width: "108%",
            transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] }
          }}
        >
          <div className="aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] relative">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover brightness-75 transition-all duration-300 group-hover:brightness-50"
            />
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
              <div>
                <motion.h3 
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {title}
                </motion.h3>
                <motion.p 
                  className="text-gray-200 text-sm leading-relaxed max-w-[80%]"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {description}
                </motion.p>
              </div>
              
              <div className="flex items-center justify-between">
                <motion.div 
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm"
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <MapPin className="h-4 w-4" />
                  <span>Navigate</span>
                </motion.div>
                {hours && (
                  <motion.div 
                    className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    {hours}
                  </motion.div>
                )}
              </div>
            </div>
            
            <motion.div
              className="absolute right-6 top-6 bg-white rounded-full p-3 opacity-0 scale-50"
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
    </motion.div>
  )
}