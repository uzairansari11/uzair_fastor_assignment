import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Text, Grid } from "@chakra-ui/react";
import Card from "./Card";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("ideal");
  const navigate = useNavigate();
  const getDataFromApi = async () => {
    setStatus("loading");
    const token = localStorage.getItem("fosterToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.get(
        `https://staging.fastor.in/v1/m/restaurant`,
        config
      );
      setData(res.data);
      setStatus("ideal");
    } catch (error) {
      alert("API Error:", error);
      setStatus("error");
    }
  };
  useEffect(() => {
    getDataFromApi();
  }, []);

  return (
    <Box paddingX="20px" width={"100%"}>
      <Text fontSize={"26px"} fontWeight={600} textAlign={"left"} mb="10px">
        Popular Ones
      </Text>
      {status === "loading" ? (
        <Box
          width="100vw"
          height="100vh"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Loading />
        </Box>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(3, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap="20px"
          justifyContent="center"
        >
          {data?.map((rest) => (
            <Box
              key={rest.restaurant_id}
              onClick={() => navigate(`/details/${rest.restaurant_id}`)}
            >
              <Card data={rest} />
            </Box>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
