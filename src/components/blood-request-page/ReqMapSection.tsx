import React from "react";

const ReqMapSection = () => {
  return (
    <div className="md:col-span-2 mt-1">
      <svg
        className="w-full h-64 object-cover border border-gray-300 rounded-md bg-gray-100 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 100"
        preserveAspectRatio="xMidYMid slice"
        aria-label="Map placeholder"
      >
        <rect width="200" height="100" className="fill-current text-gray-200" />
        <path
          d="M0 70 Q 50 90, 100 70 T 200 70 L 200 100 L 0 100 Z"
          className="fill-current text-green-300 opacity-50"
        />
        <path
          d="M0 80 Q 50 60, 100 80 T 200 80"
          strokeWidth="2"
          className="stroke-current text-blue-400 opacity-60"
          fill="none"
        />
        <circle cx="70" cy="50" r="3" className="fill-current text-red-500" />
        <circle cx="130" cy="60" r="3" className="fill-current text-red-500" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-current text-2.5 text-gray-500"
        >
          Map Area
        </text>
      </svg>
    </div>
  );
};

export default ReqMapSection;
