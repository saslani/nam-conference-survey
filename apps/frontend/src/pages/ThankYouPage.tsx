import { Container, Stack, Title, Text, Button, Image, Card, Box } from '@mantine/core';
import { ThemeToggle } from '../components/ThemeToggle';

export default function ThankYouPage() {
  return (
    <Container size="sm" py="xl">
      <Card shadow="md" padding="xl" radius="md" withBorder>
        <Box pos="relative">
          <Box pos="absolute" right={-8} top={-8}>
            <ThemeToggle />
          </Box>
          <Stack align="center" gap="xl">
            <Image
              src="https://www.equalexperts.com/wp-content/uploads/2024/10/2024-Logo.svg"
              alt="Equal Experts"
              h={60}
              w="auto"
            />

          <Title order={1} ta="center" c="equalBlue.4">
            Thank You!
          </Title>

          <Text size="lg" ta="center">
            Your feedback has been submitted successfully.
          </Text>

          <Text size="md" c="dimmed" ta="center">
            Your responses will help us improve future conferences. We genuinely
            appreciate you taking the time to share your thoughts.
          </Text>

          <Button
            variant="filled"
            color="equalBlue"
            size="lg"
            component="a"
            href="https://www.equalexperts.com"
          >
            Return to Equal Experts
          </Button>
          </Stack>
        </Box>
      </Card>
    </Container>
  );
}