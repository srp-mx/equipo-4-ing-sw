import { useState } from 'react'
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  Image, 
  Flex,
  Input,
  Position,  
} from '@chakra-ui/react';

export default function LandingPage() {

  return (
    <Box backgroundColor="black" minH="100vh" p={6}>

      {/* Encabezado */}
      <Flex justify="space-between" align="center" mb={6}>
          <Heading as="h1" size="xl" color="white">Estudiantica</Heading>
        </Flex>

        {/* menu-personaje */}
        <Box
          position="fixed"
          left = '0'
          top = '50px'
          w = '100px'
          h = '40vh'
          display = 'flex'
          flexDirection = 'column'
          px={4}
          py={4}
          backgroundColor = 'white'
          borderRadius = 'md'
          marginTop = '50px'
          marginLeft = '20px'
          justifyContent = 'space-between'
        >
          <Button borderStyle = 'none' 
                  variant = 'ghost'
                  color = 'black'
                  >Button 1</Button>
          <Button borderStyle = 'none' 
                  variant = 'ghost' 
                  color = 'black'
                  >Button 2</Button>
          <Button borderStyle = 'none' 
                  variant = 'ghost' 
                  color = 'black'
                  >Button 3</Button>
          <Button borderStyle = 'none' 
                  variant = 'ghost' 
                  color = 'black'
                  >Button 4</Button>
          <Button borderStyle = 'none' 
                  variant = 'ghost' 
                  color = 'black'
                  >Button 5</Button>
        </Box>

        {/* menu-secundario */}
        <Box
          position= 'fixed'
          left = '0'
          bottom = '0'
          w = '20%'
          h = '40vh'
          display = 'flex'
          flexDirection = 'column'
          py = {4} 
          px = {4} 
          marginTop = '50px'
          marginLeft = '20px'
          justifyContent = 'space-between'
        >
          <Flex
              direction = 'column'
              h = 'full' 
              gap = {3}
              mt = {2} 
              mb = {2} 
            >
          <Button backgroundColor='white'
                  color = 'black'
                  flex = {1}
                  width = 'full'
                  >Button 1</Button>
          <Button backgroundColor = 'white' 
                  color = 'black'
                  flex = {1}
                  width = 'full'
                  >Button 2</Button>
          <Button backgroundColor = 'white' 
                  color = 'black'
                  flex = {1}
                  width = 'full'
                  >Button 3</Button>
          </Flex>
        </Box>

        {/* personaje y caracteristicas */}
        <Box
          position = 'absolute'
          left={{base: '100px', md: '200px', lg: '400px'}}
          width = '40vh'
          display = 'flex'
          flexDirection = 'column'
          px = {4}
        >

          <Box 
            as = 'h1' 
            size = 'xl' 
            color = 'white'
            fontSize = '50px'
            position = 'absolute'
            top = '0' 
          >erika</Box>
          
          <Box 
            as = 'h1' 
            size = 'xl' 
            color = 'white'
            fontSize = '50px'
            position = 'absolute'
            top = '70px' 
          >exp.</Box>

          <Image
          src = 'public/laios.webp'
          position = {{ base: 'static', md: 'absolute' }}
          width = {{ base: '40%', md: '60%' }}
          marginTop = '170px'
          />
        </Box>

        {/* menu principal */}
          <Box
            position = 'fixed'
            right = '0'
            top = '0'
            w = '35%'
            h = '100vh'
            display = 'flex'
            flexDirection = 'column'
            py = {4}
            px = {4}
          >
            <Flex
              direction = 'column'
              h = 'full' 
              gap = {3}
              mt = {2} 
              mb = {2} 
            >
              <Button
                backgroundColor = 'red'
                fontSize = '30px'
                color = 'white'
                flex = {1}
                width = 'full'
                colorScheme = 'whiteAlpha'
                mt = {2}
              >
                Tareas
              </Button>

              <Button
                backgroundColor = 'blue'
                fontSize = '30px'
                color = 'white'
                flex = {1}
                width = 'full'
                colorScheme = 'whiteAlpha'
              >
                Horario
              </Button>

              <Button
                backgroundColor = 'green'
                fontSize = '30px'
                color = 'white'
                flex = {1}
                width = 'full'
                colorScheme = 'whiteAlpha'
              >
                Asignaturas
              </Button>

              <Button
                backgroundColor = 'orange'
                fontSize = '30px'
                color = 'white'
                flex = {1}
                width = 'full'
                colorScheme = 'whiteAlpha'
                mb = {2} 
              >
                Calendario
              </Button>
            </Flex>
          </Box>
      </Box>
  );
}
