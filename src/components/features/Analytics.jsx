import React, { useMemo, useState } from "react";
import { TbCalendarStats, TbTrendingUp, TbCoinFilled } from "react-icons/tb";

const Analytics = ({ transactions, isLoading, isError, error }) => {
  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    data: null,
  });

  // Process transaction data for analytics
  const analyticsData = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return {
        heatmapData: [],
        monthlyStats: {},
        totalVolume: 0,
        avgTransactionValue: 0,
        mostActiveDay: null,
        weekdayStats: Array(7).fill(0),
      };
    }

    const now = new Date();
    const oneYearAgo = new Date(
      now.getFullYear() - 1,
      now.getMonth(),
      now.getDate()
    );

    // Create heatmap data (last 365 days)
    const heatmapData = [];
    const dailyTransactions = {};
    const weekdayStats = Array(7).fill(0);
    let totalVolume = 0;

    // Initialize daily transaction counts
    for (let d = new Date(oneYearAgo); d <= now; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];
      dailyTransactions[dateStr] = { count: 0, volume: 0 };
    }

    // Process transactions
    transactions.forEach((tx) => {
      const txDate = new Date(parseInt(tx.timeStamp) * 1000);
      const dateStr = txDate.toISOString().split("T")[0];
      const weekday = txDate.getDay();
      const volume = parseFloat(tx.value) / Math.pow(10, 18); // Convert Wei to ETH

      if (dailyTransactions[dateStr]) {
        dailyTransactions[dateStr].count += 1;
        dailyTransactions[dateStr].volume += volume;
      }

      weekdayStats[weekday] += 1;
      totalVolume += volume;
    });

    // Convert to heatmap format
    Object.entries(dailyTransactions).forEach(([date, data]) => {
      heatmapData.push({
        date,
        count: data.count,
        volume: data.volume,
        intensity: Math.min(data.count / 5, 1), // Scale intensity 0-1
      });
    });

    // Find most active day
    const mostActiveDay = Object.entries(dailyTransactions).reduce(
      (max, [date, data]) =>
        data.count > max.count ? { date, count: data.count } : max,
      { date: null, count: 0 }
    );

    return {
      heatmapData,
      totalVolume,
      avgTransactionValue: totalVolume / transactions.length,
      mostActiveDay,
      weekdayStats,
      totalTransactions: transactions.length,
    };
  }, [transactions]);

  // Generate heatmap grid (52 weeks x 7 days)
  const generateHeatmapGrid = () => {
    const weeks = [];
    const now = new Date();
    const oneYearAgo = new Date(
      now.getFullYear() - 1,
      now.getMonth(),
      now.getDate()
    );

    // Start from the beginning of the week containing oneYearAgo
    const startDate = new Date(oneYearAgo);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    for (let week = 0; week < 52; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + week * 7 + day);

        if (currentDate > now) {
          weekData.push(null); // Future dates
          continue;
        }

        const dateStr = currentDate.toISOString().split("T")[0];
        const dayData = analyticsData.heatmapData.find(
          (d) => d.date === dateStr
        );

        weekData.push({
          date: dateStr,
          count: dayData?.count || 0,
          volume: dayData?.volume || 0,
          intensity: dayData?.intensity || 0,
          dayOfWeek: day,
        });
      }
      weeks.push(weekData);
    }

    return weeks;
  };

  const heatmapGrid = generateHeatmapGrid();
  const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Tooltip handlers
  const handleMouseEnter = (event, dayData) => {
    if (!dayData) return;

    const rect = event.target.getBoundingClientRect();
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    setTooltip({
      show: true,
      x: rect.left + scrollLeft + rect.width / 2,
      y: rect.top + scrollTop - 10,
      data: dayData,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, data: null });
  };

  // Format date for tooltip
  const formatTooltipDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-52 relative flex flex-col items-center justify-center gap-3">
        <p className="animate-pulse">Base Watch</p>
        <p className="text-white/50 text-sm">Loading analytics...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-52 relative flex flex-col items-center justify-center gap-3">
        <p className="text-red-400">Error loading analytics</p>
        <p className="text-white/50 text-sm">{error}</p>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="w-full h-52 relative flex flex-col items-center justify-center gap-7">
        <TbCalendarStats size={48} className="text-white/20" />
        <div className="text-center">
          <p className="text-white/50 text-sm mb-2">
            No transaction data available
          </p>
          <p className="text-white/30 text-xs">
            Analytics will appear once you have transaction history
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <TbCoinFilled className="text-blue-500" size={20} />
            <span className="text-sm text-white/70">Total Volume</span>
          </div>
          <p className="text-xl font-bold text-white">
            {analyticsData.totalVolume.toFixed(4)} ETH
          </p>
          <p className="text-xs text-white/50">
            {analyticsData.totalTransactions} transactions
          </p>
        </div>

        <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <TbTrendingUp className="text-green-500" size={20} />
            <span className="text-sm text-white/70">Avg Transaction</span>
          </div>
          <p className="text-xl font-bold text-white">
            {analyticsData.avgTransactionValue.toFixed(6)} ETH
          </p>
          <p className="text-xs text-white/50">per transaction</p>
        </div>

        <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <TbCalendarStats className="text-purple-500" size={20} />
            <span className="text-sm text-white/70">Most Active</span>
          </div>
          <p className="text-xl font-bold text-white">
            {analyticsData.mostActiveDay?.count || 0}
          </p>
          <p className="text-xs text-white/50">
            {analyticsData.mostActiveDay?.date
              ? new Date(analyticsData.mostActiveDay.date).toLocaleDateString()
              : "No data"}
          </p>
        </div>
      </div>

      {/* Transaction Heatmap */}
      <div className="bg-gray-900/50 border border-white/10 rounded-xl p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">
            Transaction Activity Heatmap
          </h3>
          <p className="text-sm text-white/60">
            Last 365 days of transaction activity
          </p>
        </div>

        <div className="flex items-start gap-4">
          {/* Weekday labels */}
          <div className="flex flex-col gap-1 mt-4">
            {weekdayLabels.map((label, index) => (
              <div key={index} className="h-3 flex items-center">
                {index % 2 === 1 && (
                  <span className="text-xs text-white/40 w-8">{label}</span>
                )}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="flex-1 overflow-x-auto">
            <div className="flex flex-col gap-1">
              {/* Month labels */}
              <div className="flex gap-1 mb-2 h-4">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="flex-1 min-w-[20px]">
                    {i % 3 === 0 && (
                      <span className="text-xs text-white/40">
                        {monthLabels[i]}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Heatmap rows */}
              {Array.from({ length: 7 }, (_, dayIndex) => (
                <div key={dayIndex} className="flex gap-1">
                  {heatmapGrid.map((week, weekIndex) => {
                    const dayData = week[dayIndex];
                    if (!dayData) {
                      return <div key={weekIndex} className="w-3 h-3" />;
                    }

                    const { intensity, count, date } = dayData;
                    let bgColor = "bg-gray-800";

                    if (intensity > 0) {
                      if (intensity >= 0.8) bgColor = "bg-blue-500";
                      else if (intensity >= 0.6) bgColor = "bg-blue-600";
                      else if (intensity >= 0.4) bgColor = "bg-blue-700";
                      else if (intensity >= 0.2) bgColor = "bg-blue-800";
                      else bgColor = "bg-blue-900";
                    }

                    return (
                      <div
                        key={weekIndex}
                        className={`w-3 h-3 rounded-sm ${bgColor} hover:ring-1 hover:ring-white/50 cursor-pointer transition-all hover:scale-110`}
                        onMouseEnter={(e) => handleMouseEnter(e, dayData)}
                        onMouseLeave={handleMouseLeave}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <span className="text-xs text-white/50">Less</span>
          <div className="flex gap-1">
            {[
              "bg-gray-800",
              "bg-blue-900",
              "bg-blue-800",
              "bg-blue-700",
              "bg-blue-600",
              "bg-blue-500",
            ].map((color, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${color}`} />
            ))}
          </div>
          <span className="text-xs text-white/50">More</span>
        </div>
      </div>

      {/* Weekly Pattern */}
      <div className="bg-gray-900/50 border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Weekly Activity Pattern
        </h3>
        <div className="flex items-end gap-2 h-32">
          {weekdayLabels.map((day, index) => {
            const count = analyticsData.weekdayStats[index];
            const maxCount = Math.max(...analyticsData.weekdayStats);
            const height = maxCount > 0 ? (count / maxCount) * 100 : 0;

            return (
              <div
                key={day}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className="w-full bg-blue-600 rounded-t-sm transition-all hover:bg-blue-500"
                  style={{ height: `${height}%` }}
                  title={`${day}: ${count} transactions`}
                />
                <span className="text-xs text-white/60">{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.show && tooltip.data && (
        <div
          className="fixed z-50 bg-gray-900 border border-white/20 rounded-lg shadow-xl px-3 py-2 pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{
            left: tooltip.x,
            top: tooltip.y,
          }}
        >
          <div className="text-sm text-white font-medium">
            {formatTooltipDate(tooltip.data.date)}
          </div>
          <div className="text-xs text-white/70 mt-1">
            {tooltip.data.count === 0
              ? "No transactions"
              : tooltip.data.count === 1
              ? "1 transaction"
              : `${tooltip.data.count} transactions`}
          </div>
          {tooltip.data.volume > 0 && (
            <div className="text-xs text-blue-400 mt-1">
              {tooltip.data.volume.toFixed(6)} ETH
            </div>
          )}
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
