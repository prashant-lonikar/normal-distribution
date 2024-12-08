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

  const calculateNormal = (x, mean, sigma) => {
    return (
      (1 / (sigma * Math.sqrt(2 * Math.PI))) *
      Math.exp(-0.5 * Math.pow((x - mean) / sigma, 2))
    );
  };

  const generateData = () => {
    const data = [];
    for (let x = -4; x <= 4; x += 0.1) {
      data.push({
        x: Number(x.toFixed(1)),
        y: calculateNormal(x, mean, sigma),
        standardNormal: calculateNormal(x, 0, 1),
      });
    }
    return data;
  };

  const maxY = Math.max(
    calculateNormal(mean, mean, sigma),
    calculateNormal(0, 0, 1)
  );
  const yTicks = [];
  for (let y = 0; y <= Math.ceil(maxY * 10) / 10; y += 0.2) {
    yTicks.push(Number(y.toFixed(1)));
  }

  const xTicks = [];
  for (let x = -4; x <= 4; x += 0.5) {
    xTicks.push(Number(x.toFixed(1)));
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Interactive Normal Distribution Visualizer
        </h1>

        <div className="text-center mb-8 text-gray-600 max-w-3xl mx-auto">
          This interactive tool helps visualize how the normal distribution
          curve changes with different parameters. Adjust the mean (μ) to shift
          the curve left or right, and the standard deviation (σ) to change its
          spread. The green dotted line shows the standard normal distribution
          (μ=0, σ=1) for reference.
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="mb-8 max-w-2xl mx-auto">
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-lg font-semibold text-gray-800">
                Mean (μ): {mean.toFixed(2)}
              </label>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.1"
                value={mean}
                onChange={(e) => setMean(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-semibold text-gray-800">
                Standard Deviation (σ): {sigma.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={sigma}
                onChange={(e) => setSigma(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <LineChart
            width={800}
            height={400}
            data={generateData()}
            margin={{ top: 20, right: 30, bottom: 20, left: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              ticks={xTicks}
              domain={[-4, 4]}
              stroke="#444"
              strokeWidth={1.5}
            />
            <YAxis
              ticks={yTicks}
              domain={[0, "auto"]}
              stroke="#444"
              strokeWidth={1.5}
            />
            <ReferenceLine
              x={0}
              stroke="black"
              strokeWidth={2}
              strokeDasharray="5 5"
              label={{ value: "μ=0", position: "top", fontSize: 14 }}
            />
            <ReferenceLine
              x={mean}
              stroke="red"
              strokeWidth={2}
              strokeDasharray="5 5"
              label={{
                value: `μ=${mean.toFixed(2)}`,
                position: "top",
                fill: "red",
                fontSize: 14,
              }}
            />
            <Line
              type="monotone"
              dataKey="standardNormal"
              stroke="green"
              strokeWidth={3}
              strokeDasharray="7 7"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="y"
              stroke="#4C1D95"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Legend & Explanation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">Graph Elements:</h3>
              <ul className="space-y-2">
                <li>
                  • <span className="text-purple-900">Purple solid line:</span>{" "}
                  Current distribution
                </li>
                <li>
                  • <span className="text-green-600">Green dashed line:</span>{" "}
                  Standard normal (μ=0, σ=1)
                </li>
                <li>
                  • <span className="text-red-600">Red dashed line:</span>{" "}
                  Current mean position
                </li>
                <li>
                  • <span className="text-black">Black dashed line:</span>{" "}
                  Reference at μ=0
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Parameters:</h3>
              <ul className="space-y-2">
                <li>• Mean (μ): Controls the center of the distribution</li>
                <li>
                  • Standard Deviation (σ): Controls the spread of the
                  distribution
                </li>
                <li>• X-axis: Values in increments of 0.5</li>
                <li>• Y-axis: Probability density</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NormalDistribution;
