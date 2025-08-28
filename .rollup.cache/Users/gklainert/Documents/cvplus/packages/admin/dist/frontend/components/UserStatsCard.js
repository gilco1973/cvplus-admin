import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
export const UserStatsCard = ({ refreshTrigger }) => {
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchUserStats();
    }, [refreshTrigger]);
    const fetchUserStats = async () => {
        try {
            setLoading(true);
            setError(null);
            const functions = getFunctions();
            const getUserStats = httpsCallable(functions, 'getUserStats');
            const result = await getUserStats();
            const data = result.data?.data;
            if (data) {
                setStatsData(data);
            }
            else {
                throw new Error('No user statistics data received');
            }
        }
        catch (error) {
            console.error('Error fetching user statistics:', error);
            setError(error instanceof Error ? error.message : 'Failed to fetch user statistics');
        }
        finally {
            setLoading(false);
        }
    };
    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };
    const getGrowthColor = (rate) => {
        if (rate > 0) {
            return 'text-green-600 dark:text-green-400';
        }
        else if (rate < 0) {
            return 'text-red-600 dark:text-red-400';
        }
        else {
            return 'text-gray-600 dark:text-gray-400';
        }
    };
    const getGrowthIcon = (rate) => {
        if (rate > 0) {
            return '↗️';
        }
        else if (rate < 0) {
            return '↘️';
        }
        else {
            return '➡️';
        }
    };
    if (loading) {
        return (_jsx("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6", children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4" }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: [...Array(4)].map((_, i) => (_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-8 bg-gray-200 dark:bg-gray-700 rounded" }), _jsx("div", { className: "h-4 bg-gray-200 dark:bg-gray-700 rounded" })] }, i))) })] }) }));
    }
    if (error) {
        return (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-red-200 dark:border-red-800 p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx("span", { className: "text-2xl", children: "\uD83D\uDC65" }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "User Statistics" })] }), _jsx("div", { className: "text-red-600 dark:text-red-400 text-sm", children: error }), _jsx("button", { onClick: fetchUserStats, className: "mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm", children: "Retry" })] }));
    }
    return (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx("span", { className: "text-2xl", children: "\uD83D\uDC65" }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "User Statistics" })] }), statsData && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600 dark:text-blue-400", children: formatNumber(statsData.total) }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Total Users" })] }), _jsxs("div", { className: "text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-green-600 dark:text-green-400", children: formatNumber(statsData.active) }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Active Users" })] }), _jsxs("div", { className: "text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600 dark:text-purple-400", children: formatNumber(statsData.premium) }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Premium Users" })] }), _jsxs("div", { className: "text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-orange-600 dark:text-orange-400", children: formatNumber(statsData.new) }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-300", children: "New Users" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg", children: [_jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "User Growth Rate" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-lg", children: getGrowthIcon(statsData.growthRate) }), _jsxs("span", { className: `text-sm font-medium ${getGrowthColor(statsData.growthRate)}`, children: [statsData.growthRate >= 0 ? '+' : '', statsData.growthRate.toFixed(1), "%"] })] })] }), _jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg", children: [_jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Premium Conversion" }), _jsxs("span", { className: "text-sm font-medium text-purple-600 dark:text-purple-400", children: [statsData.conversionToPremium.toFixed(1), "%"] })] }), _jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg", children: [_jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "User Retention Rate" }), _jsxs("span", { className: "text-sm font-medium text-green-600 dark:text-green-400", children: [statsData.retentionRate.toFixed(1), "%"] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("span", { className: "text-xs font-medium text-gray-700 dark:text-gray-300", children: "Premium Conversion" }), _jsxs("span", { className: "text-xs text-gray-600 dark:text-gray-400", children: [statsData.conversionToPremium.toFixed(1), "%"] })] }), _jsx("div", { className: "w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2", children: _jsx("div", { className: "bg-purple-600 h-2 rounded-full transition-all duration-500", style: { width: `${Math.min(statsData.conversionToPremium, 100)}%` } }) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("span", { className: "text-xs font-medium text-gray-700 dark:text-gray-300", children: "User Activity Rate" }), _jsxs("span", { className: "text-xs text-gray-600 dark:text-gray-400", children: [statsData.retentionRate.toFixed(1), "%"] })] }), _jsx("div", { className: "w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2", children: _jsx("div", { className: "bg-green-600 h-2 rounded-full transition-all duration-500", style: { width: `${Math.min(statsData.retentionRate, 100)}%` } }) })] })] }), statsData.userDetails && statsData.userDetails.length > 0 && (_jsxs("div", { className: "bg-gray-50 dark:bg-gray-700 rounded-lg p-4", children: [_jsx("div", { className: "text-sm font-medium text-gray-900 dark:text-white mb-3", children: "Recent User Activity" }), _jsx("div", { className: "space-y-2", children: statsData.userDetails.slice(0, 3).map((user, index) => (_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: `w-2 h-2 rounded-full ${user.isActive
                                                        ? 'bg-green-400'
                                                        : 'bg-gray-400'}` }), _jsx("span", { className: "text-gray-900 dark:text-white truncate max-w-32", children: user.displayName || user.email }), user.isPremium && (_jsx("span", { className: "text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 px-2 py-1 rounded-full", children: "PRO" }))] }), _jsxs("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: [user.cvCount, " CVs"] })] }, user.uid))) })] })), _jsxs("div", { className: "text-xs text-gray-500 dark:text-gray-400 text-center", children: ["Last updated: ", new Date(statsData.lastUpdated).toLocaleTimeString()] })] }))] }));
};
export default UserStatsCard;
//# sourceMappingURL=UserStatsCard.js.map