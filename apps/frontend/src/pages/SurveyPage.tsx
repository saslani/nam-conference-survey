import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Stack,
  Title,
  Button,
  Image,
  Alert,
  Loader,
  Center,
  Text,
  Box,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { QuestionRenderer } from '../components/QuestionRenderer';
import { ThemeToggle } from '../components/ThemeToggle';
import { SurveyFormState } from '../types/survey';
import { submitSurvey } from '../api/survey';
import { SURVEY_QUESTIONS, TOTAL_QUESTIONS } from '../config/survey-questions';

export default function SurveyPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<SurveyFormState>({
    q1OverallRating: null,
    q1Comment: '',
    q2ReturnIntent: null,
    q2Comment: '',
    q3CoworkingEffectiveness: null,
    q3Comment: '',
    q4ConnectionTypes: [],
    q4ConnectionOther: '',
    q4Comment: '',
    q5ConnectionDepth: null,
    q5Comment: '',
    q6LearningValue: null,
    q6Comment: '',
    q7FutureTopics: '',
    q8SaturdayWorth: null,
    q8Comment: '',
    q9PreConferenceCommunication: null,
    q9Comment: '',
    q10AccommodationsVenue: null,
    q10Comment: '',
    q11SessionRankings: {},
    q12ConferenceLength: '',
    q12Comment: '',
    q13ComparisonToPD: null,
    q13Comment: '',
    q14LikedMost: '',
    q15AdditionalFeedback: '',
    q16Improvements: '',
    q16Comment: '',
    q17FeedbackConfidence: [],
    q17FeedbackOther: '',
    q18EmploymentStatus: '',
    q19Name: '',
    q19Location: '',
  });

  const updateField = <K extends keyof SurveyFormState>(
    field: K,
    value: SurveyFormState[K]
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateAnswered = (): number => {
    let count = 0;

    if (formData.q1OverallRating !== null) count++;
    if (formData.q2ReturnIntent !== null) count++;
    if (formData.q3CoworkingEffectiveness !== null) count++;
    if (formData.q4ConnectionTypes.length > 0) count++;
    if (formData.q5ConnectionDepth !== null) count++;
    if (formData.q6LearningValue !== null) count++;
    if (formData.q7FutureTopics.trim()) count++;
    if (formData.q8SaturdayWorth !== null) count++;
    if (formData.q9PreConferenceCommunication !== null) count++;
    if (formData.q10AccommodationsVenue !== null) count++;
    if (Object.keys(formData.q11SessionRankings).length > 0) count++;
    if (formData.q12ConferenceLength) count++;
    if (formData.q13ComparisonToPD !== null) count++;
    if (formData.q14LikedMost.trim()) count++;
    if (formData.q15AdditionalFeedback.trim()) count++;
    if (formData.q16Improvements) count++;
    if (formData.q17FeedbackConfidence.length > 0) count++;
    if (formData.q18EmploymentStatus) count++;
    if (formData.q19Name.trim() || formData.q19Location.trim()) count++;

    return count;
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      await submitSurvey(formData);

      notifications.show({
        title: 'Success!',
        message: 'Your survey has been submitted successfully',
        color: 'green',
        icon: <IconCheck />,
      });

      navigate('/thanks');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit survey';
      setError(message);
      notifications.show({
        title: 'Submission Error',
        message,
        color: 'red',
        icon: <IconAlertCircle />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <Container size="md" py="xl">
        <Center h={400}>
          <Stack align="center" gap="md">
            <Loader color="equalBlue" size="lg" />
            <Text size="sm" c="dimmed">
              Submitting your survey...
            </Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Box pos="relative">
          <Box pos="absolute" right={0} top={0}>
            <ThemeToggle />
          </Box>
          <Stack align="center" gap="md">
            <Image
              src="https://www.equalexperts.com/wp-content/uploads/2024/10/2024-Logo.svg"
              alt="Equal Experts"
              h={60}
              w="auto"
            />
            <Title order={1} ta="center" c="equalBlue.4">
              NAM Conference Survey
            </Title>
            <Text size="lg" ta="center" c="dimmed">
              Your feedback helps us improve future conferences. All questions are optional.
            </Text>
          </Stack>
        </Box>

        {/* Progress Indicator */}
        <ProgressIndicator answered={calculateAnswered()} total={TOTAL_QUESTIONS} />

        {/* Error Alert */}
        {error && (
          <Alert
            icon={<IconAlertCircle />}
            title="Submission Error"
            color="red"
            withCloseButton
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        {/* Survey Questions */}
        {SURVEY_QUESTIONS.map((config) => (
          <QuestionRenderer
            key={config.id}
            config={config}
            formData={formData}
            updateField={updateField}
          />
        ))}

        {/* Submit Button */}
        <Button
          size="lg"
          color="equalBlue"
          onClick={handleSubmit}
          loading={isSubmitting}
          fullWidth
        >
          Submit Survey
        </Button>

        <Text size="sm" c="dimmed" ta="center">
          All questions are optional. Submit with as many or as few answers as you like.
        </Text>
      </Stack>
    </Container>
  );
}
