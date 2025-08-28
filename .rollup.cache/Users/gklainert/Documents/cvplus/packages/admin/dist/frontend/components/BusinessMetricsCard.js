import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
export const BusinessMetricsCard = ({ refreshTrigger }) => {
    const [metricsData, setMetricsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeRange, setTimeRange] = useState('30d');
    useEffect(() => {
        fetchBusinessMetrics();
    }, [refreshTrigger, timeRange]);
    const fetchBusinessMetrics = async () => {
        try {
            setLoading(true);
            setError(null);
            const functions = getFunctions();
            const getBusinessMetrics = httpsCallable(functions, 'getBusinessMetrics');
            const result = await getBusinessMetrics({ timeRange });
            const data = result.data?.data;
            if (data) {
                setMetricsData(data);
            }
            else {
                throw new Error('No business metrics data received');
            }
        }
        catch (error) {
            console.error('Error fetching business metrics:', error);
            setError(error instanceof Error ? error.message : 'Failed to fetch business metrics');
        }
        finally {
            setLoading(false);
        }
    };
    const formatCurrency = (amount) => {
        if (amount >= 1000000) {
            return '$' + (amount / 1000000).toFixed(1) + 'M';
        }
        if (amount >= 1000) {
            return '$' + (amount / 1000).toFixed(1) + 'K';
        }
        return '$' + amount.toFixed(2);
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
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'critical':
                return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
            case 'high':
                return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-400';
            case 'medium':
                return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
            default:
                return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400';
        }
    };
    if (loading) {
        return (_jsx("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6", children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4" }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: [...Array(4)].map((_, i) => (_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-8 bg-gray-200 dark:bg-gray-700 rounded" }), _jsx("div", { className: "h-4 bg-gray-200 dark:bg-gray-700 rounded" })] }, i))) })] }) }));
    }
    if (error) {
        return (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-red-200 dark:border-red-800 p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx("span", { className: "text-2xl", children: "\uD83D\uDCC8" }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Business Metrics" })] }), _jsx("div", { className: "text-red-600 dark:text-red-400 text-sm", children: error }), _jsx("button", { onClick: fetchBusinessMetrics, className: "mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm", children: "Retry" })] }));
    }
    return (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "text-2xl", children: "\uD83D\uDCC8" }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Business Metrics" })] }), _jsxs("select", { value: timeRange, onChange: (e) => setTimeRange(e.target.value), className: "text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white", children: [_jsx("option", { value: "7d", children: "Last 7 days" }), _jsx("option", { value: "30d", children: "Last 30 days" }), _jsx("option", { value: "90d", children: "Last 90 days" }), _jsx("option", { value: "1y", children: "Last year" })] })] }), metricsData && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-green-600 dark:text-green-400", children: formatCurrency(metricsData.metrics.revenue.total) }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Total Revenue" })] }), _jsxs("div", { className: "text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600 dark:text-blue-400", children: formatCurrency(metricsData.metrics.revenue.mrr) }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-300", children: "MRR" })] }), _jsxs("div", { className: "text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg", children: [_jsxs("div", { className: "text-2xl font-bold text-purple-600 dark:text-purple-400", children: [metricsData.metrics.conversion.signupToPremium.toFixed(1), "%"] }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Conversion Rate" })] }), _jsxs("div", { className: "text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-orange-600 dark:text-orange-400", children: formatCurrency(metricsData.metrics.revenue.arpu) }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-300", children: "ARPU" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg", children: [_jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "CV Generation Success Rate" }), _jsxs("span", { className: "text-sm font-medium text-green-600 dark:text-green-400", children: [metricsData.metrics.usage.successRate.toFixed(1), "%"] })] }), _jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg", children: [_jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Total CV Generations" }), _jsx("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: formatNumber(metricsData.metrics.usage.totalJobs) })] }), _jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg", children: [_jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "New Premium Users" }), _jsx("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: formatNumber(metricsData.metrics.conversion.newPremiumUsers) })] })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("span", { className: "text-xs font-medium text-gray-700 dark:text-gray-300", children: "Platform Performance" }), _jsxs("span", { className: "text-xs text-gray-600 dark:text-gray-400", children: [metricsData.metrics.usage.successRate.toFixed(1), "%"] })] }), _jsx("div", { className: "w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2", children: _jsx("div", { className: "bg-green-600 h-2 rounded-full transition-all duration-500", style: { width: `${Math.min(metricsData.metrics.usage.successRate, 100)}%` } }) })] }), metricsData.summary.keyInsight && (_jsxs("div", { className: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [_jsx("span", { className: "text-blue-600 dark:text-blue-400", children: "\uD83D\uDCA1" }), _jsx("span", { className: "text-sm font-medium text-blue-800 dark:text-blue-300", children: "Key Insight" })] }), _jsx("div", { className: "text-sm text-blue-700 dark:text-blue-300", children: metricsData.summary.keyInsight })] })), metricsData.insights && metricsData.insights.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Business Insights" }), metricsData.insights.slice(0, 2).map((insight, index) => (_jsxs("div", { className: "p-3 border border-gray-200 dark:border-gray-600 rounded-lg", children: [_jsx("div", { className: "flex items-center justify-between mb-2", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: `text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(insight.priority)}`, children: insight.priority.toUpperCase() }), _jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: insight.type })] }) }), _jsx("div", { className: "text-sm text-gray-900 dark:text-white mb-1", children: insight.message }), _jsxs("div", { className: "text-xs text-gray-600 dark:text-gray-400", children: ["\uD83D\uDCA1 ", insight.recommendation] })] }, index)))] })), _jsxs("div", { className: "text-xs text-gray-500 dark:text-gray-400 text-center", children: ["Period: ", new Date(metricsData.period.start).toLocaleDateString(), " - ", new Date(metricsData.period.end).toLocaleDateString()] })] }))] }));
};
export default BusinessMetricsCard;
//# sourceMappingURL=BusinessMetricsCard.js.map