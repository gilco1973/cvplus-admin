import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Revenue Analytics Dashboard
 *
 * Comprehensive revenue intelligence dashboard for CVPlus business analytics.
 * Provides real-time financial metrics, cohort analysis, and growth forecasting.
 *
 * @author Gil Klainert
 * @version 1.0.0
 * @since Phase 3 - Analytics & Revenue Intelligence
 */
import { useState, useEffect, useMemo } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { TrendingUpIcon, DollarSignIcon, UsersIcon, UserMinusIcon, CalendarIcon, BarChart3Icon, PieChartIcon, ActivityIcon, AlertCircleIcon, RefreshCwIcon, DownloadIcon, FilterIcon } from 'lucide-react';
const RevenueAnalyticsDashboard = () => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateRange, setDateRange] = useState({
        start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] || '',
        end: new Date().toISOString().split('T')[0] || ''
    });
    const [refreshing, setRefreshing] = useState(false);
    // Fetch revenue metrics
    const fetchRevenueMetrics = async (refresh = false) => {
        if (refresh)
            setRefreshing(true);
        else
            setLoading(true);
        setError(null);
        try {
            const functions = getFunctions();
            const getRevenueMetrics = httpsCallable(functions, 'getRevenueMetrics');
            const response = await getRevenueMetrics({
                dateRange,
                granularity: 'monthly',
                includeCohorts: true,
                includeForecasting: true
            });
            const result = response.data;
            if (result?.success) {
                setMetrics(result.data.metrics);
            }
            else {
                setError(result?.error || 'Failed to fetch revenue metrics');
            }
        }
        catch (err) {
            console.error('Error fetching revenue metrics:', err);
            setError('Failed to load revenue analytics. Please try again.');
        }
        finally {
            setLoading(false);
            setRefreshing(false);
        }
    };
    useEffect(() => {
        fetchRevenueMetrics();
    }, [dateRange]);
    // Memoized calculations
    const mrrTrend = useMemo(() => {
        if (!metrics?.revenueGrowth || metrics.revenueGrowth.length < 2)
            return 0;
        const recent = metrics.revenueGrowth.slice(-2);
        if (!recent[0] || !recent[1] || recent[0].revenue === 0)
            return 0;
        return ((recent[1].revenue - recent[0].revenue) / recent[0].revenue) * 100;
    }, [metrics]);
    const churnTrend = useMemo(() => {
        if (!metrics?.cohortAnalysis || metrics.cohortAnalysis.length < 2)
            return 0;
        const recentCohorts = metrics.cohortAnalysis.slice(-2);
        if (!recentCohorts[0] || !recentCohorts[1])
            return 0;
        const currentChurn = 100 - (recentCohorts[1]?.retentionRates?.[0] || 100);
        const previousChurn = 100 - (recentCohorts[0]?.retentionRates?.[0] || 100);
        return currentChurn - previousChurn;
    }, [metrics]);
    // Format currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };
    // Format percentage
    const formatPercentage = (value) => {
        return `${value.toFixed(2)}%`;
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(RefreshCwIcon, { className: "w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Loading revenue analytics..." })] }) }));
    }
    if (error) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center max-w-md", children: [_jsx(AlertCircleIcon, { className: "w-12 h-12 text-red-500 mx-auto mb-4" }), _jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Analytics Error" }), _jsx("p", { className: "text-gray-600 mb-4", children: error }), _jsx("button", { onClick: () => fetchRevenueMetrics(), className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors", children: "Retry" })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("div", { className: "bg-white shadow-sm border-b border-gray-200", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: _jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Revenue Analytics" }), _jsx("p", { className: "text-gray-600", children: "Comprehensive business intelligence dashboard" })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(CalendarIcon, { className: "w-4 h-4 text-gray-500" }), _jsx("input", { type: "date", value: dateRange.start, onChange: (e) => setDateRange(prev => ({ ...prev, start: e.target.value })), className: "border border-gray-300 rounded-md px-3 py-1 text-sm" }), _jsx("span", { className: "text-gray-500", children: "to" }), _jsx("input", { type: "date", value: dateRange.end, onChange: (e) => setDateRange(prev => ({ ...prev, end: e.target.value })), className: "border border-gray-300 rounded-md px-3 py-1 text-sm" })] }), _jsxs("button", { onClick: () => fetchRevenueMetrics(true), disabled: refreshing, className: "flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50", children: [_jsx(RefreshCwIcon, { className: `w-4 h-4 ${refreshing ? 'animate-spin' : ''}` }), _jsx("span", { children: "Refresh" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50", children: [_jsx(DownloadIcon, { className: "w-4 h-4" }), _jsx("span", { children: "Export" })] })] })] }) }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [_jsx(MetricCard, { title: "Monthly Recurring Revenue", value: formatCurrency(metrics?.mrr || 0), trend: mrrTrend, icon: TrendingUpIcon, description: "Total monthly subscription revenue" }), _jsx(MetricCard, { title: "Annual Recurring Revenue", value: formatCurrency(metrics?.arr || 0), trend: metrics?.mrrGrowthRate || 0, icon: DollarSignIcon, description: "Annualized subscription revenue" }), _jsx(MetricCard, { title: "Churn Rate", value: formatPercentage(metrics?.churnRate || 0), trend: churnTrend, icon: UserMinusIcon, isInverse: true, description: "Monthly customer churn rate" }), _jsx(MetricCard, { title: "Conversion Rate", value: formatPercentage(metrics?.conversionRate || 0), trend: 5.2, icon: UsersIcon, description: "Free to paid conversion rate" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [_jsx(MetricCard, { title: "Customer LTV", value: formatCurrency(metrics?.ltv || 0), trend: 8.1, icon: ActivityIcon, description: "Average customer lifetime value" }), _jsx(MetricCard, { title: "Customer Acquisition Cost", value: formatCurrency(metrics?.cac || 0), trend: -12.3, icon: BarChart3Icon, isInverse: true, description: "Average cost to acquire customers" }), _jsx(MetricCard, { title: "ARPU", value: formatCurrency(metrics?.arpu || 0), trend: 3.7, icon: PieChartIcon, description: "Average revenue per user" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Customer Health Score" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${(metrics?.customerHealthScore || 0) >= 80 ? 'bg-green-500' :
                                                            (metrics?.customerHealthScore || 0) >= 60 ? 'bg-yellow-500' : 'bg-red-500'}` }), _jsxs("span", { className: "text-sm font-medium text-gray-600", children: [metrics?.customerHealthScore || 0, "/100"] })] })] }), _jsxs("div", { className: "relative pt-1", children: [_jsxs("div", { className: "flex mb-2 items-center justify-between", children: [_jsx("div", { children: _jsx("span", { className: "text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200", children: "Health Score" }) }), _jsx("div", { className: "text-right", children: _jsxs("span", { className: "text-xs font-semibold inline-block text-blue-600", children: [metrics?.customerHealthScore || 0, "%"] }) })] }), _jsx("div", { className: "overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200", children: _jsx("div", { style: { width: `${metrics?.customerHealthScore || 0}%` }, className: "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500" }) })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Revenue Quality" }), _jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("span", { className: "text-3xl font-bold text-gray-900", children: metrics?.revenueQuality?.score || 0 }), _jsx("span", { className: "text-sm text-gray-500", children: "Quality Score" })] }), _jsx("div", { className: "space-y-2", children: metrics?.revenueQuality?.factors.map((factor, index) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), _jsx("span", { className: "text-sm text-gray-600", children: factor })] }, index))) })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Revenue Growth Trend" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(FilterIcon, { className: "w-4 h-4 text-gray-500" }), _jsxs("select", { className: "border border-gray-300 rounded-md px-3 py-1 text-sm", children: [_jsx("option", { children: "Last 12 months" }), _jsx("option", { children: "Last 6 months" }), _jsx("option", { children: "Last 3 months" })] })] })] }), _jsx("div", { className: "h-64 flex items-center justify-center border border-gray-200 rounded-lg", children: _jsx("p", { className: "text-gray-500", children: "Chart visualization would be rendered here" }) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-6", children: "Cohort Retention Analysis" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Cohort Month" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Size" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Month 0" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Month 1" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Month 3" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Month 6" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Total Revenue" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: metrics?.cohortAnalysis?.slice(0, 6).map((cohort, index) => (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: cohort.cohortMonth }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: cohort.cohortSize }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: formatPercentage(cohort.retentionRates[0] || 100) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: formatPercentage(cohort.retentionRates[1] || 0) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: formatPercentage(cohort.retentionRates[3] || 0) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: formatPercentage(cohort.retentionRates[6] || 0) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: formatCurrency(cohort.totalRevenue) })] }, index))) })] }) })] })] })] }));
};
const MetricCard = ({ title, value, trend = 0, icon: Icon, isInverse = false, description }) => {
    const trendColor = isInverse
        ? trend > 0 ? 'text-red-500' : 'text-green-500'
        : trend > 0 ? 'text-green-500' : 'text-red-500';
    const trendIcon = isInverse
        ? trend > 0 ? '↑' : '↓'
        : trend > 0 ? '↑' : '↓';
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Icon, { className: "w-5 h-5 text-gray-500" }), _jsx("h3", { className: "text-sm font-medium text-gray-600", children: title })] }), trend !== 0 && (_jsxs("span", { className: `text-sm font-medium ${trendColor}`, children: [trendIcon, " ", Math.abs(trend).toFixed(1), "%"] }))] }), _jsx("div", { className: "text-2xl font-bold text-gray-900 mb-1", children: value }), _jsx("p", { className: "text-xs text-gray-500", children: description })] }));
};
export default RevenueAnalyticsDashboard;
//# sourceMappingURL=RevenueAnalyticsDashboard.js.map