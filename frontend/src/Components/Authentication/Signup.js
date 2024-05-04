import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
// import { warning } from 'framer-motion';
import React, { useState } from 'react'
import axios from "axios";
import { useHistory } from 'react-router-dom';


const Signup = () => {
    const [name, setName] = useState();
    const [show, setShow] = useState(false);
    const [Email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [pic, setPic] = useState();
    const [loding, setLoding] = useState(false);
    const handClick = () => setShow(!show);
    const toast = useToast();
    const history = useHistory();


    const postDetails = (pics) => {
        setLoding(true);
        if (pics === undefined) {
            toast({
                title: 'Please Select an Image. ',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "shyam02");
            fetch("https://res.cloudinary.com/shyam02/image/upload/images/", {
                method: "post",
                mode: 'no-cors',//cors was blocking request ad response of frontend and backend
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    setLoding(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoding(false);
                });
        }
        else {
            toast({
                title: 'Please Select an Image. ',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoding(false);
            return;
        }
    };

    const submitHandler = async () => {
        setLoding(true);

        if (!name || !Email || !password || !confirmpassword) {
            toast({
                title: "Please fill all the fields !! ",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoding(false);
            return;
        }
        if (password !== confirmpassword) {
            toast({
                title: "password does not match !! ",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post("/api/user/signup",
                { name, Email, password, pic, },
                config);


            toast({
                title: "Registration successful ",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoding(false);
            history.push("/chats");
        } catch (error) {
            toast({
                title: "Error occured !!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoding(false);
        }
    };

    return <VStack spacing={'5px'} color={'black'}>
        <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)}></Input>
        </FormControl>
        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)}></Input>
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input type={show ? "text" : "password"}
                    placeholder='Enter Your Password'
                    onChange={(e) => setPassword(e.target.value)}>
                </Input>
                <InputRightElement width='4.5rem'>
                    <Button h={'1.75rem'} size="sm" onClick={handClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size={"md"}>
                <Input type={show ? "text" : "password"}
                    placeholder='Confirm Password'
                    onChange={(e) => setConfirmpassword(e.target.value)}>
                </Input>
                <InputRightElement width='4.5rem'>
                    <Button h={'1.75rem'} size="sm" onClick={handClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id="pic" >
            <FormLabel>Upload Your Picture</FormLabel>
            <Input
                type='file'
                p={1.5}
                accept='image/*'
                onChange={(e) => postDetails(e.target.files[0])}>

            </Input>
        </FormControl>
        <Button colorScheme='blue'
            width="100%"
            color="white"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={loding}
        >Signup
        </Button>
    </VStack>
};

export default Signup