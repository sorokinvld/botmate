import { Card } from '@atoms';
import { Input } from '@chakra-ui/react';

type FiltersBlacklistWordsProps = {};
function FiltersBlacklistWords({}: FiltersBlacklistWordsProps) {
  return (
    <Card
      title="Blacklist Words"
      description="Filter out messages containing specific words"
      minW="400px"
    >
      <Input placeholder="Add words, comma seperated." />
    </Card>
  );
}

export { FiltersBlacklistWords };
