import React, { useEffect, useState } from "react";
import { Box, Text, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      if (number.length < 10) {
        alert("Please provide a 10-digit number");
      } else {
        const res = await axios.post(
          `https://staging.fastor.in/v1/pwa/user/register`,
          {
            phone: Number(number),
            dial_code: "+91", // Ensure the dial_code is a string
          }
        );
        if (res.data.status_code === 200) {
          setStatus(true);
        } else {
          alert("Registration failed");
        }
      }
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (status) {
      navigate("/otp", { state: { phoneNumber: number } });
    }
  }, [navigate, number, status]);
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
      width={"25%"}
      margin={"auto"}
      paddingX={"10px"}
    >
      <Text
        fontSize={"26px"}
        fontWeight={700}
        width={"100%"}
        textAlign={"left"}
      >
        Enter Your Mobile Number
      </Text>
      <Text
        fontSize={"16px"}
        fontWeight={500}
        width={"100%"}
        textAlign={"left"}
        color="#8391A1"
      >
        We will send you the 4 digit verification code
      </Text>
      <Input
        placeholder="Enter your mobile number"
        type="number"
        maxLength={10}
        width={"100%"}
        fontSize={"15px"}
        fontWeight={500}
        paddingX={"20px"}
        paddingY="14px"
        borderRadius={"8px"}
        mt="30px"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <Button
        width={"100%"}
        color={"white"}
        background="#FF6D6A"
        fontSize={"15px"}
        fontWeight={600}
        paddingX={"20px"}
        paddingY="14px"
        borderRadius={"8px"}
        mt="30px"
        onClick={handleClick}
      >
        Send the code
      </Button>
    </Box>
  );
};

export default Login;
