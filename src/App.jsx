import DefiPage from "./pages/DefiPage";
import ProjectsLayout from "./components/layout/ProjectsLayout";
import MergedProjectsPage from "./pages/MergedProjectsPage";

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/islamic-defi" element={<DefiPage />} />
          
          {/* Projects Routes */}
          <Route path="/projects-all" element={<MergedProjectsPage />} />
          
          {/* Other routes */}
        </Routes> 