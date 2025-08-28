import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
export const SystemHealthCard = ({ refreshTrigger }) => {
    const [healthData, setHealthData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchSystemHealth();
    }, [refreshTrigger]);
    const fetchSystemHealth = async () => {
        try {
            setLoading(true);
            setError(null);
            const functions = getFunctions();
            const getSystemHealth = httpsCallable(functions, 'getSystemHealth');
            const result = await getSystemHealth();
            const data = result.data?.data;
            if (data) {
                setHealthData(data);
            }
            else {
                throw new Error('No system health data received');
            }
        }
        catch (error) {
            console.error('Error fetching system health:', error);
            setError(error instanceof Error ? error.message : 'Failed to fetch system health');
        }
        finally {
            setLoading(false);
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'healthy':
                return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
            case 'degraded':
                return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
            case 'unhealthy':
                return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
            default:
                return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-400';
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'healthy':
                return '✅';
            case 'degraded':
                return '⚠️';
            case 'unhealthy':
                return '❌';
            default:
                return '❓';
        }
    };
    if (loading) {
        return (_jsx("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6", children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4" }), _jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "h-4 bg-gray-200 dark:bg-gray-700 rounded" }), _jsx("div", { className: "h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" }), _jsx("div", { className: "h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" })] })] }) }));
    }
    if (error) {
        return (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-red-200 dark:border-red-800 p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx("span", { className: "text-2xl", children: "\u274C" }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "System Health" })] }), _jsx("div", { className: "text-red-600 dark:text-red-400 text-sm", children: error }), _jsx("button", { onClick: fetchSystemHealth, className: "mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm", children: "Retry" })] }));
    }
    return (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "text-2xl", children: getStatusIcon(healthData?.status || 'unknown') }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "System Health" })] }), _jsx("div", { className: `px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(healthData?.status || 'unknown')}`, children: healthData?.status?.toUpperCase() || 'UNKNOWN' })] }), healthData && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Database" }), _jsx("span", { className: `text-xs px-2 py-1 rounded ${healthData.metrics.database.status === 'healthy'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'}`, children: healthData.metrics.database.status })] }), _jsxs("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: [healthData.metrics.database.readLatency, "ms"] })] }), _jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Functions" }), _jsxs("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: [healthData.metrics.functions.successRate, "% success"] })] }), _jsxs("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: [healthData.metrics.functions.avgDuration, "ms avg"] })] }), _jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg", children: [_jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Response Time" }), _jsxs("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: [healthData.metrics.performance.avgResponseTime, "ms"] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Storage" }), _jsxs("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: [healthData.metrics.resources.storage.percentage, "%"] })] }), _jsx("div", { className: "w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2", children: _jsx("div", { className: "bg-blue-600 h-2 rounded-full transition-all duration-300", style: { width: `${healthData.metrics.resources.storage.percentage}%` } }) })] }), healthData.alerts && healthData.alerts.length > 0 && (_jsxs("div", { className: "mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [_jsx("span", { className: "text-yellow-600 dark:text-yellow-400", children: "\u26A0\uFE0F" }), _jsxs("span", { className: "text-sm font-medium text-yellow-800 dark:text-yellow-300", children: [healthData.alerts.length, " Active Alert", healthData.alerts.length !== 1 ? 's' : ''] })] }), _jsx("div", { className: "text-xs text-yellow-700 dark:text-yellow-300", children: "Click to view detailed alert information" })] })), _jsxs("div", { className: "text-xs text-gray-500 dark:text-gray-400 text-center mt-4", children: ["Last updated: ", new Date(healthData.timestamp).toLocaleTimeString()] })] }))] }));
};
export default SystemHealthCard;
//# sourceMappingURL=SystemHealthCard.js.map