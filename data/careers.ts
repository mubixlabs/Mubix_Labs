export interface CareerQuestion {
  id: string;
  label: string;
  type: "text" | "textarea" | "select";
  options?: string[];
  required?: boolean;
}

export interface CareerPosition {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Remote" | "Internship" | "Contract";
  description: string;
  responsibilities: string[];
  requirements: string[];
  questions: CareerQuestion[];
}

export const careerPositions: CareerPosition[] = [];