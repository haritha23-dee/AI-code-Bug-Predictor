import { useCallback, useEffect, useRef, useState } from 'react';

export default function useAdminData(fetcher, { interval = 30000 } = {}) {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [updatedAt, setUpdatedAt] = useState(null);
    const fetcherRef = useRef(fetcher);
    fetcherRef.current = fetcher;

    const load = useCallback(async (silent = false) => {
        if (silent) setRefreshing(true);
        try {
            const res = await fetcherRef.current();
            setData(res.data);
            setError('');
            setUpdatedAt(new Date());
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to load data');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        load();
        if (!interval) return;
        const id = setInterval(() => { if (!document.hidden) load(true); }, interval);
        return () => clearInterval(id);
    }, [load, interval]);

    return { data, error, loading, refreshing, updatedAt, refresh: () => load(true) };
}