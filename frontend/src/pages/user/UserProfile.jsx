import { useEffect, useRef, useState } from 'react';
import { Mail, User as UserIcon, Shield, Calendar, BadgeCheck, Camera, Loader2 } from 'lucide-react';
import { getMe, uploadAvatar } from '../../api/auth';
import Spinner from '../../components/ui/Spinner';

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_SIZE = 2 * 1024 * 1024; //2mb photo upload limit

function getInitials(name, email) {
    const source = name || email || '?';
    return source
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((s) => s[0])
        .join('')
        .toUpperCase();
}

export default function UserProfile() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [avatarError, setAvatarError] = useState('');
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        getMe()
            .then((res) => setProfile(res.data))
            .catch((err) => setError(err.response?.data?.detail || 'Failed to load profile'))
            .finally(() => setLoading(false));
    }, []);

    const handleAvatarClick = () => {
        if (!uploading) fileInputRef.current?.click();
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarError('');

        if (!ALLOWED_TYPES.includes(file.type)) {
            setAvatarError('Only PNG, JPEG, or WEBP images are allowed');
            e.target.value = '';
            return;
        }
        if (file.size > MAX_SIZE) {
            setAvatarError('Image too large (max 2MB)');
            e.target.value = '';
            return;
        }

        setUploading(true);
        try {
            const res = await uploadAvatar(file);
            setProfile(res.data);
        } catch (err) {
            setAvatarError(err.response?.data?.detail || 'Avatar upload failed');
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    if (loading) return <Spinner full />;
    if (error) {
        return (
            <div className="text-sm text-red-500 border border-red-500/30 bg-red-500/10 rounded-xl px-4 py-2">
                {error}
            </div>
        );
    }

    const initials = getInitials(profile.full_name, profile.email);
    const isAdmin = profile.role === 'admin';

    return (
        <div className="max-w-2xl">
            <div className="relative h-36 rounded-2xl overflow-hidden bg-gradient-to-br from-accent/40 via-accent/15 to-transparent border border-border">
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        background:
                            'radial-gradient(400px circle at 20% 20%, var(--glow), transparent 60%), radial-gradient(300px circle at 80% 60%, var(--glow), transparent 55%)',
                    }}
                />
            </div>

            <div className="relative px-2 -mt-12 flex items-end gap-4">
                <div className="relative h-24 w-24 shrink-0">
                    <div className="h-full w-full rounded-2xl bg-bg-soft border-4 border-bg flex items-center justify-center shadow-lg overflow-hidden">
                        {profile.avatar_url ? (
                            <img
                                src={profile.avatar_url}
                                alt="Profile"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="h-full w-full rounded-xl bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center">
                                <span className="text-2xl font-bold text-white tracking-wide">{initials}</span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleAvatarClick}
                        disabled={uploading}
                        className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-accent hover:bg-accent-hover text-white flex items-center justify-center shadow-lg border-2 border-bg transition disabled:opacity-70"
                        title="Change profile photo"
                    >
                        {uploading ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleAvatarChange}
                        className="hidden"
                    />
                </div>

                <div className="pb-2 min-w-0">
                    <h1 className="text-xl font-bold text-text truncate flex items-center gap-1.5 capitalize"> 
                        {/* profile capitalize updation */}
                        {profile.full_name || 'Unnamed User'}
                        {isAdmin && <BadgeCheck size={17} className="text-accent shrink-0" />}
                    </h1>
                    <p className="text-sm text-text-muted truncate">{profile.email}</p>
                </div>
            </div>

            {avatarError && (
                <p className="mt-3 text-sm text-red-500 border border-red-500/30 bg-red-500/10 rounded-xl px-4 py-2">
                    {avatarError}
                </p>
            )}

            <p className="mt-6 text-xs uppercase tracking-widest text-text-muted">
                Account Details · Read-only
            </p>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailCard icon={UserIcon} label="Full Name" value={profile.full_name || '—'} capitalizeValue />  
                {/* profile detail name capitalize in above */}
                <DetailCard icon={Mail} label="Email" value={profile.email || '—'} />
                <DetailCard icon={Shield} label="Role" value={profile.role || 'user'} highlight={isAdmin} capitalizeValue />
                {profile.created_at && (
                    <DetailCard
                        icon={Calendar}
                        label="Joined"
                        value={new Date(profile.created_at).toLocaleDateString()}
                    />
                )}
            </div>
        </div>
    );
}

function DetailCard({ icon: Icon, label, value, highlight, capitalizeValue }) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-border bg-bg-soft/70 backdrop-blur-md p-4 transition hover:border-accent/40 hover:-translate-y-0.5">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/10 group-hover:to-transparent transition pointer-events-none" />
            <div className="relative flex items-center gap-3">
                <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center border shrink-0 ${
                        highlight
                            ? 'bg-accent/15 border-accent/40 text-accent'
                            : 'bg-border/20 border-border text-text-muted'
                    }`}
                >
                    <Icon size={17} />
                </div>
                <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-widest text-text-muted">{label}</p>
                    <p className={`text-sm font-medium text-text truncate ${capitalizeValue ? 'capitalize' : ''}`}>
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}