export const weddingData = {
  couple: {
    bride: {
      name: "Sarah Amelia",
      fullName: "Sarah Amelia Putri",
      father: "Bapak Ahmad Wijaya",
      mother: "Ibu Siti Nurhaliza",
      photo: "https://images.unsplash.com/photo-1494790108755-2616c669ca40?w=400&h=600&fit=crop",
      bio: "Putri pertama dari pasangan Bapak Ahmad Wijaya dan Ibu Siti Nurhaliza. Lulusan Universitas Indonesia jurusan Psikologi."
    },
    groom: {
      name: "Michael Pratama",
      fullName: "Michael Pratama Santoso",
      father: "Bapak Hendro Santoso",
      mother: "Ibu Maria Dewi",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      bio: "Putra pertama dari pasangan Bapak Hendro Santoso dan Ibu Maria Dewi. Lulusan Institut Teknologi Bandung jurusan Teknik Informatika."
    }
  },
  
  ceremony: {
    akad: {
      date: "Sabtu, 15 Juni 2024",
      time: "09:00 WIB",
      venue: "Masjid Agung Jakarta",
      address: "Jl. Masjid Raya No. 1, Jakarta Pusat, DKI Jakarta",
      coordinates: { lat: -6.170, lng: 106.831 }
    },
    reception: {
      date: "Sabtu, 15 Juni 2024",
      time: "19:00 WIB - Selesai",
      venue: "Ballroom Hotel Grand Indonesia",
      address: "Jl. MH Thamrin No. 1, Jakarta Pusat, DKI Jakarta",
      coordinates: { lat: -6.195, lng: 106.823 }
    }
  },
  
  islamicQuote: {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    indonesian: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berfikir.",
    reference: "QS. Ar-Rum: 21"
  },
  
  gallery: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1470905763821-c52baf5abd2b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1525258854630-bd5d40d74927?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1594736797933-d0409ba84848?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1585914641050-fa9883c4e21c?w=800&h=600&fit=crop"
  ]
};

// Mock guest confirmations
export const mockGuests = ref([
  { id: 1, name: "Ahmad Fauzi", attendance: "hadir", guestCount: 2, createdAt: "2024-01-15" },
  { id: 2, name: "Siti Rahayu", attendance: "hadir", guestCount: 1, createdAt: "2024-01-16" },
  { id: 3, name: "Budi Santoso", attendance: "tidak-hadir", guestCount: 0, createdAt: "2024-01-17" }
]);

// Mock API functions
export const useMockAPI = () => {
  const getWeddingData = () => {
    return Promise.resolve(weddingData);
  };

  const getGuests = () => {
    return Promise.resolve(mockGuests.value);
  };

  const submitGuest = (guestData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newGuest = {
          id: mockGuests.value.length + 1,
          ...guestData,
          createdAt: new Date().toISOString().split('T')[0]
        };
        mockGuests.value.push(newGuest);
        resolve(newGuest);
      }, 500);
    });
  };

  return {
    getWeddingData,
    getGuests,
    submitGuest
  };
};