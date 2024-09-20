import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewContact from "./pages/NewContact";
import EditContact from "./pages/EditContact";
import DetailsContact from "./pages/DetailsContact";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-contact" element={<NewContact />} />
          <Route path="/edit-contact/:id" element={<EditContact />} />
          <Route path="/details-contact/:id" element={<DetailsContact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
