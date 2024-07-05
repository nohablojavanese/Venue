export interface Lapangan {
    lapanganId: string;
    childId: string;
    name: string;
    price: number;
  }
  
export interface VenueId {
    name: string;
    desc: string;
    tags: string[];
    price: number;
    lapangan: Lapangan[];
  }
  export interface Venue {
    id: string;
    name: string;
    desc: string;
    tags: string[];
    price: number;
    lapangan: Array<{
      lapanganId: string;
      childId: string;
      name: string;
      price: number;
    }>;
  }
  
 export interface PageProps {
    params: {
      id: string;
    };
  }