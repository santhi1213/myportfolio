// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import { DataProvider } from './contexts/DataContext';
// import ProtectedRoute from './components/ProtectedRoute';
// import AdminPanel from './components/admin/AdminPanel';
// import Header from './components/Header';
// import Hero from './components/Hero';
// import About from './components/About';
// import Skills from './components/Skills';
// import Projects from './components/Projects';
// import Contact from './components/Contact';

// function App() {
//   return (
//     <AuthProvider>
//       <DataProvider>
//         <Router>
//           <Routes>
//             <Route path="/" element={<Portfolio />} />
//             <Route 
//               path="/admin" 
//               element={
//                 <ProtectedRoute>
//                   <AdminPanel />
//                 </ProtectedRoute>
//               } 
//             />
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </Router>
//       </DataProvider>
//     </AuthProvider>
//   );
// }

// const Portfolio = () => {
//   return (
//     <div className="min-h-screen bg-gray-900">
//       <Header />
//       <main>
//         <Hero />
//         <About />
//         <Skills />
//         <Projects />
//         <Contact />
//       </main>
      
//       {/* Footer */}
//       <footer className="bg-gray-900 border-t border-gray-800 py-8">
//         <div className="container mx-auto px-6 text-center">
//           <p className="text-gray-400">
//             © 2025 Your Name. Built with React & Tailwind CSS.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPanel from './components/admin/AdminPanel';
import AdminLogin from './components/admin/AdminLogin';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 Your Name. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;