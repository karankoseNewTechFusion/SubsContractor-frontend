import React, { ReactNode, useState } from 'react';
import Sidebar from '../sections/Sidebar';
import Header from '../sections/Header';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-inter">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 md:p-8  overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;





















// import React, { ReactNode, useState } from 'react';
// import Sidebar from '../sections/Sidebar';
// import Header from '../sections/Header';

// const MainLayout = ({ children }: { children: ReactNode }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen bg-gray-50 font-inter">
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <div className="flex-1 flex flex-col">
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//         <main className="flex-1 p-4 md:p-8 overflow-y-auto">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;