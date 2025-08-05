import { createBrowserRouter, Navigate } from "react-router-dom";
import RoleBasedLayout from "./layouts/RoleBasedLayout";
import Login from "./pages/Login";
import Dashboard from "../src/pages/dashboard/Dashboard";
import Client from "./pages/client/Client";
import BuilderOverview from "./pages/client/BuilderOverview";
import TabWrapper from "./pages/client/TabWrapper";
import Estimates from "../src/pages/estimate/Estimates";
import NewEstimate from "../src/pages/estimate/NewEstimate";
import EstimateDetail from "../src/pages/estimate/EstimateDetail";
import TemplateManager from "../src/pages/estimate/TemplateManager";
import BidInvites from "./pages/BidInvites";
import Jobs from "../src/pages/jobs/Jobs";
import JobDetails from "../src/pages/jobs/JobDetails";
import Scheduling from "./pages/Scheduling";
import Materials from "./pages/Materials";
// import JobNotes from './pages/JobNotes';
import Document from "./pages/Document";
import Invoicing from "./pages/invoicing/Invoicing";
import InvoicingLayout from "./pages/invoicing/InvoicingLayout";
import SelectClient from "./pages/invoicing/SelectClient";
import CreateInvoice from "./pages/invoicing/CreateInvoice";
import InvoiceDetail from "./pages/invoicing/InvoiceDetail";
import Referral from "./pages/referral/Referral";
import Settings from "./pages/Settings";
import Logout from "./pages/Logout";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <RoleBasedLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      {
        path: "clients",
        element: <Client />,
        children: [
          {
            path: ":id",
            element: <BuilderOverview />,
            children: [
              {
                path: "client-overview",
                element: <TabWrapper tabType="overview" />,
              },
              { path: "client-jobs", element: <TabWrapper tabType="jobs" /> },
              {
                path: "client-messages",
                element: <TabWrapper tabType="messages" />,
              },
              {
                path: "client-documents",
                element: <TabWrapper tabType="documents" />,
              },
              {
                path: "client-payments",
                element: <TabWrapper tabType="payments" />,
              },
            ],
          },
        ],
      },
      {
        path: "estimates",
        element: <Estimates />,
        children: [
          { path: "new", element: <NewEstimate /> },
          { path: ":estimateId", element: <EstimateDetail /> },
          { path: "templates", element: <TemplateManager /> },
        ],
      },
      { path: "bid-invites", element: <BidInvites /> },
      { 
        path: "jobs", 
        element: <Jobs />,
        children: [
          { path: ":id", element: <JobDetails /> },
          { path: ":id/task", element: <JobDetails /> },
          { path: ":id/crew", element: <JobDetails /> },
          { path: ":id/document", element: <JobDetails /> },
          { path: ":id/expenses", element: <JobDetails /> },
          { path: ":id/profit", element: <JobDetails /> },
          { path: ":id/notes", element: <JobDetails /> }
        ]
      },
      { path: "scheduling", element: <Scheduling /> },
      { path: "materials", element: <Materials /> },
      // { path: 'job-notes', element: <JobNotes /> },
      { path: "document", element: <Document /> },
      {
        path: "invoicing",
        element: <InvoicingLayout />,
        children: [
          { index: true, element: <Invoicing /> },
          { path: "select-client", element: <SelectClient /> },
          { path: "create-invoice/:clientId", element: <CreateInvoice /> },
          { path: ":invoiceId", element: <InvoiceDetail /> },
        ],
      },
      { path: "referral", element: <Referral /> },
      { path: "settings", element: <Settings /> },
      { path: "logout", element: <Logout /> },
    ],
  },
]);
