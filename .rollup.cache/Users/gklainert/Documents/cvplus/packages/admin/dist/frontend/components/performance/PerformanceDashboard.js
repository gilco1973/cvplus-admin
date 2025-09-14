import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Performance Dashboard Component - Phase 6.3.4
 *
 * Real-time performance monitoring dashboard with sub-second updates,
 * interactive visualizations, and actionable insights for CVPlus.
 * Displays Core Web Vitals, function performance, and user journey metrics.
 *
 * @author Gil Klainert
 * @version 1.0.0
 */
import { useState, useEffect, useCallback } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { collection, onSnapshot, query, orderBy, limit, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import CoreWebVitalsService from '../../services/performance/core-web-vitals.service';
import UserJourneyTrackerService from '../../services/performance/user-journey-tracker.service';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);
const PerformanceDashboard = () => {
    const [metrics, setMetrics] = useState({
        webVitals: { lcp: 0, fid: 0, cls: 0, fcp: 0, ttfb: 0 },
        functionPerformance: { totalFunctions: 0, averageExecutionTime: 0, errorRate: 0, throughput: 0 },
        userJourneys: { activeJourneys: 0, averageCompletionTime: 0, successRate: 0, dropOffRate: 0 },
        alerts: { critical: 0, high: 0, medium: 0, resolved: 0 }
    });
    const [alerts, setAlerts] = useState([]);
    const [realtimeData, setRealtimeData] = useState([]);
    const [selectedTimeframe, setSelectedTimeframe] = useState('1h');
    const [isLive, setIsLive] = useState(true);
    const [lastUpdate, setLastUpdate] = useState(Date.now());
    // Initialize services
    const webVitalsService = CoreWebVitalsService.getInstance();
    const journeyTracker = UserJourneyTrackerService.getInstance();
    /**
     * Setup real-time data subscriptions
     */
    useEffect(() => {
        if (!isLive)
            return;
        const unsubscribers = [];
        // Subscribe to real-time metrics
        const metricsQuery = query(collection(db, 'realtime_metrics'), orderBy('timestamp', 'desc'), limit(100));
        const metricsUnsubscribe = onSnapshot(metricsQuery, (snapshot) => {
            const newData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRealtimeData(newData);
            updateMetrics(newData);
            setLastUpdate(Date.now());
        });
        unsubscribers.push(metricsUnsubscribe);
        // Subscribe to performance alerts
        const alertsQuery = query(collection(db, 'performance_alerts'), where('acknowledged', '==', false), orderBy('timestamp', 'desc'), limit(50));
        const alertsUnsubscribe = onSnapshot(alertsQuery, (snapshot) => {
            const newAlerts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAlerts(newAlerts);
            updateAlertMetrics(newAlerts);
        });
        unsubscribers.push(alertsUnsubscribe);
        // Cleanup subscriptions
        return () => {
            unsubscribers.forEach(unsubscribe => unsubscribe());
        };
    }, [isLive]);
    /**
     * Update aggregated metrics from real-time data
     */
    const updateMetrics = useCallback((data) => {
        if (data.length === 0)
            return;
        // Calculate aggregated metrics
        const functionMetrics = data.filter(item => item.functionName);
        const webVitalsMetrics = data.filter(item => item.name);
        const avgExecutionTime = functionMetrics.reduce((sum, item) => sum + (item.executionTime || 0), 0) / functionMetrics.length || 0;
        const totalErrors = functionMetrics.reduce((sum, item) => sum + (item.errorRate || 0), 0);
        const totalRequests = functionMetrics.reduce((sum, item) => sum + (item.requestsPerSecond || 0), 0);
        // Update Web Vitals from recent data
        const latestWebVitals = webVitalsMetrics.reduce((acc, item) => {
            if (item.name === 'LCP')
                acc.lcp = item.value;
            if (item.name === 'FID')
                acc.fid = item.value;
            if (item.name === 'CLS')
                acc.cls = item.value;
            if (item.name === 'FCP')
                acc.fcp = item.value;
            if (item.name === 'TTFB')
                acc.ttfb = item.value;
            return acc;
        }, { lcp: 0, fid: 0, cls: 0, fcp: 0, ttfb: 0 });
        setMetrics(prev => ({
            ...prev,
            webVitals: latestWebVitals,
            functionPerformance: {
                totalFunctions: functionMetrics.length,
                averageExecutionTime: avgExecutionTime,
                errorRate: functionMetrics.length > 0 ? totalErrors / functionMetrics.length : 0,
                throughput: totalRequests
            }
        }));
    }, []);
    /**
     * Update alert metrics
     */
    const updateAlertMetrics = useCallback((alertData) => {
        const alertCounts = alertData.reduce((acc, alert) => {
            acc[alert.severity] = (acc[alert.severity] || 0) + 1;
            return acc;
        }, {});
        setMetrics(prev => ({
            ...prev,
            alerts: {
                critical: alertCounts.critical || 0,
                high: alertCounts.high || 0,
                medium: alertCounts.medium || 0,
                resolved: alertCounts.resolved || 0
            }
        }));
    }, []);
    /**
     * Handle alert acknowledgment
     */
    const acknowledgeAlert = async (alertId) => {
        // Implementation would update Firestore
        console.log(`Acknowledging alert: ${alertId}`);
    };
    /**
     * Toggle live monitoring
     */
    const toggleLiveMonitoring = () => {
        setIsLive(!isLive);
    };
    /**
     * Get performance status color
     */
    const getStatusColor = (value, thresholds) => {
        if (value <= thresholds.good)
            return 'text-green-600';
        if (value <= thresholds.poor)
            return 'text-yellow-600';
        return 'text-red-600';
    };
    /**
     * Format duration for display
     */
    const formatDuration = (ms) => {
        if (ms < 1000)
            return `${Math.round(ms)}ms`;
        return `${(ms / 1000).toFixed(2)}s`;
    };
    // Chart configurations
    const webVitalsChartData = {
        labels: ['LCP', 'FID', 'CLS', 'FCP', 'TTFB'],
        datasets: [
            {
                label: 'Current Values',
                data: [
                    metrics.webVitals.lcp,
                    metrics.webVitals.fid,
                    metrics.webVitals.cls * 1000, // Scale CLS for visibility
                    metrics.webVitals.fcp,
                    metrics.webVitals.ttfb
                ],
                backgroundColor: [
                    metrics.webVitals.lcp <= 2500 ? '#10B981' : metrics.webVitals.lcp <= 4000 ? '#F59E0B' : '#EF4444',
                    metrics.webVitals.fid <= 100 ? '#10B981' : metrics.webVitals.fid <= 300 ? '#F59E0B' : '#EF4444',
                    (metrics.webVitals.cls * 1000) <= 100 ? '#10B981' : (metrics.webVitals.cls * 1000) <= 250 ? '#F59E0B' : '#EF4444',
                    metrics.webVitals.fcp <= 1800 ? '#10B981' : metrics.webVitals.fcp <= 3000 ? '#F59E0B' : '#EF4444',
                    metrics.webVitals.ttfb <= 800 ? '#10B981' : metrics.webVitals.ttfb <= 1800 ? '#F59E0B' : '#EF4444'
                ],
                borderWidth: 1
            }
        ]
    };
    const performanceTrendData = {
        labels: realtimeData.slice(-20).map((_, index) => `${index * 30}s`),
        datasets: [
            {
                label: 'Average Execution Time',
                data: realtimeData.slice(-20).map(item => item.executionTime || 0),
                borderColor: '#3B82F6',
                backgroundColor: '#3B82F6',
                fill: false,
                tension: 0.1
            },
            {
                label: 'Error Rate (%)',
                data: realtimeData.slice(-20).map(item => item.errorRate || 0),
                borderColor: '#EF4444',
                backgroundColor: '#EF4444',
                fill: false,
                tension: 0.1
            }
        ]
    };
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                position: 'top',
            }
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 p-6", children: [_jsx("div", { className: "mb-8", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Performance Dashboard" }), _jsxs("p", { className: "text-gray-600 mt-1", children: ["Last updated: ", new Date(lastUpdate).toLocaleTimeString()] })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("select", { value: selectedTimeframe, onChange: (e) => setSelectedTimeframe(e.target.value), className: "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "1h", children: "Last Hour" }), _jsx("option", { value: "6h", children: "Last 6 Hours" }), _jsx("option", { value: "24h", children: "Last 24 Hours" }), _jsx("option", { value: "7d", children: "Last 7 Days" })] }), _jsx("button", { onClick: toggleLiveMonitoring, className: `px-4 py-2 rounded-md font-medium transition-colors ${isLive
                                        ? 'bg-green-600 text-white hover:bg-green-700'
                                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`, children: isLive ? 'Live' : 'Paused' })] })] }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [_jsx("div", { className: "bg-white rounded-lg shadow p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600", children: "LCP (Largest Contentful Paint)" }), _jsx("p", { className: `text-2xl font-bold ${getStatusColor(metrics.webVitals.lcp, { good: 2500, poor: 4000 })}`, children: formatDuration(metrics.webVitals.lcp) })] }), _jsx("div", { className: "text-3xl", children: "\u26A1" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600", children: "FID (First Input Delay)" }), _jsx("p", { className: `text-2xl font-bold ${getStatusColor(metrics.webVitals.fid, { good: 100, poor: 300 })}`, children: formatDuration(metrics.webVitals.fid) })] }), _jsx("div", { className: "text-3xl", children: "\uD83D\uDC46" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600", children: "CLS (Cumulative Layout Shift)" }), _jsx("p", { className: `text-2xl font-bold ${getStatusColor(metrics.webVitals.cls, { good: 0.1, poor: 0.25 })}`, children: metrics.webVitals.cls.toFixed(3) })] }), _jsx("div", { className: "text-3xl", children: "\uD83D\uDCD0" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600", children: "Active Functions" }), _jsx("p", { className: "text-2xl font-bold text-blue-600", children: metrics.functionPerformance.totalFunctions })] }), _jsx("div", { className: "text-3xl", children: "\uD83D\uDD27" })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8", children: [_jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Core Web Vitals" }), _jsx("div", { className: "h-64", children: _jsx(Bar, { data: webVitalsChartData, options: chartOptions }) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Performance Trends" }), _jsx("div", { className: "h-64", children: _jsx(Line, { data: performanceTrendData, options: chartOptions }) })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow mb-8", children: [_jsx("div", { className: "px-6 py-4 border-b border-gray-200", children: _jsx("h3", { className: "text-lg font-semibold", children: "Function Performance" }) }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm text-left text-gray-500", children: [_jsx("thead", { className: "text-xs text-gray-700 uppercase bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3", children: "Function Name" }), _jsx("th", { className: "px-6 py-3", children: "Avg Execution Time" }), _jsx("th", { className: "px-6 py-3", children: "Error Rate" }), _jsx("th", { className: "px-6 py-3", children: "Requests/sec" }), _jsx("th", { className: "px-6 py-3", children: "Status" })] }) }), _jsx("tbody", { children: realtimeData.slice(0, 10).map((item, index) => (_jsxs("tr", { className: "bg-white border-b hover:bg-gray-50", children: [_jsx("td", { className: "px-6 py-4 font-medium text-gray-900", children: item.functionName || 'Unknown' }), _jsx("td", { className: "px-6 py-4", children: formatDuration(item.executionTime || 0) }), _jsx("td", { className: "px-6 py-4", children: _jsxs("span", { className: `${getStatusColor(item.errorRate || 0, { good: 1, poor: 5 })}`, children: [((item.errorRate || 0)).toFixed(2), "%"] }) }), _jsx("td", { className: "px-6 py-4", children: (item.requestsPerSecond || 0).toFixed(1) }), _jsx("td", { className: "px-6 py-4", children: _jsx("span", { className: `px-2 py-1 text-xs font-semibold rounded-full ${(item.errorRate || 0) < 1
                                                        ? 'bg-green-100 text-green-800'
                                                        : (item.errorRate || 0) < 5
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'}`, children: (item.errorRate || 0) < 1 ? 'Healthy' : (item.errorRate || 0) < 5 ? 'Warning' : 'Critical' }) })] }, index))) })] }) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow", children: [_jsx("div", { className: "px-6 py-4 border-b border-gray-200", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Active Performance Alerts" }), _jsxs("div", { className: "flex space-x-4 text-sm", children: [_jsxs("span", { className: "text-red-600 font-medium", children: ["Critical: ", metrics.alerts.critical] }), _jsxs("span", { className: "text-yellow-600 font-medium", children: ["High: ", metrics.alerts.high] }), _jsxs("span", { className: "text-blue-600 font-medium", children: ["Medium: ", metrics.alerts.medium] })] })] }) }), _jsx("div", { className: "divide-y divide-gray-200", children: alerts.slice(0, 10).map((alert) => (_jsx("div", { className: "px-6 py-4 hover:bg-gray-50", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: `px-2 py-1 text-xs font-semibold rounded-full ${alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                                                            alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                                                                alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-blue-100 text-blue-800'}`, children: alert.severity.toUpperCase() }), _jsx("span", { className: "text-sm font-medium text-gray-900", children: alert.type }), alert.functionName && (_jsxs("span", { className: "text-sm text-gray-500", children: ["(", alert.functionName, ")"] }))] }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: alert.message }), _jsx("p", { className: "text-xs text-gray-400 mt-1", children: new Date(alert.timestamp).toLocaleString() })] }), _jsx("button", { onClick: () => acknowledgeAlert(alert.id), className: "ml-4 px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors", children: "Acknowledge" })] }) }, alert.id))) })] })] }));
};
export default PerformanceDashboard;
//# sourceMappingURL=PerformanceDashboard.js.map