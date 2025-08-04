import { CalendarMonth } from '@mui/icons-material';

const Scheduling = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <CalendarMonth className="text-primary" style={{ fontSize: 60 }} />
    <h1 className="text-2xl font-bold mt-4 mb-2">Scheduling</h1>
    <p className="text-neutral text-lg">Manage your schedule here. More features coming soon!</p>
  </div>
);

export default Scheduling; 