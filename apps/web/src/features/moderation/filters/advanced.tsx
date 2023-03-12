import { Card } from '@atoms';
import { Button, HStack, Spacer, Stack, Switch, Text } from '@chakra-ui/react';
import { useFilters } from './hook';

type FiltersBlacklistWordsProps = {};
function FiltersAdvanced({}: FiltersBlacklistWordsProps) {
  const { form, isSaving, saveData } = useFilters({ type: 'advanced' });

  return (
    <Card
      title="Advanced Filtering"
      description="Remove duplicates, delete forwards etc."
      action={
        <Button isLoading={isSaving} variant="solid" onClick={saveData}>
          Save
        </Button>
      }
    >
      <Stack>
        <HStack>
          <Text>Delete every forwaded message</Text>
          <Spacer />
          <Switch {...form.register('delete_forwarded_message')} />
        </HStack>
        <HStack>
          <Text>Delete duplicate message</Text>
          <Spacer />
          <Switch {...form.register('delete_duplicate_message')} />
        </HStack>
      </Stack>
    </Card>
  );
}

export { FiltersAdvanced };
