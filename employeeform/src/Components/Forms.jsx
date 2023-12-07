import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Heading,
  useToast,
  Text
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const DestinationForm =  () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);

  const [course, setCourse] = useState("");
  const [passingyear, setPassingYear] = useState("");
  const [additionaldetail, setAdditionalDetails] = useState("");

  
  const toast = useToast();
  const navigate = useNavigate();

  const [showInput, setShowInput] = useState(false);
  const [showSecondInput, setShowSecondInput] = useState(false);

  const handleButtonClick = () => {
    setShowInput(true);
  };

  const RemoveInput = () => {
    setShowInput(false);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      phone: phone,
      course: course,
      passingyear: passingyear,
      additionaldetail: additionaldetail
    };
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/data",
        data
      );
      console.log("response",response);
  
    if (response.status === 201) {
        // Handle successful response
        
        toast({
          title: "Form submitted successfully",
          status: "success",
         description:" data is stored in json format",
          duration: 3000,
          isClosable: true
        });
       
        console.log("Form submitted successfully");
      } else {
        // Handle error response
        toast({
          title: "Form submission failed",
          status: "error",
          duration: 3000,
          isClosable: true
        });
        console.log("Form submission failed");
      }
    } catch (error) {
      // Handle network error
      
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true
      });
      console.log("Error:", error);
    }

    // Reset the form after submission
    // setName("");
    // setEmail("");
    // setPhone("");
    // setCourse("");
    // setPassingYear("");
    // setAdditionalDetails("");
  };
  // let netBudget =  travelers*budget;
  return (
    
    <Box maxWidth="400px" mx="auto" boxShadow='dark-lg' p="5" rounded='md'  mt='4'mb='4' w='500%'>
        <Heading m={5}color="teal"textShadow='1px 1px black'>   Dudar Employee Form </Heading>
        <Text fontSize={20} m={5} >Contact us to plan your next journy!</Text>
      <form onSubmit={handleSubmit}>
        <FormControl mt={4}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
           
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
           
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="number"
          
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel fontSize='lg'>Education</FormLabel>
          <FormLabel fontSize='sm'>Bachelor's course name</FormLabel>
          <Input
            type="text"
        
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
          <FormLabel fontSize='sm'>Passout Year of Graduation</FormLabel>
          <Input
            type="text"
           
            value={passingyear}
            onChange={(e) => setPassingYear(e.target.value)}
            required
          />

         {showInput && (
         
          <div >
            <FormLabel fontSize='sm'>Additional Details</FormLabel>
            <div style={{ display: 'flex'}}>
            <Input
            type="text"
            id="Additional details_id"
            value={additionaldetail}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            required
          />
           
            <Button onClick={RemoveInput}>Remove</Button>
            </div>
           
          </div>
         )}
        {showSecondInput && (
          <input type="text" id="secondInputBox" style={{ marginTop: '10px' }}/>
         )}

        <Button colorScheme="teal"h={8} mt={4}  style={{marginRight:"230px"}}  onClick={handleButtonClick}> + Add More
        </Button>
          
        </FormControl>

        

       
        <Button id="submit_id" type="submit" colorScheme="teal" mt={4} w={360}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default DestinationForm;
