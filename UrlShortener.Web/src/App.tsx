import AppLayout from "@/AppLayout";
import HomePage from "@/pages/Homepage";
import UrlsPage from "@/pages/UrlsPage";
import { Route } from "react-router";
import { BrowserRouter, Routes } from "react-router";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/urls" element={<UrlsPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
