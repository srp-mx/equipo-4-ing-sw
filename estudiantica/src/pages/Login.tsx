import { useState } from "react";
import {
  Box,
  Button,
  Field,
  Input,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import LandingPage from './LandingPage';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function regexTest(a:string, b:string){
    let regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    
      if(regexEmail.test(a) && regexPassword.test(b))
        return true;
      
      else{
        alert('el formato de tu email o contrasena es incorrecto');
        return false;
      } 
  }

  const handleLogin = () => {
    if(regexTest(email, password)){

    }
  };

  return (
    <Box 
      minH="100vh" 
      display="flex" 
      justifyContent="center" 
      alignItems="center">
      <Box 
        p={8} 
        boxShadow="lg" 
        borderRadius="md" 
        bg="white" 
        w="350px">
        <VStack spacing={4}>
          <Heading size="lg" color='black'>Login</Heading>

          <Field.Root>
            <Field.Label color = 'black'>Email</Field.Label>
            <Input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </Field.Root>

          <Field.Root>
            <Field.Label color = 'black'>Password</Field.Label>
            <Input
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </Field.Root>

          <Button colorScheme="blue" w="full" onClick={handleLogin}>
            Sign In
          </Button>

          <Text 
            fontSize="sm" 
            color="gray.500">
            Aun no tienes cuenta? <Text as="span" color="blue.500" cursor="pointer">Registrate</Text>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
