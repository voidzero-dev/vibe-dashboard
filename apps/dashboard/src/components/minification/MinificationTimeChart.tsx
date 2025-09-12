import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface MinificationTimeChartProps {
  data: any[];
}

export function MinificationTimeChart({ data }: MinificationTimeChartProps) {
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
          formatter={(value: any) => [`${value}ms`, 'Minification Time']}
        />
        <Bar dataKey='value' fill='#60a5fa'>
          <LabelList
            dataKey='value'
            position='top'
            formatter={(label: React.ReactNode) => `${label}ms`}
            style={{ fontSize: '12px', fill: '#6b7280' }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}