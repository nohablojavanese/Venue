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
    name: "SportsPlex Arena",
    desc: "A modern multi-sport complex with state-of-the-art facilities.",
    tags: ["indoor", "outdoor", "multi-sport"],
    price: 100,
    lapangan: [
      {
        lapanganId: "l001",
        childId: "c001",
        name: "Main Football Field",
        price: 80,
      },
      {
        lapanganId: "l002",
        childId: "c002",
        name: "Tennis Court 1",
        price: 40,
      },
      {
        lapanganId: "l003",
        childId: "c003",
        name: "Basketball Court A",
        price: 50,
      },
    ],
  },
  {
    id: "2",
    name: "GreenField Park",
    desc: "A spacious outdoor venue perfect for team sports and events.",
    tags: ["outdoor", "grass", "large-groups"],
    price: 150,
    lapangan: [
      {
        lapanganId: "l004",
        childId: "c004",
        name: "Soccer Field 1",
        price: 100,
      },
      {
        lapanganId: "l005",
        childId: "c005",
        name: "Soccer Field 2",
        price: 100,
      },
      {
        lapanganId: "l006",
        childId: "c006",
        name: "Cricket Pitch",
        price: 120,
      },
    ],
  },
  {
    id: "3",
    name: "AquaZone",
    desc: "An indoor aquatic center featuring Olympic-sized pools and diving facilities.",
    tags: ["indoor", "swimming", "diving"],
    price: 200,
    lapangan: [
      {
        lapanganId: "l007",
        childId: "c007",
        name: "Olympic Pool",
        price: 150,
      },
      {
        lapanganId: "l008",
        childId: "c008",
        name: "Diving Pool",
        price: 100,
      },
      {
        lapanganId: "l009",
        childId: "c009",
        name: "Training Pool",
        price: 80,
      },
    ],
  },
];
