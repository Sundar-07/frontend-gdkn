import { Layout } from "./components/Layout";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ProfileContent } from "./pages/ProfileContent";
import CustomerProvider from "./contexts/CustomerContext";

function App() {
  return (
    <div>
      <CustomerProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<ProfileContent />} />
            </Routes>
          </Layout>
        </Router>
      </CustomerProvider>
    </div>
  );
}

export default App;
