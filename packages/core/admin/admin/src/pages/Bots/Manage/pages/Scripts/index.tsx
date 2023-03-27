import { AppHeader, Box, Button, HStack, Spacer } from '@botmate/ui';
import { TbPlus } from 'react-icons/tb';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function ManageBotScriptsPage() {
  const nav = useNavigate();
  const params = useParams();
  const botId = params.botId as string;

  return (
    <Box flex={1}>
      <AppHeader
        title="Scripts"
        actions={
          <HStack>
            <Spacer />
            <Button
              size="sm"
              leftIcon={<TbPlus />}
              variant="brand"
              onClick={() => nav(`/bots/${botId}/scripts/create`)}
            >
              Add script
            </Button>
          </HStack>
        }
      />
    </Box>
  );
}

export default ManageBotScriptsPage;
