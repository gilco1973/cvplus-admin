import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Analytics Dashboard Component
 *
 * Real-time analytics dashboard for Phase 2 business intelligence.
 * Shows user engagement, ML performance, and business metrics.
 */
import { useState, useEffect, useCallback } from 'react';
import { httpsCallable } from 'firebase/functions';
// TODO: Update firebase import after integration layer is complete
// For now, keeping placeholder until frontend integration is established
// import { functions } from '../lib/firebase';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
export const AnalyticsDashboard = ({ className = '' }) => {
    const [timeRange, setTimeRange] = useState('30d');
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const loadAnalytics = useCallback(async () => {
        try {
            setError(null);
            const getAnalytics = httpsCallable(functions, 'getAnalytics');
            const result = await getAnalytics({ timeRange });
            if (result.data && typeof result.data === 'object' && 'success' in result.data) {
                const data = result.data;
                if (data.success && data.data) {
                    setMetrics(data.data);
                }
                else {
                    setError(data.error?.message || 'Failed to load analytics');
                }
            }
        }
        catch (err) {
            console.error('Analytics loading failed:', err);
            setError('Failed to load analytics data');
        }
        finally {
            setLoading(false);
        }
    }, [timeRange]);
    useEffect(() => {
        loadAnalytics();
        // Set up real-time updates
        const interval = setInterval(loadAnalytics, 30000); // 30 seconds
        return () => clearInterval(interval);
    }, [loadAnalytics]);
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(value);
    };
    const formatNumber = (value) => {
        return new Intl.NumberFormat('en-US').format(value);
    };
    const formatPercentage = (value) => {
        return `${(value * 100).toFixed(1)}%`;
    };
    if (loading) {
        return (_jsx("div", { className: `bg-white rounded-lg shadow-md p-8 ${className}`, children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "h-8 bg-gray-200 rounded mb-4" }), _jsx("div", { className: "grid grid-cols-4 gap-4 mb-8", children: [1, 2, 3, 4].map(i => (_jsx("div", { className: "h-24 bg-gray-200 rounded" }, i))) }), _jsx("div", { className: "h-64 bg-gray-200 rounded" })] }) }));
    }
    if (error) {
        return (_jsx("div", { className: `bg-white rounded-lg shadow-md p-8 ${className}`, children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-red-600 text-lg font-semibold mb-2", children: "Error Loading Analytics" }), _jsx("div", { className: "text-gray-600 mb-4", children: error }), _jsx("button", { onClick: loadAnalytics, className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md", children: "Retry" })] }) }));
    }
    if (!metrics) {
        return null;
    }
    const MetricCard = ({ title, value, trend, format = 'number', color = 'blue' }) => {
        let formattedValue;
        switch (format) {
            case 'currency':
                formattedValue = formatCurrency(Number(value));
                break;
            case 'percentage':
                formattedValue = formatPercentage(Number(value));
                break;
            default:
                formattedValue = formatNumber(Number(value));
        }
        const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            purple: 'bg-purple-50 text-purple-600',
            orange: 'bg-orange-50 text-orange-600'
        };
        return (_jsxs("div", { className: `p-4 rounded-lg ${colorClasses[color]}`, children: [_jsx("div", { className: "text-2xl font-bold", children: formattedValue }), _jsx("div", { className: "text-sm opacity-80", children: title }), trend !== undefined && (_jsxs("div", { className: `text-xs mt-1 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`, children: [trend >= 0 ? '↗' : '↘', " ", Math.abs(trend).toFixed(1), "%"] }))] }));
    };
    // Chart data preparation
    const retentionData = [
        { name: 'Day 1', value: metrics.userMetrics.retention.day1 * 100 },
        { name: 'Day 7', value: metrics.userMetrics.retention.day7 * 100 },
        { name: 'Day 30', value: metrics.userMetrics.retention.day30 * 100 }
    ];
    const featureAdoptionData = Object.entries(metrics.userMetrics.featureAdoption).map(([name, value]) => ({
        name,
        value: value * 100
    }));
    const conversionFunnelData = [
        { stage: 'Signup', value: 100 },
        { stage: 'Free User', value: metrics.businessMetrics.conversion.signupToFree * 100 },
        { stage: 'Premium', value: metrics.businessMetrics.conversion.freeToPremium * 100 },
        { stage: 'Enterprise', value: metrics.businessMetrics.conversion.premiumToEnterprise * 100 }
    ];
    const churnReasonsData = Object.entries(metrics.businessMetrics.churn.reasons).map(([reason, count]) => ({
        name: reason,
        value: count
    }));
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
    return (_jsxs("div", { className: `bg-white rounded-lg shadow-md ${className}`, children: [_jsxs("div", { className: "border-b border-gray-200 p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Analytics Dashboard" }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("select", { value: timeRange, onChange: (e) => setTimeRange(e.target.value), className: "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "7d", children: "Last 7 days" }), _jsx("option", { value: "30d", children: "Last 30 days" }), _jsx("option", { value: "90d", children: "Last 90 days" }), _jsx("option", { value: "1y", children: "Last year" })] }), _jsxs("div", { className: "text-sm text-gray-500", children: ["Last updated: ", new Date().toLocaleTimeString()] })] })] }), _jsx("nav", { className: "flex mt-4", children: [
                            { key: 'overview', label: 'Overview' },
                            { key: 'users', label: 'Users' },
                            { key: 'business', label: 'Business' },
                            { key: 'ml', label: 'ML Performance' }
                        ].map(({ key, label }) => (_jsx("button", { onClick: () => setActiveTab(key), className: `px-4 py-2 text-sm font-medium border-b-2 ${activeTab === key
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'}`, children: label }, key))) })] }), _jsxs("div", { className: "p-6", children: [activeTab === 'overview' && (_jsxs("div", { children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [_jsx(MetricCard, { title: "Daily Active Users", value: metrics.userMetrics.dailyActiveUsers, color: "blue" }), _jsx(MetricCard, { title: "Avg ATS Score", value: metrics.atsMetrics.averageScore, format: "percentage", color: "green" }), _jsx(MetricCard, { title: "Monthly Revenue", value: metrics.businessMetrics.revenue.mrr, format: "currency", trend: metrics.businessMetrics.revenue.growth, color: "purple" }), _jsx(MetricCard, { title: "ML Accuracy", value: metrics.mlMetrics.predictionAccuracy, format: "percentage", color: "orange" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "User Retention" }), _jsx(ResponsiveContainer, { width: "100%", height: 200, children: _jsxs(BarChart, { data: retentionData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Tooltip, { formatter: (value) => `${value}%` }), _jsx(Bar, { dataKey: "value", fill: "#0088FE" })] }) })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Conversion Funnel" }), _jsx(ResponsiveContainer, { width: "100%", height: 200, children: _jsxs(BarChart, { data: conversionFunnelData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "stage" }), _jsx(YAxis, {}), _jsx(Tooltip, { formatter: (value) => `${value}%` }), _jsx(Bar, { dataKey: "value", fill: "#00C49F" })] }) })] })] })] })), activeTab === 'users' && (_jsxs("div", { children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [_jsx(MetricCard, { title: "Daily Active Users", value: metrics.userMetrics.dailyActiveUsers, color: "blue" }), _jsx(MetricCard, { title: "Weekly Active Users", value: metrics.userMetrics.weeklyActiveUsers, color: "green" }), _jsx(MetricCard, { title: "Monthly Active Users", value: metrics.userMetrics.monthlyActiveUsers, color: "purple" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Feature Adoption" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: featureAdoptionData, cx: "50%", cy: "50%", labelLine: false, label: ({ name, value }) => `${name}: ${value.toFixed(1)}%`, outerRadius: 80, fill: "#8884d8", dataKey: "value", children: featureAdoptionData.map((_, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) }), _jsx(Tooltip, {})] }) })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "User Retention" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { children: "Day 1 Retention" }), _jsx("span", { className: "font-semibold", children: formatPercentage(metrics.userMetrics.retention.day1) })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { children: "Day 7 Retention" }), _jsx("span", { className: "font-semibold", children: formatPercentage(metrics.userMetrics.retention.day7) })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { children: "Day 30 Retention" }), _jsx("span", { className: "font-semibold", children: formatPercentage(metrics.userMetrics.retention.day30) })] })] })] })] })] })), activeTab === 'business' && (_jsxs("div", { children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [_jsx(MetricCard, { title: "Monthly Recurring Revenue", value: metrics.businessMetrics.revenue.mrr, format: "currency", trend: metrics.businessMetrics.revenue.growth, color: "green" }), _jsx(MetricCard, { title: "Annual Recurring Revenue", value: metrics.businessMetrics.revenue.arr, format: "currency", color: "purple" }), _jsx(MetricCard, { title: "Monthly Churn Rate", value: metrics.businessMetrics.churn.monthly, format: "percentage", color: "orange" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Conversion Rates" }), _jsx(ResponsiveContainer, { width: "100%", height: 250, children: _jsxs(BarChart, { data: conversionFunnelData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "stage" }), _jsx(YAxis, {}), _jsx(Tooltip, { formatter: (value) => `${value}%` }), _jsx(Bar, { dataKey: "value", fill: "#00C49F" })] }) })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Churn Reasons" }), _jsx(ResponsiveContainer, { width: "100%", height: 250, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: churnReasonsData, cx: "50%", cy: "50%", labelLine: false, label: ({ name, value }) => `${name}: ${value}`, outerRadius: 80, fill: "#8884d8", dataKey: "value", children: churnReasonsData.map((_, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) }), _jsx(Tooltip, {})] }) })] })] })] })), activeTab === 'ml' && (_jsxs("div", { children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [_jsx(MetricCard, { title: "Prediction Accuracy", value: metrics.mlMetrics.predictionAccuracy, format: "percentage", color: "blue" }), _jsx(MetricCard, { title: "Model Latency", value: `${metrics.mlMetrics.modelLatency}ms`, color: "green" }), _jsx(MetricCard, { title: "Predictions/Month", value: metrics.mlMetrics.predictionVolume, color: "purple" }), _jsx(MetricCard, { title: "Model Drift Score", value: metrics.mlMetrics.modelDrift, format: "percentage", color: "orange" })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "ML Performance Metrics" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Model Performance" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Prediction Accuracy:" }), _jsx("span", { className: "font-semibold", children: formatPercentage(metrics.mlMetrics.predictionAccuracy) })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Average Latency:" }), _jsxs("span", { className: "font-semibold", children: [metrics.mlMetrics.modelLatency, "ms"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Model Drift:" }), _jsx("span", { className: "font-semibold", children: formatPercentage(metrics.mlMetrics.modelDrift) })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Usage Statistics" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Monthly Predictions:" }), _jsx("span", { className: "font-semibold", children: formatNumber(metrics.mlMetrics.predictionVolume) })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Retraining Frequency:" }), _jsxs("span", { className: "font-semibold", children: ["Every ", metrics.mlMetrics.retrainingFrequency, " days"] })] })] })] })] })] })] }))] })] }));
};
export default AnalyticsDashboard;
//# sourceMappingURL=AnalyticsDashboard.js.map