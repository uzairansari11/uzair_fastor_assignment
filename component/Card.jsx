import { Box, Image, Text, Wrap } from "@chakra-ui/react";
import { BiSolidOffer } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

const Card = ({ data }) => {
  const maxCuisinesToShow = 1;
  const cuisinesToDisplay = data.cuisines.slice(0, maxCuisinesToShow);
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      display="flex"
      shadow={"sm"}
      flexDirection="row"
      alignItems={"center"}
      paddingX="10px"
      columnGap={"10px"}
      justifyContent={"space-between"}
    >
      <Image
        src={data.images[0].url}
        alt={data.restaurant_name}
        boxSize="100px"
        objectFit="cover"
        borderRadius={"10px"}
      />

      <Box>
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems={"flex-start"}
          w="100%"
        >
          <Text fontSize="md" fontWeight="semibold">
            {data.restaurant_name.substring(0, 20)}
          </Text>
          <Wrap>
            {cuisinesToDisplay.map((ele) => (
              <Text
                key={ele.cuisine_id}
                fontSize="md"
                fontWeight="semibold"
                mr="2"
                color="gray.600"
              >
                {ele.cuisine_name}
              </Text>
            ))}
          </Wrap>
          <Text fontSize="xs" fontWeight="semibold">
            {data?.location?.city_name || "City N/A"}
          </Text>
        </Box>

        <Text
          fontSize="sm"
          color="orange.500"
          display="flex"
          alignItems="center"
          columnGap={"4px"}
        >
          <BiSolidOffer color="orange.500" /> 4 Offers Trending
        </Text>

        <Box
          display="flex"
          justifyContent="space-between"
          w="100%"
          alignItems={"center"}
          gap="10px"
        >
          <Box
            display="flex"
            alignItems={"flex-start"}
            flexDirection={"column"}
          >
            <Box display="flex" alignItems={"center"} columnGap={"4px"}>
              <FaStar color="black" />
              <Text fontSize="md" fontWeight="semibold">
                {data.rating.restaurant_avg_rating}
              </Text>
            </Box>
            <Text fontSize="sm" color="gray.500">
              Popularity
            </Text>
          </Box>
          <Box
            display="flex"
            flexDirection={"column"}
            alignItems={"flex-start"}
          >
            <Text fontSize="sm" fontWeight="semibold">
              {data.currency.symbol}
              {data.avg_cost_for_two}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Cost of two
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
