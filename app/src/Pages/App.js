import { Navigate, Route, Routes } from "react-router-dom";
import Container from "../components/Global/Container/Container";
import AuthContainer from "../contexts/AuthContainer";
import AppHeader from "./Header/AppHeader";
import AddHouse from "./Houses/AddHouse";
import HouseDetail from "./Houses/Detail/HouseDetail";
import HousesOverview from "./Houses/HousesOverview";
import Homepage from "./Home/Homepage";
import Contact from "./Contact/Contact";
import Profiel from "./Profiel/Profiel";
import Footer from "../components/Global/Footer/Footer";
import HousesForRent from "./Houses/HousesForRent";

const App = () => {
  return (
    <AuthContainer>
      <AppHeader />
      <Container>
        <Routes>
          <Route path="/houses" element={<HousesOverview />} />
          <Route path="/te-koop" element={<HousesOverview />} />
          <Route path="/te-huur" element={<HousesForRent />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/houses/:id/*" element={<HouseDetail />} />
          <Route path="/houses/add" element={<AddHouse />} />
          <Route path="/profiel" element={<Profiel />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Container>
      <Footer />
    </AuthContainer>
  );
};

export default App;
