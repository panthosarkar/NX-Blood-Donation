const PageLoading = () => {
  return (
    <div className="fixed top-0 left-0 size-full z-50 bg-white">
      <div className="flex items-center justify-center size-full">
        <svg
          style={{ margin: "auto", background: "#fff", display: "block" }}
          width="200px"
          height="200px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 50 50;120 50 50"
              keyTimes="0;1"
              dur="1s"
              repeatCount="indefinite"
            ></animateTransform>
            <circle
              cx="50"
              cy="50"
              r="29"
              stroke="#ffe600"
              fill="none"
              strokeDasharray="30.368728984701335 182.212373908208"
              strokeLinecap="round"
              strokeWidth="5"
              transform="rotate(0 50 50)"
            >
              <animate
                attributeName="stroke"
                values="#ffe600;#f50303"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              ></animate>
            </circle>
            <circle
              cx="50"
              cy="50"
              r="29"
              stroke="#f50303"
              fill="none"
              strokeDasharray="30.368728984701335 182.212373908208"
              strokeLinecap="round"
              strokeWidth="5"
              transform="rotate(120 50 50)"
            >
              <animate
                attributeName="stroke"
                values="#f50303;#ae00b9"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              ></animate>
            </circle>
            <circle
              cx="50"
              cy="50"
              r="29"
              stroke="#ae00b9"
              fill="none"
              strokeDasharray="30.368728984701335 182.212373908208"
              strokeLinecap="round"
              strokeWidth="5"
              transform="rotate(240 50 50)"
            >
              <animate
                attributeName="stroke"
                values="#ae00b9;#ffe600"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              ></animate>
            </circle>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default PageLoading;
