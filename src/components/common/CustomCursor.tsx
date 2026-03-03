import { useEffect, useRef, useState } from "react";

interface CustomCursorProps {
  targetSelector: string;
}

// Generate unique IDs for filters to avoid conflicts
const uniqueId = `cursor-${Math.random().toString(36).substr(2, 9)}`;
const filterId = `filter0_dii_${uniqueId}`;

// Path shape for the L-arrow
const ARROW_PATH =
  "M16.6989 31.2808C15.2649 31.2808 14.1016 30.0949 14.1016 28.6332V12.7477C14.1016 11.286 15.2649 10.1001 16.6989 10.1001H82.037C82.727 10.1001 83.3898 10.3828 83.8768 10.8792L117.344 44.9945C117.831 45.4909 118.102 46.1666 118.102 46.8629V113.453C118.102 114.914 116.938 116.1 115.504 116.1H99.9205C98.4866 116.1 97.3232 114.914 97.3232 113.453V52.6614C97.3232 50.3034 94.523 49.1175 92.8862 50.7929L30.6458 114.238C29.6312 115.273 27.9876 115.273 26.9731 114.238L15.9481 103C14.9335 101.966 14.9335 100.29 15.9481 99.2562L78.1885 35.8106C79.8253 34.1421 78.6687 31.2877 76.3487 31.2877";

export const CustomCursor = ({
  targetSelector,
}: CustomCursorProps): JSX.Element => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const [displayPosition, setDisplayPosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const updatePosition = (): void => {
      if (cursorRef.current && isVisibleRef.current) {
        setDisplayPosition({ ...positionRef.current });
        animationFrameRef.current = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseMove = (e: MouseEvent): void => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      if (isVisibleRef.current && !animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseEnter = (): void => {
      isVisibleRef.current = true;
      setIsVisible(true);
      if (cursor) {
        cursor.style.opacity = "1";
      }
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseLeave = (): void => {
      isVisibleRef.current = false;
      setIsVisible(false);
      if (cursor) {
        cursor.style.opacity = "0";
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };

    // Find all elements matching the selector
    const targetElements = document.querySelectorAll(targetSelector);

    // Add event listeners to each target element
    targetElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    // Track mouse movement globally
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      targetElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
      document.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [targetSelector]);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        position: "fixed",
        left: `${displayPosition.x}px`,
        top: `${displayPosition.y}px`,
        width: "133px",
        height: "135px",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.15s ease",
        willChange: "transform",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="133"
        height="135"
        viewBox="0 0 133 135"
        fill="none"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "block",
          filter: "drop-shadow(0 4px 14.1px rgba(0, 0, 0, 0.09))",
        }}
      >
        <g filter={`url(#${filterId})`}>
          <path
            d={ARROW_PATH}
            fill="rgba(149, 166, 255, 0.22)"
            shapeRendering="crispEdges"
            style={{
              boxShadow:
                "0 1px 2px 0 rgba(255, 255, 255, 0.90) inset, 0 4px 9.8px 0 rgba(255, 255, 255, 0.49) inset",
            }}
          />
        </g>
        <defs>
          <filter
            id={filterId}
            x="0.00156212"
            y="9.72748e-05"
            width="132.2"
            height="134.2"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="7.05" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_152_2075"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_152_2075"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="4.9" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.49 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect2_innerShadow_152_2075"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_innerShadow_152_2075"
              result="effect3_innerShadow_152_2075"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
