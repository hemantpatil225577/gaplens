import { BenchmarkScenario, AnalysisResult } from '../types';

export const BENCHMARK_SCENARIOS: BenchmarkScenario[] = [
  {
    id: 'scholarship-stem',
    tag: 'Core Reference Benchmark',
    title: 'State STEM Excellence Scholarship',
    description: 'A student researching university scholarship requirements where renewal conditions, tax document checklists, and application cycles are scattered and contradictory.',
    topic: 'What should I verify before applying for the State STEM Excellence Scholarship?',
    decisionGoal: 'Confirm eligibility, submit correct financial paperwork, and ensure 4-year funding continuity without risk of mid-degree revocation.',
    sampleFindingsSummary: 'Renewal rules unstated on official portal; conflicting income caps ($65k vs $80k); portal refers to outdated 2024 deadline.',
    sources: [
      {
        id: 'S1',
        title: 'State STEM Excellence Scholarship Portal (Official State Authority)',
        sourceType: 'official',
        url: 'https://state.highered.gov/funding/stem-excellence-portal',
        authorOrOrg: 'State Higher Education Assistance Agency (SHEAA)',
        dateOrCycle: 'Cycle 2024-2025 (Updated Nov 14, 2024)',
        content: `STATE STEM EXCELLENCE MERIT SCHOLARSHIP PROGRAM
Overview: The State STEM Excellence Scholarship provides up to $10,000 per academic year to high-achieving high school seniors entering an accredited in-state public university to pursue degrees in Science, Technology, Engineering, or Mathematics.

Eligibility Criteria:
1. Must be a legal resident of the state for at least 12 consecutive months prior to application.
2. Minimum cumulative high school GPA of 3.50 on a 4.0 scale upon graduation.
3. Household adjusted gross income (AGI) must not exceed $65,000 per annum.
4. Accepted into an approved undergraduate bachelor of science program (Computer Science, Biology, Chemistry, Physics, Mechanical/Electrical Engineering).

Required Application Materials:
- Official high school transcript submitted electronically by high school counselor.
- One personal statement essay (max 750 words) detailing commitment to state STEM workforce.
- Parent/Guardian W-2 wage statements from the most recent tax year.
- FAFSA completion confirmation page showing Student Aid Index (SAI).

Important Deadlines:
Applications for the upcoming cycle close strictly on December 15, 2024 at 11:59 PM EST. Late submissions will not be considered under any circumstances. Award disbursement will occur in August upon enrollment verification.`,
      },
      {
        id: 'S2',
        title: 'National Student Aid & Collegiate Grant Directory',
        sourceType: 'guide',
        url: 'https://nationalstudentaidguide.org/state-merit/stem-grants-2026',
        authorOrOrg: 'National Collegiate Aid Advisory Board',
        dateOrCycle: 'Published January 18, 2026',
        content: `Comprehensive Guide to State-Sponsored STEM Scholarships (2026 Edition):
The State STEM Excellence Scholarship remains one of the premier awards for prospective scientists and engineers.

Key 2026 Adjustments:
Following legislative budget increases in late 2025, the income qualification ceiling has been expanded: students with family household incomes up to $80,000 are now qualified to apply.
Documentation Requirement: The administering committee now requires full IRS Form 1040 federal income tax returns (schedules included) rather than employer W-2s, to verify true adjusted income.
Deadlines: For the 2026-2027 academic year, the priority application window closes on February 15, 2026, with decisions announced in April.
Note on Portals: Applicants must register via the new Statewide OneGateway Portal rather than the legacy department portal.`,
      },
      {
        id: 'S3',
        title: 'CollegeAdmit Student Forum & Peer Experience Thread',
        sourceType: 'forum',
        url: 'https://collegeadmit-community.org/t/state-stem-scholarship-warning/48291',
        authorOrOrg: 'Undergraduate Peer Advisory Network',
        dateOrCycle: 'Thread Active: March 12, 2026',
        content: `Thread: Warning to anyone banking on the State STEM Excellence Scholarship!
User @BioMajor25 wrote:
"Be super careful with this award! Everyone thinks it's a guaranteed $40,000 across four years, but nobody talks about the renewal trap. My roommate won it as a freshman. At the end of sophomore year, his GPA slipped to 3.42 (still honors, right?). The state revoked the entire junior and senior year scholarship immediately!
Nowhere on their public homepage did it say you need a 3.50 every single semester and at least 32 credits per academic year to renew. Also, if you switch from pure Mathematics to Data Analytics, they classify that as 'applied business' and claw back your grant.
Also heads up: the old portal at highered.gov still lists the 2024 deadline of Dec 15, which tricked three seniors from my old high school into thinking they missed it!"`,
      },
    ],
  },
  {
    id: 'clinical-trial',
    tag: 'Healthcare & Clinical Trials',
    title: 'Phase-II Targeted Immunotherapy Clinical Protocol',
    description: 'A patient evaluating whether to enroll in an experimental oncology trial where exclusion washouts, biomarker requirements, and emergency travel costs are unclear.',
    topic: 'What critical gaps and conflicting criteria should a patient verify before enrolling in the Phase-II CAR-T / Immunotherapy Trial?',
    decisionGoal: 'Ascertain clinical eligibility, understand dangerous washout exclusions, and clarify patient financial burdens for trial-related toxicity monitoring.',
    sampleFindingsSummary: 'Washout period conflicts (30 days vs 6 months); missing long-term neurotoxicity monitoring coverage; registry lists 2023 completion date.',
    sources: [
      {
        id: 'S1',
        title: 'National Clinical Trials Registry Protocol Record (Trial ID: NCT04928114)',
        sourceType: 'official',
        url: 'https://clinicaltrials.gov/study/NCT04928114',
        authorOrOrg: 'National Institutes of Health / Oncology Consortium',
        dateOrCycle: 'Last Update Posted: November 2023 (Status: Active)',
        content: `Trial Name: Phase II Multi-Center Study of CD19-Targeted Autologous T-Cell Infusion for Refractory B-Cell Neoplasms.
Inclusion Criteria:
- Age 18-70 years at time of consent.
- Histologically confirmed relapse following at least two lines of standard chemo-immunotherapy.
- ECOG Performance Status 0-1.
- Required Washout: At least 30 days must have elapsed since completion of prior systemic chemotherapy or anti-PD1/PDL1 monoclonal antibody therapy.

Primary Outcome Measures: Objective Response Rate (ORR) at 3 months post-infusion.
Estimated Primary Completion Date: December 2023.
Locations: 4 participating academic medical centers.`,
      },
      {
        id: 'S2',
        title: 'Patient Advocacy Oncology Bulletin & Advisory Guide',
        sourceType: 'guide',
        url: 'https://cancer-advocates-registry.org/trials/car-t-guidance-2026',
        authorOrOrg: 'Consortium of Rare Oncology Advocates',
        dateOrCycle: 'Published October 2025 (Revised Feb 2026)',
        content: `Patient Advisory on CD19 Trial Protocols:
Patients considering Phase II cellular therapies must exercise extreme care regarding prior systemic lines. Following the 2024 revised safety amendments from the safety monitoring board, several centers have extended the mandatory pre-infusion washout window: any patient who received checkpoint inhibitor immunotherapy within the prior 6 months is now strictly excluded to prevent fatal cytokine release syndrome (CRS).
Furthermore, while experimental cell manufacturing costs are sponsored by the trial sponsor, standard-of-care hospital bed fees, ICU stays for ICANS/CRS management, and bi-weekly lodging expenses during the 28-day mandatory observation radius are NOT covered by the sponsor and frequently trigger non-coverage disputes with private insurance carriers.`,
      },
      {
        id: 'S3',
        title: 'Investigational Site Patient Consent Addendum FAQ',
        sourceType: 'academic',
        url: 'https://memorial-research.edu/oncology/trial-04928-faq',
        authorOrOrg: 'Memorial Research Hospital Cellular Therapy Unit',
        dateOrCycle: 'Document Version 4.1 (Undated / Circa mid-2025)',
        content: `Frequently Asked Questions for Trial Participants:
Q: Who covers medical complications?
A: In the event of trial-related adverse events, immediate clinical stabilization will be provided. Your primary medical insurance carrier will be billed first for any associated inpatient hospitalization or monitoring labs.
Q: How long must I remain within hospital proximity?
A: Patients must remain within 60 minutes driving distance of the designated infusion center for at least 28 days following infusion. Emergency medication for neurotoxicity (tocilizumab) must be stocked on-site.`,
      },
    ],
  },
  {
    id: 'cloud-procurement',
    tag: 'Enterprise IT & Legal Procurement',
    title: 'Enterprise AI Cloud & Data Sovereignty MSA',
    description: 'An IT director procuring cloud AI infrastructure where data residency guarantees, SLA penalty credits, and AI model retraining terms conflict across contract documents.',
    topic: 'What hidden liabilities, conflicting SLA terms, and data gaps must be verified before signing the Cloud Platform Master Agreement?',
    decisionGoal: 'Ensure GDPR/HIPAA compliance, verify zero data leakage into AI foundation training, and secure enforceable SLA remedies.',
    sampleFindingsSummary: 'Residency clauses conflict (strict US isolation vs dynamic failover); missing SLA penalty calculation schedule; model retraining opt-out unverified.',
    sources: [
      {
        id: 'S1',
        title: 'HyperScale Cloud Platform Master Services Agreement (MSA v3.2)',
        sourceType: 'official',
        url: 'https://hyperscale-cloud.io/legal/msa-enterprise-v3',
        authorOrOrg: 'HyperScale Cloud Legal Operations',
        dateOrCycle: 'Effective Date: March 2024',
        content: `Master Services Agreement - Section 4: Data Processing & Location.
Customer Content stored in the Services will be held within Customer's selected primary region. However, to maintain business continuity, disaster recovery failover, and global load distribution, HyperScale may process and replicate encrypted metadata and transient telemetry streams to secondary data centers worldwide, including facilities located outside the primary jurisdiction.
Section 9: Service Level Availability.
HyperScale commits to 99.9% Monthly Uptime. In the event of failure to meet uptime, Customer's exclusive and sole remedy shall be eligible service credits, capped at a maximum of 10% of monthly recurring fees.`,
      },
      {
        id: 'S2',
        title: 'HyperScale Enterprise Security & Compliance Whitepaper',
        sourceType: 'academic',
        url: 'https://hyperscale-cloud.io/security/sovereignty-whitepaper-2025',
        authorOrOrg: 'Chief Information Security Office',
        dateOrCycle: 'Published September 2025',
        content: `Data Sovereignty Guarantee in HyperScale Sovereign Enclaves:
For enterprise customers with stringent regulatory obligations (such as EU GDPR or US Federal ITAR), HyperScale guarantees that 100% of customer data, including backups, failover replicas, and all diagnostic logs, remain physically and logically pinned inside the chosen geographical border. Zero cross-border transit occurs under any circumstance.
AI Governance: Customer inputs, prompts, and embeddings processed via dedicated LLM endpoints are strictly quarantined and never utilized for base model training or cross-customer model tuning.`,
      },
      {
        id: 'S3',
        title: 'Enterprise Tech CIO Advisory & Vendor Terms Review',
        sourceType: 'news',
        url: 'https://enterprisetech-review.com/cloud/hyperscale-hidden-clauses',
        authorOrOrg: 'Enterprise Tech Watchdog Editorial',
        dateOrCycle: 'Published January 14, 2026',
        content: `Hidden Gotchas in HyperScale's Standard Enterprise Contracts:
While HyperScale marketing aggressively advertises sovereign data enclaves, their binding legal MSA (Section 4) supersedes whitepaper promises. Many enterprise procurement officers fail to execute the separate 'Sovereign Enclave Custom Rider'—meaning default enterprise customers remain subject to worldwide replication.
Furthermore, their 10% SLA credit cap is among the most restrictive in the cloud sector and requires filing certified outage logs within 14 calendar days of incident, or all refund credits are forfeited.`,
      },
    ],
  },
  {
    id: 'visa-immigration',
    tag: 'Global Mobility & Immigration',
    title: 'High-Skilled Tech Worker Visa & Transition Policy',
    description: 'A software engineer planning a job transition on a specialized work visa where grace periods, prevailing wage thresholds, and apostille requirements are ambiguous.',
    topic: 'What critical deadlines, conflicting grace periods, and unstated requirements must be verified before resigning or switching sponsors?',
    decisionGoal: 'Maintain continuous legal lawful status, prevent unlawful presence accrual, and verify family dependent work rights.',
    sampleFindingsSummary: 'Conflicting grace period duration (30 vs 60 days); missing spouse work authorization renewal rules; outdated prevailing wage schedule.',
    sources: [
      {
        id: 'S1',
        title: 'Department of Immigration Official Policy Memorandum',
        sourceType: 'official',
        url: 'https://immigration.gov/policy/skilled-worker-transitions',
        authorOrOrg: 'Bureau of Citizenship & Immigration Services',
        dateOrCycle: 'Memorandum Date: October 2023 (Legacy Revision)',
        content: `Policy Guideline on Worker Departure and Status Termination:
A specialized visa holder whose employment terminates voluntarily or involuntarily is granted a discretionary grace period of up to 30 consecutive calendar days or until the expiration date of their current authorized stay, whichever is shorter. During this window, the foreign national may seek change of employer or prepare for voluntary departure. Accrual of unlawful presence begins on day 31.`,
      },
      {
        id: 'S2',
        title: 'Consular & Regulatory Modernization Rule Bulletin',
        sourceType: 'official',
        url: 'https://immigration.gov/updates/modernization-act-2025',
        authorOrOrg: 'Federal Visa Policy Directorate',
        dateOrCycle: 'Final Rule: Effective December 2025',
        content: `Federal Register: Modernization of Nonimmigrant Skilled Worker Regulations.
Under Section 214(n), the post-cessation transition window has been harmonized across all technical nonimmigrant categories to 60 consecutive calendar days (or expiration of approved petition).
New Requirement: Transfer petitions filed with the agency must now include an electronically certified Labor Condition Attestation with prevailing wage code adjusted for the 2026 percentile bracket.`,
      },
      {
        id: 'S3',
        title: 'Immigration Law Group Client Advisory Memorandum',
        sourceType: 'guide',
        url: 'https://globalmobility-law.com/advisories/2026-tech-worker-transfers',
        authorOrOrg: 'Miller & Associates Immigration Attorneys',
        dateOrCycle: 'Published February 2026',
        content: `Critical Traps in 2026 Tech Worker Job Transitions:
While the 2025 modernization rule introduced a 60-day grace period on paper, adjudicating field officers frequently issue Requests for Evidence (RFEs) if the previous employer formally revokes the underlying petition before the new petition is filed.
Crucial Dark Spot: No government bulletin clarifies what happens to dependent family members (H-4 / dependent visa holders) during the transition. If the primary worker enters a 60-day gap, dependent work authorization permits (EAD) fall into legal limbo, and continuing remote employment during this gap carries severe deportation risks.`,
      },
    ],
  },
];

// Rich pre-analyzed benchmark for instantaneous demonstration of the hackathon scenario
export const DEFAULT_PRECOMPUTED_SCHOLARSHIP_ANALYSIS: AnalysisResult = {
  overview: {
    topicSummary: 'Analysis of 3 multi-source documents regarding the State STEM Excellence Scholarship reveals critical eligibility coverage, but dangerous omissions regarding academic renewal criteria and conflicting financial verification documents.',
    sourcesAnalyzedCount: 3,
    criticalDarkSpotsCount: 4,
    potentialConflictsCount: 2,
    outdatedSourcesCount: 1,
    overallCompletenessScore: 42,
    decisionConfidenceNote: 'Sources are insufficient to make a safe 4-year financial commitment. Key renewal criteria and official 2026 deadlines are omitted or contradict each other.',
  },
  establishedFacts: [
    {
      id: 'F1',
      fact: 'The scholarship provides funding up to $10,000 per academic year for STEM undergraduate degrees at in-state public universities.',
      evidenceSnippet: 'The State STEM Excellence Scholarship provides up to $10,000 per academic year to high-achieving high school seniors entering an accredited in-state public university.',
      sourceIds: ['S1', 'S2'],
      consensusLevel: 'unanimous',
      confidence: 'high',
    },
    {
      id: 'F2',
      fact: 'A minimum high school cumulative GPA of 3.50 is required at the time of initial graduation/application.',
      evidenceSnippet: 'Minimum cumulative high school GPA of 3.50 on a 4.0 scale upon graduation.',
      sourceIds: ['S1'],
      consensusLevel: 'single_source',
      confidence: 'high',
    },
    {
      id: 'F3',
      fact: 'Applicant must be a legal resident of the state for at least 12 consecutive months.',
      evidenceSnippet: 'Must be a legal resident of the state for at least 12 consecutive months prior to application.',
      sourceIds: ['S1'],
      consensusLevel: 'single_source',
      confidence: 'high',
    },
  ],
  darkSpots: [
    {
      id: 'DS-1',
      category: 'Eligibility & Renewal',
      gapTitle: 'Undergraduate Renewal Thresholds & Pace of Progress Omitted',
      whyItMatters: 'A student may matriculate banking on $40,000 total aid, only to lose the award sophomore year if collegiate GPA falls below an unstated threshold (e.g. 3.50 cumulative).',
      severity: 'critical',
      missingDetails: [
        'Minimum collegiate semester or cumulative GPA required to renew',
        'Minimum credit hours required per academic year (e.g. 24 vs 30 vs 32 credits)',
        'Probationary period policy if a student suffers an illness or GPA drop',
        'Whether change of major within engineering/math leads to immediate grant revocation',
      ],
      suggestedQuestionsToAsk: [
        'What is the exact collegiate GPA required at the end of each academic year to maintain renewal?',
        'Does the scholarship committee grant a 1-semester grace period or probation before terminating funds?',
      ],
      recommendedSourceTypeToConsult: 'State Higher Education Assistance Agency Official Administrative Code / 2026 Renewal Policy Addendum',
    },
    {
      id: 'DS-2',
      category: 'Deadlines & Timelines',
      gapTitle: 'Official 2026-2027 Cycle Deadlines & Submission Portal Discrepancy',
      whyItMatters: 'Official portal S1 still advertises an expired December 15, 2024 deadline, potentially causing prospective students to believe the program is closed or use an abandoned application link.',
      severity: 'critical',
      missingDetails: [
        'Exact closing date and time for the 2026-2027 academic year cycle',
        'Whether the submission must occur via legacy site or new Statewide OneGateway',
        'Grace period for high school counselors submitting transcripts after student submission',
      ],
      suggestedQuestionsToAsk: [
        'What is the definitive deadline for the 2026-2027 award cycle?',
        'Which portal URL is currently active and accepting verified submissions?',
      ],
      recommendedSourceTypeToConsult: 'SHEAA Directorate direct helpline and the statewide OneGateway portal',
    },
    {
      id: 'DS-3',
      category: 'Financial & Costs',
      gapTitle: 'Over-Award and Displaceable Aid Stacking Policy Unstated',
      whyItMatters: 'If the university reduces institutional grant money when this state merit grant arrives ("scholarship displacement"), net out-of-pocket cost will not decrease.',
      severity: 'high',
      missingDetails: [
        'Whether this scholarship stacks on top of Pell Grants and university institutional honors awards',
        'Policy on summer session course tuition coverage',
        'Whether unused tuition funds can be applied toward room, board, or textbooks',
      ],
      suggestedQuestionsToAsk: [
        'Does your university financial aid office displace institutional need-based grants when this award is received?',
      ],
      recommendedSourceTypeToConsult: 'University Financial Aid Office Outside Scholarship Stacking Policy',
    },
    {
      id: 'DS-4',
      category: 'Required Documentation',
      gapTitle: 'Independent Student Status & Non-Custodial Parent Asset Guidelines Missing',
      whyItMatters: 'Students with divorced parents or independent status cannot determine whose income counts toward the household cap.',
      severity: 'moderate',
      missingDetails: [
        'Whether non-custodial parent income is counted toward the ceiling',
        'Criteria for qualifying as an independent student without parental W-2/1040',
      ],
      suggestedQuestionsToAsk: [
        'If parents are divorced, does the income threshold evaluate both parents or only the custodial parent?',
      ],
      recommendedSourceTypeToConsult: 'FAFSA Verification & State Residency Assessment Handbook',
    },
  ],
  conflictingClaims: [
    {
      id: 'CC-1',
      topic: 'Household Income Eligibility Ceiling',
      natureOfConflict: 'direct_contradiction',
      severity: 'high',
      claimA: {
        sourceId: 'S1',
        sourceTitle: 'State STEM Excellence Scholarship Portal (Official)',
        claimText: 'Household adjusted gross income (AGI) must not exceed $65,000 per annum.',
        exactQuote: 'Household adjusted gross income (AGI) must not exceed $65,000 per annum.',
        dateOrCycle: 'Cycle 2024-2025',
      },
      claimB: {
        sourceId: 'S2',
        sourceTitle: 'National Student Aid & Collegiate Grant Directory',
        claimText: 'Income qualification ceiling expanded to $80,000 per annum following 2025 legislative increases.',
        exactQuote: 'students with family household incomes up to $80,000 are now qualified to apply.',
        dateOrCycle: 'Published Jan 2026',
      },
      analysis: 'Source 1 contains legacy 2024 documentation with the older $65,000 threshold. Source 2 references 2026 legislative increases expanding it to $80,000, creating severe uncertainty for families earning between $65k-$80k.',
      resolutionAdvice: 'Confirm with the state authority whether the $80,000 statutory revision took legal effect for the 2026-2027 cycle before disqualifying yourself.',
    },
    {
      id: 'CC-2',
      topic: 'Mandatory Income Verification Document',
      natureOfConflict: 'different_conditions',
      severity: 'high',
      claimA: {
        sourceId: 'S1',
        sourceTitle: 'State STEM Excellence Scholarship Portal (Official)',
        claimText: 'Requires Parent/Guardian W-2 wage statements from the most recent tax year.',
        exactQuote: 'Parent/Guardian W-2 wage statements from the most recent tax year.',
        dateOrCycle: 'Cycle 2024-2025',
      },
      claimB: {
        sourceId: 'S2',
        sourceTitle: 'National Student Aid & Collegiate Grant Directory',
        claimText: 'Requires full IRS Form 1040 federal tax returns with schedules rather than W-2s.',
        exactQuote: 'The administering committee now requires full IRS Form 1040 federal income tax returns (schedules included) rather than employer W-2s',
        dateOrCycle: 'Published Jan 2026',
      },
      analysis: 'W-2 forms reflect only earned wage income, whereas Form 1040 captures business income, capital gains, and deductions. Submitting W-2s when 1040s are demanded can result in application rejection for incomplete paperwork.',
      resolutionAdvice: 'Prepare both recent W-2s and filed Form 1040 with all schedules to satisfy whichever verification document the new portal prompts.',
    },
  ],
  temporalWarnings: [
    {
      id: 'TW-1',
      sourceId: 'S1',
      sourceTitle: 'State STEM Excellence Scholarship Portal (Official State Authority)',
      statedDateOrCycle: 'Cycle 2024-2025 (Updated Nov 14, 2024)',
      warningType: 'expired_cycle',
      explanation: 'The official state portal document explicitly cites an expired deadline of December 15, 2024 and does not reflect 2026 legislative budget adjustments.',
      riskLevel: 'high',
      recommendedVerification: 'Check if an updated 2026-2027 cycle notice has been published on the state Department of Education or Higher Education agency subdomain.',
    },
    {
      id: 'TW-2',
      sourceId: 'S3',
      sourceTitle: 'CollegeAdmit Student Forum & Peer Experience Thread',
      statedDateOrCycle: 'Thread Active: March 12, 2026',
      warningType: 'undated_risk',
      explanation: 'While the forum post is recent (2026), it cites anecdotal historical experiences from 2023. Unofficial student forums may describe outdated internal enforcement practices.',
      riskLevel: 'medium',
      recommendedVerification: 'Verify specific forum claims (e.g. 3.50 college GPA renewal and credit pace) directly against the formal Administrative Rule Code.',
    },
  ],
  verificationChecklist: [
    {
      id: 'V1',
      priority: 'critical',
      actionItem: 'Request the official 2026-2027 Renewal & Retention Policy Bulletin from SHEAA.',
      targetEntityOrDocument: 'State Higher Education Assistance Agency (SHEAA) Academic Affairs',
      rationale: 'Verify whether a 3.5 collegiate GPA is strictly required to keep the scholarship for years 2-4 and if any probation grace period exists.',
      verified: false,
      relatedGapOrConflictId: 'DS-1',
    },
    {
      id: 'V2',
      priority: 'critical',
      actionItem: 'Confirm the current active application deadline and registration URL.',
      targetEntityOrDocument: 'Statewide OneGateway Portal & SHEAA Helpdesk',
      rationale: 'Official portal still displays expired Dec 15, 2024 deadline; guide suggests Feb 15, 2026.',
      verified: false,
      relatedGapOrConflictId: 'DS-2',
    },
    {
      id: 'V3',
      priority: 'high',
      actionItem: 'Confirm whether the household income eligibility ceiling is $65,000 or $80,000.',
      targetEntityOrDocument: '2026 State Legislative Appropriations Act / Scholarship Financial Rules',
      rationale: 'Resolves direct contradiction between S1 ($65k) and S2 ($80k).',
      verified: false,
      relatedGapOrConflictId: 'CC-1',
    },
    {
      id: 'V4',
      priority: 'high',
      actionItem: 'Clarify acceptable tax paperwork: Parent W-2 statements vs Federal Form 1040.',
      targetEntityOrDocument: 'SHEAA Document Upload Portal Requirements Section',
      rationale: 'Submitting only W-2 when Form 1040 is demanded causes automatic administrative rejection.',
      verified: false,
      relatedGapOrConflictId: 'CC-2',
    },
    {
      id: 'V5',
      priority: 'medium',
      actionItem: 'Check university scholarship displacement policy with prospective campus financial aid office.',
      targetEntityOrDocument: 'Target University Office of Financial Aid & Scholarships',
      rationale: 'Ensures the $10,000 award will not reduce university-awarded institutional aid.',
      verified: false,
      relatedGapOrConflictId: 'DS-3',
    },
  ],
  unansweredQuestions: [
    'What happens to scholarship funding if a student takes a medical leave of absence for one semester?',
    'Are Data Science and Bio-informatics programs eligible under the approved STEM major taxonomy?',
    'Is the $10,000 award taxable as unearned income if used for living expenses or campus room & board?',
    'Can a student appeal a revocation if an engineering curve pulls GPA to 3.48?',
  ],
  analyzedAt: '2026-10-31T06:30:00Z',
};
