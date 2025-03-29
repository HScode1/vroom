"use client"

import React, { useRef, FC } from 'react'; // Added FC for component typing
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import Image from 'next/image';

// Define an interface for the car data structure
interface SimilarCarData {
  image: string;
  title: string;
  subtitle: string;
  year: string;
  transmission: string;
  mileage: string;
  price: string;
  department: string;
  state: string;
  label: 'Bonne affaire' | 'Offre équitable'; // Use literal types for known values
  sellerType: string;
}

// Define props type for SimilarCar component
interface SimilarCarProps {
  data: SimilarCarData;
}

// Use FC<SimilarCarProps> for typing the component and its props
const SimilarCar: FC<SimilarCarProps> = ({ data }) => (
  <div className="min-w-[380px] bg-white rounded-lg overflow-hidden border border-gray-100">
    {/* Added width and height for Next.js Image component for better performance */}
    {/* The aspect ratio styling handles the visual size */}
    <div className="aspect-[4/3] relative">
      <Image
        src={data.image}
        alt={data.title}
        fill // Use fill to cover the parent container
        className="object-cover" // Removed w-full h-full as fill handles this
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optional: add sizes for optimization
        priority={false} // Set priority=true for above-the-fold images if needed
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-bold">{data.title}</h3>
      <p className="text-sm text-gray-600">{data.subtitle}</p>

      <div className="flex items-center gap-4 mt-4 text-sm text-gray-600 flex-wrap"> {/* Added flex-wrap for smaller screens */}
        <span>{data.year}</span>
        <span>{data.transmission}</span>
        <span>{data.mileage} km</span>
        <span className="bg-gray-100 px-2 py-1 rounded">{data.state}</span>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-xl font-bold">{data.price} €</div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          data.label === 'Bonne affaire'
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800' // Default for 'Offre équitable' or others
        }`}>
          {data.label}
        </span>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {data.sellerType}
          </span>
          <span className="font-medium">Dept. {data.department}</span>
        </div>
        <button className="hover:text-[#C8EC66] transition-colors text-gray-400"> {/* Added default color */}
          <Heart className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

export const SimilarCarsSection: FC = () => { // Use FC here too for consistency
  // Type the ref to specify it refers to an HTMLDivElement
  const scrollRef = useRef<HTMLDivElement>(null);

  // Explicitly type the array with the defined interface
  const similarCars: SimilarCarData[] = [
    {
      image: "/autresvoitures/renault_clio5.jpg",
      title: "RENAULT CLIO 5",
      subtitle: "1.6 E-TECH 145 PREMIERE",
      year: "2021",
      transmission: "Auto",
      mileage: "89 822",
      price: "16 990",
      department: "51",
      state: "Hybride",
      label: "Offre équitable",
      sellerType: "Vendeur professionnel"
    },
    {
      image: "/autresvoitures/bmw_m4.jpg",
      title: "BMW M4 Competition",
      subtitle: "510ch Ultimate",
      year: "2023",
      transmission: "Auto",
      mileage: "12 632",
      price: "117 700",
      department: "78",
      state: "Essence",
      label: "Offre équitable",
      sellerType: "Vendeur particulier"
    },
    {
      image: "/autresvoitures/maclarren_720s.jpg", // Typo: McLaren?
      title: "McLaren 720S",
      subtitle: "V8 bi-turbo 720ch",
      year: "2022",
      transmission: "Auto",
      mileage: "7 400",
      price: "315 990",
      department: "89",
      state: "Essence",
      label: "Bonne affaire",
      sellerType: "Vendeur professionnel"
    },
    {
      image: "/autresvoitures/urus.jpg",
      title: "Lamborghini Urus",
      subtitle: "4.0 V8 650ch",
      year: "2023",
      transmission: "Auto",
      mileage: "15 000",
      price: "298 490",
      department: "68",
      state: "Essence",
      label: "Offre équitable",
      sellerType: "Vendeur professionnel"
    },
    {
      image: "/autresvoitures/GLE.jpg",
      title: "Mercedes GLE Coupé",
      subtitle: "400d 4MATIC AMG",
      year: "2023",
      transmission: "Auto",
      mileage: "25 000",
      price: "108 490",
      department: "75",
      state: "Diesel",
      label: "Offre équitable",
      sellerType: "Vendeur professionnel"
    }
  ];

  // Add type annotation for the direction parameter
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // Consider using card width + gap for more precise scrolling
      const scrollAmount = 380 + 24; // 380px width + 24px (1.5rem) gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // TODO: Add state to track scroll position to disable buttons at ends
  // Example: const [canScrollLeft, setCanScrollLeft] = useState(false);
  // Example: const [canScrollRight, setCanScrollRight] = useState(true);
  // You would need an onScroll handler on the scrollable div to update these states.

  return (
    <div className="py-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-1 h-6 bg-[#C8EC66]" />
            <h2 className="text-2xl font-bold">Notre sélection de véhicules similaires</h2>
          </div>
        </div>

        {/* Use group-hover on the outer container if buttons are outside the scroll area */}
        <div className="relative group">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll Left" // Added aria-label for accessibility
            // Add disable logic based on scroll position state
            // disabled={!canScrollLeft}
            className="absolute left-0 md:left-2 top-1/2 z-10 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ transform: 'translate(0, -50%)' }} // Keep original transform if needed
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" /> {/* Ensure icon has color */}
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto px-6 scrollbar-hide scroll-smooth"
            // Add onScroll handler here if implementing disable logic
            // onScroll={handleScroll}
          >
            {similarCars.map((car, index) => (
              // Use a more stable key if available, like car.id
              <SimilarCar key={car.title + index} data={car} />
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            aria-label="Scroll Right" // Added aria-label for accessibility
            // Add disable logic based on scroll position state
            // disabled={!canScrollRight}
            className="absolute right-0 md:right-2 top-1/2 z-10 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ transform: 'translate(0, -50%)' }} // Keep original transform if needed
          >
            <ChevronRight className="w-6 h-6 text-gray-700" /> {/* Ensure icon has color */}
          </button>
        </div>
      </div>

      {/* Using <style jsx global> is fine, but consider Tailwind plugin if preferred */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
};

// You might want to export SimilarCar as well if used elsewhere, otherwise keep it internal
// export { SimilarCar, SimilarCarsSection };