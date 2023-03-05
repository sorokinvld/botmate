import React from 'react';
import { Button, Center } from '@chakra-ui/react';

// todo: make a nice ui
function NotFound() {
  return (
    <Center h="100vh">
      <Button
        onClick={() => {
          window.location.href = '/';
        }}
      >
        404. Reload
      </Button>
    </Center>
  );
}

export default NotFound;
