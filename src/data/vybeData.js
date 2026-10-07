export const VYBE_DATA = {
  city: "Uyo",
  state: "Akwa Ibom State",
  categories: [
    { id: "all", label: "All Stays", icon: "BedDouble" },
    { id: "hotels", label: "Hotels", icon: "Building2" },
    { id: "restaurants", label: "Restaurants", icon: "UtensilsCrossed" },
    { id: "nightlife", label: "Nightlife", icon: "GlassWater" },
    { id: "events", label: "Events", icon: "Ticket" },
    { id: "resorts", label: "Resorts", icon: "Palmtree" },
    { id: "apartments", label: "Apartments", icon: "Home" },
    { id: "shortlet", label: "Short Let", icon: "KeyRound" },
    { id: "beauty", label: "Beauty & Spa", icon: "Sparkles" },
    { id: "transport", label: "Transport", icon: "Car" },
  ],
  hotels: [
    {
      id: "motion-hotel",
      name: "Motion Hotel",
      rating: 4.8,
      reviewsCount: 256,
      address: "Udo Udoma Avenue, Uyo",
      coordinates: { x: 32, y: 35 },
      pricePerNight: 45000,
      badge: "Top Rated",
      isVerified: true,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
      ],
      description: "A premium hotel in the heart of Uyo offering luxury rooms, world-class facilities, restaurant, lounge and exceptional hospitality. Perfect for business, leisure and family stays.",
      amenities: ["Free Wi-Fi", "Free Parking", "Restaurant", "Swimming Pool", "Gym", "Bar", "24/7 Power"],
      phone: "+234 803 123 4567",
      rooms: [
        {
          id: "deluxe",
          title: "Deluxe Room",
          price: 45000,
          guests: 2,
          bed: "1 King Bed",
          size: "32 m²",
          image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
          features: "Spacious room with city view, king size bed and modern amenities."
        },
        {
          id: "executive",
          title: "Executive Suite",
          price: 60000,
          guests: 2,
          bed: "1 King Bed",
          size: "40 m²",
          image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
          features: "Luxury suite with separate living area, premium amenities and panoramic views."
        },
        {
          id: "presidential",
          title: "Presidential Suite",
          price: 120000,
          guests: 4,
          bed: "2 King Beds",
          size: "75 m²",
          image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
          features: "The pinnacle of comfort with private lounge, butler service and private balcony."
        },
        {
          id: "standard",
          title: "Standard Room",
          price: 35000,
          guests: 2,
          bed: "1 Queen Bed",
          size: "24 m²",
          image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
          features: "Comfortable and affordable with essential amenities."
        }
      ],
      reviews: [
        {
          author: "Emem B.",
          time: "4 days ago",
          rating: 5,
          comment: "Amazing stay! Clean rooms, excellent service and great location. Will definitely be back!"
        },
        {
          author: "Anietie U.",
          time: "1 week ago",
          rating: 4.8,
          comment: "Best nightlife lounge and dining experience in Uyo. 24/7 power was uninterrupted."
        }
      ]
    },
    {
      id: "toma-hotel",
      name: "TOMA Hotel",
      rating: 4.6,
      reviewsCount: 198,
      address: "Nwaniba Road, Uyo",
      coordinates: { x: 68, y: 28 },
      pricePerNight: 38000,
      badge: "Popular",
      isVerified: true,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Contemporary urban hotel featuring vibrant ambiance, artisanal cocktails and premier poolside relaxation.",
      amenities: ["Free Wi-Fi", "Swimming Pool", "Restaurant", "Bar", "Conference Hall"],
      phone: "+234 802 888 9911",
      rooms: [
        {
          id: "executive-suite",
          title: "Executive Suite",
          price: 38000,
          guests: 2,
          bed: "1 King Bed",
          size: "40 m²",
          image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80",
          features: "Modern urban interior with workspace and high-speed Wi-Fi."
        }
      ]
    },
    {
      id: "justkustino-apartment",
      name: "Justkustino Luxury Apartment",
      rating: 4.7,
      reviewsCount: 112,
      address: "74 Udoekong Ekwere Street, Uyo",
      coordinates: { x: 74, y: 56 },
      pricePerNight: 30000,
      badge: "Value Stay",
      isVerified: true,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Fully serviced luxury short-let apartments designed for privacy, executive comfort, and home-style stays in Uyo.",
      amenities: ["Free Wi-Fi", "Kitchen", "Parking", "24/7 Power", "Smart TV"],
      phone: "+234 814 555 1200",
      rooms: [
        {
          id: "luxury-room",
          title: "Luxury Room",
          price: 30000,
          guests: 2,
          bed: "1 Queen Bed",
          size: "28 m²",
          image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
          features: "Private kitchenette, ensuite bathroom and quiet neighborhood."
        }
      ]
    },
    {
      id: "dcastle-apartments",
      name: "D'Castle Apartments",
      rating: 4.7,
      reviewsCount: 132,
      address: "Ikot Ekpene Road, Uyo",
      coordinates: { x: 20, y: 52 },
      pricePerNight: 60000,
      badge: "Featured",
      isVerified: true,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Majestic apartment living with private security, gated compound and scenic city views.",
      amenities: ["Wi-Fi", "Kitchen", "Parking", "24/7 Power", "Security"],
      phone: "+234 805 777 4433",
      rooms: [
        {
          id: "castle-deluxe",
          title: "2-Bedroom Luxury Penthouse",
          price: 60000,
          guests: 4,
          bed: "2 King Beds",
          size: "65 m²",
          image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
          features: "Spacious balconies and full kitchen appliances."
        }
      ]
    },
    {
      id: "ibom-tropicana",
      name: "Ibom Tropicana & Entertainment",
      rating: 4.6,
      reviewsCount: 189,
      address: "Nwaniba Road, Uyo",
      coordinates: { x: 45, y: 65 },
      pricePerNight: 85000,
      badge: "Iconic",
      isVerified: true,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Entertainment hub and luxury stay destination with theme park atmosphere, pools and exquisite dining.",
      amenities: ["Wi-Fi", "Pool", "Restaurant", "Spa", "Cinema"],
      phone: "+234 809 333 7700",
      rooms: [
        {
          id: "tropicana-suite",
          title: "Tropicana Resort Suite",
          price: 85000,
          guests: 2,
          bed: "1 King Bed",
          size: "50 m²",
          image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
          features: "Overlooking the tropical gardens with spa package included."
        }
      ]
    },
    {
      id: "le-meridien",
      name: "Le Meridien Ibom Golf Resort",
      rating: 4.7,
      reviewsCount: 310,
      address: "Ewet Housing Estate, Uyo",
      coordinates: { x: 50, y: 22 },
      pricePerNight: 85000,
      badge: "World Class",
      isVerified: true,
      image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Nestled in lush palm vegetation with an 18-hole golf course, world-class conference facilities and tranquil ambiance.",
      amenities: ["Wi-Fi", "Pool", "Restaurant", "Gym", "Golf Course"],
      phone: "+234 802 000 1199",
      rooms: [
        {
          id: "le-meridien-deluxe",
          title: "Golf View Suite",
          price: 85000,
          guests: 2,
          bed: "1 King Bed",
          size: "45 m²",
          image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=800&q=80",
          features: "Panoramic golf greens view and complimentary breakfast."
        }
      ]
    }
  ],
  restaurants: [
    {
      id: "the-olive",
      name: "The Olive Restaurant",
      rating: 4.6,
      reviewsCount: 189,
      area: "Uyo Town",
      cuisines: ["Continental", "Local"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      description: "Signature gourmet dining bringing world flavors and Akwa Ibom traditional delicacies together."
    },
    {
      id: "bukka-spot",
      name: "Bukka Spot",
      rating: 4.4,
      reviewsCount: 120,
      area: "Itam, Uyo",
      cuisines: ["African", "Grills"],
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      description: "Authentic Nigerian soups, freshly grilled suya, fresh palm wine and lively music."
    },
    {
      id: "casa-bella",
      name: "Casa Bella",
      rating: 4.5,
      reviewsCount: 98,
      area: "Ewet Housing, Uyo",
      cuisines: ["Italian", "Continental"],
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
      description: "Woodfired pizzas, artisan pasta, fine wine selection and intimate romantic vibes."
    }
  ],
  events: [
    {
      id: "vybe-night-live",
      title: "Afro Night Live (VYBE Night)",
      date: "OCT 25",
      time: "8:00 PM",
      location: "The Vibe Lounge, Udo Udoma",
      price: 5000,
      badge: "This Weekend",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      description: "The biggest Afro-fusion nightlife experience in Uyo featuring top DJ line-ups and VIP bottle service."
    },
    {
      id: "uyo-food-festival",
      title: "Fine Dining Experience & Food Festival",
      date: "NOV 12",
      time: "2:00 PM",
      location: "Maison Restaurant, Uyo",
      price: 25000,
      badge: "Popular",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      description: "Multi-course chef tasting experience highlighting the culinary riches of Akwa Ibom State."
    },
    {
      id: "pool-day-experience",
      title: "Pool Day Experience & Beach Rni",
      date: "DEC 05",
      time: "1:00 PM",
      location: "Ibom Tropicana, Uyo",
      price: 15000,
      badge: "Top Rated",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
      description: "Sip cocktails under the sun, live poolside acoustics, and VIP cabanas."
    }
  ],
  whyBook: [
    {
      title: "Verified Stays",
      subtitle: "Trusted & safe",
      icon: "ShieldCheck"
    },
    {
      title: "Best Prices",
      subtitle: "Great deals",
      icon: "Tag"
    },
    {
      title: "24/7 Support",
      subtitle: "Always here",
      icon: "Headphones"
    },
    {
      title: "Amazing Experiences",
      subtitle: "More than just a stay",
      icon: "Sparkles"
    }
  ]
};
