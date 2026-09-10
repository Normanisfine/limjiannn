'use client';

import React from 'react';

import {
    Bot,
    MessageSquare,
    Server,
    Shield,
    GitBranch,
    Users,
    CheckCircle2,
    XCircle,
    ArrowRight,
    ArrowDown,
    RotateCw,
    ExternalLink,
    Lock,
    Sparkles,
    ListChecks,
    Package,
    HelpCircle,
    AlertTriangle,
} from 'lucide-react';

// -------- small reusable atoms -------- //

const Card = ({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={
            'glass-card p-6 md:p-8 border border-white/10 bg-linear-to-br from-white/5 to-transparent ' +
            className
        }
    >
        {children}
    </div>
);

const Pill = ({
    children,
    tone = 'default',
}: {
    children: React.ReactNode;
    tone?: 'default' | 'primary' | 'warn' | 'danger' | 'good';
}) => {
    const tones: Record<string, string> = {
        default: 'bg-white/5 text-foreground/70 border-white/10',
        primary: 'bg-primary/10 text-primary border-primary/30',
        warn: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30',
        danger: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
        good: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    };
    return (
        <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-full border ${tones[tone]}`}
        >
            {children}
        </span>
    );
};

const Section = ({
    id,
    title,
    icon,
    children,
    kicker,
}: {
    id: string;
    title: string;
    icon: React.ReactNode;
    kicker?: string;
    children: React.ReactNode;
}) => (
    <section
        id={id}
        className="scroll-mt-24"
    >
        <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/30 text-primary">
                {icon}
            </div>
            <div>
                {kicker && (
                    <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary/70">
                        {kicker}
                    </p>
                )}
                <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            </div>
        </div>
        {children}
    </section>
);

const CodeBlock = ({
    language,
    code,
}: {
    language?: string;
    code: string;
}) => (
    <div className="relative">
        {language && (
            <span className="absolute top-3 right-3 text-[10px] font-mono uppercase text-foreground/40 tracking-wider">
                {language}
            </span>
        )}
        <pre className="bg-black/40 border border-white/10 rounded-lg p-4 overflow-x-auto text-xs md:text-sm font-mono text-foreground/85 leading-relaxed">
            <code>{code}</code>
        </pre>
    </div>
);

// -------- page -------- //

export default function Team7AIPlan() {
    return (
        <main id="main" className="min-h-screen pb-32 pt-28 md:pt-32">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero */}
                <header
                    className="mb-16"
                >
                    <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-primary/70 mb-3">
                        OSPSD · HW3 · Submission 2
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-glow leading-tight">
                        Team 7 — AI Integration Plan
                    </h1>
                    <p className="text-foreground/60 text-base md:text-lg max-w-3xl leading-relaxed">
                        Wiring an LLM-backed assistant into our deployed Trello
                        issue-tracker service, plus a cross-vertical bridge to
                        the chat teams. Please review before we cut branches.
                    </p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <MetaCard
                            label="AI Integration (T1)"
                            value="Mingjian + Riddhi"
                            icon={<Bot size={18} />}
                        />
                        <MetaCard
                            label="Cross-Vertical (T2)"
                            value="Saakshi"
                            icon={<MessageSquare size={18} />}
                        />
                        <MetaCard
                            label="IaC & Tests (T3)"
                            value="Somaditya + Joshua"
                            icon={<Server size={18} />}
                        />
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2 text-xs">
                        <Pill tone="primary">LLM: Anthropic Claude</Pill>
                        <Pill tone="default">
                            Chat ABC:{' '}
                            <a
                                href="https://github.com/HarshithKoriRaj/Shared-API"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline decoration-dotted underline-offset-2 hover:text-primary"
                            >
                                chat_client_api
                            </a>
                        </Pill>
                        <Pill tone="good">No extra cross-team coordination</Pill>
                    </div>
                </header>

                {/* TOC */}
                <nav className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    {[
                        ['tldr', 'TL;DR'],
                        ['feature', 'What AI does'],
                        ['examples', 'Use examples'],
                        ['tracks', 'Work tracks'],
                        ['depends', 'Depends on chat?'],
                        ['components', 'What T1 builds'],
                        ['userflow', 'User flow'],
                        ['dataflow', 'Data flow'],
                        ['safety', 'Safety'],
                        ['done', 'Done criteria'],
                        ['open', 'Open decisions'],
                    ].map(([id, label]) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className="px-3 py-2 rounded-md bg-white/5 hover:bg-primary/10 hover:text-primary border border-white/5 hover:border-primary/30 text-foreground/60 transition-all font-mono text-center"
                        >
                            {label}
                        </a>
                    ))}
                </nav>

                <div className="space-y-20">
                    <TLDR />
                    <FeatureGoals />
                    <UseExamples />
                    <WorkDistribution />
                    <DependsOnChat />
                    <Components />
                    <UserFlow />
                    <DataFlow />
                    <Safety />
                    <DoneCriteria />
                    <OpenDecisions />
                </div>
            </div>
        </main>
    );
}

// -------- header meta card -------- //

const MetaCard = ({
    label,
    value,
    icon,
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
}) => (
    <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>
        <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-foreground/50">
                {label}
            </p>
            <p className="font-semibold">{value}</p>
        </div>
    </div>
);

// -------- sections -------- //

const TLDR = () => (
    <Section id="tldr" title="TL;DR" icon={<Sparkles size={20} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
                <p className="font-mono text-[11px] uppercase tracking-wider text-primary/80 mb-2">
                    Three tracks, in parallel
                </p>
                <p className="text-foreground/80 leading-relaxed">
                    HW3 Submission 2 splits into{' '}
                    <strong>T1 AI</strong>, <strong>T2 Cross-Vertical (Chat)</strong>,
                    and <strong>T3 IaC &amp; Tests</strong>. Each is its own
                    feature branch and can merge independently.
                </p>
            </Card>
            <Card>
                <p className="font-mono text-[11px] uppercase tracking-wider text-primary/80 mb-2">
                    T1 does not wait on T2
                </p>
                <p className="text-foreground/80 leading-relaxed">
                    AI integration codes against the already-published{' '}
                    <code className="font-mono text-primary">chat_client_api</code>{' '}
                    ABC. It ships with a <code className="font-mono">MockChatClient</code>{' '}
                    for tests. Swapping to a real chat impl is a one-line DI
                    change — <strong>zero</strong> AI code changes.
                </p>
            </Card>
            <Card>
                <p className="font-mono text-[11px] uppercase tracking-wider text-primary/80 mb-2">
                    Two new components + one route
                </p>
                <p className="text-foreground/80 leading-relaxed">
                    T1 adds{' '}
                    <code className="font-mono text-primary">ai_client_api/</code> (ABC) and{' '}
                    <code className="font-mono text-primary">claude_ai_client_impl/</code>{' '}
                    as workspace members, plus a new{' '}
                    <code className="font-mono">POST /ai/chat</code> route in{' '}
                    <code className="font-mono">issue_tracker_service</code>.
                </p>
            </Card>
            <Card>
                <p className="font-mono text-[11px] uppercase tracking-wider text-primary/80 mb-2">
                    Same discipline as HW1/HW2
                </p>
                <p className="text-foreground/80 leading-relaxed">
                    Interface-vs-implementation split, dependency injection,
                    swappable providers. Claude today, OpenAI / Gemini later
                    behind the same ABC.
                </p>
            </Card>
        </div>
    </Section>
);

// -------- feature goals -------- //

const FeatureGoals = () => {
    const goals = [
        {
            title: 'Summarize',
            desc: 'Compress a board or list of tickets into a standup-style digest.',
        },
        {
            title: 'Triage',
            desc: 'Label tickets as bug / feature / docs / noise and recommend what to work on next.',
        },
        {
            title: 'Answer questions',
            desc: 'Factual queries over tickets — "what\'s overdue?", "who owns #17?".',
        },
        {
            title: 'Create / update',
            desc: 'Open new tickets or move existing ones through status columns from free-form text.',
        },
        {
            title: 'Cross-vertical notify',
            desc: 'Post a summary or alert into a chat channel. (This is the required cross-vertical piece.)',
        },
    ];
    const nonGoals = [
        'No deletes. delete_* tools are not exposed to the LLM this sprint.',
        'No streaming responses — one request, one reply.',
        'No multi-turn conversation memory. Each /ai/chat call is stateless.',
        'No autonomous / scheduled AI runs. Only user-triggered.',
    ];
    return (
        <Section
            id="feature"
            title="What the AI feature does"
            icon={<Bot size={20} />}
            kicker="Capabilities"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {goals.map((g) => (
                    <div
                        key={g.title}
                        className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-primary/30 transition-colors"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <h3 className="font-semibold">{g.title}</h3>
                        </div>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                            {g.desc}
                        </p>
                    </div>
                ))}
            </div>

            <Card className="border-yellow-500/20 bg-yellow-500/3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-yellow-400/90 mb-3">
                    Non-goals for Submission 2
                </p>
                <ul className="space-y-2">
                    {nonGoals.map((n) => (
                        <li
                            key={n}
                            className="flex items-start gap-2 text-sm text-foreground/75"
                        >
                            <XCircle
                                size={16}
                                className="text-yellow-400/70 shrink-0 mt-0.5"
                            />
                            <span>{n}</span>
                        </li>
                    ))}
                </ul>
            </Card>
        </Section>
    );
};

// -------- use examples -------- //

type Example = {
    title: string;
    tone: 'read' | 'write';
    request: string;
    tools: string[];
    reply: string;
};

const examples: Example[] = [
    {
        title: '1 · Standup summary',
        tone: 'read',
        request: `POST /ai/chat
X-Session-Token: <user session>

{
  "prompt": "Give me a one-paragraph summary of what's in progress on board abc123 for today's standup.",
  "board_id": "abc123"
}`,
        tools: ['list_issues_on_board(board_id="abc123")'],
        reply: `{
  "reply": "Three items are in progress on board abc123. Riddhi is wrapping up the OAuth callback fix (expected today). Saakshi is mid-way through the chat integration stub. Joshua is debugging the Render healthcheck; two blockers noted there.",
  "actions": [{ "tool": "list_issues_on_board", "ok": true }],
  "truncated": false
}`,
    },
    {
        title: '2 · Triage (bug / feature / docs)',
        tone: 'read',
        request: `POST /ai/chat
{
  "prompt": "Look at open issues on board abc123 and tell me which ones are bugs vs features vs docs. Recommend one to start on.",
  "board_id": "abc123"
}`,
        tools: [
            'list_issues_on_board(board_id="abc123")',
            'get_issue(issue_id="…")   // for any it wants more detail on',
        ],
        reply: `{
  "reply": "Bugs (3): #12 OAuth redirect loop, #17 Empty-board crash, #22 Stale session token. Features (2): #19 Due-date filter, #25 Bulk status update. Docs (1): #20 README typo. Start with #17 — it's a crash reproducible on any empty board.",
  "actions": [
    { "tool": "list_issues_on_board", "ok": true },
    { "tool": "get_issue", "ok": true }
  ]
}`,
    },
    {
        title: '3 · Cross-vertical notify (chat)',
        tone: 'write',
        request: `POST /ai/chat
{
  "prompt": "Post a summary of overdue tickets on board abc123 to #eng.",
  "board_id": "abc123",
  "channel_id": "C0123ENG"
}`,
        tools: [
            'list_issues_on_board(board_id="abc123")',
            'send_chat_message(channel_id="C0123ENG", text="…")',
        ],
        reply: `{
  "reply": "Posted to #eng: 4 overdue tickets (#12, #17, #22, #27). Oldest is #12 (4 days overdue).",
  "actions": [
    { "tool": "list_issues_on_board", "ok": true },
    { "tool": "send_chat_message", "ok": true }
  ]
}`,
    },
    {
        title: '4 · Ticket from chat report',
        tone: 'write',
        request: `POST /ai/chat
{
  "prompt": "A user in #support reported: 'the export-to-CSV button crashes on Safari'. Open a bug ticket for this on board abc123, in the To Do column.",
  "board_id": "abc123"
}`,
        tools: [
            'create_issue(title="Export-to-CSV crashes on Safari", board_id="abc123", desc="Reported in #support: …", status=TO_DO)',
        ],
        reply: `{
  "reply": "Created ticket #32 'Export-to-CSV crashes on Safari' in the To Do column of board abc123.",
  "actions": [ { "tool": "create_issue", "ok": true } ]
}`,
    },
    {
        title: '5 · Status update',
        tone: 'write',
        request: `POST /ai/chat
{ "prompt": "Move ticket 17 to Done." }`,
        tools: ['update_issue_status(issue_id="17", status=DONE)'],
        reply: `{
  "reply": "Moved ticket #17 to Done.",
  "actions": [ { "tool": "update_issue_status", "ok": true } ]
}`,
    },
    {
        title: '6 · Chat → candidate bugs',
        tone: 'read',
        request: `POST /ai/chat
{
  "prompt": "Summarize the last 20 messages in channel C0123SUPPORT and tell me if any look like bug reports I should file.",
  "channel_id": "C0123SUPPORT"
}`,
        tools: ['get_recent_messages(channel_id="C0123SUPPORT", limit=20)'],
        reply: `{
  "reply": "Two messages look like bug reports worth filing: (a) 'export-to-CSV crashes on Safari' — reproducible, user attached console log; (b) 'login sometimes loops back to /auth/login' — one report, needs more info. The other 18 are questions, acks, and chatter.",
  "actions": [ { "tool": "get_recent_messages", "ok": true } ]
}`,
    },
];

const UseExamples = () => (
    <Section
        id="examples"
        title="Use examples"
        icon={<MessageSquare size={20} />}
        kicker="What a user sees"
    >
        <div className="space-y-5">
            {examples.map((ex) => (
                <Card key={ex.title}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <h3 className="text-lg font-semibold">{ex.title}</h3>
                        <Pill tone={ex.tone === 'write' ? 'warn' : 'good'}>
                            {ex.tone === 'write'
                                ? 'mutating'
                                : 'read-only'}
                        </Pill>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <p className="text-[11px] font-mono uppercase tracking-wider text-foreground/50 mb-2">
                                Request
                            </p>
                            <CodeBlock language="http" code={ex.request} />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[11px] font-mono uppercase tracking-wider text-foreground/50 mb-2">
                                    Tools the AI calls
                                </p>
                                <ul className="space-y-1.5 bg-black/30 border border-white/10 rounded-lg p-3">
                                    {ex.tools.map((t) => (
                                        <li
                                            key={t}
                                            className="font-mono text-xs text-primary/90 flex items-start gap-2"
                                        >
                                            <ArrowRight
                                                size={14}
                                                className="mt-0.5 shrink-0 text-primary/60"
                                            />
                                            <span className="break-all">
                                                {t}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="text-[11px] font-mono uppercase tracking-wider text-foreground/50 mb-2">
                                    Reply
                                </p>
                                <CodeBlock language="json" code={ex.reply} />
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    </Section>
);

// -------- work distribution -------- //

const WorkDistribution = () => {
    const tracks = [
        {
            tag: 'T1',
            name: 'AI Integration',
            owners: 'Mingjian + Riddhi',
            branch: 'feat/ai-integration',
            tone: 'primary' as const,
            bullets: [
                'Build ai_client_api/ (ABC) and claude_ai_client_impl/ (Anthropic).',
                'Mount POST /ai/chat on the existing service.',
                'Tool-calling loop, sanitization, allow-list, read-only mode.',
                'Unit + integration tests against MockChatClient.',
            ],
        },
        {
            tag: 'T2',
            name: 'Cross-Vertical (Chat)',
            owners: 'Saakshi',
            branch: 'feat/cross-vertical-chat',
            tone: 'default' as const,
            bullets: [
                'Pull a chat team\'s concrete ChatClient via chat_client_api uv git dep.',
                'Swap MockChatClient → real impl in service wiring (one-line DI change).',
                'Integration tests that actually post to a real channel.',
            ],
        },
        {
            tag: 'T3',
            name: 'IaC & Tests (incl. databases)',
            owners: 'Somaditya + Joshua',
            branch: 'feat/iac-telemetry',
            tone: 'default' as const,
            bullets: [
                'Terraform / Render config for ANTHROPIC_API_KEY + chat creds.',
                'Database provisioning.',
                'OpenTelemetry (latency, success, failure) + dashboard.',
                'End-to-end tests on the deployed service.',
            ],
        },
    ];

    return (
        <Section
            id="tracks"
            title="Work distribution"
            icon={<Users size={20} />}
            kicker="Three branches, one main"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
                {tracks.map((t) => (
                    <div
                        key={t.tag}
                        className={
                            'p-5 rounded-xl border ' +
                            (t.tone === 'primary'
                                ? 'border-primary/40 bg-primary/5'
                                : 'border-white/10 bg-white/5')
                        }
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <span
                                className={
                                    'px-2 py-0.5 text-xs font-mono rounded ' +
                                    (t.tone === 'primary'
                                        ? 'bg-primary text-background'
                                        : 'bg-white/10 text-foreground/70')
                                }
                            >
                                {t.tag}
                            </span>
                            <h3 className="font-semibold">{t.name}</h3>
                        </div>
                        <p className="text-sm text-foreground/80 mb-1">
                            <span className="text-foreground/50">Owners · </span>
                            {t.owners}
                        </p>
                        <p className="text-xs font-mono text-foreground/50 mb-4 flex items-center gap-1">
                            <GitBranch size={12} /> {t.branch}
                        </p>
                        <ul className="space-y-1.5">
                            {t.bullets.map((b) => (
                                <li
                                    key={b}
                                    className="text-xs text-foreground/70 flex items-start gap-2"
                                >
                                    <span className="w-1 h-1 rounded-full bg-foreground/40 mt-1.5 shrink-0" />
                                    <span>{b}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Compare table */}
            <Card>
                <p className="text-[11px] font-mono uppercase tracking-wider text-primary/80 mb-4">
                    T1 vs T2 at a glance
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-foreground/50 text-left">
                                <th className="py-2 pr-4 font-medium"></th>
                                <th className="py-2 pr-4 font-medium">T1 — AI</th>
                                <th className="py-2 font-medium">
                                    T2 — Cross-Vertical
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[
                                [
                                    'Scope',
                                    'Cognitive layer (Claude + tool calling)',
                                    'Wire a real chat provider into the app',
                                ],
                                [
                                    'Main dep',
                                    'Anthropic SDK + two ABCs',
                                    "One chat team's concrete impl",
                                ],
                                [
                                    'Uses a mock?',
                                    'Yes — MockChatClient',
                                    "No — that's the point",
                                ],
                                ['Blocks the other?', 'No', 'No'],
                                [
                                    'Can merge first?',
                                    'Yes (ships with mocks)',
                                    'Usually merges after T1',
                                ],
                            ].map(([k, a, b]) => (
                                <tr key={k}>
                                    <td className="py-2 pr-4 text-foreground/60">
                                        {k}
                                    </td>
                                    <td className="py-2 pr-4">{a}</td>
                                    <td className="py-2">{b}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </Section>
    );
};

// -------- depends on chat -------- //

const DependsOnChat = () => (
    <Section
        id="depends"
        title="Does AI integration depend on the chat vertical?"
        icon={<HelpCircle size={20} />}
        kicker="The short answer"
    >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <Card className="border-emerald-500/30 bg-emerald-500/4">
                <div className="flex items-center gap-3 mb-3">
                    <CheckCircle2
                        size={28}
                        className="text-emerald-400 shrink-0"
                    />
                    <p className="text-2xl font-bold text-emerald-300">
                        No. Work ahead.
                    </p>
                </div>
                <p className="text-sm text-foreground/75 leading-relaxed mb-4">
                    The only thing we need from the chat side is the{' '}
                    <strong>ABC</strong>, which is already published and
                    frozen:
                </p>
                <CodeBlock
                    language="python"
                    code={`from chat_client_api import ChatClient, Channel, Message, ChatError`}
                />
                <p className="text-sm text-foreground/75 leading-relaxed mt-4">
                    <code className="font-mono text-primary">
                        ClaudeAIClient
                    </code>{' '}
                    takes a <code className="font-mono">ChatClient</code> by
                    constructor injection. It never imports a specific
                    provider. On T1 we inject{' '}
                    <code className="font-mono">MockChatClient</code>; on T2 we
                    inject a real impl. Same interface, no AI code changes.
                </p>
            </Card>

            {/* Hand-built dependency diagram */}
            <Card>
                <p className="text-[11px] font-mono uppercase tracking-wider text-primary/80 mb-5">
                    Who uses vs. who implements
                </p>
                <DependencyDiagram />
                <div className="mt-5 space-y-2 text-xs text-foreground/70">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-0.5 bg-primary" />
                        <span>solid = uses</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-0.5 border-t border-dashed border-foreground/50" />
                        <span>dashed = implements</span>
                    </div>
                </div>
            </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="border-emerald-500/20">
                <p className="text-[11px] font-mono uppercase tracking-wider text-emerald-400/80 mb-2">
                    What T1 is blocked on
                </p>
                <p className="text-foreground/80 leading-relaxed">
                    <strong>Nothing.</strong> The shared{' '}
                    <code className="font-mono">chat_client_api</code> repo is
                    our agreed contract — no additional sync with any chat
                    team is needed. T1 codes against the ABC, ships{' '}
                    <code className="font-mono">MockChatClient</code> in tests,
                    merges independently.
                </p>
            </Card>
            <Card className="border-yellow-500/20">
                <p className="text-[11px] font-mono uppercase tracking-wider text-yellow-400/80 mb-2">
                    What if T2 slipped?
                </p>
                <p className="text-foreground/80 leading-relaxed">
                    We can still demo Submission 2: AI reads/writes tickets
                    correctly, and chat tools are exercised against the mock in
                    integration tests. We just wouldn&apos;t have a{' '}
                    <strong>live</strong> chat post in the demo.
                </p>
            </Card>
        </div>
    </Section>
);

const DependencyDiagram = () => (
    <div className="flex flex-col items-center gap-2 py-4 select-none">
        {/* T1 top */}
        <DiagramBox
            tone="primary"
            title="T1 · ClaudeAIClient"
            subtitle="Mingjian + Riddhi"
        />
        <DiagramArrow label="uses" />

        {/* ABC center */}
        <DiagramBox
            tone="neutral-strong"
            title="chat_client_api.ChatClient"
            subtitle="frozen ABC"
            mono
        />

        {/* Two implements arrows + two impls */}
        <div className="w-full flex justify-center relative my-1">
            <svg
                viewBox="0 0 200 40"
                width="100%"
                className="max-w-[300px]"
                preserveAspectRatio="none"
            >
                <defs>
                    <marker
                        id="dep-arrow"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="5"
                        markerHeight="5"
                        orient="auto-start-reverse"
                    >
                        <path
                            d="M 0 0 L 10 5 L 0 10 z"
                            fill="rgba(248,250,252,0.6)"
                        />
                    </marker>
                </defs>
                <path
                    d="M 50 35 Q 50 20 100 5"
                    stroke="rgba(248,250,252,0.5)"
                    strokeWidth="1.2"
                    fill="none"
                    strokeDasharray="4 4"
                    markerEnd="url(#dep-arrow)"
                />
                <path
                    d="M 150 35 Q 150 20 100 5"
                    stroke="rgba(248,250,252,0.5)"
                    strokeWidth="1.2"
                    fill="none"
                    strokeDasharray="4 4"
                    markerEnd="url(#dep-arrow)"
                />
                <text
                    x="62"
                    y="28"
                    fill="rgba(248,250,252,0.55)"
                    fontSize="7"
                    fontFamily="var(--font-mono)"
                >
                    implements
                </text>
                <text
                    x="120"
                    y="28"
                    fill="rgba(248,250,252,0.55)"
                    fontSize="7"
                    fontFamily="var(--font-mono)"
                >
                    implements
                </text>
            </svg>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
            <DiagramBox
                tone="neutral"
                title="MockChatClient"
                subtitle="ships with T1"
            />
            <DiagramBox
                tone="neutral"
                title="Real chat impl"
                subtitle="T2 · Saakshi"
            />
        </div>
    </div>
);

const DiagramBox = ({
    title,
    subtitle,
    tone = 'neutral',
    mono = false,
}: {
    title: string;
    subtitle?: string;
    tone?: 'primary' | 'neutral' | 'neutral-strong';
    mono?: boolean;
}) => {
    const tones = {
        primary: 'border-primary/50 bg-primary/10 text-primary',
        neutral: 'border-white/10 bg-white/5 text-foreground/90',
        'neutral-strong':
            'border-accent/40 bg-accent/10 text-foreground font-semibold',
    };
    return (
        <div
            className={`w-full rounded-lg px-4 py-3 border text-center ${tones[tone]}`}
        >
            <p className={`text-sm ${mono ? 'font-mono' : 'font-semibold'}`}>
                {title}
            </p>
            {subtitle && (
                <p className="text-[10px] font-mono text-foreground/50 mt-0.5">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

const DiagramArrow = ({ label }: { label?: string }) => (
    <div className="flex flex-col items-center text-foreground/60">
        {label && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-primary/70 mb-0.5">
                {label}
            </span>
        )}
        <ArrowDown size={18} className="text-primary/70" />
    </div>
);

// -------- components built by T1 -------- //

const Components = () => {
    const tools: [string, 'read' | 'write', string][] = [
        ['list_boards', 'read', 'Client.get_boards()'],
        ['get_board', 'read', 'Client.get_board(board_id)'],
        ['list_issues_on_board', 'read', 'Client.get_issues(board_id)'],
        ['get_issue', 'read', 'Client.get_issue(issue_id)'],
        ['create_issue', 'write', 'Client.create_issue(…)'],
        [
            'update_issue_status',
            'write',
            'Client.update_issue(issue_id, status=…)',
        ],
        ['list_channels', 'read', 'ChatClient.get_channels()'],
        ['get_channel', 'read', 'ChatClient.get_channel(channel_id)'],
        [
            'get_recent_messages',
            'read',
            'ChatClient.get_messages(channel_id, limit, cursor?)',
        ],
        [
            'send_chat_message',
            'write',
            'ChatClient.send_message(channel_id, text)',
        ],
    ];

    return (
        <Section
            id="components"
            title="What T1 builds"
            icon={<Package size={20} />}
            kicker="Two components + one route"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
                <Card>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-primary/80 mb-2">
                        1 · ai_client_api/
                    </p>
                    <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
                        The stable, provider-agnostic contract. Zero runtime
                        deps.
                    </p>
                    <CodeBlock
                        code={`components/ai_client_api/
├── src/ai_client_api/
│   ├── client.py       # AIClient ABC + get_client factory
│   ├── types.py        # AIMessage, ToolCall, ToolResult, AIReply
│   ├── tool.py         # Tool dataclass / Protocol
│   ├── sanitize.py     # context scrubbing + truncation
│   └── exceptions.py   # AIError hierarchy
└── tests/`}
                    />
                    <div className="mt-4">
                        <p className="text-[11px] font-mono uppercase tracking-wider text-foreground/50 mb-2">
                            Contract
                        </p>
                        <CodeBlock
                            language="python"
                            code={`class AIClient(ABC):
    @abstractmethod
    def send_message(
        self,
        prompt: str,
        context: dict[str, Any] | None = None,
    ) -> AIReply: ...`}
                        />
                    </div>
                </Card>

                <Card>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-primary/80 mb-2">
                        2 · claude_ai_client_impl/
                    </p>
                    <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
                        Anthropic-backed implementation. DI-only constructor.
                    </p>
                    <CodeBlock
                        code={`components/claude_ai_client_impl/
├── src/claude_ai_client_impl/
│   ├── __init__.py     # register() wires ClaudeAIClient
│   ├── client.py       # ClaudeAIClient(AIClient)
│   ├── config.py       # env: ANTHROPIC_API_KEY, model, flags
│   ├── tools.py        # JSON-schema tool catalogue + dispatcher
│   ├── serializers.py  # allow-listed projections
│   └── prompt.py       # system prompt template
└── tests/`}
                    />
                    <div className="mt-4">
                        <p className="text-[11px] font-mono uppercase tracking-wider text-foreground/50 mb-2">
                            Constructor
                        </p>
                        <CodeBlock
                            language="python"
                            code={`class ClaudeAIClient(AIClient):
    def __init__(
        self,
        *,
        issue_tracker: issue_tracker_client_api.Client,
        chat: chat_client_api.ChatClient,
        anthropic_client: anthropic.Anthropic | None = None,
        config: ClaudeConfig | None = None,
    ) -> None: ...`}
                        />
                    </div>
                </Card>
            </div>

            <Card className="mb-6">
                <p className="text-[11px] font-mono uppercase tracking-wider text-primary/80 mb-3">
                    3 · New FastAPI routes in issue_tracker_service
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="p-3 rounded-lg bg-black/30 border border-white/10 font-mono">
                        <p>
                            <span className="text-emerald-400">POST</span>{' '}
                            /ai/chat
                        </p>
                        <p className="text-xs text-foreground/60 mt-1">
                            Body: {`{ prompt, board_id?, channel_id? }`}
                        </p>
                        <p className="text-xs text-foreground/60">
                            Reply: {`{ reply, actions[], truncated }`}
                        </p>
                    </div>
                    <div className="p-3 rounded-lg bg-black/30 border border-white/10 font-mono">
                        <p>
                            <span className="text-blue-400">GET</span>{' '}
                            /ai/health
                        </p>
                        <p className="text-xs text-foreground/60 mt-1">
                            Verifies ANTHROPIC_API_KEY is loaded.
                        </p>
                    </div>
                </div>
                <p className="text-xs text-foreground/60 mt-3">
                    Both routes reuse the existing{' '}
                    <code className="font-mono">X-Session-Token</code> auth.
                </p>
            </Card>

            <Card>
                <p className="text-[11px] font-mono uppercase tracking-wider text-primary/80 mb-3">
                    4 · Initial tool catalogue — Submission 2
                </p>
                <p className="text-xs text-foreground/60 mb-4">
                    Pulled 1:1 from the two ABCs. No methods invented.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {tools.map(([name, tone, call]) => (
                        <div
                            key={name}
                            className="flex items-start justify-between gap-3 p-3 rounded-lg bg-black/30 border border-white/10"
                        >
                            <div className="min-w-0">
                                <p className="font-mono text-sm text-primary/90 truncate">
                                    {name}
                                </p>
                                <p className="font-mono text-[11px] text-foreground/50 truncate">
                                    → {call}
                                </p>
                            </div>
                            <Pill tone={tone === 'write' ? 'warn' : 'good'}>
                                {tone === 'write' ? 'mutating' : 'read'}
                            </Pill>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-foreground/60 mt-4">
                    Mutating tools are gated behind{' '}
                    <code className="font-mono">AI_ALLOW_MUTATIONS</code>.{' '}
                    <code className="font-mono">delete_*</code> is{' '}
                    <strong>not exposed</strong>.
                </p>
            </Card>
        </Section>
    );
};

// -------- user flow -------- //

const UserFlow = () => (
    <Section
        id="userflow"
        title="User flow"
        icon={<RotateCw size={20} />}
        kicker="Four steps and one loop"
    >
        <Card>
            <FlowDiagram />
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card>
                <p className="text-[11px] font-mono uppercase tracking-wider text-primary/80 mb-3">
                    In plain words
                </p>
                <ol className="space-y-2 text-sm text-foreground/80 list-decimal list-inside marker:text-primary/60">
                    <li>
                        User calls{' '}
                        <code className="font-mono text-primary">
                            POST /ai/chat
                        </code>{' '}
                        with a prompt + session token.
                    </li>
                    <li>
                        Server checks auth, strips anything sensitive, asks
                        Claude with a fixed tool catalogue.
                    </li>
                    <li>
                        Claude either answers directly{' '}
                        <span className="text-foreground/60">(→ 5)</span> or
                        asks us to run a tool.
                    </li>
                    <li>
                        Server validates the tool call, runs it against{' '}
                        <code className="font-mono">Client</code> /{' '}
                        <code className="font-mono">ChatClient</code>, feeds
                        the result back. <em>Loop to 2.</em>
                    </li>
                    <li>
                        Server returns a JSON reply with the final answer + a
                        short log of tools that ran.
                    </li>
                </ol>
            </Card>

            <Card className="border-rose-500/20">
                <p className="text-[11px] font-mono uppercase tracking-wider text-rose-400/80 mb-3">
                    Failure modes surfaced to the user
                </p>
                <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                        <AlertTriangle
                            size={14}
                            className="text-rose-400/80 mt-1 shrink-0"
                        />
                        <span>
                            <code className="font-mono">401</code> — missing /
                            invalid session token.
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <AlertTriangle
                            size={14}
                            className="text-rose-400/80 mt-1 shrink-0"
                        />
                        <span>
                            <code className="font-mono">502</code> — Claude
                            upstream error (rate limit, 5xx).
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <AlertTriangle
                            size={14}
                            className="text-yellow-400/80 mt-1 shrink-0"
                        />
                        <span>
                            <code className="font-mono">200</code> with{' '}
                            <code className="font-mono">truncated: true</code>{' '}
                            — tool-hop limit reached; partial reply returned.
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <AlertTriangle
                            size={14}
                            className="text-yellow-400/80 mt-1 shrink-0"
                        />
                        <span>
                            <code className="font-mono">200</code> with a tool
                            marked <code className="font-mono">ok: false</code>{' '}
                            — tool failed validation / execution, AI continued
                            without it.
                        </span>
                    </li>
                </ul>
            </Card>
        </div>
    </Section>
);

const FlowDiagram = () => {
    const steps = [
        { n: 1, title: 'User', body: 'POST /ai/chat · prompt + session token' },
        {
            n: 2,
            title: 'Server',
            body: 'auth · sanitize · ask Claude',
            highlight: true,
        },
        { n: 3, title: 'Claude', body: 'wants a tool?' },
    ];

    return (
        <div className="flex flex-col items-center gap-2 py-2">
            {steps.map((s, i) => (
                <React.Fragment key={s.n}>
                    <FlowStep step={s} />
                    {i < steps.length - 1 && (
                        <ArrowDown size={18} className="text-primary/60" />
                    )}
                </React.Fragment>
            ))}

            {/* yes/no branch */}
            <div className="w-full max-w-3xl grid grid-cols-2 gap-6 mt-2 relative">
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-yellow-400/80">
                            YES · tool_use
                        </span>
                        <ArrowDown size={14} className="text-yellow-400/60" />
                    </div>
                    <FlowStep
                        step={{
                            n: 4,
                            title: 'Server runs tool',
                            body: 'validate → Client / ChatClient → feed result back',
                            highlight: true,
                        }}
                        fullWidth
                    />
                    <div className="mt-2 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-primary/70">
                        <RotateCw size={12} /> loop back to step 2
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/80">
                            NO · text
                        </span>
                        <ArrowDown size={14} className="text-emerald-400/60" />
                    </div>
                    <FlowStep
                        step={{
                            n: 5,
                            title: 'Server replies',
                            body: '200 OK · { reply, actions[], truncated }',
                        }}
                        fullWidth
                    />
                </div>
            </div>
        </div>
    );
};

const FlowStep = ({
    step,
    fullWidth = false,
}: {
    step: { n: number; title: string; body: string; highlight?: boolean };
    fullWidth?: boolean;
}) => (
    <div
        className={
            'rounded-lg border px-4 py-3 ' +
            (fullWidth ? 'w-full ' : 'min-w-[220px] ') +
            (step.highlight
                ? 'border-primary/40 bg-primary/10'
                : 'border-white/10 bg-white/5')
        }
    >
        <div className="flex items-center gap-2 mb-0.5">
            <span
                className={
                    'w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono ' +
                    (step.highlight
                        ? 'bg-primary text-background'
                        : 'bg-white/10 text-foreground/80')
                }
            >
                {step.n}
            </span>
            <p className="font-semibold text-sm">{step.title}</p>
        </div>
        <p className="text-xs text-foreground/70 pl-7">{step.body}</p>
    </div>
);

// -------- data flow -------- //

const DataFlow = () => (
    <Section
        id="dataflow"
        title="Data flow"
        icon={<Server size={20} />}
        kicker="Three columns, secrets stay in the middle"
    >
        <Card>
            <DataFlowDiagram />
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
            <Card>
                <p className="text-[11px] font-mono uppercase tracking-wider text-primary/80 mb-3">
                    What crosses each boundary
                </p>
                <div className="space-y-3">
                    <BoundaryRow
                        label="User ↔ Server"
                        cross="Prompt in · reply + action log out"
                        notCross="Nothing secret either direction"
                    />
                    <BoundaryRow
                        label="Server ↔ Claude"
                        cross="Sanitized prompt · tool schemas · allow-listed tool results"
                        notCross="ANTHROPIC_API_KEY · session tokens · Trello OAuth · bot creds · raw PII"
                    />
                    <BoundaryRow
                        label="Server ↔ Trello / Chat"
                        cross="OAuth / bot creds (held by the clients) · validated tool args"
                        notCross="Anything from Claude that wasn't validated first"
                    />
                </div>
            </Card>

            <Card>
                <p className="text-[11px] font-mono uppercase tracking-wider text-primary/80 mb-3">
                    Allow-listed fields sent to Claude
                </p>
                <p className="text-xs text-foreground/60 mb-3">
                    Everything else is dropped by the serializer.
                </p>
                <div className="space-y-2">
                    {[
                        ['Issue', 'id · title · status · truncated description'],
                        ['Board', 'id · name'],
                        [
                            'Channel',
                            'channel_id · name · is_private? · channel_type?',
                        ],
                        [
                            'Message',
                            'message_id · truncated text · sender · timestamp',
                        ],
                        ['Member', 'id · display_name (no email)'],
                    ].map(([t, fields]) => (
                        <div
                            key={t}
                            className="flex items-start gap-3 p-2.5 rounded-md bg-black/30 border border-white/10"
                        >
                            <span className="font-mono text-xs text-primary/90 shrink-0 w-20">
                                {t}
                            </span>
                            <span className="text-xs text-foreground/70">
                                {fields}
                            </span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    </Section>
);

const BoundaryRow = ({
    label,
    cross,
    notCross,
}: {
    label: string;
    cross: string;
    notCross: string;
}) => (
    <div className="p-3 rounded-lg bg-black/30 border border-white/10">
        <p className="text-sm font-semibold mb-2">{label}</p>
        <div className="space-y-1.5 text-xs">
            <div className="flex items-start gap-2">
                <CheckCircle2
                    size={13}
                    className="text-emerald-400 mt-0.5 shrink-0"
                />
                <span className="text-foreground/80">{cross}</span>
            </div>
            <div className="flex items-start gap-2">
                <XCircle
                    size={13}
                    className="text-rose-400 mt-0.5 shrink-0"
                />
                <span className="text-foreground/60">{notCross}</span>
            </div>
        </div>
    </div>
);

const DataFlowDiagram = () => (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4 items-stretch">
        {/* Left — user */}
        <div className="flex flex-col items-center justify-center gap-3">
            <DiagramBox tone="neutral" title="User" subtitle="browser / curl" />
            <div className="text-[10px] font-mono text-foreground/50 text-center">
                prompt +<br />
                session token
            </div>
        </div>

        {/* Middle — server */}
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
            <p className="text-[10px] font-mono uppercase tracking-wider text-primary/80 text-center mb-4">
                Our server · issue_tracker_service
            </p>
            <div className="flex flex-col items-center gap-2">
                <DiagramBox
                    tone="neutral"
                    title="/ai/chat handler"
                    subtitle="auth + sanitize"
                />
                <ArrowDown size={16} className="text-primary/60" />
                <DiagramBox
                    tone="primary"
                    title="ClaudeAIClient"
                    subtitle="sanitizer · tool dispatcher"
                />
                <ArrowDown size={16} className="text-primary/60" />
                <div className="grid grid-cols-2 gap-2 w-full">
                    <DiagramBox
                        tone="neutral"
                        title="TrelloClient"
                        subtitle="OAuth held here"
                    />
                    <DiagramBox
                        tone="neutral"
                        title="ChatClient"
                        subtitle="bot creds held here"
                    />
                </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-foreground/50 justify-center">
                <Lock size={12} className="text-primary/70" />
                all secrets stay in this column
            </div>
        </div>

        {/* Right — external APIs */}
        <div className="flex flex-col justify-between gap-3">
            <DiagramBox
                tone="neutral"
                title="Anthropic API"
                subtitle="sanitized msgs only"
            />
            <DiagramBox
                tone="neutral"
                title="Trello API"
                subtitle="per-user OAuth"
            />
            <DiagramBox
                tone="neutral"
                title="Chat provider API"
                subtitle="bot token"
            />
        </div>
    </div>
);

// -------- safety -------- //

const Safety = () => {
    const bullets = [
        {
            icon: <Shield size={16} />,
            title: 'LLM is a planner, never an executor',
            body: 'Claude returns tool_use proposals. Our server decides whether to run them.',
        },
        {
            icon: <ListChecks size={16} />,
            title: 'Hard-coded tool allow-list',
            body: 'Unknown tool names are rejected before any side effect. Pydantic validates every argument.',
        },
        {
            icon: <Lock size={16} />,
            title: 'Credentials never cross the LLM boundary',
            body: 'ANTHROPIC_API_KEY, Trello OAuth tokens, chat bot creds, and session tokens are loaded once at boot and stay server-side.',
        },
        {
            icon: <AlertTriangle size={16} />,
            title: 'Mutations are gated',
            body: 'create_* / update_* / send_chat_message require AI_ALLOW_MUTATIONS=true. delete_* is never exposed.',
        },
        {
            icon: <XCircle size={16} />,
            title: 'Allow-list fields, not deny-list',
            body: 'Domain objects (Issue, Channel, Message, …) are projected to a fixed field set before ever reaching Claude.',
        },
        {
            icon: <MessageSquare size={16} />,
            title: 'Prompt-injection containment',
            body: 'Untrusted content (ticket bodies, chat messages) is wrapped in <ticket> / <chat_message> delimiters and treated as data, not instructions.',
        },
    ];
    return (
        <Section
            id="safety"
            title="Safety"
            icon={<Shield size={20} />}
            kicker="Rules the impl enforces"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bullets.map((b) => (
                    <div
                        key={b.title}
                        className="p-4 rounded-xl border border-white/10 bg-white/5 flex gap-3"
                    >
                        <div className="p-2 rounded-lg bg-primary/10 text-primary h-fit shrink-0">
                            {b.icon}
                        </div>
                        <div>
                            <p className="font-semibold text-sm mb-1">
                                {b.title}
                            </p>
                            <p className="text-xs text-foreground/70 leading-relaxed">
                                {b.body}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

// -------- done -------- //

const DoneCriteria = () => {
    const items = [
        'components/ai_client_api/ and components/claude_ai_client_impl/ exist as workspace members, pass ruff + mypy strict.',
        'POST /ai/chat and GET /ai/health mounted on issue_tracker_service, protected by X-Session-Token.',
        'Unit tests cover: factory wiring, sanitizer, serializers, tool dispatch (unknown name, bad args, read-only mode), hop-limit truncation.',
        'tests/integration/test_ai_integration.py drives the full Claude tool loop with a mocked Anthropic client and MockChatClient, end-to-end.',
        '.env.example lists every new env var; no secrets in repo.',
        'PR green on CI; merges independently of T2.',
    ];
    return (
        <Section
            id="done"
            title="What 'done' looks like for T1"
            icon={<CheckCircle2 size={20} />}
            kicker="Acceptance checklist"
        >
            <Card>
                <ul className="space-y-3">
                    {items.map((it) => (
                        <li
                            key={it}
                            className="flex items-start gap-3 text-sm text-foreground/80"
                        >
                            <input
                                type="checkbox"
                                disabled
                                className="mt-1 accent-primary cursor-not-allowed opacity-70"
                            />
                            <span>{it}</span>
                        </li>
                    ))}
                </ul>
            </Card>
        </Section>
    );
};

// -------- open decisions -------- //

const OpenDecisions = () => (
    <Section
        id="open"
        title="Open decisions"
        icon={<HelpCircle size={20} />}
        kicker="Answers in the review reply"
    >
        <Card>
            <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                Chat-team pairing is <strong>not</strong> on this list: the
                shared <code className="font-mono text-primary">chat_client_api</code>{' '}
                repo is the agreed contract, and Saakshi (T2) will pick a
                conformant impl when she wires it in. Still open:
            </p>
            <ol className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-mono shrink-0">
                        1
                    </span>
                    <span className="text-foreground/80">
                        <strong>Anthropic model choice:</strong> default to{' '}
                        <code className="font-mono text-primary">
                            claude-sonnet-4.5
                        </code>{' '}
                        unless anyone objects.
                    </span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-mono shrink-0">
                        2
                    </span>
                    <span className="text-foreground/80">
                        <strong>Mutations in prod demo:</strong> default{' '}
                        <code className="font-mono">
                            AI_ALLOW_MUTATIONS=true
                        </code>{' '}
                        for the Submission 2 demo,{' '}
                        <code className="font-mono">false</code> in CI/tests.
                        OK?
                    </span>
                </li>
            </ol>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-foreground/50">
                <span className="font-mono">Team 7 · Issue Tracker (Trello)</span>
                <a
                    href="https://github.com/HarshithKoriRaj/Shared-API"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                >
                    chat_client_api <ExternalLink size={11} />
                </a>
            </div>
        </Card>
    </Section>
);
