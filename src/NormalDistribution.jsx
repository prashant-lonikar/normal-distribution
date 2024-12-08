import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const NormalDistribution = () => {
  const [mean, setMean] = useState(0);
  const [sigma, setSigma] = useState(1);

  // Calculate normal distribution
  const calculateNormal = (x, mean, sigma) => {
    return (
      (1 / (sigma * Math.sqrt(2 * Math.PI))) *
      Math.exp(-0.5 * Math.pow((x - mean) / sigma, 2))
    );
  };

  // Generate data points for current distribution
  const generateData = () => {
    const data = [];
    for (let x = -4; x <= 4; x += 0.1) {
      data.push({
        x: Number(x.toFixed(1)),
        y: calculateNormal(x, mean, sigma),
        // Add standard normal to each data point
        standardNormal: calculateNormal(x, 0, 1),
      });
    }
    return data;
  };

  // Find max Y value for dynamic Y axis
  const maxY = Math.max(
    calculateNormal(mean, mean, sigma),
    calculateNormal(0, 0, 1) // Include standard normal in max calculation
  );
  const yTicks = [];
  for (let y = 0; y <= Math.ceil(maxY * 10) / 10; y += 0.2) {
    yTicks.push(Number(y.toFixed(1)));
  }

  // Generate X ticks
  const xTicks = [];
  for (let x = -4; x <= 4; x += 0.5) {
    xTicks.push(Number(x.toFixed(1)));
  }

  return (
    <div className="p-4">
      <div className="mb-4 space-y-4">
        <div>
          <label className="block mb-2">Mean: {mean.toFixed(2)}</label>
          <input
            type="range"
            min="-3"
            max="3"
            step="0.1"
            value={mean}
            onChange={(e) => setMean(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Sigma: {sigma.toFixed(2)}</label>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={sigma}
            onChange={(e) => setSigma(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
      <LineChart
        width={600}
        height={400}
        data={generateData()}
        margin={{ top: 20, right: 20, bottom: 20, left: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" ticks={xTicks} domain={[-4, 4]} />
        <YAxis ticks={yTicks} domain={[0, "auto"]} />
        {/* Black dotted line at x=0 */}
        <ReferenceLine
          x={0}
          stroke="black"
          strokeDasharray="3 3"
          label={{ value: "μ=0", position: "top" }}
        />
        {/* Red dotted line at selected mean */}
        <ReferenceLine
          x={mean}
          stroke="red"
          strokeDasharray="3 3"
          label={{
            value: `μ=${mean.toFixed(2)}`,
            position: "top",
            fill: "red",
          }}
        />
        {/* Standard Normal Distribution */}
        <Line
          type="monotone"
          dataKey="standardNormal"
          stroke="green"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
        />
        {/* Current Distribution */}
        <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
      </LineChart>
    </div>
  );
};

export default NormalDistribution;
