import { Route, Routes, useParams } from "react-router-dom";
import Loading from "../../../components/Global/Loading/Loading";
import EditHouse from "../EditHouse";
import HouseInfo from "./HouseInfo";
import useFetch from "../../../hooks/useFetch";

const HouseDetail = () => {
  const { id } = useParams();

  const {
    isLoading,
    error,
    invalidate,
    data: houseData,
  } = useFetch(`/houses/${id}`);

  const { data: officeData } = useFetch(`/offices/${houseData?.office}`);

  // const { data: addressesData, error: addressesError } = useFetch(
  //   `/addresses/${houseData?.address_Id}`
  // );

  const handleUpdate = () => {
    invalidate();
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route
        path="edit"
        element={
          <EditHouse
            houses={houseData}
            // addresses={addressesData}
            onUpdate={handleUpdate}
          />
        }
      />
      <Route
        index
        element={
          <HouseInfo
            house={houseData}
            office={officeData}
            // address={addressesData}
            // addressesError={addressesError}
          />
        }
      />
    </Routes>
  );
};

export default HouseDetail;
