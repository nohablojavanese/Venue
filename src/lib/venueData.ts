export interface Lapangan {
  lapanganId: string;
  childId: string;
  name: string;
  price: number;
}

export interface Venue {
  id: string;
  name: string;
  desc: string;
  tags: string[];
  price: number;
  lapangan: Lapangan[];
}

export const venueData: Venue[] = [
  {
    id: "1",
    name: "Arenasport Sports Complex",
    desc: "Kompleks olahraga modern dengan fasilitas terbaru.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 150000,
    lapangan: [
      {
        lapanganId: "l001",
        childId: "c001",
        name: "Lapangan Utama Sepak Bola",
        price: 180000,
      },
      {
        lapanganId: "l002",
        childId: "c002",
        name: "Lapangan Tenis 1",
        price: 70000,
      },
      {
        lapanganId: "l003",
        childId: "c003",
        name: "Lapangan Basket A",
        price: 130000,
      },
    ],
  },
  {
    id: "2",
    name: "Gelanggang Olahraga Megah",
    desc: "Sebuah kompleks olahraga modern dengan fasilitas berteknologi tinggi.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 170000,
    lapangan: [
      {
        lapanganId: "l004",
        childId: "c004",
        name: "Lapangan Utama Bulu Tangkis",
        price: 160000,
      },
      {
        lapanganId: "l005",
        childId: "c005",
        name: "Lapangan Futsal 1",
        price: 80000,
      },
      {
        lapanganId: "l006",
        childId: "c006",
        name: "Lapangan Renang",
        price: 120000,
      },
    ],
  },
  {
    id: "3",
    name: "Stadion Kebanggaan",
    desc: "Stadion modern dengan fasilitas terbaik untuk berbagai jenis olahraga.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 200000,
    lapangan: [
      {
        lapanganId: "l007",
        childId: "c007",
        name: "Lapangan Utama Rugby",
        price: 190000,
      },
      {
        lapanganId: "l008",
        childId: "c008",
        name: "Lapangan Badminton 1",
        price: 110000,
      },
      {
        lapanganId: "l009",
        childId: "c009",
        name: "Lapangan Basket B",
        price: 140000,
      },
    ],
  },
  {
    id: "4",
    name: "Kompleks Olahraga Nusantara",
    desc: "Kompleks olahraga lengkap dengan berbagai fasilitas untuk semua usia.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 160000,
    lapangan: [
      {
        lapanganId: "l010",
        childId: "c010",
        name: "Lapangan Voli",
        price: 85000,
      },
      {
        lapanganId: "l011",
        childId: "c011",
        name: "Lapangan Basket C",
        price: 95000,
      },
      {
        lapanganId: "l012",
        childId: "c012",
        name: "Lapangan Futsal 2",
        price: 140000,
      },
    ],
  },
  {
    id: "5",
    name: "Sentra Olahraga Kota",
    desc: "Pusat olahraga di tengah kota dengan fasilitas modern dan nyaman.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 180000,
    lapangan: [
      {
        lapanganId: "l013",
        childId: "c013",
        name: "Lapangan Sepak Bola 2",
        price: 175000,
      },
      {
        lapanganId: "l014",
        childId: "c014",
        name: "Lapangan Tenis 2",
        price: 70000,
      },
      {
        lapanganId: "l015",
        childId: "c015",
        name: "Lapangan Basket D",
        price: 125000,
      },
    ],
  },
  {
    id: "6",
    name: "Gelanggang Remaja",
    desc: "Fasilitas olahraga yang cocok untuk remaja dengan berbagai aktivitas.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 130000,
    lapangan: [
      {
        lapanganId: "l016",
        childId: "c016",
        name: "Lapangan Futsal 3",
        price: 95000,
      },
      {
        lapanganId: "l017",
        childId: "c017",
        name: "Lapangan Tenis 3",
        price: 50000,
      },
      {
        lapanganId: "l018",
        childId: "c018",
        name: "Lapangan Basket E",
        price: 75000,
      },
    ],
  },
  {
    id: "7",
    name: "Stadium Mega Sports",
    desc: "Stadium besar dengan berbagai macam lapangan dan fasilitas pendukung.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 195000,
    lapangan: [
      {
        lapanganId: "l019",
        childId: "c019",
        name: "Lapangan Sepak Bola 3",
        price: 185000,
      },
      {
        lapanganId: "l020",
        childId: "c020",
        name: "Lapangan Tenis 4",
        price: 70000,
      },
      {
        lapanganId: "l021",
        childId: "c021",
        name: "Lapangan Basket F",
        price: 130000,
      },
    ],
  },
  {
    id: "8",
    name: "Arena Olahraga Utama",
    desc: "Arena dengan fasilitas lengkap untuk berbagai jenis olahraga.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 145000,
    lapangan: [
      {
        lapanganId: "l022",
        childId: "c022",
        name: "Lapangan Voli 2",
        price: 60000,
      },
      {
        lapanganId: "l023",
        childId: "c023",
        name: "Lapangan Basket G",
        price: 110000,
      },
      {
        lapanganId: "l024",
        childId: "c024",
        name: "Lapangan Futsal 4",
        price: 125000,
      },
    ],
  },
  {
    id: "9",
    name: "Pusat Olahraga Nasional",
    desc: "Pusat olahraga dengan berbagai macam lapangan dan fasilitas modern.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 175000,
    lapangan: [
      {
        lapanganId: "l025",
        childId: "c025",
        name: "Lapangan Basket H",
        price: 90000,
      },
      {
        lapanganId: "l026",
        childId: "c026",
        name: "Lapangan Sepak Bola 4",
        price: 160000,
      },
      {
        lapanganId: "l027",
        childId: "c027",
        name: "Lapangan Tenis 5",
        price: 70000,
      },
    ],
  },
  {
    id: "10",
    name: "Stadion Serbaguna",
    desc: "Stadion dengan berbagai fasilitas untuk olahraga dan acara besar.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 190000,
    lapangan: [
      {
        lapanganId: "l028",
        childId: "c028",
        name: "Lapangan Sepak Bola 5",
        price: 175000,
      },
      {
        lapanganId: "l029",
        childId: "c029",
        name: "Lapangan Basket I",
        price: 105000,
      },
      {
        lapanganId: "l030",
        childId: "c030",
        name: "Lapangan Tenis 6",
        price: 95000,
      },
    ],
  },
  {
    id: "11",
    name: "Kompleks Olahraga Maju",
    desc: "Kompleks olahraga dengan berbagai fasilitas untuk semua usia.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 160000,
    lapangan: [
      {
        lapanganId: "l031",
        childId: "c031",
        name: "Lapangan Voli 3",
        price: 85000,
      },
      {
        lapanganId: "l032",
        childId: "c032",
        name: "Lapangan Basket J",
        price: 115000,
      },
      {
        lapanganId: "l033",
        childId: "c033",
        name: "Lapangan Futsal 5",
        price: 140000,
      },
    ],
  },
  {
    id: "12",
    name: "Sentra Olahraga Terpadu",
    desc: "Pusat olahraga dengan fasilitas lengkap untuk berbagai aktivitas.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 145000,
    lapangan: [
      {
        lapanganId: "l034",
        childId: "c034",
        name: "Lapangan Sepak Bola 6",
        price: 165000,
      },
      {
        lapanganId: "l035",
        childId: "c035",
        name: "Lapangan Tenis 7",
        price: 80000,
      },
      {
        lapanganId: "l036",
        childId: "c036",
        name: "Lapangan Basket K",
        price: 135000,
      },
    ],
  },
  {
    id: "13",
    name: "Gelanggang Olahraga Cendana",
    desc: "Kompleks olahraga dengan berbagai fasilitas modern.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 180000,
    lapangan: [
      {
        lapanganId: "l037",
        childId: "c037",
        name: "Lapangan Voli 4",
        price: 95000,
      },
      {
        lapanganId: "l038",
        childId: "c038",
        name: "Lapangan Basket L",
        price: 100000,
      },
      {
        lapanganId: "l039",
        childId: "c039",
        name: "Lapangan Futsal 6",
        price: 125000,
      },
    ],
  },
  {
    id: "14",
    name: "Arena Utama Kota",
    desc: "Arena dengan fasilitas lengkap dan modern di pusat kota.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 155000,
    lapangan: [
      {
        lapanganId: "l040",
        childId: "c040",
        name: "Lapangan Sepak Bola 7",
        price: 140000,
      },
      {
        lapanganId: "l041",
        childId: "c041",
        name: "Lapangan Tenis 8",
        price: 70000,
      },
      {
        lapanganId: "l042",
        childId: "c042",
        name: "Lapangan Basket M",
        price: 125000,
      },
    ],
  },
  {
    id: "15",
    name: "Kompleks Olahraga Pelita",
    desc: "Kompleks olahraga dengan berbagai macam lapangan dan fasilitas pendukung.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 190000,
    lapangan: [
      {
        lapanganId: "l043",
        childId: "c043",
        name: "Lapangan Sepak Bola 8",
        price: 185000,
      },
      {
        lapanganId: "l044",
        childId: "c044",
        name: "Lapangan Tenis 9",
        price: 80000,
      },
      {
        lapanganId: "l045",
        childId: "c045",
        name: "Lapangan Basket N",
        price: 135000,
      },
    ],
  },
  {
    id: "16",
    name: "Gelanggang Remaja Indah",
    desc: "Fasilitas olahraga yang cocok untuk remaja dengan berbagai aktivitas.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 130000,
    lapangan: [
      {
        lapanganId: "l046",
        childId: "c046",
        name: "Lapangan Futsal 7",
        price: 95000,
      },
      {
        lapanganId: "l047",
        childId: "c047",
        name: "Lapangan Tenis 10",
        price: 55000,
      },
      {
        lapanganId: "l048",
        childId: "c048",
        name: "Lapangan Basket O",
        price: 75000,
      },
    ],
  },
  {
    id: "17",
    name: "Arena Serbaguna Modern",
    desc: "Arena modern dengan berbagai fasilitas untuk berbagai kegiatan olahraga.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 195000,
    lapangan: [
      {
        lapanganId: "l049",
        childId: "c049",
        name: "Lapangan Voli 5",
        price: 95000,
      },
      {
        lapanganId: "l050",
        childId: "c050",
        name: "Lapangan Basket P",
        price: 100000,
      },
      {
        lapanganId: "l051",
        childId: "c051",
        name: "Lapangan Futsal 8",
        price: 125000,
      },
    ],
  },
  {
    id: "18",
    name: "Stadion Olahraga Mandiri",
    desc: "Stadion dengan fasilitas lengkap untuk berbagai jenis olahraga.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 180000,
    lapangan: [
      {
        lapanganId: "l052",
        childId: "c052",
        name: "Lapangan Sepak Bola 9",
        price: 165000,
      },
      {
        lapanganId: "l053",
        childId: "c053",
        name: "Lapangan Tenis 11",
        price: 80000,
      },
      {
        lapanganId: "l054",
        childId: "c054",
        name: "Lapangan Basket Q",
        price: 135000,
      },
    ],
  },
  {
    id: "19",
    name: "Kompleks Olahraga Sentosa",
    desc: "Kompleks olahraga dengan berbagai fasilitas modern untuk semua usia.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 165000,
    lapangan: [
      {
        lapanganId: "l055",
        childId: "c055",
        name: "Lapangan Voli 6",
        price: 85000,
      },
      {
        lapanganId: "l056",
        childId: "c056",
        name: "Lapangan Basket R",
        price: 115000,
      },
      {
        lapanganId: "l057",
        childId: "c057",
        name: "Lapangan Futsal 9",
        price: 140000,
      },
    ],
  },
  {
    id: "20",
    name: "Pusat Olahraga Sejahtera",
    desc: "Pusat olahraga dengan berbagai fasilitas untuk semua kalangan.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 150000,
    lapangan: [
      {
        lapanganId: "l058",
        childId: "c058",
        name: "Lapangan Sepak Bola 10",
        price: 175000,
      },
      {
        lapanganId: "l059",
        childId: "c059",
        name: "Lapangan Tenis 12",
        price: 70000,
      },
      {
        lapanganId: "l060",
        childId: "c060",
        name: "Lapangan Basket S",
        price: 125000,
      },
    ],
  },
];
