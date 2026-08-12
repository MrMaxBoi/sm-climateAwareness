import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { ErrorState, LoadingState } from "./AsyncState";

const QuizRunner = ({ type, phase }) => {
  const [quiz, setQuiz] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadQuiz = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setQuiz(await api.getActiveQuiz(type, phase));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [phase, type]);

  useEffect(() => {
    loadQuiz();
  }, [loadQuiz]);

  if (loading) return <LoadingState label="Loading the active quiz…" />;
  if (error) return <ErrorState message={error} onRetry={loadQuiz} />;
  if (!quiz) return null;

  if (quiz.completed && !result) {
    return (
      <Stack bg="white" borderRadius="3xl" borderWidth="1px" borderColor="blackAlpha.100" p={{ base: 6, md: 9 }} spacing={5} textAlign="center">
        <Text color="brand.600" fontWeight="800">Already completed</Text>
        <Heading size="lg">You have submitted this {quiz.type === "assessment" ? `${quiz.assessmentPhase}-assessment` : quiz.type}.</Heading>
        <Text color="gray.600">Your saved result is available on the progress page.</Text>
        <Button as={Link} to="/progress" colorScheme="green">View my progress</Button>
      </Stack>
    );
  }

  if (result) {
    return (
      <Stack bg="white" borderRadius="3xl" borderWidth="1px" borderColor="blackAlpha.100" p={{ base: 6, md: 10 }} spacing={6} textAlign="center">
        <Text color="brand.600" fontWeight="800">{quiz.type === "assessment" ? "Assessment complete" : "Quiz complete"}</Text>
        <Heading as="h2" size="2xl">{result.score}/{result.total}</Heading>
        <Text color="gray.600">Your {result.percentage}% result is now saved securely with your anonymous participant ID.</Text>
        <Progress value={result.percentage} colorScheme="green" borderRadius="full" />
        <Stack spacing={3} textAlign="left">
          {result.answers.map((answer, index) => (
            <Box key={answer.questionKey} bg={answer.isCorrect ? "green.50" : "orange.50"} borderRadius="xl" p={4}>
              <Text fontWeight="800" mb={1}>Question {index + 1}: {answer.isCorrect ? "Correct" : "Review this topic"}</Text>
              <Text color="gray.700" fontSize="sm" lineHeight="1.6">{answer.explanation}</Text>
            </Box>
          ))}
        </Stack>
        <Button as={Link} to="/progress" colorScheme="green">View my progress</Button>
      </Stack>
    );
  }

  const question = quiz.questions[questionIndex];
  const isAssessment = quiz.type === "assessment";

  const chooseAnswer = async (optionIndex) => {
    if (selectedAnswer !== null || submitting) return;
    setSelectedAnswer(optionIndex);
    setAnswers((current) => [...current, { questionKey: question.key, selectedOption: optionIndex }]);

    if (!isAssessment) {
      setSubmitting(true);
      try {
        setFeedback(await api.checkQuizAnswer(quiz.id, { questionKey: question.key, selectedOption: optionIndex }));
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const continueQuiz = async () => {
    if (questionIndex < quiz.questions.length - 1) {
      setQuestionIndex((current) => current + 1);
      setSelectedAnswer(null);
      setFeedback(null);
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      setResult(await api.submitQuiz(quiz.id, answers));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack bg="white" borderRadius="3xl" borderWidth="1px" borderColor="blackAlpha.100" p={{ base: 6, md: 9 }} spacing={6}>
      <Box>
        <Flex justify="space-between" color="gray.500" fontSize="sm" fontWeight="700" mb={3}>
          <Text>{quiz.title}</Text>
          <Text>{questionIndex + 1} of {quiz.questions.length}</Text>
        </Flex>
        <Progress value={((questionIndex + 1) / quiz.questions.length) * 100} colorScheme="green" borderRadius="full" size="sm" />
      </Box>

      <Heading as="h2" size="lg" lineHeight="1.35">{question.prompt}</Heading>
      <Stack spacing={3}>
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = feedback && index === feedback.correctOption;
          return (
            <Button
              key={option}
              h="auto"
              minH="52px"
              py={3}
              px={4}
              justifyContent="flex-start"
              textAlign="left"
              whiteSpace="normal"
              variant="outline"
              borderColor={isCorrect ? "green.400" : isSelected && feedback && !feedback.isCorrect ? "red.300" : "blackAlpha.200"}
              bg={isCorrect ? "green.50" : isSelected ? "brand.50" : "white"}
              onClick={() => chooseAnswer(index)}
            >
              {option}
            </Button>
          );
        })}
      </Stack>

      {feedback && (
        <Alert status={feedback.isCorrect ? "success" : "info"} borderRadius="xl" alignItems="flex-start">
          <AlertIcon mt={1} />
          <Box>
            <AlertTitle>{feedback.isCorrect ? "Correct" : "Good attempt"}</AlertTitle>
            <AlertDescription lineHeight="1.6">{feedback.explanation}</AlertDescription>
          </Box>
        </Alert>
      )}
      {error && <ErrorState message={error} />}
      <Button
        colorScheme="green"
        size="lg"
        isLoading={submitting}
        isDisabled={selectedAnswer === null || (!isAssessment && !feedback)}
        onClick={continueQuiz}
      >
        {questionIndex === quiz.questions.length - 1 ? "Submit my result" : "Next question"}
      </Button>
    </Stack>
  );
};

export default QuizRunner;
