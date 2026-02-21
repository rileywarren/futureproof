import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const syllabusPath = process.argv[2] || '/Users/rileywarren/Downloads/futureproof-syllabus.docx';
const outputPath = process.argv[3] || path.resolve('src/data/courseData.js');

const TRACK_META = {
  1: {
    id: 'ai-automation',
    shortId: 'ai',
    title: 'AI & Intelligent Automation',
    icon: '⚡',
    color: '#E8FF47',
    colorMuted: '#E8FF4722',
    monthRanges: {
      1: [1, 2],
      2: [3, 4],
      3: [5, 8],
    },
  },
  2: {
    id: 'cyber',
    shortId: 'cyber',
    title: 'Next-Generation Cybersecurity',
    icon: '🛡️',
    color: '#47E8FF',
    colorMuted: '#47E8FF22',
    monthRanges: {
      1: [5, 8],
      2: [9, 10],
    },
  },
  3: {
    id: 'leadership',
    shortId: 'lead',
    title: 'Strategic Leadership & Executive Readiness',
    icon: '🎯',
    color: '#FF47E8',
    colorMuted: '#FF47E822',
    monthRanges: {
      1: [1, 4],
      2: [5, 10],
    },
  },
};

const URL_MAP = new Map(
  [
    ['andrej karpathy — neural networks: zero to hero', 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ'],
    ['the illustrated transformer', 'https://jalammar.github.io/illustrated-transformer/'],
    ["anthropic's research on mechanistic interpretability", 'https://www.anthropic.com/research'],
    ['3blue1brown — neural networks series', 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi'],
    ['chip huyen — designing machine learning systems', 'https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/'],
    ['anthropic prompt engineering guide', 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview'],
    ['deeplearning.ai — chatgpt prompt engineering for developers', 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/'],
    ['openai prompt engineering best practices', 'https://platform.openai.com/docs/guides/prompt-engineering'],
    ['lilian weng — prompt engineering', 'https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/'],
    ['dair.ai — prompt engineering guide', 'https://www.promptingguide.ai/'],
    ['anthropic tool use documentation', 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use'],
    ['langchain / langgraph agent documentation', 'https://langchain-ai.github.io/langgraph/'],
    ['deeplearning.ai — ai agents in langgraph', 'https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/'],
    ['andrew ng — agentic design patterns', 'https://www.deeplearning.ai/short-courses/ai-agentic-design-patterns-with-autogen/'],
    ['lilian weng — llm powered autonomous agents', 'https://lilianweng.github.io/posts/2023-06-23-agent/'],
    ['artificial analysis — model benchmarks & comparisons', 'https://artificialanalysis.ai/'],
    ['chatbot arena leaderboard', 'https://lmarena.ai/'],
    ['hugging face open llm leaderboard', 'https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard'],
    ["simon willison's blog — llm landscape analysis", 'https://simonwillison.net/tags/llms/'],
    ['stanford hai — ai index report', 'https://hai.stanford.edu/ai-index'],
    ['instructor library — structured outputs from llms', 'https://python.useinstructor.com/'],
    ['pydantic v2 documentation', 'https://docs.pydantic.dev/latest/'],
    ['httpx — async http client for python', 'https://www.python-httpx.org/'],
    ['pytest — testing ai applications', 'https://docs.pytest.org/en/stable/'],
    ['typer — cli application framework', 'https://typer.tiangolo.com/'],
    ["anthropic's contextual retrieval guide", 'https://docs.anthropic.com/en/docs/build-with-claude/context-windows'],
    ['deeplearning.ai — building & evaluating advanced rag', 'https://www.deeplearning.ai/short-courses/building-and-evaluating-advanced-rag-applications/'],
    ['chromadb documentation', 'https://docs.trychroma.com/'],
    ['llamaindex documentation — especially the rag evaluation framework', 'https://docs.llamaindex.ai/'],
    ['jerry liu — building production rag', 'https://www.youtube.com/results?search_query=Jerry+Liu+production+RAG'],
    ['n8n — workflow automation platform', 'https://n8n.io/'],
    ['temporal — durable workflow orchestration', 'https://temporal.io/'],
    ['claude code — agentic coding documentation', 'https://docs.anthropic.com/en/docs/claude-code/overview'],
    ['zapier / make.com for rapid prototyping', 'https://zapier.com/'],
    ['streamlit documentation', 'https://docs.streamlit.io/'],
    ['gradio documentation', 'https://www.gradio.app/docs'],
    ['fastapi for backend services', 'https://fastapi.tiangolo.com/'],
    ['docker fundamentals for deployment', 'https://docs.docker.com/get-started/'],
    ['basic ux principles for internal tools', 'https://www.nngroup.com/articles/ten-usability-heuristics/'],
    ['nist ai risk management framework (ai 100-1)', 'https://www.nist.gov/itl/ai-risk-management-framework'],
    ['eu ai act — full text and compliance guidance', 'https://artificialintelligenceact.eu/'],
    ['iso/iec 42001 — ai management systems standard', 'https://www.iso.org/standard/81230.html'],
    ['nist ai 600-1 — generative ai profile', 'https://www.nist.gov/itl/ai-risk-management-framework/ai-risk-management-framework-generative-ai-profile'],
    ['fedramp ai guidance (for government sector)', 'https://www.fedramp.gov/'],
    ['state-level ai legislation tracker', 'https://iapp.org/resources/article/us-state-ai-governance-legislation-tracker/'],
    ['owasp top 10 for llm applications (2025 edition)', 'https://genai.owasp.org/llm-top-10/'],
    ['mitre atlas — adversarial threat landscape for ai systems', 'https://atlas.mitre.org/'],
    ['gandalf ai red teaming challenge', 'https://gandalf.lakera.ai/'],
    ['hackaprompt — prompt injection competition', 'https://www.hackaprompt.com/'],
    ['trail of bits — ai/ml security research', 'https://blog.trailofbits.com/tags/machine-learning/'],
    ['nist ai 100-2 — adversarial machine learning', 'https://www.nist.gov/publications/adversarial-machine-learning-taxonomy-and-terminology-artificial-intelligence'],
    ["anthropic's research on model safety and jailbreaking", 'https://www.anthropic.com/research'],
    ["anthropic's core views on ai safety", 'https://www.anthropic.com/news/core-views-on-ai-safety'],
    ["google's responsible ai practices & model cards", 'https://ai.google/responsibilities/responsible-ai-practices/'],
    ['ibm ai fairness 360 toolkit', 'https://github.com/Trusted-AI/AIF360'],
    ['microsoft responsible ai standard', 'https://www.microsoft.com/en-us/ai/principles-and-approach'],
    ['partnership on ai — best practices', 'https://partnershiponai.org/'],
    ['algorithmic impact assessments — methodology guides', 'https://www.aialliance.org/'],
    ['world economic forum — ai governance alliance resources', 'https://initiatives.weforum.org/ai-governance-alliance/home'],
    ['oecd ai policy observatory', 'https://oecd.ai/en/'],
    ['board-level ai governance presentations from fortune 500 companies', 'https://www.sec.gov/edgar/search/'],
    ['gartner / forrester ai governance maturity models', 'https://www.gartner.com/en/topics/ai-governance'],
    ['nist sp 800-207 — zero trust architecture', 'https://csrc.nist.gov/publications/detail/sp/800-207/final'],
    ['cisa zero trust maturity model v2.0', 'https://www.cisa.gov/zero-trust-maturity-model'],
    ['sans sec530 — defensible security architecture and engineering', 'https://www.sans.org/cyber-security-courses/defensible-security-architecture-and-engineering/'],
    ['google beyondcorp papers (original and follow-ups)', 'https://research.google/pubs/beyondcorp-a-new-approach-to-enterprise-security/'],
    ['zscaler / cloudflare zero trust architecture guides (vendor-specific but instructive)', 'https://www.cloudflare.com/learning/access-management/what-is-zero-trust/'],
    ["evan gilman & doug barth — zero trust networks (o'reilly)", 'https://www.oreilly.com/library/view/zero-trust-networks/9781491962183/'],
    ['cis benchmarks for aws, azure, and gcp', 'https://www.cisecurity.org/cis-benchmarks'],
    ['practical devsecops — certified devsecops professional (cdp)', 'https://www.practical-devsecops.com/certified-devsecops-professional/'],
    ["kubernetes security — liz rice (o'reilly)", 'https://www.oreilly.com/library/view/kubernetes-security/9781492039075/'],
    ['terraform security scanning tools (tfsec, checkov, snyk)', 'https://developer.hashicorp.com/terraform/cli/commands/validate'],
    ['aws well-architected security pillar / azure security benchmark', 'https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html'],
    ['sans sec540 — cloud security and devsecops automation', 'https://www.sans.org/cyber-security-courses/cloud-security-devsecops-automation/'],
    ['nist ssdf — secure software development framework (sp 800-218)', 'https://csrc.nist.gov/publications/detail/sp/800-218/final'],
    ['slsa framework — supply chain levels for software artifacts (slsa.dev)', 'https://slsa.dev/'],
    ['openssf scorecard (securityscorecards.dev)', 'https://securityscorecards.dev/'],
    ['cisa sbom guidance and tooling', 'https://www.cisa.gov/sbom'],
    ['sigstore project — software signing and verification', 'https://www.sigstore.dev/'],
    ['in-toto — supply chain integrity framework', 'https://in-toto.io/'],
    ['owasp api security top 10 (2023)', 'https://owasp.org/API-Security/editions/2023/en/0x00-header/'],
    ['mitre atlas — ai adversarial threat matrix', 'https://atlas.mitre.org/'],
    ['apisec university (free courses)', 'https://www.apisecuniversity.com/'],
    ['oauth 2.0 simplified (oauth.com)', 'https://www.oauth.com/'],
    ['hacking apis — corey j. ball (no starch press)', 'https://nostarch.com/hacking-apis'],
    ['sans sec522 — application security', 'https://www.sans.org/cyber-security-courses/application-security-securing-web-apps-apis-microservices/'],
    ['research papers on ai-powered cyberattacks (arxiv, conference proceedings)', 'https://arxiv.org/search/?query=AI+cybersecurity+attacks&searchtype=all'],
    ['europol — ai in criminal tactics reports', 'https://www.europol.europa.eu/publications-events'],
    ['daniel miessler — ai security threat modeling frameworks', 'https://danielmiessler.com/'],
    ['sigma rules and detection engineering (sigmahq.io)', 'https://sigmahq.io/'],
    ['sans sec555 — siem with tactical analytics', 'https://www.sans.org/cyber-security-courses/siem-with-tactical-analytics/'],
    ['florian roth — detection engineering methodology', 'https://www.nextron-systems.com/'],
    ['elastic security labs — ml-based detection resources', 'https://www.elastic.co/security-labs'],
    ['nist post-quantum cryptography standards (fips 203, 204, 205)', 'https://csrc.nist.gov/projects/post-quantum-cryptography'],
    ['nsa cnsa 2.0 algorithm guidance', 'https://media.defense.gov/2022/Sep/07/2003071838/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF'],
    ['ibm quantum learning platform', 'https://learning.quantum.ibm.com/'],
    ['cloudflare — pqc migration blog series', 'https://blog.cloudflare.com/tag/post-quantum-cryptography/'],
    ['etsi quantum-safe cryptography standards', 'https://www.etsi.org/technologies/quantum-safe-cryptography'],
    ['specterops — bloodhound enterprise and attack path theory', 'https://specterops.io/bloodhound-enterprise/'],
    ['andy robbins — attack path analysis talks and papers', 'https://www.specterops.io/team/andy-robbins/'],
    ['microsoft itdr documentation', 'https://learn.microsoft.com/en-us/security/itdr/'],
    ['crowdstrike / sentinelone identity threat detection resources', 'https://www.crowdstrike.com/en-us/cybersecurity-101/identity-protection/identity-threat-detection-and-response-itdr/'],
    ['sans sec560 — network penetration testing (identity-focused sections)', 'https://www.sans.org/cyber-security-courses/enterprise-penetration-testing/'],
    ['fair institute resources and training (fairinstitute.org)', 'https://www.fairinstitute.org/'],
    ['open fair certification program', 'https://www.opengroup.org/certifications/openfair'],
    ["nacd director's handbook on cyber-risk oversight", 'https://www.nacdonline.org/insights/publications/directors-handbook-on-cyber-risk-oversight/'],
    ['jack jones — measuring and managing information risk (book)', 'https://www.risklens.com/resources/books/measuring-and-managing-information-risk'],
    ['richard seiersen — how to measure anything in cybersecurity risk', 'https://www.wiley.com/en-us/How+to+Measure+Anything+in+Cybersecurity+Risk-p-9781119085294'],
    ['study real board-level security presentations (sec filings, proxy statements)', 'https://www.sec.gov/edgar/search/'],
    ['nist csf 2.0 — especially the governance and program management sections', 'https://www.nist.gov/cyberframework'],
    ['cis controls v8 — implementation groups for program maturity', 'https://www.cisecurity.org/controls/v8'],
    ['andrew jaquith — security metrics: replacing fear, uncertainty, and doubt', 'https://www.pearson.com/en-us/subject-catalog/p/security-metrics-replacing-fear-uncertainty-and-doubt/P200000003736/9780321349989'],
    ['gartner security program effectiveness metrics', 'https://www.gartner.com/en/information-technology/insights/security'],
    ["phil venables' blog (philvenables.com) — board-level security strategy", 'https://www.philvenables.com/'],
    ['annie duke — thinking in bets', 'https://www.penguinrandomhouse.com/books/545847/thinking-in-bets-by-annie-duke/'],
    ['richard rumelt — good strategy bad strategy', 'https://www.goodstrategybadstrategy.com/'],
    ['stephen bungay — the art of action', 'https://www.amazon.com/Art-Action-Strategy-Management-Business/dp/1857885596'],
    ['shane parrish — the great mental models (farnam street)', 'https://fs.blog/mental-models/'],
    ['philip tetlock — superforecasting', 'https://www.penguinrandomhouse.com/books/239482/superforecasting-by-philip-e-tetlock-and-dan-gardner/'],
    ['chris voss — never split the difference', 'https://www.harpercollins.com/products/never-split-the-difference-chris-voss-tahl-raz'],
    ['robert cialdini — influence: the psychology of persuasion', 'https://www.influenceatwork.com/book/'],
    ['harvard business review — articles on influence and negotiation', 'https://hbr.org/topic/subject/negotiating'],
    ['william ury — getting past no', 'https://www.penguinrandomhouse.com/books/330982/getting-past-no-by-william-ury/'],
    ['study how top security leaders communicate: phil venables, wendy nather, bruce schneier, keren elazari', 'https://www.linkedin.com/'],
    ['david perell — write of passage (writing course)', 'https://writeofpassage.school/'],
    ['cfp submission guides for bsides, isaca, rsa conference, black hat', 'https://www.blackhat.com/call-for-papers.html'],
    ['julian shapiro — writing well (handbook)', 'https://www.julian.com/guide/write/intro'],
    ['personal branding frameworks for technical professionals', 'https://hbr.org/2014/08/a-new-approach-to-building-your-personal-brand'],
    ['will larson — an elegant puzzle: systems of engineering management', 'https://www.oreilly.com/library/view/an-elegant-puzzle/9781732265189/'],
    ["camille fournier — the manager's path", 'https://www.oreilly.com/library/view/the-managers-path/9781491973882/'],
    ['kim scott — radical candor', 'https://www.radicalcandor.com/the-book/'],
    ['patrick lencioni — the five dysfunctions of a team', 'https://www.tablegroup.com/product/dysfunctions/'],
    ['mckinsey / bcg frameworks applied to technology investment', 'https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights'],
    ['the business model canvas applied to security programs', 'https://www.strategyzer.com/library/the-business-model-canvas'],
    ['publicly available ciso budget presentations and frameworks', 'https://www.gartner.com/en/information-technology/topics/it-spending'],
    ['gartner it spending benchmarks for security', 'https://www.gartner.com/en/information-technology/insights/it-spending'],
    ['harvard business review — capital allocation and investment decision articles', 'https://hbr.org/topic/subject/capital-budgeting'],
    ['ians research network or equivalent ciso peer group', 'https://www.iansresearch.com/'],
    ['heidrick & struggles — ciso career path reports', 'https://www.heidrick.com/Knowledge-Center/Publication'],
    ['executive coaching resources and frameworks', 'https://www.icf.com/'],
    ['advisory board best practices', 'https://hbr.org/2020/04/do-you-need-an-advisory-board'],
    ['study career trajectories of cisos you admire', 'https://www.linkedin.com/'],
  ]
);

const DOMAIN_HINTS = [
  'docs.anthropic.com',
  'jalammar.github.io',
  'lilianweng.github.io',
  'promptingguide.ai',
  'artificialanalysis.ai',
  'lmarena.ai',
  'python.useinstructor.com',
  'docs.pydantic.dev',
  'docs.trychroma.com',
  'n8n.io',
  'streamlit.io',
  'gradio.app',
  'fairinstitute.org',
  'oauth.com',
  'sigmahq.io',
  'slsa.dev',
  'securityscorecards.dev',
  'philvenables.com',
  'simonwillison.net',
  'gandalf.lakera.ai',
  'artificialintelligenceact.eu',
];

function cleanLine(value) {
  const formFeed = String.fromCharCode(12);
  return value
    .replaceAll(formFeed, '')
    .replace(/\u00a0/g, ' ')
    .replace(/\t/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractDomain(line) {
  for (const hint of DOMAIN_HINTS) {
    if (line.toLowerCase().includes(hint.toLowerCase())) {
      return `https://${hint}`;
    }
  }
  const inParens = line.match(/\(([^()]+\.[a-z]{2,}[^()]*)\)/i);
  if (inParens) {
    let domain = inParens[1].trim();
    domain = domain.replace(/^(latest|full text and compliance guidance)\s*/i, '');
    domain = domain.split(/\s+/)[0].replace(/[),.;]+$/, '');
    if (!/^https?:\/\//i.test(domain)) {
      return `https://${domain}`;
    }
    return domain;
  }
  const bare = line.match(/\b([a-z0-9.-]+\.[a-z]{2,}(?:\/[a-z0-9_./?=&%-]*)?)\b/i);
  if (bare) {
    const raw = bare[1].replace(/[),.;]+$/, '');
    return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  }
  return null;
}

function classifyResource(name) {
  const n = name.toLowerCase();
  if (n.includes('youtube') || n.includes('video') || n.includes('talk')) return 'video';
  if (n.includes('book') || n.includes('o\'reilly') || n.includes('handbook')) return 'book';
  if (n.includes('documentation') || n.includes('docs') || n.includes('guide') || n.includes('framework') || n.includes('standard') || n.includes('benchmark')) return 'documentation';
  if (n.includes('course') || n.includes('training') || n.includes('certification')) return 'course';
  if (n.includes('tool') || n.includes('platform') || n.includes('library') || n.includes('bloodhound') || n.includes('streamlit') || n.includes('gradio') || n.includes('fastapi') || n.includes('docker') || n.includes('zapier')) return 'tool';
  if (n.includes('challenge') || n.includes('labs') || n.includes('self-directed') || n.includes('observe') || n.includes('study')) return 'practice';
  return 'article';
}

function resolveUrl(name, moduleId) {
  const key = name.toLowerCase();
  for (const [k, v] of URL_MAP.entries()) {
    if (key.includes(k)) {
      return v;
    }
  }

  if (key.includes('all previous module outputs')) {
    return `#/module/${moduleId}`;
  }
  if (key.includes('self-directed') || key.includes('map your current grc workflows') || key.includes('study real board-level security presentations') || key.includes('observe and document how effective security leaders') || key.includes('shadow a ciso') || key.includes('study career trajectories') || key.includes('experiment with ai-assisted')) {
    return '#/settings#self-directed-guidance';
  }

  const domainUrl = extractDomain(name);
  if (domainUrl) {
    return domainUrl;
  }

  return `https://duckduckgo.com/?q=${encodeURIComponent(name)}`;
}

function parseSyllabus(rawText) {
  const formFeed = String.fromCharCode(12);
  const text = rawText.replace(/\r/g, '\n').replaceAll(formFeed, '\n');
  const lines = text.split('\n').map(cleanLine).filter(Boolean);

  const course = {
    title: 'FUTUREPROOF',
    subtitle: "A Senior Security Professional's Roadmap to Lasting Relevance",
    version: '1.0',
    totalEstimatedHours: 0,
    tracks: [],
  };

  let currentTrack = null;
  let currentPhase = null;
  let currentModule = null;

  let mode = null;
  let awaitingTrackSubtitle = false;

  function finalizeModule() {
    if (!currentModule || !currentPhase) return;

    currentModule.description = currentModule.descriptionParts.join('\n\n').trim();
    currentModule.deliverable = currentModule.deliverableParts.join(' ').replace(/\s+/g, ' ').trim();

    delete currentModule.descriptionParts;
    delete currentModule.deliverableParts;

    currentPhase.modules.push(currentModule);
    currentModule = null;
  }

  function finalizePhase() {
    finalizeModule();
    if (!currentPhase || !currentTrack) return;
    currentTrack.phases.push(currentPhase);
    currentPhase = null;
  }

  function finalizeTrack() {
    finalizePhase();
    if (!currentTrack) return;
    currentTrack.description = currentTrack.descriptionParts.join('\n\n').trim();
    delete currentTrack.descriptionParts;
    course.tracks.push(currentTrack);
    currentTrack = null;
  }

  for (const line of lines) {
    if (/^RECOMMENDED TIMELINE$/i.test(line)) {
      break;
    }

    const trackMatch = line.match(/^TRACK\s+(\d)\s*:\s*(.+)$/i);
    if (trackMatch) {
      finalizeTrack();
      const trackNum = Number(trackMatch[1]);
      const meta = TRACK_META[trackNum];
      currentTrack = {
        ...meta,
        subtitle: '',
        description: '',
        descriptionParts: [],
        phases: [],
      };
      awaitingTrackSubtitle = true;
      mode = null;
      continue;
    }

    if (!currentTrack) {
      continue;
    }

    if (awaitingTrackSubtitle) {
      currentTrack.subtitle = line;
      awaitingTrackSubtitle = false;
      continue;
    }

    const phaseMatch = line.match(/^Phase\s+(\d+)\s*:\s*(.+?)\s*\(([^)]+)\)$/i);
    if (phaseMatch) {
      finalizePhase();
      const phaseNum = Number(phaseMatch[1]);
      const [startMonth, endMonth] = currentTrack.monthRanges[phaseNum] || [1, 1];
      currentPhase = {
        id: `${currentTrack.shortId}-phase-${phaseNum}`,
        order: phaseNum,
        title: `Phase ${phaseNum}: ${phaseMatch[2]}`,
        timeframe: phaseMatch[3],
        objective: '',
        timelineStartMonth: startMonth,
        timelineEndMonth: endMonth,
        modules: [],
      };
      mode = 'phase';
      continue;
    }

    if (line.startsWith('Objective:') && currentPhase) {
      currentPhase.objective = line.replace(/^Objective:\s*/i, '').trim();
      continue;
    }

    const moduleMatch = line.match(/^Module\s+(\d+)\.(\d+)\s+[—-]\s+(.+)$/i);
    if (moduleMatch && currentPhase) {
      finalizeModule();
      const phaseNum = Number(moduleMatch[1]);
      const moduleNum = Number(moduleMatch[2]);
      currentModule = {
        id: `${currentTrack.shortId}-${phaseNum}-${moduleNum}`,
        originalNumber: `${phaseNum}.${moduleNum}`,
        title: moduleMatch[3].trim(),
        duration: '',
        durationHours: 0,
        description: '',
        descriptionParts: [],
        resources: [],
        deliverable: '',
        deliverableParts: [],
        deliverableType: 'document',
      };
      mode = 'module';
      continue;
    }

    if (currentModule) {
      if (line.startsWith('Estimated Duration:')) {
        const duration = line.replace(/^Estimated Duration:\s*/i, '').trim();
        currentModule.duration = duration;
        const hoursMatch = duration.match(/(\d+(?:\.\d+)?)/);
        currentModule.durationHours = hoursMatch ? Number(hoursMatch[1]) : 0;
        mode = 'description';
        continue;
      }

      if (/^Resources:?$/i.test(line)) {
        mode = 'resources';
        continue;
      }

      if (/^Deliverable:?$/i.test(line)) {
        mode = 'deliverable';
        continue;
      }

      if (mode === 'description') {
        currentModule.descriptionParts.push(line);
        continue;
      }

      if (mode === 'resources') {
        if (line.startsWith('•')) {
          const rawName = line.replace(/^•\s*/, '').trim();
          currentModule.resources.push({
            type: classifyResource(rawName),
            name: rawName,
            url: resolveUrl(rawName, currentModule.id),
            isPrimary: true,
          });
        } else if (currentModule.resources.length > 0 && !/^Module\s+/i.test(line)) {
          const idx = currentModule.resources.length - 1;
          const combined = `${currentModule.resources[idx].name} ${line}`.replace(/\s+/g, ' ').trim();
          currentModule.resources[idx].name = combined;
          currentModule.resources[idx].type = classifyResource(combined);
          currentModule.resources[idx].url = resolveUrl(combined, currentModule.id);
        }
        continue;
      }

      if (mode === 'deliverable') {
        currentModule.deliverableParts.push(line);
        continue;
      }
    }

    if (!currentPhase) {
      currentTrack.descriptionParts.push(line);
    }
  }

  finalizeTrack();

  for (const track of course.tracks) {
    for (const phase of track.phases) {
      for (const module of phase.modules) {
        const lower = module.deliverable.toLowerCase();
        if (lower.includes('build') || lower.includes('tool') || lower.includes('pipeline')) {
          module.deliverableType = 'code';
        } else if (lower.includes('presentation') || lower.includes('slides')) {
          module.deliverableType = 'presentation';
        } else if (lower.includes('roadmap') || lower.includes('strategy') || lower.includes('policy')) {
          module.deliverableType = 'strategy';
        }
      }
    }
  }

  course.totalEstimatedHours = course.tracks
    .flatMap((track) => track.phases)
    .flatMap((phase) => phase.modules)
    .reduce((sum, module) => sum + (module.durationHours || 0), 0);

  return course;
}

function toModuleFile(courseObject) {
  const json = JSON.stringify(courseObject, null, 2);
  return `/**\n * FUTUREPROOF course data generated from syllabus source.\n * Source: ${syllabusPath}\n */\n\n/**\n * @typedef {Object} Resource\n * @property {'course'|'book'|'article'|'documentation'|'tool'|'practice'|'video'} type\n * @property {string} name\n * @property {string|null} url\n * @property {boolean} isPrimary\n * @property {string=} estimatedTime\n */\n\nexport const COURSE = ${json};\n\nexport function getAllModules() {\n  return COURSE.tracks.flatMap((track) =>\n    track.phases.flatMap((phase) =>\n      phase.modules.map((module) => ({\n        ...module,\n        trackId: track.id,\n        trackTitle: track.title,\n        trackColor: track.color,\n        phaseId: phase.id,\n        phaseTitle: phase.title,\n      }))\n    )\n  );\n}\n\nexport function getModuleById(id) {\n  for (const track of COURSE.tracks) {\n    for (const phase of track.phases) {\n      const module = phase.modules.find((item) => item.id === id);\n      if (module) {\n        return { module, phase, track };\n      }\n    }\n  }\n  return null;\n}\n\nexport function getAdjacentModules(moduleId) {\n  const allModules = getAllModules();\n  const index = allModules.findIndex((module) => module.id === moduleId);\n  return {\n    prev: index > 0 ? allModules[index - 1] : null,\n    next: index >= 0 && index < allModules.length - 1 ? allModules[index + 1] : null,\n  };\n}\n`;
}

const raw = execSync(`textutil -convert txt -stdout "${syllabusPath}"`, {
  encoding: 'utf8',
  maxBuffer: 1024 * 1024 * 25,
});

const course = parseSyllabus(raw);

const output = toModuleFile(course);
fs.writeFileSync(outputPath, output, 'utf8');

const diagnostics = {
  tracks: course.tracks.length,
  phases: course.tracks.reduce((sum, track) => sum + track.phases.length, 0),
  modules: course.tracks.flatMap((track) => track.phases).reduce((sum, phase) => sum + phase.modules.length, 0),
  resources: course.tracks.flatMap((track) => track.phases).flatMap((phase) => phase.modules).reduce((sum, module) => sum + module.resources.length, 0),
  totalEstimatedHours: course.totalEstimatedHours,
};

const unresolved = [];
for (const module of course.tracks.flatMap((track) => track.phases).flatMap((phase) => phase.modules)) {
  for (const resource of module.resources) {
    if (!resource.url) {
      unresolved.push({ moduleId: module.id, resource: resource.name });
    }
  }
}

console.log('Extracted course data:', diagnostics);
console.log('Unresolved resources:', unresolved.length);
if (unresolved.length) {
  console.log(unresolved.slice(0, 20));
}
console.log(`Wrote: ${outputPath}`);
