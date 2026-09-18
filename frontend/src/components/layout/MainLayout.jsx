import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
    return (
        <div className="relative flex min-h-screen bg-bg text-text overflow-hidden">
            <div className="ambient-glow opacity-60"/>
            <Sidebar />
            <div className="relative flex-1 flex flex-col min-w-0 z-[1]">
                <Header />
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}