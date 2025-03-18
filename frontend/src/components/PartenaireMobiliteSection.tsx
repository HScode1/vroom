'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TestimonialsSection = () => {
  // Organisé en slides de 2 puis 1
  const testimonialSlides = [
    // Premier slide avec 2 témoignages
    [
      {
        id: 1,
        author: "Jean Dupont",
        role: "Directeur Commercial",
        company: "XYZ",
        content: "Vroom a révolutionné notre gestion de flotte. Service impeccable !",
        avatar: "/avatars/avatar1.jpg"
      },
      {
        id: 2,
        author: "Marie Laurent",
        role: "Responsable Logistique",
        company: "ABC Transport",
        content: "Depuis que nous utilisons Vroom, nous avons réduit nos coûts de 30%.",
        avatar: "/avatars/avatar2.jpg"
      },
      
    ],
    [
      {
        id: 1,
        author: "Jean Dupont",
        role: "Directeur Commercial",
        company: "XYZ",
        content: "Vroom a révolutionné notre gestion de flotte. Service impeccable !",
        avatar: "/avatars/avatar1.jpg"
      },
      {
        id: 2,
        author: "Marie Laurent",
        role: "Responsable Logistique",
        company: "ABC Transport",
        content: "Depuis que nous utilisons Vroom, nous avons réduit nos coûts de 30%.",
        avatar: "/avatars/avatar2.jpg"
      },
      
    ],
    // Deuxième slide avec 1 témoignage
    [
      {
        id: 3,
        author: "Thomas Martin",
        role: "PDG",
        company: "Martin & Associés",
        content: "Un partenaire de confiance, à l'écoute de nos besoins.",
        avatar: "/avatars/avatar3.jpg"
      }
    ]
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-[#2F4C3B]"
        >
          Témoignages
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gray-600 mt-4 text-xl"
        >
          Découvrez ce que disent nos clients
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <Swiper
          effect="coverflow"
          slidesPerView={1}
          spaceBetween={0}
          coverflowEffect={{
            rotate: 5,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="!pb-16 !py-8"
        >
          {testimonialSlides.map((slide, slideIndex) => (
            <SwiperSlide key={`slide-${slideIndex}`} className="!overflow-visible">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 perspective">
                {slide.map((t, index) => (
                  <motion.div
                    key={`${t.id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.03,
                      rotateY: 5,
                      z: 20,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-white rounded-2xl shadow-lg p-6 border border-[#2F4C3B]/10 h-full flex flex-col transform-gpu"
                    style={{
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden"
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 shadow-md">
                        <Image src={t.avatar} alt={t.author} fill className="object-cover" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-lg font-bold text-[#2F4C3B]">{t.author}</h4>
                        <p className="text-sm text-gray-600">
                          {t.role} – {t.company}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-800 text-base leading-relaxed">{t.content}</p>
                  </motion.div>
                ))}
                {slideIndex === 2 && slide.length === 1 && (
                  <div className="hidden md:block"></div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="text-center mt-8">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#2F4C3B] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#243d2f]"
        >
          Demander un devis
        </motion.button>
      </div>

      {/* Styles Swiper */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #2F4C3B !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #2F4C3B !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          height: 44px !important;
          width: 44px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: rgba(255, 255, 255, 0.8) !important;
          border-radius: 50% !important;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1) !important;
        }
        .swiper-slide {
          height: auto !important;
        }
        .swiper-coverflow .swiper-wrapper {
          perspective: 1200px !important;
        }
        .swiper-slide-shadow-left,
        .swiper-slide-shadow-right {
          background-image: linear-gradient(to right, rgba(47, 76, 59, 0.15), rgba(0, 0, 0, 0)) !important;
        }
        .swiper-pagination {
          bottom: 0 !important;
        }
        .swiper-pagination-bullets-dynamic {
          transform: translateX(-50%) !important;
          left: 50% !important;
        }
        .swiper-pagination-bullet {
          margin: 0 4px;
        }
        .perspective {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;