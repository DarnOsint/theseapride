interface Props {
  position?: "top" | "bottom";
  color?: string;
  flip?: boolean;
}

export default function WaveDivider({ position = "bottom", color = "fill-sea-900", flip = false }: Props) {
  return (
    <div className={`relative w-full h-16 lg:h-24 overflow-hidden ${position === "top" ? "-mt-16 lg:-mt-24" : ""}`}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={`absolute w-full h-full ${flip ? "scale-x-[-1]" : ""}`}
        style={{ top: position === "top" ? "0" : "auto", bottom: position === "bottom" ? "0" : "auto" }}
      >
        <path
          className={color}
          d="M0,64 C360,120 540,40 720,48 C900,56 1080,96 1440,48 L1440,0 L0,0 Z"
        />
      </svg>
    </div>
  );
}
