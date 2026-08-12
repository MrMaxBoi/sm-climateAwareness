# EcoLearn Technology-Based Solution Documentation Handover

## Purpose of this document

This file is a detailed handover for the group member responsible for writing Section 7.0, **Technology-Based Solution Documentation**, in the final project report.

It explains:

- what EcoLearn is and how it works;
- how the implemented system satisfies the assignment requirements;
- why the chosen design and technology are appropriate;
- how the expert interview influenced specific features;
- what demonstration and Instagram evidence must still be collected;
- which metrics can be used for the impact assessment; and
- which claims must not be made unless supporting evidence has been collected.

This is a documentation source and evidence checklist, not a substitute for the final report. Rewrite it into the group's agreed academic style and add dated screenshots, campaign results, figure numbers, captions, citations, and appendices.

---

## 1. Requirement summary

The assignment requires the technology-based solution to:

1. Directly address the selected SDG issue.
2. Be a working digital prototype developed or configured by the group.
3. Be accessible to the intended target audience.
4. Be actively incorporated into the Instagram campaign.
5. Be functional, demonstrated, and documented.
6. Be informed by the expert interview conducted during the Planning Phase.

The required documentation has five parts:

1. **Solution overview** - solution name, SDG issue, how it works, and intended users.
2. **Design rationale** - justification for the solution type and technology choices, including specific expert influence.
3. **Demonstration evidence** - screenshots, recording, live URL, QR code, or equivalent proof.
4. **Campaign integration** - evidence that Instagram actively promoted or embedded the solution.
5. **Impact and reflection** - evidence-based evaluation using reach, usage, results, engagement, or user feedback.

---

## 2. Solution overview

### 2.1 Solution name

**EcoLearn Climate Learning Hub**

### 2.2 SDG issue addressed

EcoLearn supports **United Nations Sustainable Development Goal 13.3: Climate Action**, which concerns improving education, awareness, and capacity relating to climate-change mitigation, adaptation, impact reduction, and early warning.

The project documents identify the local communication problem as follows:

- climate change is a serious environmental and societal issue;
- university students and young adults may find climate information overly technical or unengaging;
- awareness alone may not result in active participation or sustainable behaviour;
- the target audience frequently uses smartphones, digital applications, and Instagram; and
- the campaign needs a measurable way to connect educational content, interaction, practical action, and learning outcomes.

### 2.3 Proposed solution statement

EcoLearn is a mobile-first web application connected to the Group 5 Instagram campaign, **@climate.apu**. Instagram attracts attention through campaign posts, stories, reels, polls, and calls to action. A link in the Instagram bio, Story link, post QR code, or campaign landing link directs users to EcoLearn for a deeper interactive experience.

The learning hub enables a participant to:

1. Read concise climate-learning updates.
2. Complete rotating daily quizzes and weekly challenges.
3. Receive immediate educational feedback after each regular quiz answer.
4. Complete a baseline and final knowledge assessment.
5. compare their baseline and final scores;
6. select practical eco-actions and record their completion;
7. view their anonymous learning and participation progress; and
8. submit a usefulness rating, learning response, and optional comment.

The campaign team can use a protected administration interface to maintain content and view aggregate campaign analytics.

### 2.4 Intended users

The primary target audience is:

- university students;
- young adults;
- smartphone and Instagram users; and
- participants interested in learning about practical climate action without needing a formal account.

Secondary stakeholders include educators, the project team, the project sponsor, environmental organisations, and people evaluating campaign outcomes.

### 2.5 Functional status

EcoLearn is a working full-stack web prototype. It is not a static mock-up. The frontend sends requests to an application server, records activity in MongoDB Atlas, grades quiz submissions on the server, retrieves saved progress, and calculates aggregate campaign measures.

The repository currently includes starter content for:

- 8 climate updates;
- 5 daily quizzes;
- 3 weekly quizzes;
- 2 assessments, consisting of one baseline and one final assessment; and
- 8 practical eco-actions.

Content is stored in the database and can be created or updated through the private `/admin` route. Seed data can also be safely inserted or refreshed using `npm run seed`.

---

## 3. How the solution works

### 3.1 Participant journey

The intended campaign journey is:

1. A student encounters an EcoLearn Instagram post, reel, Story, quiz, or poll.
2. The Instagram content includes a call to action leading to the EcoLearn web application.
3. The student opens EcoLearn on a phone or browser without creating an account.
4. EcoLearn creates a random anonymous participant identifier in that browser.
5. The participant completes the **Baseline** knowledge assessment.
6. The participant explores climate updates, daily quizzes, weekly challenges, and eco-actions during the campaign.
7. The participant completes the **Final assessment**.
8. The Progress page displays baseline score, final score, and percentage-point improvement.
9. The participant submits optional feedback about the tool's usefulness and whether they learned something new.
10. The project team reviews protected aggregate analytics for campaign monitoring and final reporting.

### 3.2 Main participant-facing modules

#### Learn

The Learn section presents published climate updates as readable cards and detail pages. Updates can contain source information and external links so readers can inspect the original material. Article views are recorded only when optional analytics consent has been granted.

Documentation value:

- demonstrates climate education beyond short Instagram captions;
- creates a central resource hub linked to the awareness campaign; and
- supports responsible, contextual climate communication.

#### Daily quizzes and weekly challenges

Published quizzes are selected automatically from the currently active campaign window. Daily content rotates each day and weekly content rotates each week, so the team does not need to replace the quiz manually every day.

For ordinary daily and weekly learning quizzes:

- the participant selects an answer;
- the server checks the answer;
- the interface immediately indicates whether it is correct; and
- an explanation reinforces the learning point.

The final result is saved after all questions are answered and submitted.

Documentation value:

- implements active learning rather than passive reading;
- provides immediate educational feedback, as recommended by the expert; and
- records completion and score data for evaluating engagement.

#### Knowledge assessment

The knowledge assessment is deliberately separate from daily and weekly quizzes.

- **Baseline assessment:** intended to be completed before substantial exposure to EcoLearn content.
- **Final assessment:** intended to be completed after the campaign learning activities.
- Assessment explanations are withheld until final submission so immediate feedback does not influence answers within the measurement activity.
- The Progress page calculates improvement as `final percentage - baseline percentage`.
- Aggregate learning improvement includes only participants who completed both phases, which avoids comparing two unrelated groups.

Daily or weekly quiz scores do not populate the Knowledge Assessment panel. They instead contribute to the regular quiz completion count and average quiz score.

Documentation value:

- supports the charter requirement for pre- and post-campaign knowledge assessment;
- provides direct evidence of learning change; and
- supports the SMART objective concerning improvement in quiz scores.

#### Eco-actions

The Actions section converts climate learning into small, achievable behaviours. Examples include choosing a reusable item, changing a regular journey, reducing food waste, shortening a shower, checking room energy use, sharing a verified climate insight, and suggesting a campus improvement.

Participants can mark an action complete or undo it. Completions are saved to MongoDB and included in both personal progress and aggregate analytics.

Documentation value:

- responds to the expert's recommendation that climate education should involve people in the issue;
- connects awareness with practical participation; and
- creates a measurable behavioural engagement indicator.

#### Progress

The Progress page retrieves data belonging to the anonymous participant identifier stored on the current device. It shows:

- regular quizzes completed;
- average daily/weekly quiz score;
- eco-actions completed;
- baseline assessment score;
- final assessment score; and
- assessment improvement in percentage points.

Because the identifier is stored locally, clearing the browser's site data or changing devices creates a new anonymous identity and disconnects that browser from earlier progress. This limitation should be stated during demonstrations.

#### Feedback

The Feedback page records:

- a usefulness rating from 1 to 5;
- whether the participant learned something new; and
- an optional written comment.

One feedback record is maintained per anonymous participant, and a participant can update their response. Aggregate rating and learning-response measures are available to the team.

#### Privacy and consent

EcoLearn does not request a participant's name, email address, student ID, exact location, Instagram credentials, or conventional login details.

Essential records include quiz and assessment results, action completion, and feedback. Optional visit and content-view analytics require an explicit consent choice. Declining optional analytics does not prevent the participant from using the learning features.

This is a suitable prototype-level privacy approach, but the final report should avoid claiming complete anonymity or regulatory certification. The accurate claim is that the application uses a randomly generated browser identifier and does not intentionally request direct personal identifiers.

### 3.3 Team administration

The administration interface is available by entering `/admin` directly. It is intentionally not displayed in the public navigation.

An environment-based `ADMIN_KEY` protects the interface. Authorised team members can:

- review campaign analytics;
- create climate updates, quizzes, and eco-actions;
- edit existing content;
- change publication status and scheduling windows; and
- keep campaign content current without rebuilding the application.

The interface does not expose a destructive delete operation. This reduces the chance of accidentally erasing campaign evidence.

### 3.4 Aggregate analytics

The protected analytics system provides:

- unique consenting visitors;
- total consenting visits;
- repeat visits, calculated as total visits minus unique visitors;
- regular quiz completions;
- average regular quiz score;
- eco-action completions;
- baseline assessment count;
- final assessment count;
- number of paired assessment participants;
- average paired baseline score;
- average paired final score;
- average paired improvement;
- number and rate of paired participants who improved;
- feedback response count;
- average usefulness rating;
- percentage reporting that they learned something new; and
- most-viewed learning updates where analytics consent was provided.

These measures help the group monitor reach, repeated engagement, learning, action, and perceived usefulness instead of relying on Instagram likes alone.

---

## 4. Design rationale

### 4.1 Why a mobile-first web application was chosen

The project charter includes a simple digital learning tool but places a full mobile application with advanced systems outside the agreed scope. A responsive web application therefore provides an appropriate balance:

- it is directly accessible from an Instagram bio or Story link;
- users do not need to install an application-store package;
- the same URL works on phones, tablets, and desktop browsers;
- development and deployment are achievable within the academic timeline;
- the prototype can still provide persistent data and interactive functionality; and
- it avoids the cost, approval process, and maintenance overhead of separate iOS and Android releases.

The application uses responsive layouts and bottom navigation on smaller screens, making it suitable for the target audience's assumed smartphone use.

### 4.2 Why Instagram and EcoLearn are used together

Instagram and EcoLearn serve different but complementary purposes:

- **Instagram** provides discovery, short-form awareness content, social interaction, campaign identity, and calls to action.
- **EcoLearn** provides longer learning material, server-graded interaction, practical actions, persistent progress, feedback collection, and measurable pre/post assessment.

The solution should therefore be described as a core component of the Instagram campaign, not as an unrelated website. Evidence must show the pathway from Instagram to EcoLearn.

### 4.3 Technology choices

| Technology | Role | Rationale |
| --- | --- | --- |
| React 19 | Participant and administrator interfaces | Supports reusable interactive components, fast page transitions, conditional feedback, and responsive user experiences. |
| Vite | Frontend development and production build | Provides a lightweight development workflow and optimised static production build. |
| Chakra UI | Visual components and responsive design | Enables a consistent, readable, mobile-first interface within limited project time. |
| Node.js and Express | Application server and API | Handles validation, grading, progress retrieval, protected analytics, and production delivery from one deployable service. |
| MongoDB Atlas and Mongoose | Cloud data storage and validation | Stores content and anonymous campaign activity, supports flexible content structures, and allows the deployed service to access the same campaign database. |
| Vercel | Planned web hosting | Provides GitHub-based deployment, environment-variable management, serverless Express execution, logs, HTTPS, and a public URL suitable for QR codes and Instagram links. |
| GitHub and Git | Version control | Preserves development history, supports team handover, and enables Vercel deployment from the main branch. |

The frontend and backend are deployed as one service. Express serves the built React application and the `/api` routes from the same domain. This avoids cross-origin configuration and simplifies deployment for a student prototype.

### 4.4 Maintainability and security decisions

The implementation includes several design choices relevant to quality:

- real secrets are stored in `.env` locally or Vercel Environment Variables, not committed to Git;
- `.env.example` documents required variable names without containing production secrets;
- MongoDB schemas validate content and result structures;
- answer keys are not included in the public quiz payload;
- quiz grading occurs on the server;
- administrative and aggregate analytics routes require secret keys;
- request rate limits reduce simple abuse;
- security headers are applied through Helmet;
- request body size is restricted;
- campaign dates and Instagram URL are configurable;
- database seed operations use slug-based upserts instead of blindly duplicating content;
- a health endpoint supports deployment checking; and
- automated checks cover important validation, participant, grading, analytics, and access-control behaviour.

These controls improve prototype reliability but should not be described as enterprise-grade security.

---

## 5. How the expert interview shaped the final design

### 5.1 Expert context

The project plan records a structured Microsoft Teams interview with **Dr. Vazeerudeen Abdul Hameed** on **10 July 2026**, from **5:00 p.m. to 5:30 p.m.** The interview examined the SDG issue, feasibility and value of the proposed learning hub, and recommendations for improvement.

The final report should repeat the expert's full role, organisation, and relevant expertise exactly as documented in the Expert Interview Report. Do not invent missing profile information.

### 5.2 Traceability from insight to implementation

| Expert finding or recommendation | Design response in EcoLearn | Evidence to capture |
| --- | --- | --- |
| Young people are inclined toward technology, applications, electronic devices, and social media. | EcoLearn is a responsive web application designed to be reached directly from the Instagram campaign and used on a smartphone. | Mobile screenshot plus Instagram link-in-bio or Story evidence. |
| An interactive web application would improve the effectiveness of the Instagram approach. | The hub includes server-graded quizzes, assessments, action completion, personal progress, and feedback rather than only static pages. | Short recording showing a complete participant journey. |
| Quizzes provide particular value because they are interactive and reward users through marks. | Daily and weekly quizzes present scores, progress, question feedback, and saved results. | Quiz question, feedback, completion result, and Progress screenshots. |
| Immediate feedback enables better learning outcomes and helps users understand whether they are correct. | Regular learning quizzes reveal correctness and explanations immediately after each answer. | Screenshot showing correct/incorrect feedback and explanation. |
| Climate education should encourage involvement, not only explain concepts. | The Actions module gives users practical climate tasks and records completion. | Action list plus marked-complete state and progress update. |
| The user interface should be simple and instructions precise. | EcoLearn uses a focused navigation structure, short task descriptions, clear answer options, progress indicators, responsive layouts, and no mandatory account registration. | Phone-sized screenshots of home, quiz, action, and progress pages. |
| Information must be maintained and updated. | Climate updates, quizzes, and actions are database-backed and can be created or updated through the protected administration route. Campaign dates are configurable. | Admin content view and a safe content-edit demonstration. Do not expose the admin key. |
| Continued use and a growing user base are useful success indicators. | With consent, EcoLearn records anonymous visits, distinguishes unique and repeat visits, and counts participation across quizzes and actions. | Admin analytics screenshot captured near campaign close. |
| Feedback is essential. | EcoLearn collects a rating, a learned-something response, and an optional comment; learning quizzes also provide feedback to participants. | Feedback form and aggregate feedback metrics. |
| Future versions could support multiple languages and richer audio, visual, sensory, or location-based community features. | These were documented as future improvements rather than implemented within the lightweight prototype scope. | Include them honestly in limitations and future recommendations. |

### 5.3 Important distinction for the report

Do not claim that every expert recommendation was implemented. The final design directly implements interactivity, immediate feedback, practical participation, simple mobile-first access, content maintainability, and engagement measurement.

Multilingual support, interactive audio, sensory feedback, and location-based community collaboration were not implemented. They are valid future enhancements, constrained by time, scope, budget, privacy, and implementation complexity.

This distinction strengthens the reflection because it demonstrates scope control rather than overstating completion.

---

## 6. Assignment alignment matrix

| Assignment expectation | EcoLearn response | Remaining documentation evidence |
| --- | --- | --- |
| Working digital prototype | Full-stack web application with database persistence and server-side processing. | Live URL and dated recording. |
| Directly addresses SDG issue | Provides climate education, knowledge checks, and practical climate actions aligned with SDG 13.3. | Screenshots and explanation tied to project objectives. |
| Accessible to target audience | Responsive browser-based interface without mandatory registration or installation. | Phone screenshots and successful public-link test. |
| Incorporated into Instagram | Designed for link-in-bio, Story links, post QR codes, and campaign calls to action. | Actual Instagram evidence must be collected. |
| Informed by expert interview | Immediate quiz feedback, interaction, actions, simple interface, maintainable content, and engagement measures directly answer key findings. | Include traceability table and cite the interview report. |
| Demonstrated | Major journeys can be shown from discovery through progress and analytics. | Screenshots, video link, QR code, test date, device/browser. |
| Measurable | Tracks consenting visits, quiz results, paired assessment change, actions, and feedback. | Final aggregate data and Instagram Insights. |
| Functional during campaign | Scheduling windows control published quizzes and actions; Vercel provides planned public hosting. | Successful deployment and campaign-period availability evidence. |

---

## 7. Demonstration evidence plan

### 7.1 Evidence that must be collected

Replace every placeholder below with actual evidence before submission.

| Figure | Evidence | What it proves | Status |
| --- | --- | --- | --- |
| Figure 7.1 | Instagram profile showing `@climate.apu` and EcoLearn link in bio | Campaign integration and accessibility | TODO |
| Figure 7.2 | QR code that opens the final Vercel URL | Mobile access route | TODO |
| Figure 7.3 | EcoLearn home page on a smartphone-sized display | Mobile-first interface and campaign identity | TODO |
| Figure 7.4 | Learn page and one climate-update detail page | Functional educational resource hub | TODO |
| Figure 7.5 | Daily quiz question before answering | Interactive learning feature | TODO |
| Figure 7.6 | Immediate answer feedback with explanation | Expert-informed feedback design | TODO |
| Figure 7.7 | Completed quiz result | Server grading and result display | TODO |
| Figure 7.8 | Baseline or final assessment | Knowledge assessment functionality | TODO |
| Figure 7.9 | Progress page after paired assessments | Personal measurement and improvement | TODO |
| Figure 7.10 | Eco-action before and after completion | Practical participation and persistence | TODO |
| Figure 7.11 | Feedback form and confirmation | User evaluation mechanism | TODO |
| Figure 7.12 | Protected admin analytics without secrets visible | Monitoring and controlling evidence | TODO |
| Figure 7.13 | Vercel deployment and health endpoint | Public functional deployment | TODO |
| Figure 7.14 | Instagram Story/post promoting a specific quiz or action | Active campaign integration rather than passive link placement | TODO |

### 7.2 Recommended demonstration recording

Create a 2-4 minute screen recording using a phone or responsive browser view:

1. Show the Instagram campaign profile.
2. Open EcoLearn using the bio link, Story link, or QR code.
3. Open a climate update.
4. Complete at least one regular quiz question and show immediate feedback.
5. Show a submitted quiz result.
6. Mark an eco-action complete.
7. Open the Progress page and show the changed totals.
8. Show the Baseline and Final assessment tabs.
9. Submit or display the feedback form.
10. Briefly show aggregate analytics from `/admin` without revealing the key.

Store the recording in an accessible location approved by the group or lecturer. Test the sharing permissions using a signed-out browser.

### 7.3 Screenshot quality rules

- Capture the browser URL where public accessibility matters.
- Do not expose `MONGO_URI`, database credentials, `ADMIN_KEY`, `ANALYTICS_KEY`, Vercel Environment Variables, or private participant identifiers.
- Use readable resolution and crop irrelevant browser tabs or personal information.
- Use consistent figure numbering and descriptive captions.
- Record the capture date because analytics change during the campaign.
- If a screenshot contains sample/test data, label it as test data.
- Use final campaign screenshots for impact claims.

### 7.4 Live-link fields

Complete these after Vercel deployment:

- **Live application URL:** `[INSERT FINAL VERCEL URL]`
- **Health-check URL:** `[INSERT FINAL VERCEL URL]/api/health`
- **Instagram profile URL:** `https://www.instagram.com/climate.apu/`
- **Demonstration video URL:** `[INSERT ACCESSIBLE VIDEO URL]`
- **QR code file/location:** `[INSERT FILE OR APPENDIX REFERENCE]`
- **Date public access was verified:** `[INSERT DATE AND TIME]`
- **Devices/browsers tested:** `[INSERT TEST EVIDENCE]`

---

## 8. Instagram campaign integration plan

The assignment requires evidence that EcoLearn was actively incorporated into the campaign. A website existing separately is not sufficient.

### 8.1 Minimum recommended integration

1. Put the final EcoLearn URL in the Instagram bio.
2. Publish a dedicated launch post explaining what EcoLearn offers.
3. Create a Story with a link sticker directing users to the Baseline assessment.
4. Add a QR code to suitable campaign posts or physical presentation materials.
5. Use regular calls to action, such as:
   - "Read the full climate brief through our bio link."
   - "Try today's EcoLearn quiz and check your understanding."
   - "Complete this week's eco-action and record your progress."
   - "Take the final assessment to measure your learning."
6. Publish a closing Story or post requesting feedback.

### 8.2 Suggested campaign sequence

| Campaign stage | Instagram activity | EcoLearn destination | Intended measure |
| --- | --- | --- | --- |
| Launch | Introduction post and Story link | Home and Baseline assessment | Visitors and baseline completions |
| Awareness | Topic posts, reels, and short facts | Related Learn article | Visits and update views |
| Interaction | Story poll followed by a challenge | Daily/weekly quiz | Quiz completions and score |
| Participation | Sustainable-behaviour post | Actions page | Action completions |
| Reinforcement | Reminder Story and progress prompt | Progress page | Repeat visits |
| Closing | Final-learning and feedback post | Final assessment and Feedback | Paired assessments and feedback responses |

### 8.3 Campaign evidence to archive

- profile screenshot with bio link;
- launch post screenshot and caption;
- Story screenshots showing link stickers;
- post/reel screenshots containing a QR code or call to action;
- post dates and URLs;
- Instagram Insights for reach, impressions, accounts engaged, link taps, Story link clicks, likes, comments, shares, and saves where available;
- the final social media posters for Appendix G; and
- evidence showing that campaign messages corresponded to EcoLearn topics, quizzes, or actions.

---

## 9. Impact measurement and reflection guide

### 9.1 Measurement principles

Use final campaign data, not assumptions. State the observation period and extraction time. Separate Instagram metrics from EcoLearn metrics, then explain their relationship.

Do not use raw assessment counts alone to claim knowledge improvement. The strongest learning measure is the result for participants who completed both the baseline and final assessment.

### 9.2 EcoLearn indicators

| Indicator | Meaning | Interpretation caution |
| --- | --- | --- |
| Unique visitors | Number of different consenting browser identifiers with a recorded visit | A browser identifier is not a verified unique person. Non-consenting users are excluded. |
| Total visits | Number of consenting sessions recorded | One person can create multiple visits. |
| Repeat visits | Total visits minus unique visitors | Approximation of continued engagement, not a full retention cohort analysis. |
| Quiz completions | Submitted daily and weekly quizzes | Measures participation, not necessarily knowledge improvement. |
| Average quiz score | Mean percentage across regular quiz submissions | Content difficulty may differ between quizzes. |
| Eco-action completions | Number of recorded completed actions | Self-reported completion; it does not independently verify behaviour. |
| Baseline/final counts | Number of submitted assessment phases | Counts may represent different people unless paired. |
| Paired participants | Anonymous identifiers with both assessment phases | Best denominator for learning-change analysis. |
| Average paired improvement | Mean of each paired participant's final score minus baseline score | Report as percentage points, not percent growth. |
| Improvement rate | Percentage of paired participants whose final score exceeded baseline | Small samples must be acknowledged. |
| Feedback rating | Mean usefulness score from 1 to 5 | Voluntary respondents may be more engaged than non-respondents. |
| Learned-something rate | Percentage of feedback respondents selecting yes | Self-reported learning, useful alongside assessment evidence. |
| Top updates | Most-viewed articles among consenting activity | Does not include readers who declined optional analytics. |

### 9.3 Instagram indicators

Where available, capture:

- followers at launch and close;
- total reach;
- impressions or views;
- accounts engaged;
- likes, comments, shares, and saves;
- Story views and completion;
- profile visits;
- external link taps or Story link clicks;
- quiz/poll participation; and
- engagement rate, with the exact formula stated.

Avoid combining unlike measures into an unexplained total. If reporting "500 total engagements," specify exactly which Instagram and EcoLearn interactions were included and avoid double counting.

### 9.4 Results table template

| Measure | Target | Actual result | Evidence source | Interpretation |
| --- | ---: | ---: | --- | --- |
| Total campaign engagements | 500 | `[INSERT]` | Instagram Insights and/or defined EcoLearn interactions | `[INSERT]` |
| Paired assessment participants | `[INSERT TARGET]` | `[INSERT]` | EcoLearn admin analytics | `[INSERT]` |
| Average baseline score | N/A | `[INSERT]%` | EcoLearn admin analytics | Starting knowledge level |
| Average final score | N/A | `[INSERT]%` | EcoLearn admin analytics | Knowledge after campaign exposure |
| Average learning improvement | 70% objective requires clarification | `[INSERT]` points | EcoLearn paired analytics | Explain whether the charter intended percentage points, relative improvement, or participants improved |
| Participants who improved | `[INSERT TARGET]` | `[INSERT]%` | EcoLearn paired analytics | `[INSERT]` |
| Regular quiz completions | `[INSERT TARGET]` | `[INSERT]` | EcoLearn admin analytics | `[INSERT]` |
| Eco-action completions | `[INSERT TARGET]` | `[INSERT]` | EcoLearn admin analytics | `[INSERT]` |
| Average usefulness rating | `[INSERT TARGET]` | `[INSERT]/5` | EcoLearn feedback analytics | `[INSERT]` |
| Reported learning | `[INSERT TARGET]` | `[INSERT]%` | EcoLearn feedback analytics | `[INSERT]` |
| Instagram link taps | `[INSERT TARGET]` | `[INSERT]` | Instagram Insights | Conversion interest toward tool |

### 9.5 Important issue with the 70% objective

The charter states an objective to "achieve 70% improvement in quiz scores," but the calculation method is not defined. Before reporting success, the group must agree on the intended interpretation.

Possible interpretations include:

- a 70-percentage-point increase, which is extremely demanding;
- a 70% relative increase from baseline;
- 70% of paired participants improving; or
- a final average score of 70%.

EcoLearn currently reports:

- baseline average percentage;
- final average percentage;
- average change in percentage points; and
- percentage of paired participants who improved.

The final report must state the chosen measure transparently and should not change the interpretation merely to make the target appear achieved.

### 9.6 Reflection structure

Use the following structure after campaign data is final:

1. **Reach:** How many users discovered or opened the tool?
2. **Engagement:** Did they return, complete quizzes, or view learning resources?
3. **Learning:** What did paired baseline/final results show?
4. **Action:** How many practical actions were self-reported as completed?
5. **Perceived usefulness:** What did ratings, learning responses, and comments indicate?
6. **Instagram contribution:** Which content or calls to action produced the strongest response?
7. **Limitations:** What prevents stronger causal claims?
8. **Adjustment:** What did the team change, or what should a future campaign change, based on the evidence?

### 9.7 Appropriate limitations

Include relevant limitations honestly:

- participation is voluntary and may involve self-selection bias;
- anonymous browser identifiers are not verified individuals;
- changing device or clearing site data creates a new identifier;
- optional analytics exclude users who declined tracking;
- eco-actions are self-reported;
- the campaign period and sample size are limited;
- exposure to external climate information cannot be controlled;
- daily and weekly quizzes can differ in difficulty;
- pre/post improvement is an association and does not prove EcoLearn was the only cause;
- the application is currently in English only;
- richer multimedia and community collaboration remain future work; and
- long-term habit formation cannot be confirmed within a short academic campaign.

---

## 10. Suggested final-report section structure

The next writer can structure Section 7.0 as follows:

### 7.1 Solution Overview

- EcoLearn name and SDG 13.3 focus.
- Target audience and communication problem.
- Relationship between Instagram and the learning hub.
- Concise feature overview.

### 7.2 Design Rationale

- Why mobile-first web was selected instead of a native application.
- Why Instagram discovery and web-based interaction complement one another.
- Why the selected stack was practical within schedule, cost, and scope constraints.
- Privacy, accessibility, maintainability, and measurement considerations.

### 7.3 Expert-Informed Design

- Brief expert context.
- Three to six key findings.
- Direct traceability from each finding to an implemented feature.
- Recommendations deferred to future work and reasons for deferral.

### 7.4 Functional Demonstration

- Live URL and QR code.
- Annotated figures showing the participant journey.
- Short explanation of database persistence and server grading.
- Demonstration video reference.

### 7.5 Instagram Campaign Integration

- Bio link, Story link, dedicated launch post, and recurring calls to action.
- Evidence that Instagram content connected to specific EcoLearn pages.
- QR code or link-use evidence.

### 7.6 Impact and Reflection

- Observation period and data sources.
- Instagram reach and engagement.
- EcoLearn visits and interaction.
- Paired knowledge change.
- Action completion and feedback.
- Performance against SMART objectives.
- Limitations, adjustments, lessons learned, and future improvements.

---

## 11. Report-ready overview draft

The paragraph below may be adapted, but all placeholders and evidence references must be completed:

> EcoLearn is a mobile-first climate learning hub developed as the core technology-based solution for Group 5's SDG 13.3 Instagram awareness campaign. It addresses the challenge that climate information can appear technical or unengaging to university students and young adults. Instagram is used to attract attention through concise campaign content, while EcoLearn provides a deeper interactive experience through curated climate updates, daily and weekly quizzes, immediate answer feedback, practical eco-actions, paired baseline and final assessments, personal progress, and anonymous feedback. The application is accessible through a web link and QR code without requiring an account or installation. It was implemented using React, Chakra UI, Node.js, Express, and MongoDB Atlas, and deployed at `[INSERT LIVE URL]`. The final design was informed by expert recommendations emphasising digital interactivity, immediate quiz feedback, active participation, simple instructions, maintainable information, and sustained engagement measurement.

Do not paste this paragraph without adapting it to the final report voice and inserting evidence.

---

## 12. Technical verification and maintenance notes

### 12.1 Relevant routes

Public participant routes include:

- `/` - campaign landing page;
- `/learn` - climate updates;
- `/quiz` - daily and weekly quizzes;
- `/assessment` - baseline and final assessments;
- `/actions` - practical eco-actions;
- `/progress` - anonymous participant progress;
- `/feedback` - participant evaluation;
- `/about` - project context; and
- `/privacy` - privacy explanation and analytics choice.

Private route:

- `/admin` - content maintenance and aggregate analytics; not linked publicly.

Health check:

- `/api/health` - deployment availability response.

### 12.2 Environment variables

Production configuration is held in Vercel Environment Variables. Required or relevant names are documented in `.env.example`:

- `MONGO_URI`
- `ADMIN_KEY`
- `ANALYTICS_KEY`
- `CAMPAIGN_NAME`
- `CAMPAIGN_START`
- `CAMPAIGN_END`
- `INSTAGRAM_URL`

Do not remove `.env.example`. Do not add real values to it. The real `.env` must remain excluded from Git.

### 12.3 Quality checks

Before the final demonstration or a deployment, run:

```bash
npm run check
```

This runs backend tests, frontend linting, and the production frontend build.

### 12.4 Campaign scheduling

Starter quiz and action availability uses the configured campaign start and end dates. If those dates change:

1. update the Vercel environment variables;
2. redeploy the service; and
3. run the seed command against the intended database so starter item windows are updated.

Do not seed an unknown or production database without first verifying the `MONGO_URI` target.

### 12.5 Content maintenance

- Use `/admin` with the production `ADMIN_KEY`.
- Keep answer keys and draft content out of public screenshots.
- Verify titles, sources, dates, quiz answers, explanations, and scheduling before publishing.
- Use `draft`, `published`, or `archived` status appropriately.
- Preserve final campaign data before making large content changes after the measurement period.

---

## 13. Final handover checklist

### Functional completion

- [ ] Vercel deployment is successful.
- [ ] Public domain opens on phone and desktop.
- [ ] `/api/health` returns a successful response.
- [ ] Atlas allows the Vercel function to connect.
- [ ] Climate updates load.
- [ ] Daily and weekly quizzes load and submit.
- [ ] Baseline and final assessments submit.
- [ ] Paired improvement appears on Progress.
- [ ] Eco-action completion persists after refresh.
- [ ] Feedback saves correctly.
- [ ] `/admin` works with the production key.
- [ ] No secrets appear in GitHub, screenshots, recordings, or the report.

### Campaign integration

- [ ] Final URL is in the Instagram bio.
- [ ] QR code resolves to the final URL.
- [ ] Launch post or Story introduces EcoLearn.
- [ ] Campaign posts repeatedly direct users to relevant EcoLearn modules.
- [ ] Closing content directs users to the Final assessment and Feedback page.
- [ ] Instagram integration screenshots and Insights are archived.

### Documentation

- [ ] Solution overview covers name, SDG issue, operation, and target audience.
- [ ] Design rationale explains both solution type and technology choices.
- [ ] Expert findings are mapped to implemented features.
- [ ] Deferred expert recommendations are described as future work.
- [ ] Live URL, QR code, screenshots, recording, and captions are included.
- [ ] Impact period and data extraction date are stated.
- [ ] Instagram and EcoLearn metrics are reported separately and accurately.
- [ ] Knowledge change uses paired baseline/final participants.
- [ ] The interpretation of the 70% objective is explicitly defined.
- [ ] Limitations and lessons learned are included.
- [ ] Claims are supported by figures, analytics, feedback, or test evidence.

---

## 14. Source documents used for this handover

This handover was prepared using:

1. `G5_ProjectPlan&ExpertInterviewReport.pdf` - project purpose, scope, objectives, interview transcript, key insights, and expert recommendations.
2. `PRMGT Assignment Question Marking Guide 2026-2027.pdf` - technology-based solution requirements and final report structure.
3. `PRMGT G5 Charter.pdf` - SDG focus, SMART objectives, scope boundaries, assumptions, constraints, risks, deliverables, and milestones.
4. The implemented EcoLearn repository - actual features, data structures, analytics calculations, privacy behaviour, administration, testing, and deployment configuration.

Where this handover differs from an early proposal, the final report should explain the difference as a controlled design refinement. In particular, EcoLearn remains a lightweight mobile-first web application rather than a full native mobile application, which is consistent with the charter's outside-scope boundary.
