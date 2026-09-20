import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

//privacy section
const sections = [
    {
        title: '1. Information We Collect',
        body: 'We collect information you provide directly: your email address, full name, and password (securely hashed via Supabase Auth) when you create an account, and the source code, file names, and project metadata you upload or paste for analysis.',
    },
    {
        title: '2. How We Use Your Information',
        body: 'Your account information is used to authenticate you and manage your projects. Uploaded code is used solely to generate the analysis, bug scores, and suggested fixes you request — it is not used to train third-party AI models beyond the scope of a single inference request.',
    },
    {
        title: '3. Third-Party Processing',
        body: 'Code you submit for analysis is transmitted to Groq for AI inference processing. Groq processes this data solely to return analysis results to Brainy and does not retain it for training purposes beyond their standard API data handling policies. We encourage you to review Groq\'s own data processing terms for full detail.',
    },
    {
        title: '4. Data Storage',
        body: 'Account data, project metadata, uploaded files, and analysis history are stored using Supabase (PostgreSQL database and object storage), a SOC 2 Type II compliant infrastructure provider. Profile photos are stored in a dedicated, access-controlled storage bucket tied to your user ID.',
    },
    {
        title: '5. Data Retention & Deletion',
        body: 'Your projects, files, and analysis history are retained until you delete them or delete your account. Deleting a project or file removes it and its associated analysis records. Account deletion requests are honored within a reasonable operational window, subject to standard backup retention.',
    },
    {
        title: '6. Authentication Data',
        body: 'If you sign in with Google, we receive your email address and basic profile information (name) from Google via OAuth. We do not receive or store your Google password. Password-based accounts store only a securely hashed password via Supabase Auth — we never see or store plaintext passwords.',
    },
    {
        title: '7. Cookies & Local Storage',
        body: 'Brainy uses browser local storage to persist your session token so you remain logged in between visits. We do not use third-party advertising trackers or cross-site cookies.',
    },
    {
        title: '8. Your Rights',
        body: 'You may access, export, or delete your project data at any time from within the application. You may request full account deletion, including removal of your profile, uploaded files, and analysis history, by contacting the project maintainers.',
    },
    {
        title: '9. Security',
        body: 'We use industry-standard practices including encrypted transport (HTTPS), row-level security policies on all database tables, and scoped storage access policies to ensure users can only access their own data.',
    },
    {
        title: '10. Changes to This Policy',
        body: 'We may update this Privacy Policy periodically. Material changes will be reflected by updating the "Last updated" date at the top of this page.',
    },
    {
        title: '11. Contact',
        body: 'For privacy-related questions or data deletion requests, reach out via the GitHub repository linked in the footer.',
    },
];

export default function Privacy() {
    return (
        <div className="relative min-h-screen bg-bg text-text px-6 py-16">
            <div className="ambient-glow" />
            <div className="relative z-10 max-w-3xl mx-auto">
                <Link to="/" className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition mb-10">
                    <ArrowLeft size={15} /> Back home
                </Link>

                <div className="glass-card rounded-2xl p-8 md:p-10">
                    <h1 className="font-display text-3xl font-bold mb-2">Privacy Policy</h1>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-8">
                        Last updated: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>

                    <div className="space-y-6">
                        {sections.map((s) => (
                            <div key={s.title}>
                                <h2 className="font-semibold text-text mb-1.5">{s.title}</h2>
                                <p className="text-sm text-text-muted leading-relaxed">{s.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}