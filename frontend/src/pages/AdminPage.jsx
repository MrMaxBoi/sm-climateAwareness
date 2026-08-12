import { useCallback, useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { adminApi } from "../lib/api";

const templates = {
  updates: {
    slug: "new-climate-update",
    category: "Climate news",
    title: "",
    summary: "",
    body: "",
    sourceName: "",
    sourceUrl: "https://",
    sourcePublishedAt: new Date().toISOString(),
    readTimeMinutes: 3,
    status: "draft",
    publishedAt: new Date().toISOString(),
  },
  actions: {
    slug: "new-eco-action",
    durationLabel: "This week",
    title: "",
    description: "",
    startsAt: new Date().toISOString(),
    endsAt: "2027-12-31T23:59:59.999Z",
    status: "draft",
  },
  quizzes: {
    slug: "new-daily-quiz",
    type: "daily",
    title: "",
    description: "",
    startsAt: new Date().toISOString(),
    endsAt: "2027-12-31T23:59:59.999Z",
    status: "draft",
    questions: [{ key: "q1", prompt: "", options: ["", ""], correctOption: 0, explanation: "" }],
  },
};

const cleanDocument = (item) => {
  const editable = { ...item };
  delete editable._id;
  delete editable.__v;
  delete editable.createdAt;
  delete editable.updatedAt;
  return editable;
};

const AdminPage = () => {
  const [adminKey, setAdminKey] = useState(() => window.sessionStorage.getItem("ecolearn-admin-key") || "");
  const [authenticated, setAuthenticated] = useState(false);
  const [resource, setResource] = useState("updates");
  const [items, setItems] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [selectedId, setSelectedId] = useState("");
  const [editor, setEditor] = useState(JSON.stringify(templates.updates, null, 2));
  const [busy, setBusy] = useState(false);
  const toast = useToast();

  const loadAdminData = useCallback(async (key, selectedResource = resource) => {
    const [content, metrics] = await Promise.all([
      adminApi.getContent(key, selectedResource),
      adminApi.getAnalytics(key),
    ]);
    setItems(content);
    setAnalytics(metrics);
  }, [resource]);

  useEffect(() => {
    if (!adminKey || window.sessionStorage.getItem("ecolearn-admin-key") !== adminKey) return;
    adminApi.authenticate(adminKey)
      .then(() => loadAdminData(adminKey).then(() => setAuthenticated(true)))
      .catch(() => window.sessionStorage.removeItem("ecolearn-admin-key"));
  }, [adminKey, loadAdminData]);

  const login = async () => {
    setBusy(true);
    try {
      await adminApi.authenticate(adminKey);
      window.sessionStorage.setItem("ecolearn-admin-key", adminKey);
      await loadAdminData(adminKey);
      setAuthenticated(true);
    } catch (error) {
      toast({ title: "Access denied", description: error.message, status: "error" });
    } finally {
      setBusy(false);
    }
  };

  const changeResource = async (nextResource) => {
    setResource(nextResource);
    setSelectedId("");
    setEditor(JSON.stringify(templates[nextResource], null, 2));
    setItems(await adminApi.getContent(adminKey, nextResource));
  };

  const editItem = (item) => {
    setSelectedId(item._id);
    setEditor(JSON.stringify(cleanDocument(item), null, 2));
  };

  const save = async () => {
    setBusy(true);
    try {
      const data = JSON.parse(editor);
      if (selectedId) await adminApi.updateContent(adminKey, resource, selectedId, data);
      else await adminApi.createContent(adminKey, resource, data);
      await loadAdminData(adminKey, resource);
      toast({ title: selectedId ? "Content updated" : "Content created", status: "success" });
    } catch (error) {
      toast({ title: "Unable to save", description: error.message, status: "error", isClosable: true });
    } finally {
      setBusy(false);
    }
  };

  const exportAnalytics = () => {
    const paired = analytics.pairedAssessment || {};
    const rows = [
      ["Metric", "Value"], ["Unique visitors", analytics.uniqueVisitors], ["Total visits", analytics.visits],
      ["Quiz completions", analytics.quizCompletions], ["Average quiz score", analytics.averageQuizScore],
      ["Eco-action completions", analytics.actionCompletions], ["Paired assessments", paired.pairedParticipants ?? 0],
      ["Baseline average", paired.preAverage ?? ""], ["Final average", paired.postAverage ?? ""],
      ["Average improvement points", paired.averageImprovement ?? ""], ["Participants improved", paired.participantsImproved ?? 0],
      ["Improvement rate", paired.improvementRate ?? ""], ["Feedback responses", analytics.feedbackResponses ?? 0],
      ["Average feedback rating", analytics.averageRating ?? ""], ["Learned something rate", analytics.learnedSomethingRate ?? ""],
    ];
    const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `ecolearn-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (!authenticated) {
    return (
      <Container maxW="md" py={24} px={5}>
        <Stack bg="white" borderRadius="2xl" borderWidth="1px" p={8} spacing={6}>
          <Heading size="lg">EcoLearn administration</Heading>
          <Text color="gray.600">Enter the private admin key configured on the server.</Text>
          <Input type="password" value={adminKey} onChange={(event) => setAdminKey(event.target.value)} placeholder="Admin key" />
          <Button colorScheme="green" isLoading={busy} onClick={login}>Continue</Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Box as="main">
      <Container maxW="7xl" py={{ base: 10, md: 16 }} px={{ base: 5, md: 8 }}>
        <Flex justify="space-between" align="start" gap={4} mb={10}>
          <Box><Badge colorScheme="green">Private route</Badge><Heading mt={3}>Campaign administration</Heading></Box>
          <Stack direction={{ base: "column", sm: "row" }}><Button variant="outline" onClick={exportAnalytics}>Export CSV</Button><Button variant="outline" onClick={() => { window.sessionStorage.removeItem("ecolearn-admin-key"); setAuthenticated(false); setAdminKey(""); }}>Sign out</Button></Stack>
        </Flex>

        {analytics && (
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={10}>
            {[
              ["Visitors", analytics.uniqueVisitors], ["Quiz completions", analytics.quizCompletions],
              ["Average score", `${analytics.averageQuizScore}%`], ["Actions", analytics.actionCompletions],
            ].map(([label, value]) => <Box key={label} bg="white" borderWidth="1px" borderRadius="xl" p={5}><Heading size="lg">{value}</Heading><Text color="gray.600" fontSize="sm">{label}</Text></Box>)}
          </SimpleGrid>
        )}

        {analytics?.pairedAssessment && (
          <Box bg="brand.900" color="white" borderRadius="2xl" p={6} mb={10}>
            <Heading size="md" mb={4}>Paired learning evidence</Heading>
            <SimpleGrid columns={{ base: 2, md: 5 }} spacing={4}>
              {[["Paired learners", analytics.pairedAssessment.pairedParticipants], ["Baseline", analytics.pairedAssessment.preAverage ?? "—"], ["Final", analytics.pairedAssessment.postAverage ?? "—"], ["Average change", analytics.pairedAssessment.averageImprovement === null ? "—" : `${analytics.pairedAssessment.averageImprovement} pts`], ["Improved", analytics.pairedAssessment.improvementRate === null ? "—" : `${analytics.pairedAssessment.improvementRate}%`]].map(([label, value]) => <Box key={label}><Text fontSize="xl" fontWeight="800">{value}</Text><Text color="whiteAlpha.700" fontSize="sm">{label}</Text></Box>)}
            </SimpleGrid>
          </Box>
        )}

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          <Stack spacing={4}>
            <FormControl><FormLabel>Content type</FormLabel><Select value={resource} onChange={(event) => changeResource(event.target.value)}><option value="updates">Climate updates</option><option value="quizzes">Quizzes</option><option value="actions">Eco-actions</option></Select></FormControl>
            <Button onClick={() => { setSelectedId(""); setEditor(JSON.stringify(templates[resource], null, 2)); }}>Create new</Button>
            <Stack maxH="620px" overflowY="auto">
              {items.map((item) => <Button key={item._id} h="auto" py={3} justifyContent="space-between" variant={selectedId === item._id ? "solid" : "outline"} colorScheme="green" onClick={() => editItem(item)}><Text noOfLines={1}>{item.title}</Text><Badge ml={2}>{item.status}</Badge></Button>)}
            </Stack>
          </Stack>
          <Stack spacing={4}>
            <FormControl><FormLabel>{selectedId ? "Edit JSON document" : "New JSON document"}</FormLabel><Textarea value={editor} onChange={(event) => setEditor(event.target.value)} minH="620px" fontFamily="mono" fontSize="sm" /></FormControl>
            <Text color="gray.500" fontSize="sm">Save as draft first, review it, then change status to published. Existing records are never deleted from this interface.</Text>
            <Button colorScheme="green" isLoading={busy} onClick={save}>{selectedId ? "Save changes" : "Create content"}</Button>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default AdminPage;
