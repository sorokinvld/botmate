import { Card } from '@/libs/ui';
import { HStack, Spacer, Stack, Switch, Text } from '@chakra-ui/react';

type FiltersBlacklistWordsProps = {};
function FiltersAdvanced({}: FiltersBlacklistWordsProps) {
  return (
    <Card
      title="Advanced Filtering"
      description="Remove duplicates, delete forwards etc."
      minW="400px"
    >
      <Stack>
        <HStack>
          <Text>Delete every forwaded message</Text>
          <Spacer />
          <Switch />
        </HStack>
        <HStack>
          <Text>Delete duplicate message</Text>
          <Spacer />
          <Switch />
        </HStack>
      </Stack>
    </Card>
  );
}

export { FiltersAdvanced };
