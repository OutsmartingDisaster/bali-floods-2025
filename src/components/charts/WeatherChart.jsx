import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine } from 'recharts';

/**
 * WeatherChart Component - Visualizes Denpasar Weather Data
 * 
 * Shows precipitation and temperature data from Sept 8-13, 2025
 * Highlights the flood event period (Sept 9-10)
 */

const WeatherChart = () => {
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState([]);
  const [activeChart, setActiveChart] = useState('precipitation');

  useEffect(() => {
    // Parse the CSV data
    const parseWeatherData = () => {
      // Sample data extracted from the CSV - focusing on key periods
      const data = [
        { date: 'Sep 8', day: '8 Sept', time: '00:00', temp: 27, precip: 0.1, humidity: 78.77 },
        { date: 'Sep 8', day: '8 Sept', time: '06:00', temp: 26, precip: 0.1, humidity: 83.56 },
        { date: 'Sep 8', day: '8 Sept', time: '12:00', temp: 28, precip: 0.1, humidity: 78.91 },
        { date: 'Sep 8', day: '8 Sept', time: '18:00', temp: 27, precip: 0.3, humidity: 83.67 },
        
        { date: 'Sep 9', day: '9 Sept', time: '00:00', temp: 27, precip: 0.2, humidity: 83.67 },
        { date: 'Sep 9', day: '9 Sept', time: '06:00', temp: 26, precip: 0.7, humidity: 94.23 },
        { date: 'Sep 9', day: '9 Sept', time: '09:00', temp: 26, precip: 2.8, humidity: 94.23 },
        { date: 'Sep 9', day: '9 Sept', time: '12:00', temp: 26, precip: 8.3, humidity: 94.23 },
        { date: 'Sep 9', day: '9 Sept', time: '15:00', temp: 26, precip: 4.3, humidity: 94.23 },
        { date: 'Sep 9', day: '9 Sept', time: '18:00', temp: 25, precip: 5.8, humidity: 100 },
        
        { date: 'Sep 10', day: '10 Sept', time: '00:00', temp: 26, precip: 0.5, humidity: 94.23 },
        { date: 'Sep 10', day: '10 Sept', time: '06:00', temp: 25, precip: 15.2, humidity: 100 },
        { date: 'Sep 10', day: '10 Sept', time: '09:00', temp: 25, precip: 25.8, humidity: 100 },
        { date: 'Sep 10', day: '10 Sept', time: '12:00', temp: 24, precip: 35.4, humidity: 100 },
        { date: 'Sep 10', day: '10 Sept', time: '15:00', temp: 24, precip: 28.7, humidity: 100 },
        { date: 'Sep 10', day: '10 Sept', time: '18:00', temp: 25, precip: 12.3, humidity: 100 },
        
        { date: 'Sep 11', day: '11 Sept', time: '00:00', temp: 25, precip: 3.2, humidity: 94.23 },
        { date: 'Sep 11', day: '11 Sept', time: '06:00', temp: 26, precip: 1.8, humidity: 88.75 },
        { date: 'Sep 11', day: '11 Sept', time: '12:00', temp: 27, precip: 0.5, humidity: 83.67 },
        { date: 'Sep 11', day: '11 Sept', time: '18:00', temp: 26, precip: 0.2, humidity: 88.75 },
      ];
      
      setWeatherData(data);
    };

    parseWeatherData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-600 text-white text-sm">
          <p className="font-semibold">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey === 'precip' ? 'Curah Hujan' : entry.dataKey === 'temp' ? 'Suhu' : 'Kelembaban'}: ${entry.value}${entry.dataKey === 'precip' ? 'mm' : entry.dataKey === 'temp' ? '°C' : '%'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-12">
      <div className="mb-6">
        <h4 className="text-2xl font-bold text-black mb-4 text-center">
          Data Cuaca Denpasar (8-11 September 2025)
        </h4>
        
        {/* Chart Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-200 rounded-lg p-1 flex">
            <button
              onClick={() => setActiveChart('precipitation')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeChart === 'precipitation'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              Curah Hujan
            </button>
            <button
              onClick={() => setActiveChart('temperature')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeChart === 'temperature'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              Suhu & Kelembaban
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-300 shadow-lg">
        <ResponsiveContainer width="100%" height={400}>
          {activeChart === 'precipitation' ? (
            <BarChart data={weatherData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="day" 
                stroke="#9CA3AF"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                label={{ value: 'Curah Hujan (mm)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Highlight flood period */}
              <ReferenceLine x="9 Sept" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
              <ReferenceLine x="10 Sept" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
              
              <Bar 
                dataKey="precip" 
                fill="#3b82f6"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          ) : (
            <LineChart data={weatherData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="day" 
                stroke="#9CA3AF"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                label={{ value: 'Suhu (°C) / Kelembaban (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Highlight flood period */}
              <ReferenceLine x="9 Sept" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
              <ReferenceLine x="10 Sept" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
              
              <Line 
                type="monotone" 
                dataKey="temp" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                name="Suhu"
              />
              <Line 
                type="monotone" 
                dataKey="humidity" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="Kelembaban"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
        
        {/* Legend */}
        <div className="mt-4 flex justify-center">
          <div className="flex items-center space-x-6 text-sm">
            {activeChart === 'precipitation' ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-black font-semibold">Curah Hujan (mm)</span>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-black font-semibold">Suhu (°C)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-black font-semibold">Kelembaban (%)</span>
                </div>
              </>
            )}
            <div className="flex items-center space-x-2">
              <div className="w-4 h-1 bg-red-500" style={{ borderStyle: 'dashed' }}></div>
              <span className="text-black font-semibold">Periode Banjir</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-300">
          <div className="text-2xl font-bold text-blue-700 mb-1">35.4mm</div>
          <div className="text-sm text-black font-semibold">{t('dataVisualization.rainfallPeak')}</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-300">
          <div className="text-2xl font-bold text-red-700 mb-1">24°C</div>
          <div className="text-sm text-black font-semibold">{t('dataVisualization.minTemp')}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-300">
          <div className="text-2xl font-bold text-green-700 mb-1">100%</div>
          <div className="text-sm text-black font-semibold">{t('dataVisualization.maxHumidity')}</div>
        </div>
      </div>

      {/* Spacing */}
      <div className="h-12"></div>

      {/* More spacing */}
      <div className="h-8"></div>

      {/* Data Source and Explanation */}
      <div className="mt-8 space-y-8">
        {/* Data Source */}
        <div className="bg-gray-100 rounded-xl p-6 border border-gray-300">
          <h5 className="text-lg font-bold text-black mb-3">Sumber Data</h5>
          <p className="text-black text-sm leading-relaxed">
            {t('dataVisualization.dataSourceNote')}
          </p>
        </div>

        {/* Additional spacing */}
        <div className="h-6"></div>

        {/* Interesting Facts */}
        <div className="bg-yellow-50 rounded-xl p-8 border border-yellow-300">
          <h5 className="text-lg font-bold text-yellow-900 mb-4">{t('dataVisualization.dataFactTitle')}</h5>
          
          <div className="space-y-4 text-sm text-black leading-relaxed">
            <p>
              {t('dataVisualization.dataFact')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-4 rounded-lg border border-gray-300">
                <h6 className="font-semibold text-black mb-2">{t('dataVisualization.legalBasis')}</h6>
                <ul className="text-xs space-y-1 text-black">
                  <li>• {t('dataVisualization.law1')}</li>
                  <li>• {t('dataVisualization.law2')}</li>
                  <li>• {t('dataVisualization.law3')}</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-300">
                <h6 className="font-semibold text-black mb-2">{t('dataVisualization.publicData')}</h6>
                <ul className="text-xs space-y-1 text-black">
                  <li>• {t('dataVisualization.pub1')}</li>
                  <li>• {t('dataVisualization.pub2')}</li>
                  <li>• {t('dataVisualization.pub3')}</li>
                  <li>• {t('dataVisualization.pub4')}</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-300 mt-4">
              <h6 className="font-semibold text-red-700 mb-2">{t('dataVisualization.restrictedData')}</h6>
              <ul className="text-xs space-y-1 text-black">
                <li>• {t('dataVisualization.res1')}</li>
                <li>• {t('dataVisualization.res2')}</li>
                <li>• {t('dataVisualization.res3')}</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-300">
              <p className="text-xs text-black">
                {t('dataVisualization.dataConclusion')}
              </p>
            </div>
            {/* Powerful Quote Section */}
      <div className="my-16">
        <div className="bg-gradient-to-r from-red-100 via-orange-100 to-red-100 rounded-2xl p-8 border border-red-300 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 text-6xl text-black">"</div>
            <div className="absolute bottom-4 right-4 text-6xl text-black rotate-180">"</div>
          </div>
          
          <div className="relative z-10">
            <blockquote className="text-lg md:text-xl leading-relaxed text-black font-semibold text-center italic">
              "{t('dataVisualization.coinMessage')}"
            </blockquote>
            
            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-3 bg-red-200 px-6 py-3 rounded-full border border-red-400">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-red-700 font-bold text-sm tracking-wider">{t('dataVisualization.insertCoin')}</span>
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-12"></div>
    </div>
  );
};

export default WeatherChart;
