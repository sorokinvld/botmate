import { Box, Button, Container, FormControl, Heading, Input, Stack } from '@botmate/ui';
import { useForm } from 'react-hook-form';
import { useHttp } from '@botmate/helper-plugin';

function RegisterPage() {
  const form = useForm();
  const loginApi = useHttp();

  const handleSubmit = (data: any) => {
    loginApi
      .post('/api/auth/register', data)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('token', res.token);
        window.location.href = '/';
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Container py={12} maxW="md">
      <Box bg="surface" borderWidth="1px" p={4} rounded="lg">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Stack spacing={4}>
            <Heading size="lg">Register</Heading>
            <FormControl>
              <Input {...form.register('name')} type="name" placeholder="Name" />
            </FormControl>
            <FormControl>
              <Input {...form.register('email')} type="email" placeholder="Email" />
            </FormControl>
            <FormControl>
              <Input {...form.register('password')} type="password" placeholder="Password" />
            </FormControl>

            <Button variant="brand" type="submit">
              Register
            </Button>
          </Stack>
        </form>

        <Box mt={4} textAlign="center">
          <Button variant="link" as="a" href="/login">
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterPage;
