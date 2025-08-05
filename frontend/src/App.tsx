import Header from "./components/Header";
import Hero from "./components/Hero";
import PCBuilder from "./components/PCBuilder";
import AssemblyService from "./components/AssemblyService";
import PastBuilds from "./components/PastBuild";
import DIYResources from "./components/DIYResources";
import Footer from "./components/Footer";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppContent() {
  const { loading } = useAuth();

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900">

        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="text-white text-xl">Loading...</div>
          </div>
        ) : (
          <>
            <Header />
            <Hero />
            <PCBuilder />
            <AssemblyService />
            <PastBuilds />
            <DIYResources />
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
