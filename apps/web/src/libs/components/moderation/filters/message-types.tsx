import { Card } from '@/libs/ui';
import { Stack, HStack, Spacer, Text } from '@chakra-ui/react';

const MessageTypes = [
  {
    label: 'Links',
    exceptionExample: 'www.domain.com',
  },
  {
    label: 'Mentions',
  },
  {
    label: 'Emojis',
  },
  {
    label: 'Files',
    exceptionExample: 'png',
    options: {
      limit_file_size: {
        label: 'Limit file size',
        type: 'checkbox',
      },
    },
  },
];

type FilterMessageTypesProps = {};
function FilterMessageTypes({}: FilterMessageTypesProps) {
  return (
    <Card
      title="Message Type"
      description="Configure what must be filtered"
      minW="300px"
    >
      <Stack>
        {MessageTypes.map(({ label, exceptionExample }) => (
          <HStack key={label}>
            <Text size="sm">{label}</Text>
            <Spacer />
            <Text
              userSelect="none"
              cursor="pointer"
              fontWeight="semibold"
              _hover={{
                opacity: 0.8,
              }}
              transition="opacity 0.2s"
            >
              Allow all
            </Text>
          </HStack>
        ))}
      </Stack>
    </Card>
  );
}

export { FilterMessageTypes };
