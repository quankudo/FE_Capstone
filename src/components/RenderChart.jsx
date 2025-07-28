import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const scopesChart = {
    today : 'hour',
    week : 'day',
    month : 'week',
    year : 'month'
  };
const RenderChart = (title, data, xKey) => (
    <div className="mb-10">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={scopesChart[xKey]} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="good" fill="#4ade80" name="Tốt" />
          <Bar dataKey="bad" fill="#f87171" name="Xấu" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )

export default RenderChart
