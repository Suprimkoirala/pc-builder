import Header from "./components/Header";
import Hero from "./components/Hero";
import PCBuilder from "./components/PCBuilder";
import AssemblyService from "./components/AssemblyService";
import PastBuilds from "./components/PastBuild";
// import DIYResources from "./components/DIYResources";
import Guide from "./components/Guide";
import DIYResourcesPage from "./components/DIYResourcesPage";
import Footer from "./components/Footer";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useState } from "react";

function AppContent() {
  const { loading } = useAuth();
  const [currentSection, setCurrentSection] = useState('home');

  const renderSection = () => {
    switch (currentSection) {
      case 'guide':
        return <Guide />;
      case 'diy-resources':
        return <DIYResourcesPage />;
      case 'home':
      default:
        return (
          <>
            <Hero onSectionChange={setCurrentSection} />
            <PCBuilder />
            <AssemblyService />
            <PastBuilds />
          </>
        );
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="text-white text-xl">Loading...</div>
          </div>
        ) : (
          <>
            <Header onSectionChange={setCurrentSection} currentSection={currentSection} />
            {renderSection()}
            <Footer />
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
