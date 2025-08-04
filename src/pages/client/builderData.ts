import { imagePath } from "../../constants/imagePath";
// TypeScript interfaces for builder data

export interface Communication {
  id: string;
  name: string;
  message: string;
  date: string;
  type: string;
}

export interface Job {
  title: string;
  value: number;
  startDate: string;
  endDate: string;
  lastPayment: string;
  outstanding: number;
  paymentStatus: string;
}

export interface Document {
  name: string;
  type: string;
  date: string;
}

export interface Note {
  type: string;
  content: string;
  date: string;
  author: string;
}

export interface Worker {
  id: number;
  name: string;
  role: string;
  type: string;
  rating: number;
  status: string;
  phone: string;
  insurance: string;
  licence: string;
  email: string;
  address: string;
  avatar: string;
  estimatesSent: number;
  activeJobs: number;
  totalRevenue: number;
  recentCommunication: Communication[];
  jobs: Job[];
  documents: Document[];
  notes: Note[];
}

// Builder data in proper JS object/array format

export const workers: Worker[] = [
  {
    id: 1,
    name: "John Construction Co.",
    role: "General Contracting",
    type: "Builder",
    rating: 4.8,
    status: "Active",
    phone: "(555) 123-456",
    insurance: "Valid until 12/25",
    licence: "mike@jonesonconstruction.com",
    email: "mike@jonesonconstruction.com",
    address: "124 Builder Street, UK",
    avatar: imagePath.Pic1,
    estimatesSent: 8,
    activeJobs: 2,
    totalRevenue: 102500,
    recentCommunication: [
      {
        id: "c1",
        name: "John Smith",
        message: "edfpgkpgk kfpfk tk toto",
        date: "2024-02-20",
        type: "Phone Call",
      },
      {
        id: "c2",
        name: "Sarah Smith",
        message: "edfpgkpgk kfpfk tk toto",
        date: "2024-01-20",
        type: "Email",
      },
      {
        id: "c3",
        name: "John",
        message: "edfpgkpgk kfpfk tk toto",
        date: "2024-06-27",
        type: "Site Visit",
      },
    ],
    jobs: [
      {
        title: "Kitchen Renovation - 123 Oak St",
        value: 45000,
        startDate: "2025-01-15",
        endDate: "2025-03-15",
        lastPayment: "2024-02-01",
        outstanding: 15000,
        paymentStatus: "Pending",
      },
      {
        title: "Bathroom Remodel - 456 Pine Ave",
        value: 28500,
        startDate: "2025-03-01",
        endDate: "2025-04-30",
        lastPayment: "2024-01-15",
        outstanding: 0,
        paymentStatus: "Paid",
      },
      {
        title: "Custom Cabinetry - 485 Eme Ave",
        value: 28500,
        startDate: "2025-03-01",
        endDate: "2025-04-30",
        lastPayment: "2024-01-15",
        outstanding: 2000,
        paymentStatus: "Overdue",
      },
    ],
    documents: [
      {
        name: "License & Insurance",
        type: "License",
        date: "2024-01-15",
      },
      {
        name: "Oak St Kitchen - Contract",
        type: "Contract",
        date: "2024-01-20",
      },
    ],
    notes: [
      {
        type: "Phone Call",
        content: "Discussed timeline for Oak St kitchen project. Client requested marble countertop upgrade.",
        date: "2024-02-20",
        author: "John Smith",
      },
    ],
  },
  {
    id: 2,
    name: "Sarah Plumbing Services",
    role: "Plumbing",
    type: "Plumber",
    rating: 4.9,
    status: "Inactive",
    phone: "(555) 234-567",
    insurance: "Valid until 11/24",
    licence: "sarah@plumbpro.com",
    email: "sarah@plumbpro.com",
    address: "45 Waterworks Lane, London",
    avatar: imagePath.Pic2,
    estimatesSent: 5,
    activeJobs: 1,
    totalRevenue: 8200,
    recentCommunication: [
      {
        id: "c4",
        name: "Project Manager",
        message: "Sent updated plumbing layout for Oak St kitchen.",
        date: "2024-03-10",
        type: "Email",
      },
    ],
    jobs: [
      {
        title: "Kitchen Sink & Pipeline - 123 Oak St",
        value: 8200,
        startDate: "2025-01-20",
        endDate: "2025-02-10",
        lastPayment: "2024-12-01",
        outstanding: 1200,
        paymentStatus: "Pending",
      },
    ],
    documents: [
      {
        name: "Plumbing License",
        type: "License",
        date: "2023-11-10",
      },
    ],
    notes: [
      {
        type: "Email",
        content: "Confirmed delivery of custom cabinets for plumbing fixtures.",
        date: "2024-02-15",
        author: "Sarah Johnson",
      },
    ],
  },
  {
    id: 3,
    name: "Mike Electrical Works",
    role: "Electrical",
    type: "Electrician",
    rating: 4.9,
    status: "Active",
    phone: "(555) 345-678",
    insurance: "Valid until 10/26",
    licence: "mike@electropro.com",
    email: "mike@electropro.com",
    address: "89 Power Grid Road, Manchester",
    avatar: imagePath.Pic3,
    estimatesSent: 6,
    activeJobs: 1,
    totalRevenue: 10400,
    recentCommunication: [
      {
        id: "c5",
        name: "Field Engineer",
        message: "Installed wiring and circuit box. Pending inspection.",
        date: "2024-06-10",
        type: "Site Visit",
      },
    ],
    jobs: [
      {
        title: "Rewiring - 123 Oak St",
        value: 10400,
        startDate: "2025-01-10",
        endDate: "2025-02-15",
        lastPayment: "2024-12-25",
        outstanding: 0,
        paymentStatus: "Paid",
      },
    ],
    documents: [
      {
        name: "Electric License",
        type: "License",
        date: "2024-02-01",
      },
    ],
    notes: [
      {
        type: "Site Visit",
        content: "Inspected circuit breaker installation. All safe.",
        date: "2024-02-10",
        author: "Mike Davis",
      },
    ],
  },
  {
    id: 4,
    name: "Adriana Lima",
    role: "Therapist",
    type: "Specialist",
    rating: 10.0,
    status: "Active",
    phone: "(555) 456-789",
    insurance: "Valid until 05/26",
    licence: "adriana@healthfirst.com",
    email: "adriana@healthfirst.com",
    address: "10 Serenity St, Birmingham",
    avatar: imagePath.Pic4,
    estimatesSent: 4,
    activeJobs: 1,
    totalRevenue: 12500,
    recentCommunication: [
      {
        id: "c6",
        name: "Client A",
        message: "Requested weekly session summary.",
        date: "2024-04-25",
        type: "Email",
      },
    ],
    jobs: [
      {
        title: "On-site Therapy Program - Oak Wellness",
        value: 12500,
        startDate: "2025-02-01",
        endDate: "2025-04-01",
        lastPayment: "2024-12-10",
        outstanding: 12500,
        paymentStatus: "Pending",
      },
    ],
    documents: [
      {
        name: "Health License Document",
        type: "License",
        date: "2024-01-12",
      },
    ],
    notes: [],
  },
];