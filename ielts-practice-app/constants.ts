import { Paragraph, Question, QuestionType, Stage } from './types';

// READING DATA
export const PARAGRAPHS: Paragraph[] = [
  {
    id: 'A',
    content: `The ping of a text message has never sounded so sweet. In what is being touted as a world first, Kenya’s biggest mobile operator is allowing subscribers to send cash to other phone users by SMS. Known as M-Pesa, or mobile money, the service is expected to revolutionise banking in a country where more than 80% of people are excluded from the formal financial sector. Apart from transferring cash - a service much in demand among urban Kenyans supporting relatives in rural areas - customers of the Safaricom network will be able to keep up to 50,000 shillings (£370) in a “virtual account” on their handsets.`
  },
  {
    id: 'B',
    content: `Developed by Vodafone, which holds a 35% share in Safaricom, M-Pesa was formally launched in Kenya two weeks ago. More than 10,000 people have signed up for the service, with around 8 million shillings transferred so far, mostly in tiny denominations. Safaricom’s executives are confident that growth will be strong in Kenya, and later across Africa. “We are effectively giving people ATM cards without them ever having to open a real bank account,” said Michael Joseph, chief executive of Safaricom, who called the money transfer concept the “next big thing” in mobile telephony.`
  },
  {
    id: 'C',
    content: `M-Pesa’s is simple. There is no need for a new handset or SIM card. To send money, you hand over the cash to a registered agent - typically a retailer - who credits your virtual account. You then send between 100 shillings (74p) and 35,000 shillings (£259) via text message to the desired recipient - even someone on a different mobile network - who cashes it at an agent by entering a secret code and showing ID. A commission of up to 170 shillings (£1.25) is paid by the recipient but it compares favourably with fees levied by the major banks, whose services are too expensive for most of the population.`
  },
  {
    id: 'D',
    content: `Mobile phone growth in Kenya, as in most of Africa, has been remarkable, even among the rural poor. In June 1999, Kenya had 15,000 mobile subscribers. Today, it has nearly 8 million out of a population of 35 million, and the two operators’ networks are as extensive as the access to banks is limited. Safaricom says it is not so much competing with financial services companies as filling a void. In time, M-Pesa will allow people to borrow and repay money, and make purchases. Companies will be able to pay salaries directly into workers’ phones - something that has already attracted the interest of larger employers, such as the tea companies, whose workers often have to be paid in cash as they do not have bank accounts. There are concerns about security, but Safaricom insists that even if someone’s phone is stolen, the PIN system prevents unauthorised withdrawals. Mr. Joseph said the only danger is sending cash to the wrong mobile number and the recipient redeeming it straight away.`
  },
  {
    id: 'E',
    content: `The project is being watched closely by mobile operators around the world as a way of targeting the multibillion pound international cash transfer industry long dominated by companies such as Western Union and Moneygram. Remittances sent from nearly 200 million migrant workers to developing countries totalled £102 billion last year, according to the World Bank. The GSM Association, which represents more than 700 mobile operators worldwide, believes this could quadruple by 2012 if transfers by SMS become the norm. Vodafone has entered a partnership with Citigroup that will soon allow Kenyans in the UK to send money home via text message. The charge for sending £50 is expected to be about £3, less than a third of what some traditional services charge.`
  }
];

export const QUESTIONS: Question[] = [
  // 1-4 Matching Paragraphs
  { id: 1, type: QuestionType.PARAGRAPH_MATCH, prompt: 'A possible security problem', options: ['A', 'B', 'C', 'D', 'E'], correctAnswers: ['D'] },
  { id: 2, type: QuestionType.PARAGRAPH_MATCH, prompt: 'The cost of M-Pesa', options: ['A', 'B', 'C', 'D', 'E'], correctAnswers: ['C'] },
  { id: 3, type: QuestionType.PARAGRAPH_MATCH, prompt: 'An international service similar to M-Pesa', options: ['A', 'B', 'C', 'D', 'E'], correctAnswers: ['E'] },
  { id: 4, type: QuestionType.PARAGRAPH_MATCH, prompt: 'The fact that most Kenyans do not have a bank account', options: ['A', 'B', 'C', 'D', 'E'], correctAnswers: ['A'] },
  // 5-8 Sentence Completion
  { id: 5, type: QuestionType.SENTENCE_COMPLETION, prompt: 'Safaricom is the [INPUT] mobile phone company in Kenya.', prefix: 'Safaricom is the', suffix: 'mobile phone company in Kenya.', correctAnswers: ['biggest'] },
  { id: 6, type: QuestionType.SENTENCE_COMPLETION, prompt: 'An M-Pesa account needs to be credited by [INPUT].', prefix: 'An M-Pesa account needs to be credited by', suffix: '', correctAnswers: ['an agent', 'a registered agent'] },
  { id: 7, type: QuestionType.SENTENCE_COMPLETION, prompt: '[INPUT] companies are particularly interested in using M-Pesa.', prefix: '', suffix: 'companies are particularly interested in using M-Pesa.', correctAnswers: ['tea', 'Tea'] },
  { id: 8, type: QuestionType.SENTENCE_COMPLETION, prompt: 'Companies like Moneygram and Western Union have [INPUT] the international money transfer market.', prefix: 'Companies like Moneygram and Western Union have', suffix: 'the international money transfer market.', correctAnswers: ['long dominated'] },
  // 9-13 True/False/Not Given
  { id: 9, type: QuestionType.TRUE_FALSE, prompt: 'Most Kenyans working in urban areas have relatives in rural areas.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], correctAnswers: ['NOT GIVEN'] },
  { id: 10, type: QuestionType.TRUE_FALSE, prompt: 'So far, most of the people using M-Pesa have used it to send small amounts of money.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], correctAnswers: ['TRUE'] },
  { id: 11, type: QuestionType.TRUE_FALSE, prompt: 'M-Pesa can only be used by people using one phone network.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], correctAnswers: ['FALSE'] },
  { id: 12, type: QuestionType.TRUE_FALSE, prompt: 'M-Pesa can be used to buy products and services.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], correctAnswers: ['FALSE'] },
  { id: 13, type: QuestionType.TRUE_FALSE, prompt: 'The GSM Association is a consumer organisation.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], correctAnswers: ['FALSE'] },
];

export const STAGES: Stage[] = [
  // Paragraph A
  { id: 1, type: 'reading_only', paragraphIds: ['A'], durationSeconds: 90, description: 'Read Paragraph A' },
  { id: 2, type: 'reading_answering', paragraphIds: ['A'], durationSeconds: 90, description: 'Answer Questions (Ref: Para A)' },
  // Paragraph B
  { id: 3, type: 'reading_only', paragraphIds: ['B'], durationSeconds: 90, description: 'Read Paragraph B' },
  { id: 4, type: 'reading_answering', paragraphIds: ['B'], durationSeconds: 90, description: 'Answer Questions (Ref: Para B)' },
  // Paragraph C
  { id: 5, type: 'reading_only', paragraphIds: ['C'], durationSeconds: 90, description: 'Read Paragraph C' },
  { id: 6, type: 'reading_answering', paragraphIds: ['C'], durationSeconds: 90, description: 'Answer Questions (Ref: Para C)' },
  // Paragraph D
  { id: 7, type: 'reading_only', paragraphIds: ['D'], durationSeconds: 90, description: 'Read Paragraph D' },
  { id: 8, type: 'reading_answering', paragraphIds: ['D'], durationSeconds: 90, description: 'Answer Questions (Ref: Para D)' },
  // Paragraph E
  { id: 9, type: 'reading_only', paragraphIds: ['E'], durationSeconds: 90, description: 'Read Paragraph E' },
  { id: 10, type: 'reading_answering', paragraphIds: ['E'], durationSeconds: 90, description: 'Answer Questions (Ref: Para E)' },
  // Final Review
  { id: 11, type: 'review', paragraphIds: ['A', 'B', 'C', 'D', 'E'], durationSeconds: 300, description: 'Final Review: All Paragraphs & Questions' },
];

// LISTENING DATA

export const MATCHING_OPTIONS = [
  { id: 'A', text: 'can reduce the effect of global warming' },
  { id: 'B', text: 'can be used an alternative energy resource' },
  { id: 'C', text: 'can make quick profits' },
  { id: 'D', text: 'can produce materials for plants to grow in' },
  { id: 'E', text: 'can be good for human health' },
  { id: 'F', text: 'can produce fertilizer' },
];

const Q1_2_OPTIONS = [
  'A. plants and fish are poisoned',
  'B. Farmers cannot fish',
  'C. the dam’s structure is damaged',
  'D. Electricity production is affected.',
  'E. electricity production is affected.'
];

export const LISTENING_QUESTIONS: Question[] = [
  // Questions 1-2 (Pick 2)
  { 
    id: 1, 
    type: QuestionType.MULTIPLE_CHOICE, 
    prompt: 'Which problem is caused by water hyacinth? (Selection 1)', 
    options: Q1_2_OPTIONS, 
    correctAnswers: [Q1_2_OPTIONS[1], Q1_2_OPTIONS[4]] // B and E
  },
  { 
    id: 2, 
    type: QuestionType.MULTIPLE_CHOICE, 
    prompt: 'Which problem is caused by water hyacinth? (Selection 2)', 
    options: Q1_2_OPTIONS, 
    correctAnswers: [Q1_2_OPTIONS[1], Q1_2_OPTIONS[4]] // B and E
  },
  // Questions 3-6 (Single Choice)
  { 
    id: 3, 
    type: QuestionType.MULTIPLE_CHOICE, 
    prompt: 'Where was water hyacinth originally from?', 
    options: ['A. latin America', 'B. Africa', 'C. Europe'], 
    correctAnswers: ['A. latin America'] 
  },
  { 
    id: 4, 
    type: QuestionType.MULTIPLE_CHOICE, 
    prompt: 'What is the primary cause of the decrease in nutrients from the soil?', 
    options: ['A. soil erosion', 'B. a change of rainfall', 'C. loss or trees'], 
    correctAnswers: ['C. loss or trees'] 
  },
  { 
    id: 5, 
    type: QuestionType.MULTIPLE_CHOICE, 
    prompt: 'When will the biological solution bring risks to the environment?', 
    options: ['A. immediately', 'B. 6 months later', 'C. many years later'], 
    correctAnswers: ['C. many years later'] 
  },
  { 
    id: 6, 
    type: QuestionType.MULTIPLE_CHOICE, 
    prompt: 'What does John say about the mechanical solution?', 
    options: ['A. ineffective', 'B. dangerous', 'C. expensive'], 
    correctAnswers: ['C. expensive'] 
  },
  // Questions 7-10 (Matching)
  { 
    id: 7, 
    type: QuestionType.MATCHING, 
    prompt: 'dried water hyacinth', 
    options: ['A', 'B', 'C', 'D', 'E', 'F'], 
    correctAnswers: ['D'] 
  },
  { 
    id: 8, 
    type: QuestionType.MATCHING, 
    prompt: 'mushroom farmers', 
    options: ['A', 'B', 'C', 'D', 'E', 'F'], 
    correctAnswers: ['C'] 
  },
  { 
    id: 9, 
    type: QuestionType.MATCHING, 
    prompt: 'oyster and straw mushrooms', 
    options: ['A', 'B', 'C', 'D', 'E', 'F'], 
    correctAnswers: ['E'] 
  },
  { 
    id: 10, 
    type: QuestionType.MATCHING, 
    prompt: 'cows', 
    options: ['A', 'B', 'C', 'D', 'E', 'F'], 
    correctAnswers: ['B'] 
  },
];