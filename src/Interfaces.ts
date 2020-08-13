export default interface ApiObject {
  engine: string;
  make: string;
  manufacturer: string;
  model: string;
  transmission: string;
  trim: string;
  year: number;
  vin: string;
  img: string;
}

export default interface CarData {
  [index: number]: {
    engine: string;
    make: string;
    manufacturer: string;
    model: string;
    transmission: string;
    trim: string;
    year: number;
    vin: string;
    img: string;
  };
}
