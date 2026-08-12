import { useEffect, useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, HStack, Radio, RadioGroup, Stack, Text, Textarea, useToast } from "@chakra-ui/react";
import { api } from "../lib/api";

const FeedbackPage = () => {
  const [rating, setRating] = useState("5");
  const [learned, setLearned] = useState("yes");
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);
  const toast = useToast();
  useEffect(() => { api.getFeedback().then((item) => { if (item) { setRating(String(item.rating)); setLearned(item.learnedSomething ? "yes" : "no"); setComment(item.comment || ""); } }).catch(() => {}); }, []);

  const submit = async () => {
    setSaving(true);
    try { await api.saveFeedback({ rating: Number(rating), learnedSomething: learned === "yes", comment }); toast({ title: "Thank you for your feedback", status: "success" }); }
    catch (error) { toast({ title: "Unable to save feedback", description: error.message, status: "error" }); }
    finally { setSaving(false); }
  };

  return (
    <Box as="main"><Container maxW="2xl" px={{ base: 5, md: 8 }} py={{ base: 10, md: 16 }}>
      <Stack bg="white" borderWidth="1px" borderRadius="2xl" p={{ base: 6, md: 9 }} spacing={7}>
        <Box><Heading as="h1" mb={3}>Share your EcoLearn experience</Heading><Text color="gray.600">Anonymous feedback helps the team evaluate usefulness and improve the learning hub.</Text></Box>
        <FormControl><FormLabel>How useful was EcoLearn?</FormLabel><RadioGroup value={rating} onChange={setRating}><HStack spacing={5}>{[1,2,3,4,5].map((value) => <Radio key={value} value={String(value)}>{value}</Radio>)}</HStack></RadioGroup></FormControl>
        <FormControl><FormLabel>Did you learn something new?</FormLabel><RadioGroup value={learned} onChange={setLearned}><HStack><Radio value="yes">Yes</Radio><Radio value="no">Not yet</Radio></HStack></RadioGroup></FormControl>
        <FormControl><FormLabel>Optional comment</FormLabel><Textarea maxLength={1000} value={comment} onChange={(event) => setComment(event.target.value)} placeholder="What worked well or could be improved?" /></FormControl>
        <Button colorScheme="green" size="lg" isLoading={saving} onClick={submit}>Submit feedback</Button>
      </Stack>
    </Container></Box>
  );
};

export default FeedbackPage;
