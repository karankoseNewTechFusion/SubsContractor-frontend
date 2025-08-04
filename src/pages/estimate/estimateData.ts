export type EstimateStatus = "Draft" | "Sent" | "Approved" | "Rejected";

export type LineItem = {
  description: string;
  quantity: number;
  unit: "Hours" | "Days" | "Weeks" | "Months";
  rate: number;
  total: number; // quantity * rate
};

export type Estimate = {
  id: string; // UUID or Mongo _id
  title: string;
  client: {
    name: string;
    email?: string;
    phone?: string;
  };
  projectLocation?: string;
  notes?: string;
  lineItems: LineItem[];
  total: number;
  status: EstimateStatus;
  createdAt: string; // ISO
  dueDate: string;   // ISO
  templateUsed?: string;
};

export type EstimateTemplate = {
  id: string;
  name: string;
  defaultTitle: string;
  defaultLineItems: LineItem[];
};

let estimates: Estimate[] = [
  {
    id: "1",
    title: "Kitchen Renovation Estimate",
    client: { name: "John Smith", email: "john@example.com", phone: "555-1234" },
    projectLocation: "123 Main St, New York",
    notes: "Modern kitchen remodel with new appliances.",
    lineItems: [
      { description: "Demolition", quantity: 2, unit: "Days", rate: 500, total: 1000 },
      { description: "Cabinet Installation", quantity: 5, unit: "Days", rate: 400, total: 2000 },
      { description: "Electrical Work", quantity: 10, unit: "Hours", rate: 80, total: 800 },
    ],
    total: 3800,
    status: "Sent",
    createdAt: "2024-01-15T10:00:00Z",
    dueDate: "2024-02-15T10:00:00Z",
    templateUsed: undefined,
  },
  {
    id: "2",
    title: "Bathroom Remodel Estimate",
    client: { name: "Sarah Johnson", email: "sarah@example.com" },
    projectLocation: "456 Oak Ave, Boston",
    notes: "Master bathroom update with new tiles.",
    lineItems: [
      { description: "Tile Work", quantity: 3, unit: "Days", rate: 350, total: 1050 },
      { description: "Plumbing", quantity: 8, unit: "Hours", rate: 90, total: 720 },
    ],
    total: 1770,
    status: "Approved",
    createdAt: "2024-01-10T09:00:00Z",
    dueDate: "2024-02-10T09:00:00Z",
    templateUsed: undefined,
  },
  {
    id: "3",
    title: "Office Building HVAC",
    client: { name: "ABC Corporation" },
    projectLocation: "789 Corporate Blvd, Chicago",
    notes: "Commercial HVAC installation for 3 floors.",
    lineItems: [
      { description: "Ductwork", quantity: 2, unit: "Weeks", rate: 2000, total: 4000 },
      { description: "Unit Installation", quantity: 1, unit: "Weeks", rate: 3500, total: 3500 },
    ],
    total: 7500,
    status: "Draft",
    createdAt: "2024-01-20T08:00:00Z",
    dueDate: "2024-03-01T08:00:00Z",
    templateUsed: undefined,
  },
];

export function getEstimates() {
  return estimates;
}

export function addEstimate(newEstimate: Estimate) {
  estimates = [
    { ...newEstimate, id: Date.now().toString() },
    ...estimates,
  ];
}

export function updateEstimate(updated: Estimate) {
  estimates = estimates.map(e => e.id === updated.id ? { ...updated } : e);
}

export function deleteEstimate(id: string) {
  estimates = estimates.filter(e => e.id !== id);
} 