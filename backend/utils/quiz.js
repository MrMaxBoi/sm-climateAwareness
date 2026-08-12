export const toPublicQuiz = (quiz) => ({
  id: quiz._id.toString(),
  slug: quiz.slug,
  type: quiz.type,
  assessmentPhase: quiz.assessmentPhase,
  title: quiz.title,
  description: quiz.description,
  startsAt: quiz.startsAt,
  endsAt: quiz.endsAt,
  questions: quiz.questions.map((question) => ({
    key: question.key,
    prompt: question.prompt,
    options: question.options,
  })),
});

export const gradeQuiz = (quiz, submittedAnswers) => {
  if (!Array.isArray(submittedAnswers) || submittedAnswers.length !== quiz.questions.length) {
    throw new Error("Every quiz question must be answered exactly once");
  }

  const submittedByKey = new Map();
  submittedAnswers.forEach((answer) => {
    if (!answer || typeof answer.questionKey !== "string" || !Number.isInteger(answer.selectedOption)) {
      throw new Error("Each answer requires a questionKey and integer selectedOption");
    }
    if (submittedByKey.has(answer.questionKey)) throw new Error("A question was answered more than once");
    submittedByKey.set(answer.questionKey, answer.selectedOption);
  });

  const answers = quiz.questions.map((question) => {
    const selectedOption = submittedByKey.get(question.key);
    if (selectedOption === undefined || selectedOption < 0 || selectedOption >= question.options.length) {
      throw new Error(`Invalid answer for question ${question.key}`);
    }
    return {
      questionKey: question.key,
      selectedOption,
      isCorrect: selectedOption === question.correctOption,
      correctOption: question.correctOption,
      explanation: question.explanation,
    };
  });

  const score = answers.filter((answer) => answer.isCorrect).length;
  return {
    answers,
    score,
    total: quiz.questions.length,
    percentage: Math.round((score / quiz.questions.length) * 100),
  };
};

export const checkQuizAnswer = (quiz, questionKey, selectedOption) => {
  if (quiz.type === "assessment") throw new Error("Assessment feedback is available only after submission");
  const question = quiz.questions.find((item) => item.key === questionKey);
  if (!question || !Number.isInteger(selectedOption) || selectedOption < 0 || selectedOption >= question.options.length) {
    throw new Error("Invalid quiz answer");
  }
  return {
    questionKey,
    selectedOption,
    isCorrect: selectedOption === question.correctOption,
    correctOption: question.correctOption,
    explanation: question.explanation,
  };
};
