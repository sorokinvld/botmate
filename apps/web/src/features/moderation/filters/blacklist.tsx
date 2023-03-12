import { Card } from '@atoms';
import {
  Button,
  HStack,
  Input,
  Spacer,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';
import { useFilters } from './hook';

type FiltersBlacklistWordsProps = {};
function FiltersBlacklistWords({}: FiltersBlacklistWordsProps) {
  const { form, isSaving, saveData } = useFilters({ type: 'words' });

  return (
    <Card
      title="Blacklist Words"
      description="Filter out messages containing specific words"
      action={
        <Button isLoading={isSaving} variant="solid" onClick={saveData}>
          Save
        </Button>
      }
    >
      <Stack spacing={4}>
        <HStack>
          <Text size="sm">Warn user on violation</Text>
          <Spacer />
          <Switch {...form.register('warn_user')} />
        </HStack>

        <Input
          placeholder="Add words, comma seperated."
          {...form.register('words')}
        />
      </Stack>
    </Card>
  );
}

export { FiltersBlacklistWords };
