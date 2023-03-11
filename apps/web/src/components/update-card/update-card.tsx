import { useBotMateControllerGetVersionQuery } from '@api';
import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { HiInformationCircle } from 'react-icons/hi';

type UpdateCardProps = {};
function UpdateCard({}: UpdateCardProps) {
  const [latestVersion, setLatestVersion] = useState<{
    version: string;
    isLoading: boolean;
  }>({
    version: '',
    isLoading: true,
  });
  const { data: version } = useBotMateControllerGetVersionQuery();

  useEffect(() => {
    fetch(`https://registry.npmjs.org/botmate/latest`)
      .then((res) => res.json())
      .then((data) => {
        setLatestVersion({
          version: data.version,
          isLoading: false,
        });
      });
  }, []);

  if (latestVersion.isLoading) {
    return null;
  }

  if (version?.version === latestVersion.version) {
    return null;
  }

  return (
    <Box p={4} borderWidth="1px" rounded="lg">
      <HStack alignItems="flex-start">
        {/* <Box fontSize={16} mt={1}>
          <HiInformationCircle />
        </Box> */}

        <Box>
          {/* <Text fontFamily="Open Sans">New update available!</Text> */}
          <Heading size="sm" fontWeight="normal">
            New update available!
          </Heading>
          <Text opacity={0.6} fontSize={12} mt={1}>
            <b>v{latestVersion.version}</b> is now available.
          </Text>

          <Button mt={2} size="xs" variant="solid">
            Update
          </Button>
        </Box>
      </HStack>
    </Box>
  );
}

export { UpdateCard };
