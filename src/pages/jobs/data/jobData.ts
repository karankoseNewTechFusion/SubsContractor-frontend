export const jobData = [
  {
    id: 1,
    title: "Office Buildout",
    client: "Tech Startup LLC",
    status: "Pending",
    startDate: "2024-02-01",
    endDate: "2024-04-01",
    budget: "$65,000",
    profit: "$0",
    expenses: "$0",
    clientEmail: "contact@techstartup.com",
    clientPhone: "+1 (555) 123-4567",
    clientAddress: "123 Tech Street, Silicon Valley, CA 94025",
    projectLocation: "San Francisco, CA",
    priority: "High",
    description: "Complete office buildout for new tech startup including open workspace, meeting rooms, and break areas."
  },
  {
    id: 2,
    title: "Bathroom Remodel",
    client: "Johnson Home",
    status: "Active",
    startDate: "2024-01-20",
    endDate: "2024-02-20",
    budget: "$28,000",
    profit: "$4,200",
    expenses: "$23,800",
    clientEmail: "johnson@email.com",
    clientPhone: "+1 (555) 234-5678",
    clientAddress: "456 Home Avenue, Suburbia, NY 10001",
    projectLocation: "New York, NY",
    priority: "Medium",
    description: "Complete bathroom renovation including new fixtures, tiles, and plumbing upgrades."
  },
  {
    id: 3,
    title: "Deck Construction",
    client: "Williams Property",
    status: "Completed",
    startDate: "2024-01-20",
    endDate: "2024-02-15",
    budget: "$15,000",
    profit: "$3,500",
    expenses: "$11,500",
    clientEmail: "williams@email.com",
    clientPhone: "+1 (555) 345-6789",
    clientAddress: "789 Property Lane, Countryside, TX 75001",
    projectLocation: "Dallas, TX",
    priority: "Low",
    description: "Custom deck construction with premium materials and safety railings."
  },
  {
    id: 4,
    title: "Kitchen Renovation",
    client: "Smith Family",
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    budget: "$45,000",
    profit: "$8,500",
    expenses: "$36,500",
    clientEmail: "smith@email.com",
    clientPhone: "+1 (555) 456-7890",
    clientAddress: "321 Family Drive, Suburbia, FL 33101",
    projectLocation: "Miami, FL",
    priority: "High",
    description: "Complete kitchen renovation with new cabinets, countertops, appliances, and flooring."
  },
  {
    id: 5,
    title: "Roof Repair",
    client: "Brown Residence",
    status: "Pending",
    startDate: "2024-01-10",
    endDate: "2024-01-25",
    budget: "$12,000",
    profit: "$0",
    expenses: "$2,000",
    clientEmail: "brown@email.com",
    clientPhone: "+1 (555) 567-8901",
    clientAddress: "654 Residence Road, City Center, IL 60601",
    projectLocation: "Chicago, IL",
    priority: "Urgent",
    description: "Emergency roof repair and replacement of damaged shingles and gutters."
  }
];

export const crewList = [
  {
    initials: 'MJ',
    color: 'bg-blue-100',
    textColor: 'text-blue-600',
    name: 'Mike Johnson',
    role: 'Project Manager',
    email: 'mike.johnson@company.com',
    rating: 4.8,
    status: 'Active',
    statusColor: 'bg-green-100 text-green-800',
    statusDot: 'bg-green-500',
    projects: [
      { title: 'Deck Construction', hours: 32 },
      { title: 'Kitchen Renovation', hours: 40 }
    ],
    totalHours: 72
  },
  {
    initials: 'SW',
    color: 'bg-orange-100',
    textColor: 'text-orange-600',
    name: 'Sarah Wilson',
    role: 'Carpenter',
    email: 'sarah.wilson@company.com',
    rating: 4.9,
    status: 'Active',
    statusColor: 'bg-green-100 text-green-800',
    statusDot: 'bg-green-500',
    projects: [
      { title: 'Deck Construction', hours: 28 }
    ],
    totalHours: 28
  },
  {
    initials: 'DB',
    color: 'bg-yellow-100',
    textColor: 'text-yellow-600',
    name: 'David Brown',
    role: 'Laborer',
    email: 'david.brown@company.com',
    rating: 4.7,
    status: 'Active',
    statusColor: 'bg-green-100 text-green-800',
    statusDot: 'bg-green-500',
    projects: [
      { title: 'Kitchen Renovation', hours: 20 }
    ],
    totalHours: 20
  },
  {
    initials: 'AL',
    color: 'bg-purple-100',
    textColor: 'text-purple-600',
    name: 'Alex Lee',
    role: 'Electrician',
    email: 'alex.lee@company.com',
    rating: 4.6,
    status: 'Inactive',
    statusColor: 'bg-red-100 text-red-800',
    statusDot: 'bg-red-500',
    projects: [],
    totalHours: 0
  },
  {
    initials: 'RK',
    color: 'bg-green-100',
    textColor: 'text-green-600',
    name: 'Robert Kim',
    role: 'Plumber',
    email: 'robert.kim@company.com',
    rating: 4.9,
    status: 'Active',
    statusColor: 'bg-green-100 text-green-800',
    statusDot: 'bg-green-500',
    projects: [
      { title: 'Deck Construction', hours: 10 },
      { title: 'Roof Repair', hours: 15 }
    ],
    totalHours: 25
  }
]; 