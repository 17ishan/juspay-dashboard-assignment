import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import DefaultDashboard from "../pages/Dashboard/DefaultDashboard";
import EcommerceDashboard from "../pages/Dashboard/EcommerceDashboard";
import OrderList from "../pages/Orders/OrderList";
import NotificationPanel from "./components/NotificationPanel";

function App() {
  const location = useLocation();
  const isOrdersPage = location.pathname === '/orders';


   const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="w-full [font-family:Inter] min-h-screen bg-bg-light dark:bg-bg-dark transition-colors">
      <div className="flex">
        <Sidebar isCollapsed={isCollapsed} onToggleSidebar={toggleSidebar}  />

        <div className={`${isOrdersPage ? 'w-full' : 'md:w-[65%]'}`}>
          <Navbar  onToggleSidebar={toggleSidebar}  />
          <main className="overflow-x-auto h-[650px]">
            <Routes>
              <Route path="/" element={<DefaultDashboard />} />
              <Route path="/orders" element={<OrderList />} />
              <Route path="/ecommerce" element={<EcommerceDashboard />} />
            </Routes>
          </main>
        </div>
        {!isOrdersPage && <NotificationPanel />}

      </div>

      {/* <OrderList/> */}

      {/* <Sidebar/>

      <div className='flex flex-col flex-1'>
        <Navbar/>

       
        <NotificationPanel/>  
        <main className='p-6'>
            <Routes>
              <Route path='/' element={<DefaultDashboard/>}/>
              <Route path='/ecommerce' element={<EcommerceDashboard/>}/>
              <Route path='/orders' element={<OrderList/>}/>
            </Routes>
        </main>

      </div> */}
    </div>
  );
}

export default App;
