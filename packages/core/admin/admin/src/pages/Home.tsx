import React from 'react';
import { AppHeader, Box, Container } from '@botmate/ui';

type HomePageProps = {};
function HomePage({}: HomePageProps) {
  return (
    <Box flex={1}>
      <AppHeader title="Home" />
      <Container maxW="full">12312</Container>
    </Box>
  );
}

export { HomePage };
