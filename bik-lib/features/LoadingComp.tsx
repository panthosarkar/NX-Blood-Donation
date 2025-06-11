const LoadingComp = () => {
  return (
    <div className="flex items-center justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2929292d] size-full z-[9999999999999999]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ margin: "auto", display: "block" }}
        width="120px"
        height="120px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle cx="21.5" cy="50" r="10" fill="#ae00b9">
          <animate
            attributeName="cy"
            values="42;58;42"
            dur="0.5882352941176471s"
            calcMode="spline"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
            begin="0s"
            repeatCount="indefinite"
          ></animate>
        </circle>

        <circle cx="49.5" cy="56.92820323027551" r="10" fill="#f50303">
          <animate
            attributeName="cy"
            values="42;58;42"
            dur="0.5882352941176471s"
            calcMode="spline"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-0.19607843137254904s"
            repeatCount="indefinite"
          ></animate>
        </circle>

        <circle cx="77.5" cy="43.07179676972449" r="10" fill="#ffe600">
          <animate
            attributeName="cy"
            values="42;58;42"
            dur="0.5882352941176471s"
            calcMode="spline"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-0.3921568627450981s"
            repeatCount="indefinite"
          ></animate>
        </circle>
      </svg>
    </div>
  );
};

export default LoadingComp;
