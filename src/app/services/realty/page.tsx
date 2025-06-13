"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "@/app/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import VideoModal from "@/app/components/Homepage/VideoModal";

interface Property {
  title: string;
  type: string;
  price: string;
  details: string;
  amenities: string[];
  highlights: string[];
  location: string;
  mapUrl: string;
  image: string;
}

const properties: Property[] = [
  {
    title: "Sobha Solis",
    type: "1 - 3 Bedroom",
    price: "1 Million",
    details: "Total Apartments: 2,316 units",
    amenities: [
      "Lap Pool", "Kid's Pool", "Leisure Pool", "Entry Water Feature",
      "Common Parks / Lawns", "Seating Court", "Zen Garden", "Parkour Leisure",
      "Dog Park", "BBQ & Picnic Area", "Jogging Track", "Outdoor Rock Climbing",
      "Plaza", "Tennis & Cricket Nets", "Outdoor Cinema", "Interactive Play Fountain",
      "Table Tennis", "Indoor Kids Play Area", "Indoor Rock Climbing (Kids)",
      "Gym & Fitness Zone", "Calisthenics", "Racetrack Viewing Deck", "Library",
      "Yoga + Meditation Zone", "Steam & Sauna", "Pilates Studio", "Boxing Corner",
      "Indoor Games Room", "Lounge", "Music Studio", "Co-Working Space"
    ],
    highlights: [
      "Connected to 3 Major Roads of DUBAI : Hessa Street, Sheikh Mohammad Bin Zayed Road, Um Suqueim Street",
      "Next to the upcoming Metro Station",
      "Open views, surrounded by villa communities"
    ],
    location: "Dubai",
    mapUrl: "https://maps.app.goo.gl/8GjHXBKZcsG1Cprp7",
    image: "https://files.remapp.ae/rem/projects_content/skyscape/interiorImage_1.jpg"
  },
  {
    title: "Sobha Orbis",
    type: "1 - 3 Bedroom",
    price: "1 Million",
    details: "Total Units: 2,900 apartments",
    amenities: [
      "Badminton", "Volleyball Court", "Pétanque/Boulee Fields", "Community Gym",
      "Kid's Play Area", "Billiards", "Squash Court", "Padel Tennis Court",
      "Basketball Court", "MPH Sports Hall", "Studios", "Indoor Games",
      "Karaoke", "Toddler Play Area", "Yoga Zone", "Cabana Shade",
      "Water Feature", "Hammock Garden", "Open Lawn", "Library",
      "Meditation Zone", "Landscaped Gardens", "Walking Paths", "Zen Garden",
      "Resort-style Pool", "Beach Volleyball", "Swimming Pool", "Jacuzzi",
      "Water Polo", "Barbecue Area", "Pool Deck with Day Beds"
    ],
    highlights: [
      "Connected to 3 Major Roads of DUBAI",
      "Next to the upcoming Metro Station",
      "Open views, surrounded by villa communities"
    ],
    location: "Dubai",
    mapUrl: "https://maps.app.goo.gl/8GjHXBKZcsG1Cprp7",
    image: "https://www.newprojecthub.site/orbis/search/assets/img/g11.jpg"
  },
  {
    title: "Deeyar Eleve",
    type: "1 - 3 Bedroom",
    price: "1 Million",
    details: "Luxury apartments with breathtaking port views",
    amenities: [
      "Grand Lobby & Lounge", "Swimming Pool", "Kids Pool",
      "Gym & Yoga Terrace", "Outdoor jogging areas",
      "Resident's Lounge", "Club Room", "Sports Activity Room",
      "Outdoor Seating Areas", "F&B Street", "Retail stores",
      "Open plazas"
    ],
    highlights: [
      "Located on Sheikh Zayed Road",
      "Next to existing Metro Station RED Line",
      "Views of Palm Jabel Ali",
      "Sea View"
    ],
    location: "Dubai",
    mapUrl: "https://maps.app.goo.gl/p9Xoh4aAxQRHuYXW7",
    image: "https://turesta.com/storage/eleve/eleve-14-3br-corner.jpg"
  },
  {
    title: "Wasl 1 Community",
    type: "1 - 3 Bedroom",
    price: "1.5 Million",
    details: "Luxury community living with world-class amenities",
    amenities: [
      "Swimming Pool", "BBQ Stations", "Kids' Pool",
      "Kids' Play Areas", "State-of-the-art Gym",
      "Sauna", "Park & Green Spaces",
      "Lounge & Relaxation Areas"
    ],
    highlights: [
      "Located on Sheikh Zayed Road",
      "Next to metro station (Existing)",
      "5-minutes from Burj Khalifa",
      "World record of World's highest Jogging Track",
      "Open views of Zabeel Park and Dubai Frame"
    ],
    location: "Dubai",
    mapUrl: "https://maps.app.goo.gl/1qCRH4UYohsA86HB7",
    image: "https://prod-waslcdn.wasl.ae/waslae-filesystem/2024-04/1-residence-about-project_0.webp"
  },
  {
    title: "Emaar Creek Harbour",
    type: "1 - 3 Bedroom",
    price: "1.5 Million",
    details: "Total Area: 550 hectares, Residential Area: 7.3 million sq.m",
    amenities: [
      "Parks & Green Spaces", "Retail & Dining",
      "Luxury Hotels", "Cultural Hub",
      "Entertainment Arenas", "Cycling Tracks",
      "Pedestrian Walkways"
    ],
    highlights: [
      "Upcoming 4 Metro stations inside the community",
      "Home to the tallest tower in the world (Creek Tower)",
      "Largest mall in the world (Upcoming)",
      "Water views with Private yacht berths",
      "Access by private bridges",
      "Island Living",
      "Private beach"
    ],
    location: "Dubai",
    mapUrl: "https://maps.app.goo.gl/crM9rqgTgCTBCcAj9",
    image: "https://cdn.excelproperties.ae/media/property/offplan/gallery/Emaar_Creek_Waters_5.webp"
  },
  {
    title: "Emaar South - Townhouses",
    type: "3 - 4 Bedroom Townhouse",
    price: "2.8 Million",
    details: "3-Bedroom: 2,421 - 2,450 sq. ft. | 4-Bedroom: 2,708 - 2,767 sq. ft.",
    amenities: [
      "Golf Course", "Clubhouse", "Retail & Shopping",
      "Community Parks", "District Parks", "Schools",
      "Clinics", "Mosque", "Nursery"
    ],
    highlights: [
      "Right opposite to Al Makthoum International Airport (DWC)",
      "Golf Course Community",
      "10 Minutes from Expo City"
    ],
    location: "Dubai",
    mapUrl: "https://maps.app.goo.gl/sHXVrxaz1cDEu23t5",
    image: "https://cdn.properties.emaar.com/wp-content/uploads/2020/05/170322_View_03-1-1620x832.jpg"
  },
  {
    title: "The Valley - Townhouses",
    type: "4 Bedroom Villas",
    price: "4.37 Million",
    details: "4-Bedroom Villas: Built-up area: 3,685 - 3,714 sq.",
    amenities: [
      "250,000 sqm Central Park",
      "Resort-style living",
      "Premium green spaces",
      "Family-focused villas",
      "Sustainable living"
    ],
    highlights: [
      "20 minutes from Downtown",
      "Congestion free commute",
      "Large sizes",
      "Lowest price of Emaar in Dubai",
      "Manmade beaches and zen gardens"
    ],
    location: "Dubai",
    mapUrl: "https://maps.app.goo.gl/sHXVrxaz1cDEu23t5",
    image: "https://cdn.properties.emaar.com/wp-content/uploads/2025/01/ELEA_HERO_1-706x385.jpg"
  },
  {
    title: "Damac Islands",
    type: "4 - 5 Bedroom Townhouse",
    price: "2.4 Million",
    details: "5-Bedroom: 3,178 sq.ft. | 4-Bedroom: 2,208 sq.ft.",
    amenities: [
      "Central Hub Fountain", "Lagoon Waterfalls",
      "Hot Springs Spa", "Jungle River Trail",
      "Fitness Park", "Calisthenics Zone",
      "Yoga Floating Decks", "Zipline",
      "Jungle Swings", "Aqua Park",
      "Aqua Dome", "Floating Water Platforms",
      "Private Boat Rides", "Wedding Venue on Water",
      "Parrot Park", "Wildlife Sanctuary",
      "Tortoise Garden", "Iguanas Park",
      "Mini Golf Island", "Private Beach Access"
    ],
    highlights: [
      "15 minutes from DWC Airport (Future Airport)",
      "Lowest prices of DAMAC",
      "Island inspired living",
      "Next to Etihad Rail"
    ],
    location: "Dubai",
    mapUrl: "https://maps.app.goo.gl/KDPgQ9VHGh4exB5t6",
    image: "https://www.islands-dubai.com/wp-content/uploads/2024/10/damac-islands-4-townhouse.jpg"
  },
  {
    title: "Belgravia Gardens",
    type: "1 - 3 Bedroom",
    price: "1.2 Million",
    details: "Studio: 428 - 489 sq. ft. | 1-Bedroom: 728 - 809 sq. ft. | 2-Bedroom: 1,062 - 1,241 sq. ft. | 2-Bedroom + Office: 1,195 - 1,625 sq. ft. | 3-Bedroom + Office: 1,578 - 2,544 sq. ft.",
    amenities: [
      "Urban Beach", "Artificial Lagoon",
      "Children's Pool", "Clubhouse Pavilion",
      "Private Dining", "Juice Lounge",
      "Clubhouse Gallery", "Cinema Room",
      "Clubhouse Majlis", "Fitness Studio",
      "Yoga & Pilates Studio", "Sauna",
      "Game Room", "Kids' Play Area"
    ],
    highlights: [
      "Known for the highest quality standard in Dubai",
      "Next to Al Barari with upcoming Metro"
    ],
    location: "Dubai",
    mapUrl: "https://maps.app.goo.gl/9LFg3uS81MvX73EBA",
    image: "https://img.jamesedition.com/listing_images/2025/01/28/14/26/04/46975e05-31c6-4f8e-ba6f-68c89b0272c3/je/1100xxs.jpg"
  }
];

const Header = () => {
  const { theme } = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-4 md:px-8 lg:px-16 py-4 md:py-6">
        <div className="flex justify-between items-center relative z-50">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: -50 },
            }}
            transition={{ duration: 0.8 }}
            className="w-20 md:w-28 relative"
          >
            <Link href="/" className="block">
              <Image
                src={
                  theme === "dark"
                    ? "/images/footer-logo-light.png"
                    : "/images/footer-logo-light.png"
                }
                alt="3rdShade Realities"
                width={112}
                height={36}
                className="object-contain"
              />
            </Link>
          </motion.div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 z-50"
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </motion.button>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <ul className="flex space-x-6 lg:space-x-8">
              {["Properties", "About", "Contact"].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * (index + 1), duration: 0.6 }}
                >
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-all duration-300"
                  >
                    {item}
                  </button>
                </motion.li>
              ))}
            </ul>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-4 md:px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-all duration-300 text-sm md:text-base"
              >
                Main Website
              </motion.button>
            </Link>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            pointerEvents: isMenuOpen ? "auto" : "none",
          }}
          className="fixed inset-0 z-40 md:hidden bg-black backdrop-blur-lg"
        >
          <div className="flex flex-col justify-center items-center h-full">
            <ul className="space-y-8 text-center">
              {["Properties", "About", "Contact"].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isMenuOpen ? 1 : 0,
                    y: isMenuOpen ? 0 : 20,
                  }}
                  transition={{ delay: 0.1 * (index + 1) }}
                >
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-white text-xl font-medium hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-all duration-300 block"
                  >
                    {item}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : 20 }}
                transition={{ delay: 0.5 }}
              >
                <Link href="/">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium text-base"
                  >
                    Main Website
                  </motion.button>
                </Link>
              </motion.li>
            </ul>
          </div>
        </motion.div>
      </nav>
    </header>
  );
};


const PropertyModal = ({ property, isOpen, onClose }: { property: Property; isOpen: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90" 
      onClick={onClose}
    >
      <div className="min-h-screen px-4 flex items-center justify-center py-8">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="w-full max-w-5xl bg-black/95 shadow-2xl rounded-2xl relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-4 sm:px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="relative">
                <div className="sticky top-0 bg-black/95 pt-4 pb-4 -mt-4 mb-4 z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-white">{property.title}</h3>
                  <p className="text-base md:text-lg text-gray-300">{property.type}</p>
                  <p className="text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 font-semibold mt-1">
                    Starting from {property.price}
                  </p>
                </div>

                <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-white mb-2">Details</h4>
                    <p className="text-sm md:text-base text-gray-300">{property.details}</p>
                  </div>

                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-white mb-2">Key Highlights</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-300">
                      {property.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-white mb-2">Amenities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm md:text-base text-gray-300">
                          <span>•</span>
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-white mb-2">Location</h4>
                    <a
                      href={property.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm md:text-base"
                    >
                      <span>View on Google Maps</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const PropertyCard = ({ property, index }: { property: Property; index: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const isEven = index % 2 === 0;

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="py-12 md:py-24"
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              className={`space-y-4 ${isEven ? "lg:order-1 order-2" : "lg:order-2 order-2"}`}
            >
              <motion.h3 
                initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={`text-2xl md:text-3xl font-bold text-white ${!isEven ? "lg:text-right" : ""}`}
              >
                {property.title}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 }}
                className={`text-xl text-gray-300 ${!isEven ? "lg:text-right" : ""}`}
              >
                {property.type}
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
                className={`text-gray-400 ${!isEven ? "lg:text-right" : ""}`}
              >
                {property.details}
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.25 }}
                className={`text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 font-semibold ${!isEven ? "lg:text-right" : ""}`}
              >
                Starting from {property.price}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 }}
                className={`${!isEven ? "lg:flex lg:justify-end" : ""}`}
              >
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  View Details
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer ${isEven ? "lg:order-2 order-1" : "lg:order-1 order-1"}`}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              onClick={() => setIsModalOpen(true)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                animate={{ opacity: isHovered ? 0.9 : 0.6 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <PropertyModal
        property={property}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

const Properties = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const propertiesRef = useRef<HTMLDivElement>(null);

  const scrollToProperties = () => {
    propertiesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="properties" className="relative bg-black" ref={propertiesRef}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 z-50 origin-left"
        style={{ scaleX }}
      />
      <div className="sticky top-0 z-40 backdrop-blur-lg bg-black/80 py-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
        >
          Featured Properties
        </motion.h2>
      </div>
      {properties.map((property, index) => (
        <PropertyCard key={index} property={property} index={index} />
      ))}
    </section>
  );
};

const Banner = () => {
  const { theme } = useTheme();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-start overflow-hidden">
      <div className="absolute inset-0">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source
            src="https://cdn.pixabay.com/video/2020/08/12/46950-450094784_large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10 pt-20 sm:pt-28 md:pt-36 lg:pt-40 max-[1366px]:pt-12 max-[1366px]:pb-6">
        <div className="max-w-5xl">
          <motion.div
            style={{
              opacity: 1 - scrollY / 500,
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
            className="space-y-4 sm:space-y-5 md:space-y-6 max-[1366px]:space-y-2"
          >
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mt-4 xl:mt-4 lg:mt-[-30px] text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 font-medium text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 md:mb-4 tracking-tight">
                Welcome to 3rdShade Realty
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-3xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-7xl font-bold text-white/90 leading-tight tracking-tighter">
                Your Gateway to Luxury
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                  Real Estate in Dubai
                </span>
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                opacity: 1 - scrollY / 400,
                transform: `translateY(${scrollY * 0.2}px)`,
              }}
              className="max-w-xl mt-4 sm:mt-6"
            >
              <p className="text-sm sm:text-base md:text-lg lg:text-sm xl:text-2xl text-gray-200 leading-relaxed">
                Looking to buy property in Dubai or make a high-return investment? At 3rd Shade Realty, we offer a handpicked selection of luxury villas, apartments, and commercial spaces in Dubai's prime locations. Whether you're an investor or a homeowner, we provide expert guidance and seamless transactions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start w-full mt-6 max-[1366px]:mt-3"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const propertiesSection = document.getElementById('properties');
                  propertiesSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-4 sm:px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-sm w-full sm:w-auto font-medium max-[1366px]:px-3 max-[1366px]:py-2 max-[1366px]:text-xs"
              >
                Explore Top Listings
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white/30 backdrop-blur-sm text-white px-4 sm:px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors text-sm w-full sm:w-auto mt-2 sm:mt-0 max-[1366px]:px-3 max-[1366px]:py-2 max-[1366px]:text-xs"
              >
                About Our Expertise
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const stats = [
    { value: "500+", label: "Properties Sold" },
    { value: "15+", label: "Years Experience" },
    { value: "1000+", label: "Happy Clients" },
    { value: "5", label: "Awards Won" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className={`relative py-12 sm:py-20 ${theme === "dark" ? "bg-gray-900" : "bg-gray-900"}`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-lg font-medium">
                Who We Are
              </span>
              <h2
                className={`text-4xl md:text-5xl font-bold mt-4 sm:mt-6 text-white tracking-tight sm:tracking-normal`}
              >
                Crafting Your Dream Lifestyle
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-lg sm:text-xl text-gray-300 max-w-xl tracking-wide sm:tracking-normal`}
            >
              At 3rdShade Realty, we redefine luxury living by curating exceptional properties that
              blend architectural brilliance with unparalleled comfort. Our mission is to transform
              your vision of the perfect home into reality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>

          <div className="grid grid-cols-2 gap-6 sm:gap-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className={`p-6 sm:p-10 rounded-xl ${theme === "dark" ? "bg-gray-800" : "bg-gray-800"} shadow-lg`}
              >
                <h3 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                  {stat.value}
                </h3>
                <p className={`mt-2 sm:mt-4 ${theme === "dark" ? "text-gray-400" : "text-gray-400"}`}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="absolute inset-0 z-0 opacity-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.2 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20" />
        </motion.div>
      </div>
    </section>
  );
};

const WhoWeAre = () => {
  return (
    <section className="py-12 sm:py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white tracking-tight sm:tracking-normal">
            India's First Dubai Real Estate Aggregator
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 tracking-wide sm:tracking-normal">
            3rd Shade Realty connects Indian investors with verified Dubai properties, offering luxury homes, high-yield investments, and commercial real estate. With 50+ listed properties and 100+ happy clients, we make buying, selling, and investing effortless.
          </p>
          <div className="bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-blue-500/5 rounded-xl p-6 sm:p-12 border border-white">
            <h3 className="text-xl sm:text-2xl font-semibold mb-8 sm:mb-12 text-white tracking-tight sm:tracking-normal">Why Choose Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
              <div className="flex flex-col items-center p-6 sm:p-10 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-300 group hover:transform hover:scale-105">
                <div className="text-3xl sm:text-4xl mb-6 sm:mb-8 text-white group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 sm:w-14 h-12 sm:h-14">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                  </svg>
                </div>
                <h4 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-white">Exclusive Dubai Properties</h4>
                <p className="text-sm sm:text-base text-gray-300 text-center">Premium selection of luxury properties in prime locations</p>
              </div>
              <div className="flex flex-col items-center p-6 sm:p-10 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-300 group hover:transform hover:scale-105">
                <div className="text-3xl sm:text-4xl mb-6 sm:mb-8 text-white group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 sm:w-14 h-12 sm:h-14">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
                <h4 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-white">High ROI Investment Options</h4>
                <p className="text-sm sm:text-base text-gray-300 text-center">Maximize your returns with strategic property investments</p>
              </div>
              <div className="flex flex-col items-center p-6 sm:p-10 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-300 group hover:transform hover:scale-105">
                <div className="text-3xl sm:text-4xl mb-6 sm:mb-8 text-white group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 sm:w-14 h-12 sm:h-14">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <h4 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-white">Hassle-Free Buying Process</h4>
                <p className="text-sm sm:text-base text-gray-300 text-center">Expert guidance through every step of your property journey</p>
              </div>
            </div>
          </div>
          <p className="text-lg font-medium text-white mt-8">
            Your dream property in Dubai is just a step away!
          </p>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { theme } = useTheme();

  const footerLinks = {
    Company: ["About Us", "Careers", "Contact Us", "Blog"],
    Properties: ["Residential", "Commercial", "Luxury Villas", "New Projects"],
    Support: ["FAQs", "Terms & Conditions", "Privacy Policy", "Site Map"],
  };

  return (
    <footer id="contact" className={`py-16 ${theme === "dark" ? "bg-gray-900" : "bg-gray-900"}`}>
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <Image
              src={
                theme === "dark"
                  ? "/images/footer-logo-light.png"
                  : "/images/footer-logo-light.png"
              }
              alt="3rdShade Realities"
              width={128}
              height={40}
              className="object-contain"
            />
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-400"}`}>
              Experience luxury living redefined. Our curated collection of premium properties sets
              new standards in architectural excellence and comfort.
            </p>
            <div className="flex space-x-4">
              {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-80 transition-opacity"
                >
                  {social[0]}
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className={`text-lg font-semibold mb-6 ${theme === "dark" ? "text-white" : "text-white"}`}
              >
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <motion.li key={link} whileHover={{ x: 2 }}>
                    <a
                      href="#"
                      className={`text-sm ${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-white"} transition-colors duration-200`}
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-400"}`}>
                Contact: info@3rdshade.com
              </p>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-400"}`}>
                Phone: +91 8600181189
              </p>
            </div>
            <p
              className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"} md:text-right`}
            >
              2025 3rdShade Realty. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function RealitiesPage() {
  const { theme } = useTheme();

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <Banner />
      <WhoWeAre />
      <Properties />
      <VideoModal />
      <Footer />
    </main>
  );
}