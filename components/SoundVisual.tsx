"use client";

import { MotionConfig, motion, type Variants } from "motion/react";

// flex weights taken from the Figma bar widths (138, 148, 149, 149, 387)
const BARS = [138, 148, 149, 149, 387];

// Colour orbs that slowly drift behind the (static) glass bars.
const BLOBS = [
  {
    className:
      "left-[-40%] top-[9%] h-[78%] w-[170%] bg-[#002AFE] lg:left-[12%] lg:w-[159%]",
    x: ["-4%", "5%"],
    y: ["-3%", "4%"],
    scale: [1, 1.06],
    duration: 9,
  },
  {
    className:
      "left-[-10%] top-[23%] h-[51%] w-[120%] bg-[#4000FE] lg:left-[18%] lg:w-[102%]",
    x: ["8%", "-12%"],
    y: ["5%", "-6%"],
    scale: [1.05, 0.95],
    duration: 7,
  },
  {
    className:
      "left-[30%] top-[40%] h-[35%] w-[45%] bg-[#7A3BFF] lg:left-[35%]",
    x: ["-60%", "70%"],
    y: ["-20%", "20%"],
    scale: [0.9, 1.2],
    duration: 11,
    opacity: 0.7,
  },
  {
    className:
      "left-[45%] top-[5%] h-[30%] w-[35%] bg-[#2F5CFF] lg:left-[55%]",
    x: ["60%", "-80%"],
    y: ["10%", "90%"],
    scale: [1.1, 0.9],
    duration: 13,
    opacity: 0.7,
  },
];

const drift = (duration: number) => ({
  duration,
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
});

const GROW_STAGGER = 0.14;
const LABELS_DELAY = 1.3;

const barsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: GROW_STAGGER } },
};

const barGrow: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  show: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const labelBase =
  "text-center text-lg font-medium text-white [text-shadow:0_1px_10px_rgba(0,0,80,0.55)] lg:absolute lg:text-left";

function Label({
  children,
  className,
  index,
}: {
  children: string;
  className: string;
  index: number;
}) {
  return (
    <motion.p
      className={`${labelBase} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: LABELS_DELAY + index * 0.15, duration: 0.8 }}
    >
      {children}
    </motion.p>
  );
}

export default function SoundVisual() {
  return (
    // Ambient background drift: intentionally ignores prefers-reduced-motion.
    <MotionConfig reducedMotion="never">
      <div
        className="relative isolate flex h-[520px] flex-col items-center justify-center gap-5 overflow-hidden sm:h-[600px] lg:absolute lg:inset-y-0 lg:right-0 lg:z-0 lg:block lg:h-auto lg:w-[53%]"
      >
        {/* blurred colour blobs (Figma Ellipse 17 / 16) drifting behind the glass */}
        {BLOBS.map((b, i) => (
          <motion.div
            key={i}
            aria-hidden
            className={`absolute -z-10 rounded-full blur-[50px] will-change-transform ${b.className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: b.opacity ?? 1, x: b.x, y: b.y, scale: b.scale }}
            transition={{
              opacity: { duration: 1.2, delay: i * 0.2 },
              x: drift(b.duration),
              y: drift(b.duration * 1.2),
              scale: drift(b.duration * 0.9),
            }}
          />
        ))}

        {/* frosted glass bars */}
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-10 flex"
          variants={barsContainer}
          initial="hidden"
          animate="show"
        >
          {BARS.map((weight, i) => (
            <motion.div
              key={i}
              variants={barGrow}
              style={{ flexGrow: weight, flexBasis: 0, originY: 1 }}
              className="h-full"
            >
              <motion.div
                className="size-full border-x-[3px] border-white/45 bg-linear-to-l from-white/60 from-40% to-white/0 shadow-[inset_0_0_30px_rgba(255,255,255,0.35)] backdrop-blur-[20px]"
              />
            </motion.div>
          ))}
        </motion.div>

        <Label
          index={0}
          className="lg:left-[51%] lg:top-[28%] lg:w-[16%]"
        >
          Experienced engineers
        </Label>
        <Label
          index={1}
          className="lg:left-[26%] lg:top-[44%] lg:w-[16%]"
        >
          Modern equipment
        </Label>

        <motion.p
          className="font-display text-5xl font-semibold text-white [text-shadow:0_2px_16px_rgba(0,0,80,0.35)] sm:text-6xl lg:absolute lg:left-[47.5%] lg:top-[43%] lg:text-[clamp(3rem,3.7vw,4rem)]"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
        >
          CRUNCHY
        </motion.p>

        <Label
          index={2}
          className="max-w-[16rem] lg:left-[80%] lg:top-[58%] lg:w-[17%] lg:max-w-none"
        >
          Individual approach to each client
        </Label>
      </div>
    </MotionConfig>
  );
}
