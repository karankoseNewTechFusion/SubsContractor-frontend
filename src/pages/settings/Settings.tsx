import { Settings } from '@mui/icons-material';

const SettingsPage = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <Settings className="text-primary" style={{ fontSize: 60 }} />
    <h1 className="text-2xl font-bold mt-4 mb-2">Settings</h1>
    <p className="text-neutral text-lg">Configure your preferences here. More features coming soon!</p>
  </div>
);

export default SettingsPage; 