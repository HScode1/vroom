import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Car, Users2, Clock, Phone, ChevronRight, BadgeCheck } from 'lucide-react';

const DriverCard = ({ type, title, features, phoneNumber, imageUrl, reverse = false }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative rounded-3xl overflow-hidden ${
        reverse ? 'bg-[#C8EC66]' : 'bg-white'
      }`}
    >
      <div className="absolute inset-0 opacity-10">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative p-8 md:p-12">
        <div className="flex flex-col h-full">
          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium mb-6 w-fit ${
            reverse ? 'bg-white text-[#C8EC66]' : 'bg-[#C8EC66]/10 text-[#C8EC66]'
          }`}>
            {type}
          </span>

          <h3 className={`text-2xl md:text-3xl font-bold mb-6 ${
            reverse ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h3>

          <div className="flex-grow space-y-4 mb-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <BadgeCheck className={`w-5 h-5 mt-1 ${
                  reverse ? 'text-white' : 'text-[#C8EC66]'
                }`} />
                <span className={reverse ? 'text-white/90' : 'text-gray-600'}>
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href={`tel:${phoneNumber}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-colors ${
                reverse 
                  ? 'bg-white text-[#C8EC66] hover:bg-white/90' 
                  : 'bg-[#C8EC66] text-white hover:bg-[#C8EC66]/90'
              }`}
            >
              <Phone className="w-4 h-4 mr-2" />
              {phoneNumber}
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium ${
                reverse 
                  ? 'bg-black/10 text-white hover:bg-black/20' 
                  : 'bg-black/5 text-gray-700 hover:bg-black/10'
              }`}
            >
              En savoir plus
              <ChevronRight className="w-4 h-4 ml-2" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DriverSections = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C8EC66] text-lg font-medium">NOUS VOUS ACCOMPAGNONS 🤝</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            Une solution adaptée à chaque conducteur
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Que vous soyez jeune conducteur ou professionnel, nous avons 
            la solution parfaite pour vous.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <DriverCard
            type="🎯 Jeune conducteur"
            title="Démarrez en toute confiance"
            features={[
              "Véhicules adaptés aux nouveaux conducteurs",
              "Assurance avantageuse pour les jeunes permis",
              "Accompagnement personnalisé",
              "Garantie 12 mois incluse",
              "Options de financement flexibles"
            ]}
            phoneNumber="06 49 49 39 39"
            imageUrl="/api/placeholder/800/600"
          />

          <DriverCard
            type="🚖 Chauffeur VTC"
            title="Optimisez votre activité"
            features={[
              "Véhicules conformes aux normes VTC",
              "Entretien et maintenance inclus",
              "Kilométrage illimité",
              "Service d'assistance 24/7",
              "Solutions de remplacement disponibles"
            ]}
            phoneNumber="06 49 49 39 39"
            imageUrl="/api/placeholder/800/600"
            reverse={true}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: ShieldCheck, label: "Garantie incluse", value: "12 mois" },
            { icon: Car, label: "Véhicules disponibles", value: "100+" },
            { icon: Users2, label: "Clients satisfaits", value: "1000+" },
            { icon: Clock, label: "Support client", value: "24/7" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl text-center"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-[#C8EC66]" />
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-gray-600 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DriverSections;