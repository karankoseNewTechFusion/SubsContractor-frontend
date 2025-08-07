import React, { useState } from 'react';
import { InsertDriveFile, FilterList, Visibility, Download, Edit, Delete as DeleteIcon } from '@mui/icons-material';
import CustomButton from '../../components/Button';
import DocumentModal from './DocumentModal';

const documents = [
	{
		name: 'INV-202401-001',
		tags: ['Insurance', 'Builders'],
		type: 'COI',
		typeColor: 'bg-blue-600 text-white',
		related: 'ABC Builders',
		date: '2025-07-08',
		by: 'John Doe',
		size: '2.4 MB',
		status: '',
		actions: true,
	},
	{
		name: 'W9_TomSmith.Pdf',
		tags: ['Tax', 'Contractor'],
		type: 'W-9',
		typeColor: 'bg-green-400 text-white',
		related: 'Job #3489',
		date: '2025-07-05',
		by: 'Sarah K',
		size: '1.2 MB',
		status: '',
		actions: true,
	},
	{
		name: 'BuilderAgreement_Johnson.Pdf',
		tags: ['Agreement', 'Legal'],
		type: 'Builder Agreement',
		typeColor: 'bg-purple-500 text-white',
		related: 'Johnson Corp.',
		date: '2025-06-28',
		by: 'Admin',
		size: '3.8 MB',
		status: '',
		actions: true,
	},
	{
		name: 'Permit_CityHall.Pdf',
		tags: ['Permit', 'Government'],
		type: 'Permit',
		typeColor: 'bg-yellow-400 text-white',
		related: 'Job #3491',
		date: '2025-07-01',
		by: 'Mike Johnson',
		size: '0.8 MB',
		status: '',
		actions: true,
	},
];

const Document = () => {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<div className="bg-gray-50 min-h-screen p-6">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">Documents</h2>
					<p className="text-gray-500 text-sm">
						Store And Manage All Important Project Documents In One Place.
					</p>
				</div>
				<CustomButton
					color="#2563eb"
					textColor="#fff"
					className="px-5 py-2 rounded-lg font-medium text-sm flex items-center gap-2"
					onClick={() => setModalOpen(true)}
				>
					+ Upload New Document
				</CustomButton>
			</div>
			{/* Main Card */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
				{/* Table Header - MATCH IMAGE 2 */}
				<div className="flex flex-col gap-4 mb-4">
					<div className="flex items-center gap-3">
						<h3 className="text-xl font-semibold text-gray-900 mb-0">
							Documents{' '}
							<span className="text-gray-500 text-base font-normal">(4)</span>
						</h3>
					</div>
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div className="flex-1 flex items-center gap-2">
							<div className="relative w-full md:w-[340px]">
								<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
									<svg
										width="18"
										height="18"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<circle cx="11" cy="11" r="7" />
										<path d="m21 21-4.3-4.3" />
									</svg>
								</span>
								<input
									type="text"
									placeholder="Search Documents By Name, Job Or Builders..."
									className="pl-9 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:outline-none w-full"
									style={{ height: 40 }}
								/>
							</div>
						</div>
						<CustomButton
							color="transparent"
							textColor="#2563eb"
							className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50"
							leftIcon={<FilterList fontSize="small" />}
							style={{
								border: 'none',
								boxShadow: 'none',
								minWidth: 0,
								padding: '0 16px',
								height: 40,
							}}
						>
							<span className="font-semibold">All Documents</span>
							<svg
								className="ml-1"
								width="16"
								height="16"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0l-4.25-4.39a.75.75 0 0 1 .02-1.06z"
									clipRule="evenodd"
								/>
							</svg>
						</CustomButton>
					</div>
				</div>
				{/* Table */}
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead>
							<tr className="bg-gray-50 text-gray-700 font-semibold">
								<th className="py-3 px-4 text-left">File Name</th>
								<th className="py-3 px-4 text-left">Type</th>
								<th className="py-3 px-4 text-left">Related To</th>
								<th className="py-3 px-4 text-left">Uploaded On</th>
								<th className="py-3 px-4 text-left">Uploaded By</th>
								<th className="py-3 px-4 text-left">Status</th>
								<th className="py-3 px-4 text-left">Actions</th>
								<th className="py-3 px-4 text-left">Size</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{documents.map((doc, idx) => (
								<tr key={idx}>
									<td className="py-3 px-4">
										<div className="flex items-center gap-2">
											<span className="w-8 h-8 bg-red-100 rounded flex items-center justify-center text-red-600 font-bold text-xs">
												<InsertDriveFile fontSize="small" />
											</span>
											<div>
												<span className="font-semibold text-gray-900">
													{doc.name}
												</span>
												<div className="flex gap-1 mt-1 flex-wrap">
													{doc.tags.map((tag, i) => (
														<span
															key={i}
															className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs"
														>
															{tag}
														</span>
													))}
												</div>
											</div>
										</div>
									</td>
									<td className="py-3 px-4">
										<span
											className={`px-2 py-1 rounded-full text-xs font-semibold ${doc.typeColor}`}
										>
											{doc.type}
										</span>
									</td>
									<td className="py-3 px-4">{doc.related}</td>
									<td className="py-3 px-4">{doc.date}</td>
									<td className="py-3 px-4">{doc.by}</td>
									<td className="py-3 px-4">{doc.status}</td>
									<td className="py-3 px-4">
										<div className="flex gap-2">
											<CustomButton
												color="#f3f4f6"
												textColor="#374151"
												className="p-2 text-gray-400 hover:text-blue-600"
												leftIcon={<Visibility fontSize="small" />}
												style={{ minWidth: 0, padding: 0 }}
											/>
											<CustomButton
												color="#f3f4f6"
												textColor="#374151"
												className="p-2 text-gray-400 hover:text-blue-600"
												leftIcon={<Download fontSize="small" />}
												style={{ minWidth: 0, padding: 0 }}
											/>
											<CustomButton
												color="#f3f4f6"
												textColor="#374151"
												className="p-2 text-gray-400 hover:text-blue-600"
												leftIcon={<Edit fontSize="small" />}
												style={{ minWidth: 0, padding: 0 }}
											/>
											<CustomButton
												color="#f3f4f6"
												textColor="#374151"
												className="p-2 text-gray-400 hover:text-red-600"
												leftIcon={<DeleteIcon fontSize="small" />}
												style={{ minWidth: 0, padding: 0 }}
											/>
										</div>
									</td>
									<td className="py-3 px-4">{doc.size}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<DocumentModal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				onSave={() => setModalOpen(false)}
			/>
		</div>
	);
};

export default Document;