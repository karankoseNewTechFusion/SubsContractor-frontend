import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, Edit, Delete, ContentCopy } from '@mui/icons-material';
import CustomButton from '../../components/Button';
import Table from '../../components/Table';
import CreateEstimateModal from './CreateEstimateModal';
import { addEstimate, getEstimates } from './estimateData';

const lineItemTemplates = [
  {
    id: 1,
    name: 'Site Inspection',
    subtitle: 'On-Site Assessment Before Starting Work',
    category: 'General Construction',
    categoryColor: '#2563eb',
    unitPrice: 500,
    created: '2024-06-28',
  },
  {
    id: 2,
    name: 'Labour Charges',
    subtitle: 'Skilled Labour Cost Per Hour',
    category: 'Labour',
    categoryColor: '#a21caf',
    unitPrice: 250,
    created: '2024-06-25',
  },
  {
    id: 3,
    name: 'Plumbing Setup',
    subtitle: 'Full Kitchen And Bathroom Plumbing Installation',
    category: 'Plumbing',
    categoryColor: '#f59e42',
    unitPrice: 8500,
    created: '2024-06-20',
  },
  {
    id: 4,
    name: 'Material Supply',
    subtitle: 'Bricks, Cement, Tiles, Etc. Per Sq Ft',
    category: 'Materials',
    categoryColor: '#64748b',
    unitPrice: 65,
    created: '2024-06-18',
  },
  {
    id: 5,
    name: 'Equipment Rental',
    subtitle: 'Drilling, Lifting Tools Rental Per Day',
    category: 'Equipment',
    categoryColor: '#e11d48',
    unitPrice: 1200,
    created: '2024-06-15',
  },
  {
    id: 6,
    name: 'Electrical Wiring',
    subtitle: 'Complete Electrical Wiring Setup Per Room',
    category: 'Electrical',
    categoryColor: '#f43f5e',
    unitPrice: 1500,
    created: '2024-06-12',
  },
];

const estimateTemplates = [
  {
    id: 'et1',
    name: 'Kitchen Remodel Template',
    subtitle: 'Complete Kitchen Renovation With Modern Fittings',
    tags: [
      { label: 'Kitchen', color: '#22c55e' },
      { label: 'Interior', color: '#4ade80' },
      { label: 'Modern', color: '#a3e635' },
    ],
    defaultLineItems: [
      { description: 'Demolition', quantity: 2, unit: 'Days', rate: 500, total: 1000 },
      { description: 'Cabinet Installation', quantity: 5, unit: 'Days', rate: 400, total: 2000 },
      { description: 'Electrical Work', quantity: 10, unit: 'Hours', rate: 80, total: 800 },
    ],
    created: '2024-06-28',
  },
  {
    id: 'et2',
    name: 'Bathroom Remodel Template',
    subtitle: 'Bathroom Renovation With Premium Fixtures',
    tags: [
      { label: 'Bathroom', color: '#fb7185' },
      { label: 'Upgrade', color: '#fbbf24' },
      { label: 'Fixtures', color: '#fca5a5' },
    ],
    defaultLineItems: [
      { description: 'Tile Work', quantity: 3, unit: 'Days', rate: 350, total: 1050 },
      { description: 'Plumbing', quantity: 8, unit: 'Hours', rate: 90, total: 720 },
    ],
    created: '2024-06-22',
  },
  {
    id: 'et3',
    name: 'Office HVAC Template',
    subtitle: 'Commercial HVAC installation for 3 floors.',
    tags: [
      { label: 'Commercial', color: '#a3a3a3' },
      { label: 'Office', color: '#d1d5db' },
      { label: 'Business', color: '#6b7280' },
    ],
    defaultLineItems: [
      { description: 'Ductwork', quantity: 2, unit: 'Weeks', rate: 2000, total: 4000 },
      { description: 'Unit Installation', quantity: 1, unit: 'Weeks', rate: 3500, total: 3500 },
    ],
    created: '2024-06-20',
  },
];

const TemplateManager = () => {
  const [activeTab, setActiveTab] = useState('line');
  const [lineTemplates, setLineTemplates] = useState(lineItemTemplates);
  const [estimateTemplatesList, setEstimateTemplatesList] = useState(estimateTemplates);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: 'line' | 'estimate';
    item: any;
  }>({ isOpen: false, type: 'line', item: null });
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    template: any;
  }>({ isOpen: false, template: null });
  const navigate = useNavigate();

  const handleDeleteLineTemplate = (item: any) => {
    setDeleteModal({ isOpen: true, type: 'line', item });
  };

  const handleDeleteEstimateTemplate = (item: any) => {
    setDeleteModal({ isOpen: true, type: 'estimate', item });
  };

  const handleEditTemplate = (template: any) => {
    // Convert template data to CreateEstimateModal format
    const modalData = {
      title: template.name,
      client: {
        name: '',
        email: '',
        phone: '',
      },
      projectLocation: '',
      notes: '',
      lineItems: template.defaultLineItems,
      total: template.defaultLineItems.reduce((sum: number, item: any) => sum + (item.total || 0), 0),
      status: 'Draft' as const,
      createdAt: new Date().toISOString(),
      dueDate: '',
      templateUsed: template.name,
    };
    
    setEditModal({ isOpen: true, template: modalData });
  };

  const handleCreateFromTemplate = (estimateData: any) => {
    console.log('Creating estimate from template:', estimateData);
    
    // Add the estimate to the data store
    addEstimate(estimateData);
    
    console.log('Current estimates after adding:', getEstimates());
    
    // Close the modal
    setEditModal({ isOpen: false, template: null });
    
    // Navigate to estimates list to see the new estimate
    navigate('/estimates');
  };

  const confirmDelete = () => {
    if (deleteModal.type === 'line') {
      setLineTemplates(prev => prev.filter(template => template.id !== deleteModal.item.id));
    } else {
      setEstimateTemplatesList(prev => prev.filter(template => template.id !== deleteModal.item.id));
    }
    setDeleteModal({ isOpen: false, type: 'line', item: null });
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, type: 'line', item: null });
  };

  return (
    <div style={{margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
        <CustomButton
          style={{
            background: 'transparent',
            color: '#2563eb',
            borderRadius: 8,
            fontWeight: 600,
            padding: '8px 18px',
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowBack style={{ fontSize: 18, marginRight: 6 }} />
          
        </CustomButton>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 26, fontWeight: 700, textAlign: 'center' }}>Template Manager</div>
          <div style={{ color: '#888', fontSize: 15, fontWeight: 500, textAlign: 'center' }}>Manage Your Saved Line Item And Estimate Templates</div>
        </div>
      </div>
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0, marginBottom: 24 }}>
          <CustomButton
            style={{
              background: activeTab === 'line' ? '#2563eb' : 'transparent',
              color: activeTab === 'line' ? '#fff' : '#222',
             
              fontWeight: 600,
              width: '50%',
              fontSize: 16,
              boxShadow: 'none',
              borderBottom: activeTab === 'line' ? 'none' : '2px solid #e5e7eb',
              borderTop: 'none', borderLeft: 'none', borderRight: 'none',
              padding: '10px 32px',
            }}
            onClick={() => setActiveTab('line')}
          >
            Line Item Templates
          </CustomButton>
          <CustomButton
            style={{
              background: activeTab === 'estimate' ? '#2563eb' : 'transparent',
              color: activeTab === 'estimate' ? '#fff' : '#222',
              fontWeight: 600,
              fontSize: 16, width: '50%',
              boxShadow: 'none',
              borderBottom: activeTab === 'estimate' ? 'none' : '2px solid #e5e7eb',
              borderTop: 'none', borderLeft: 'none', borderRight: 'none',
              padding: '10px 32px',
            }}
            onClick={() => setActiveTab('estimate')}
          >
            Estimate Templates
          </CustomButton>
        </div>
        {activeTab === 'line' && (
          <>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 12 }}>Saved Line Item ({lineTemplates.length})</div>
            <Table
              columns={[
                {
                  key: 'name',
                  title: 'Template Name',
                  render: (value, row) => (
                    <div>
                      <div style={{ fontWeight: 600 }}>{value}</div>
                      <div style={{ color: '#888', fontSize: 13 }}>{row.subtitle}</div>
                    </div>
                  ),
                },
                {
                  key: 'category',
                  title: 'Category',
                  render: (value, row) => (
                    <span style={{
                      background: row.categoryColor,
                      color: '#fff',
                      borderRadius: 8,
                      fontWeight: 600,
                      fontSize: 13,
                      padding: '2px 12px',
                      display: 'inline-block',
                    }}>{value}</span>
                  ),
                  align: 'center',
                },
                {
                  key: 'unitPrice',
                  title: 'Unit Price',
                  render: (value) => <span style={{ fontWeight: 600 }}>${value.toFixed(2)}</span>,
                  align: 'right',
                },
                { key: 'created', title: 'Created', align: 'center' },
                {
                  key: 'actions',
                  title: 'Actions',
                  render: (value, row) => (
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                      <CustomButton style={{ background: '#f4f5f7', color: '#222', borderRadius: 8, padding: 6 }}>
                        <ContentCopy style={{ width: 18, height: 18 }} />
                      </CustomButton>
                      <CustomButton style={{ background: '#f4f5f7', color: '#222', borderRadius: 8, padding: 6 }}>
                        <Edit style={{ width: 18, height: 18 }} />
                      </CustomButton>
                      <CustomButton 
                        style={{ background: '#f4f5f7', color: '#222', borderRadius: 8, padding: 6 }}
                        onClick={() => handleDeleteLineTemplate(row)}
                      >
                        <Delete style={{ width: 18, height: 18 }} />
                      </CustomButton>
                    </div>
                  ),
                  align: 'center',
                },
              ]}
              data={lineTemplates}
              rowKey={row => row.id}
            />
          </>
        )}
        {activeTab === 'estimate' && (
          <>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 12 }}>Saved Estimate Templates ({estimateTemplatesList.length})</div>
            <Table
              columns={[
                {
                  key: 'name',
                  title: 'Template Name',
                  render: (value, row) => (
                    <div>
                      <div style={{ fontWeight: 600 }}>{value}</div>
                      <div style={{ color: '#888', fontSize: 13 }}>{row.subtitle}</div>
                    </div>
                  ),
                },
                {
                  key: 'tags',
                  title: 'Tags',
                  render: (tags) => (
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {tags.map((tag: any, idx: number) => (
                        <span key={idx} style={{ background: tag.color, color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: 13, padding: '2px 10px', display: 'inline-block' }}>{tag.label}</span>
                      ))}
                    </div>
                  ),
                  align: 'center',
                },
                {
                  key: 'defaultLineItems',
                  title: 'Items',
                  render: (value) => `${value.length} Items`,
                  align: 'center',
                },
                {
                  key: 'defaultLineItemsValues',
                  title: 'Values',
                  render: (value, row) => {
                    const lineItems = row.defaultLineItems || [];
                    const total = lineItems.reduce((sum, item) => sum + (item.total || 0), 0);
                    return <span style={{ fontWeight: 600 }}>${total.toLocaleString()}</span>;
                  },
                  align: 'right',
                },
                { key: 'created', title: 'Created', align: 'center' },
                {
                  key: 'actions',
                  title: 'Actions',
                  render: (value, row) => (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                        <CustomButton style={{ background: '#f4f5f7', color: '#222', borderRadius: 8, padding: 6 }}>
                          <ContentCopy style={{ width: 18, height: 18 }} />
                        </CustomButton>
                        <CustomButton 
                          style={{ background: '#f4f5f7', color: '#222', borderRadius: 8, padding: 6 }}
                          onClick={() => handleEditTemplate(row)}
                        >
                          <Edit style={{ width: 18, height: 18 }} />
                        </CustomButton>
                        <CustomButton 
                          style={{ background: '#f4f5f7', color: '#222', borderRadius: 8, padding: 6 }}
                          onClick={() => handleDeleteEstimateTemplate(row)}
                        >
                          <Delete style={{ width: 18, height: 18 }} />
                        </CustomButton>
                      </div>
                      <CustomButton style={{ background: '#2563eb', color: '#fff', borderRadius: 8, padding: '6px 18px', fontWeight: 600, marginTop: 4 }}>
                        Use Template
                      </CustomButton>
                    </div>
                  ),
                  align: 'center',
                },
              ]}
              data={estimateTemplatesList}
              rowKey={row => row.id}
            />
          </>
        )}
      </div>

      {/* Edit Template Modal */}
      {editModal.isOpen && (
        <CreateEstimateModal
          open={editModal.isOpen}
          onClose={() => setEditModal({ isOpen: false, template: null })}
          onCreate={handleCreateFromTemplate}
          initialValues={editModal.template}
          isEdit={false}
          isFromTemplate={true}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Delete className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Delete Template
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{deleteModal.item?.name}"? This action cannot be undone.
              </p>
              <div className="flex gap-4 justify-center">
                <CustomButton
                  onClick={cancelDelete}
                  color="#f3f4f6"
                  textColor="#374151"
                  className="px-6 py-2 rounded-lg font-semibold border border-gray-300"
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  onClick={confirmDelete}
                  color="#dc2626"
                  textColor="#ffffff"
                  className="px-6 py-2 rounded-lg font-semibold"
                >
                  Delete
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateManager; 