import { Inventory2 } from '@mui/icons-material';

const Materials = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <Inventory2 className="text-primary" style={{ fontSize: 60 }} />
    <h1 className="text-2xl font-bold mt-4 mb-2">Materials</h1>
    <p className="text-neutral text-lg">Manage materials inventory here. More features coming soon!</p>
  </div>
);

export default Materials; 