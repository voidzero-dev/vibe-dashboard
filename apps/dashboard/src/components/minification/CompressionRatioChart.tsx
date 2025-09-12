import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface CompressionRatioChartProps {
  data: any[];
}

export function CompressionRatioChart({ data }: CompressionRatioChartProps) {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' className='stroke-slate-200 dark:stroke-slate-700' />
        <XAxis
          dataKey='name'
          tick={{ fill: '#6b7280', fontSize: 11 }}
          axisLine={{ stroke: '#e5e7eb' }}
          tickLine={{ stroke: '#e5e7eb' }}
          angle={-45}
          textAnchor='end'
          height={60}
        />
        <YAxis
          tick={{ fill: '#6b7280', fontSize: 11 }}
          axisLine={{ stroke: '#e5e7eb' }}
          tickLine={{ stroke: '#e5e7eb' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--tooltip-bg)',
            border: '1px solid var(--tooltip-border)',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            color: 'var(--tooltip-text)',
          }}
          labelStyle={{ color: 'var(--tooltip-text)' }}
          formatter={(value: any, _name: any, props: any) => [
            `${value}% (${props.payload.minzippedBytes} bytes)`,
            'Compression Ratio',
          ]}
        />
        <Bar dataKey='value' fill='#4ade80'>
          <LabelList
            dataKey='value'
            position='top'
            formatter={(label: React.ReactNode) => `${label}%`}
            style={{ fontSize: '10px', fill: '#6b7280' }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}