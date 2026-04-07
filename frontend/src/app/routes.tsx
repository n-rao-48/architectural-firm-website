import { Navigate, createBrowserRouter } from 'react-router';
import AddProjectPage from './admin/add-project/page';
import AdminDashboardPage from './admin/dashboard/page';
import EditProjectPage from './admin/edit-project/[id]/page';
import AdminInquiriesPage from './admin/inquiries/page';
import AdminLayout from './admin/layout';
import AdminLoginPage from './admin/login/page';
import ManageProjectsPage from './admin/manage-projects/page';
import UploadsPage from './admin/uploads/page';
import AhilyanagarProjects from "./pages/AhilyanagarProjects";
import ApplicationPage from "./pages/ApplicationPage";
import Home from "./pages/Home";
import InquiryPage from "./pages/InquiryPage";
import NashikProjects from "./pages/NashikProjects";
import OngoingProjectsPage from "./pages/OngoingProjectsPage";
import ProfilePage from "./pages/ProfilePage";
import ProjectsGalleryPage from "./pages/ProjectsGalleryPage";
import PuneProjects from "./pages/PuneProjects";
import SambhajinagarProjects from "./pages/SambhajinagarProjects";
import ServicesPage from "./pages/ServicesPage";
import TestimonialsPage from "./pages/TestimonialsPage";

function AdminIndexRedirect() {
  return <Navigate to="/admin/login" replace />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/inquiry",
    Component: InquiryPage,
  },
  {
    path: "/apply",
    Component: ApplicationPage,
  },
  {
    path: "/team",
    Component: ProfilePage,
  },
  {
    path: "/projects",
    Component: ProjectsGalleryPage,
  },
  {
    path: "/projects/ongoing",
    Component: OngoingProjectsPage,
  },
  {
    path: "/testimonials",
    Component: TestimonialsPage,
  },
  {
    path: "/services",
    Component: ServicesPage,
  },
  {
    path: "/projects/pune",
    Component: PuneProjects,
  },
  {
    path: "/projects/nashik",
    Component: NashikProjects,
  },
  {
    path: "/projects/ahilyanagar",
    Component: AhilyanagarProjects,
  },
  {
    path: "/projects/sambhajinagar",
    Component: SambhajinagarProjects,
  },
  {
    path: '/admin',
    Component: AdminIndexRedirect,
  },
  {
    path: '/admin/login',
    Component: AdminLoginPage,
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      {
        path: 'dashboard',
        Component: AdminDashboardPage,
      },
      {
        path: 'add-project',
        Component: AddProjectPage,
      },
      {
        path: 'manage-projects',
        Component: ManageProjectsPage,
      },
      {
        path: 'edit-project/:id',
        Component: EditProjectPage,
      },
      {
        path: 'uploads',
        Component: UploadsPage,
      },
      {
        path: 'inquiries',
        Component: AdminInquiriesPage,
      },
    ],
  },
]);