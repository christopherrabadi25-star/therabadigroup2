/**
 * The San Gabriel Mountains as seen from Claremont, with Mt. Baldy as the high point.
 * Used as the site's signature line under the hero and above the footer.
 */
const RIDGE =
  "M0 96 L48 90 L96 93 L150 78 L196 83 L250 66 L300 73 L352 56 L402 63 L446 49 L496 60 L540 52 L590 65 L640 47 L684 33 L722 40 L760 19 L792 28 L826 23 L866 42 L908 35 L958 55 L1008 49 L1058 67 L1110 61 L1158 79 L1200 75";

export default function Ridgeline({
  className = "",
  stroke = "currentColor",
  fill,
  draw = false,
}: {
  className?: string;
  stroke?: string;
  fill?: string;
  draw?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className={`${draw ? "ridge-draw " : ""}${className}`}
      aria-hidden="true"
    >
      {fill && <path d={`${RIDGE} L1200 120 L0 120 Z`} fill={fill} stroke="none" />}
      <path d={RIDGE} fill="none" stroke={stroke} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
