import { useBots, useService } from '@botmate/helper-plugin';
import moment from 'moment';
import {
  AppHeader,
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
} from '@botmate/ui';
import { useEffect, useState } from 'react';
import { TbPlus } from 'react-icons/tb';
import { Link } from 'react-router-dom';

function ScriptsPage() {
  const { activeBot } = useBots();
  const [scripts, setScripts] = useState<any[]>([]);
  const scriptsService = useService('scripts');

  useEffect(() => {
    scriptsService
      .runService('script.find', {
        bot: activeBot._id,
      })
      .then((data) => {
        setScripts(data);
      });
  }, []);

  return (
    <>
      <AppHeader
        title="Scripts"
        actions={
          <>
            <Spacer />
            <Link to="/scripts/create">
              <Button variant="brand" leftIcon={<TbPlus />}>
                Create Script
              </Button>
            </Link>
          </>
        }
      />

      <Container maxW="7xl" p={4}>
        <SimpleGrid columns={{ base: 1, lg: 4 }} spacing={4}>
          {scripts.map((script) => {
            // show ago
            const updatedAt = moment(script.updatedAt).fromNow();
            return (
              <Box key={script._id} p={4} bg="surface" borderWidth="1px" rounded="lg">
                <Heading size="md">{script.name}</Heading>
                <Text color="GrayText">edited {updatedAt}</Text>
                <ButtonGroup mt={4} size="sm">
                  <Button variant="brand">Edit</Button>
                  <Button variant="danger">Delete</Button>
                </ButtonGroup>
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
    </>
  );
}

export default ScriptsPage;
