import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Input, Button, Text } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contextApi/AuthContextProvider";
const OtpInput = () => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location?.state?.phoneNumber || "";
  const { auth, login } = useContext(AuthContext);


  const handleInputChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleClick = async () => {
    if (otp.join("") === "123456") {
      try {
        const res = await axios.post(
          `https://staging.fastor.in/v1/pwa/user/login`,
          {
            phone: Number(phoneNumber),
            otp: 123456,
            dial_code: "+91",
          }
        );
        if (res.status === 200) {
          login(res.data.data.token);
        } else {
          alert("Login failed");
        }
      } catch (error) {
        alert("Something went wrong");
      }
    } else {
      alert("Incorrect OTP");
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [auth.isAuthenticated, navigate]);
  return (
    <Box>
      <Box
        display={"flex"}
        flexDir={"column"}
        height="100vh"
        justifyContent={"center"}
        width={"25%"}
        margin="auto"
      >
        <Text fontSize={"26px"} fontWeight={700} textAlign={"left"}>
          OTP Verification
        </Text>
        <Text
          fontSize={"16px"}
          fontWeight={500}
          color="#838BA1"
          textAlign={"left"}
        >
          Enter the verification code we just sent on your Mobile Number.
        </Text>
        <Box
          display="flex"
          alignItems="center"
          width={"100%"}
          justifyContent={"space-between"}
          mt="20px"
        >
          {[...Array(6)].map((_, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={otp[index]}
              width="49px"
              height="60px"
              fontSize="28px"
              textAlign="center"
              maxLength={1}
              borderWidth="1px solid #E8ECF4"
              borderRadius="8px"
              type="tel"
              onChange={(e) => handleInputChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
            />
          ))}
        </Box>
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
          Verify
        </Button>
        <Text fontSize={"15px"} fontWeight={500} color="#1E232C" mt="20px">
          Didn’t received code?{" "}
          <span
            style={{
              color: "#5574c6",
              fontSize: "15px",
              fontWeight: "700",
            }}
          >
            Resend
          </span>
        </Text>
      </Box>
    </Box>
  );
};

export default OtpInput;
