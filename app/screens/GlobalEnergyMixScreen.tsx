import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path, G, Rect, Text as SvgText, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const data = [
    { name: 'Coal', value: 35, color: '#64748b', icon: '🪨', category: 'Fossil' },
    { name: 'Natural Gas', value: 22, color: '#0ea5e9', icon: '🔥', category: 'Fossil' },
    { name: 'Hydropower', value: 14.3, color: '#3b82f6', icon: '💧', category: 'Low-Carbon' },
    { name: 'Nuclear', value: 9, color: '#a855f7', icon: '⚛️', category: 'Low-Carbon' },
    { name: 'Wind', value: 8.1, color: '#10b981', icon: '💨', category: 'Low-Carbon' },
    { name: 'Solar', value: 6.9, color: '#f59e0b', icon: '☀️', category: 'Low-Carbon' },
    { name: 'Oil', value: 2.5, color: '#475569', icon: '🛢️', category: 'Fossil' },
    { name: 'Biofuels', value: 2.2, color: '#84cc16', icon: '🌿', category: 'Low-Carbon' },
];

const categoryData = [
    { name: 'Fossil Fuels', value: 59.5, color: '#ef4444' },
    { name: 'Low-Carbon', value: 40.5, color: '#10b981' },
];

// Helper to calculate Pie Chart paths
const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
};

const PieChart = ({ data, radius = 100, innerRadius = 0 }: any) => {
    let cumulativePercent = 0;

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', height: radius * 2 + 20 }}>
            <Svg height={radius * 2} width={radius * 2} viewBox="-1 -1 2 2">
                <G transform="rotate(-90)">
                    {data.map((slice: any, index: number) => {
                        const startX = Math.cos(2 * Math.PI * cumulativePercent);
                        const startY = Math.sin(2 * Math.PI * cumulativePercent);

                        // Percentage of circle
                        const percent = slice.value / 100;
                        cumulativePercent += percent;

                        const endX = Math.cos(2 * Math.PI * cumulativePercent);
                        const endY = Math.sin(2 * Math.PI * cumulativePercent);

                        const largeArcFlag = percent > 0.5 ? 1 : 0;

                        const pathData = [
                            `M ${startX} ${startY}`, // Move
                            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
                            `L 0 0`, // Line to center
                        ].join(' ');

                        return (
                            <Path
                                key={index}
                                d={pathData}
                                fill={slice.color}
                                stroke="#0f172a"
                                strokeWidth="0.02" // Scaled relative to viewBox 2x2
                            />
                        );
                    })}
                    {/* Inner Circle for Donut */}
                    {innerRadius > 0 && (
                        <Circle cx="0" cy="0" r={innerRadius / radius} fill="#0f172a" />
                    )}
                </G>
            </Svg>
        </View>
    );
};

const BarChart = ({ data }: any) => {
    const maxVal = Math.max(...data.map((d: any) => d.value));

    return (
        <View style={{ paddingVertical: 10 }}>
            {data.map((item: any, index: number) => (
                <View key={index} style={{ marginBottom: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                        <Text style={{ color: '#cbd5e1', fontSize: 13, fontWeight: '500' }}>{item.name}</Text>
                        <Text style={{ color: '#cbd5e1', fontSize: 13, fontWeight: 'bold' }}>{item.value}%</Text>
                    </View>
                    <View style={{ height: 22, backgroundColor: '#1e293b', borderRadius: 4, overflow: 'hidden' }}>
                        <View
                            style={{
                                height: '100%',
                                width: `${(item.value / maxVal) * 100}%`,
                                backgroundColor: item.color,
                                borderTopRightRadius: 4,
                                borderBottomRightRadius: 4,
                            }}
                        />
                    </View>
                </View>
            ))}
        </View>
    );
};

export default function GlobalEnergyMixScreen() {
    const [viewType, setViewType] = useState('pie');
    const navigation = useNavigation<any>();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.liveBadge}>
                    <View style={styles.liveDotOuter}>
                        <View style={styles.liveDotInner} />
                    </View>
                    <Text style={styles.liveText}>Live 2024 Data</Text>
                </View>
                <Text style={styles.title}>
                    Global Electricity{'\n'}
                    <Text style={styles.titleHighlight}>Generation Mix</Text>
                </Text>
                <Text style={styles.subtitle}>Source: IEA & Ember</Text>
            </View>

            {/* Toggle Buttons */}
            <View style={styles.toggleContainer}>
                {[
                    { id: 'pie', label: 'Pie Chart', icon: '◐' },
                    { id: 'bar', label: 'Bar Chart', icon: '▮' },
                    { id: 'category', label: 'Categories', icon: '◑' },
                ].map((btn) => (
                    <TouchableOpacity
                        key={btn.id}
                        onPress={() => setViewType(btn.id)}
                        style={[
                            styles.toggleButton,
                            viewType === btn.id && styles.toggleButtonActive,
                        ]}
                    >
                        <Text style={[styles.toggleButtonText, viewType === btn.id && styles.toggleButtonTextActive]}>
                            {btn.icon} {btn.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Main Chart */}
            <View style={styles.chartCard}>
                {viewType === 'pie' && <PieChart data={data} radius={120} innerRadius={50} />}
                {viewType === 'bar' && <BarChart data={data} />}
                {viewType === 'category' && (
                    <View style={{ alignItems: 'center' }}>
                        <PieChart data={categoryData} radius={120} innerRadius={70} />
                        <View style={styles.donutLabel}>
                            <Text style={styles.donutValue}>40.9%</Text>
                            <Text style={styles.donutText}>Low-Carbon</Text>
                        </View>
                    </View>
                )}
            </View>

            {/* Stats Grid */}
            <View style={styles.statsGrid}>
                {data.map((item) => (
                    <View key={item.name} style={styles.statCard}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                            <Text style={{ fontSize: 20 }}>{item.icon}</Text>
                            <View style={[
                                styles.categoryBadge,
                                item.category === 'Fossil' ? styles.badgeFossil : styles.badgeClean
                            ]}>
                                <Text style={[
                                    styles.categoryText,
                                    item.category === 'Fossil' ? styles.textFossil : styles.textClean
                                ]}>{item.category}</Text>
                            </View>
                        </View>
                        <Text style={styles.statName} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.statValue}>
                            {item.value}<Text style={styles.statUnit}>%</Text>
                        </Text>
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: `${(item.value / 35) * 100}%`, backgroundColor: item.color }]} />
                        </View>
                    </View>
                ))}
            </View>

            {/* Insights Panel */}
            <View style={styles.insightsPanel}>
                <View style={styles.insightsHeader}>
                    <View style={styles.insightsIconBox}>
                        <Text>📊</Text>
                    </View>
                    <Text style={styles.insightsTitle}>Key Insights for 2024</Text>
                </View>
                <View style={styles.insightsGrid}>
                    {[
                        { stat: '40.9%', label: 'Low-carbon sources reached record high', color: '#34d399' },
                        { stat: '15%', label: 'Solar + Wind overtook hydropower for first time', color: '#60a5fa' },
                        { stat: '+29%', label: 'Solar year-over-year growth (+474 TWh)', color: '#facc15' },
                        { stat: '35%', label: 'Coal remains the single largest source', color: '#94a3b8' },
                    ].map((insight, i) => (
                        <View key={i} style={styles.insightCard}>
                            <Text style={[styles.insightStat, { color: insight.color }]}>{insight.stat}</Text>
                            <Text style={styles.insightLabel}>{insight.label}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <Text style={styles.footerText}>
                Data reflects global electricity generation in 2024 • Updated annually
            </Text>

            {/* Back Button */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Go Back to Lesson</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a', // Slate 950
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'rgba(16, 185, 129, 0.2)',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        marginBottom: 12,
    },
    liveDotOuter: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(52, 211, 153, 0.5)',
        marginRight: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    liveDotInner: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#10b981',
    },
    liveText: {
        color: '#34d399',
        fontSize: 12,
        fontWeight: '600',
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#fff',
        textAlign: 'center',
        lineHeight: 32,
    },
    titleHighlight: {
        color: '#818cf8', // Indigo/Blueish gradient simplified
    },
    subtitle: {
        color: '#64748b',
        fontSize: 14,
        marginTop: 8,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#0f172a',
        padding: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#1e293b',
        marginBottom: 24,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    toggleButtonActive: {
        backgroundColor: '#2563eb', // Blue 600
    },
    toggleButtonText: {
        color: '#94a3b8',
        fontSize: 13,
        fontWeight: '600',
    },
    toggleButtonTextActive: {
        color: '#fff',
    },
    chartCard: {
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#1e293b',
        padding: 20,
        marginBottom: 24,
        alignItems: 'center',
    },
    donutLabel: {
        position: 'absolute',
        top: '40%',
        alignItems: 'center',
    },
    donutValue: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '800',
    },
    donutText: {
        color: '#10b981',
        fontSize: 12,
        fontWeight: '600',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    statCard: {
        width: '48%',
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#1e293b',
        marginBottom: 12,
    },
    categoryBadge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 999,
    },
    badgeFossil: { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
    badgeClean: { backgroundColor: 'rgba(16, 185, 129, 0.1)' },
    categoryText: { fontSize: 10, fontWeight: '700' },
    textFossil: { color: '#f87171' },
    textClean: { color: '#34d399' },
    statName: {
        color: '#94a3b8',
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 2,
    },
    statValue: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '900',
    },
    statUnit: {
        fontSize: 14,
        color: '#64748b',
        fontWeight: '500',
    },
    progressBarBg: {
        height: 6,
        backgroundColor: '#1e293b',
        borderRadius: 3,
        marginTop: 8,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    insightsPanel: {
        backgroundColor: '#0f172a',
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: '#1e293b',
        marginBottom: 20,
    },
    insightsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    insightsIconBox: {
        width: 32,
        height: 32,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    insightsTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    insightsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    insightCard: {
        width: '48%',
        backgroundColor: 'rgba(30, 41, 59, 0.3)',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#1e293b',
        marginBottom: 12,
    },
    insightStat: {
        fontSize: 20,
        fontWeight: '900',
        marginBottom: 4,
    },
    insightLabel: {
        color: '#94a3b8',
        fontSize: 11,
        lineHeight: 14,
    },
    footerText: {
        textAlign: 'center',
        color: '#475569',
        fontSize: 12,
    },
    backButton: {
        backgroundColor: '#00695c',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
});
