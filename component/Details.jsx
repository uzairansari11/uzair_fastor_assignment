import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Image, Box, Text, Flex, Icon } from "@chakra-ui/react";
import Loading from "./Loading";
import { FaStar } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";

const Details = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const [status, setStatus] = useState("ideal");
  const token = localStorage.getItem("fosterToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getDataFromApi = async () => {
    setStatus("loading");
    try {
      const res = await axios.get(
        `https://staging.fastor.in/v1/m/restaurant`,
        config
      );
      if (res.data) {
        let foundData = res.data.find((ele) => ele.restaurant_id === params.id);
        setData(foundData);
        setStatus("ideal");
      }
    } catch (error) {
      alert("API Error:", error);
      setStatus("error");
    }
  };

  useEffect(() => {
    getDataFromApi();
  }, []);

  return (
    <Box width="80%" mx="auto">
      {status === "loading" ? (
        <Loading />
      ) : (
        <Box mx="auto">
          <Image
            src={data?.images?.[0]?.url}
            borderRadius="md"
            width="60%"
            mx="auto"
          />

          <Box mt={4} width="60%"  mx="auto">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Text
                  color="black"
                  fontSize="xl"
                  fontWeight="bold"
                  textAlign="left"
                >
                  {data?.restaurant_name}
                </Text>
                <Text color="gray.600" fontSize="md" >
                  {data?.location?.location_locality},{" "}
                  {data?.location?.city_name}
                </Text>
              </Box>
              <Box display="flex" gap="10px" alignItems="center">
                <Icon as={FaStar} />
                <Text
                  ml={1}
                  fontSize="sm"
                  fontWeight="semibold"
                  textAlign="left"
                >
                  {data?.rating?.restaurant_avg_rating}
                </Text>
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              color="gray.600"
              mt={2}
                              mb={4}
                              justifyContent={'flex-start'}
            >
              <Text  fontSize="sm" color="orange.500" textAlign="left">
                <Icon as={BiSolidOffer} color="orange.500" />4 Offers Trending
              </Text>
            </Box>

            <Text color="gray.600" mt={4} textAlign="left">
              Our delicate vanilla cake swirled with chocolate and filled with
              mocha chocolate chip cream and a layer of dark chocolate ganache
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Details;
