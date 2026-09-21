import { useState, useEffect } from 'react';

export default function useAdminStats() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setData([
                { day: 'Mon', date: 'Sep 15', scans: 142, bugsFound: 68, critical: 12, latency: '320ms', topLang: 'Python' },
                { day: 'Tue', date: 'Sep 16', scans: 235, bugsFound: 114, critical: 24, latency: '295ms', topLang: 'TypeScript' },
                { day: 'Wed', date: 'Sep 17', scans: 188, bugsFound: 82, critical: 9, latency: '310ms', topLang: 'JavaScript' },
                { day: 'Thu', date: 'Sep 18', scans: 340, bugsFound: 173, critical: 38, latency: '380ms', topLang: 'Rust' },
                { day: 'Fri', date: 'Sep 19', scans: 295, bugsFound: 141, critical: 21, latency: '340ms', topLang: 'Go' },
                { day: 'Sat', date: 'Sep 20', scans: 110, bugsFound: 46, critical: 6, latency: '260ms', topLang: 'Python' },
                { day: 'Sun', date: 'Sep 21', scans: 165, bugsFound: 79, critical: 14, latency: '275ms', topLang: 'C++' },
            ]);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return { data, loading };
}