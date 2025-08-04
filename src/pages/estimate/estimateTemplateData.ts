import { EstimateTemplate } from "./estimateData";

const estimateTemplates: EstimateTemplate[] = [
  {
    id: "template-1",
    name: "Kitchen Remodel",
    defaultTitle: "Kitchen Renovation Estimate",
    defaultLineItems: [
      { description: "Demolition", quantity: 2, unit: "Days", rate: 500, total: 1000 },
      { description: "Cabinet Installation", quantity: 5, unit: "Days", rate: 400, total: 2000 },
      { description: "Electrical Work", quantity: 10, unit: "Hours", rate: 80, total: 800 },
    ],
  },
  {
    id: "template-2",
    name: "Bathroom Remodel",
    defaultTitle: "Bathroom Remodel Estimate",
    defaultLineItems: [
      { description: "Tile Work", quantity: 3, unit: "Days", rate: 350, total: 1050 },
      { description: "Plumbing", quantity: 8, unit: "Hours", rate: 90, total: 720 },
    ],
  },
  {
    id: "template-3",
    name: "Office HVAC",
    defaultTitle: "Office Building HVAC Estimate",
    defaultLineItems: [
      { description: "Ductwork", quantity: 2, unit: "Weeks", rate: 2000, total: 4000 },
      { description: "Unit Installation", quantity: 1, unit: "Weeks", rate: 3500, total: 3500 },
    ],
  },
];

export default estimateTemplates; 