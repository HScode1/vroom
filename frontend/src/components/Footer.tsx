"use client"

import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Première colonne - Contact */}
          <div>
            <h3 className="text-xl mb-6">Qu'attendez-vous ?</h3>
            <Link 
              href="tel:0619937665" 
              className="inline-flex items-center px-4 py-2 bg-[#BADA55] text-black rounded-lg hover:bg-opacity-90 transition-colors mb-6"
            >
              <Phone className="w-4 h-4 mr-2" />
              06 19 93 37 65
            </Link>
            <div className="space-y-4">
              <Link href="/contact" className="flex items-center hover:text-[#BADA55] transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                contact@vroomparis.fr
              </Link>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <p>75 Avenue des Champs-Élysées, 75008 Paris</p>
              </div>
            </div>
          </div>

          {/* Deuxième colonne - Informations */}
          <div>
            <h3 className="text-xl mb-6">Informations générales :</h3>
            <p className="text-gray-400 mb-4">
              Bienvenue chez Vroom Paris, la concession automobile.
            </p>
            <nav className="space-y-2">
              <Link href="/about" className="block hover:text-[#BADA55] transition-colors">
                À propos de nous
              </Link>
              <Link href="/services" className="block hover:text-[#BADA55] transition-colors">
                Nos services
              </Link>
              <Link href="/locations" className="block hover:text-[#BADA55] transition-colors">
                Nos emplacements
              </Link>
              <Link href="/faq" className="block hover:text-[#BADA55] transition-colors">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Troisième colonne - Mentions légales */}
          <div>
            <h3 className="text-xl mb-6">Mentions légales</h3>
            <nav className="space-y-2">
              <Link href="/privacy" className="block hover:text-[#BADA55] transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/terms" className="block hover:text-[#BADA55] transition-colors">
                Conditions générales
              </Link>
              <Link href="/cookies" className="block hover:text-[#BADA55] transition-colors">
                Politique des cookies
              </Link>
            </nav>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="hover:text-[#BADA55] transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-[#BADA55] transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-[#BADA55] transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Vroom Paris. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}