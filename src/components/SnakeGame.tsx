"use client";

import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Play, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

const SIZE = 15;
const TICK = 140;
const BEST_KEY = "brightlant-404-best";

type Dir = "up" | "down" | "left" | "right";
type Point = { x: number; y: number };

const STEP: Record<Dir, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
const OPPOSITE: Record<Dir, Dir> = { up: "down", down: "up", left: "right", right: "left" };

const START: Point[] = [
  { x: 7, y: 8 },
  { x: 6, y: 8 },
  { x: 5, y: 8 },
];

function randomFood(snake: Point[]): Point {
  const free: Point[] = [];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (!snake.some((s) => s.x === x && s.y === y)) free.push({ x, y });
    }
  }
  return free[Math.floor(Math.random() * free.length)] ?? { x: 0, y: 0 };
}

/**
 * A small distraction on the 404 page. setInterval rather than requestAnimationFrame
 * on purpose: the tick is a fixed 140ms of game logic, not a render loop, and a
 * timer keeps running (throttled) in a background tab instead of freezing mid-game.
 */
function readBest(): number {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

const noop = () => () => {};

export function SnakeGame() {
  // The stored best is client-only. Reading it lazily and holding the display back
  // until hydration keeps the server and first client render identical, without a
  // setState in an effect.
  const hydrated = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

  const [snake, setSnake] = useState<Point[]>(START);
  const [food, setFood] = useState<Point>({ x: 11, y: 4 });
  const [state, setState] = useState<"idle" | "playing" | "over">("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => (typeof window === "undefined" ? 0 : readBest()));

  // The direction the snake is moving, and the one queued for the next tick — two
  // key presses inside one tick would otherwise let you turn back into yourself.
  const dir = useRef<Dir>("right");
  const next = useRef<Dir>("right");
  const boardRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<Point | null>(null);

  const start = useCallback(() => {
    dir.current = "right";
    next.current = "right";
    setSnake(START);
    setFood(randomFood(START));
    setScore(0);
    setState("playing");
    boardRef.current?.focus();
  }, []);

  const turn = useCallback((d: Dir) => {
    if (d !== OPPOSITE[dir.current]) next.current = d;
  }, []);

  /* ------------------------------------------------------------- game loop -- */
  useEffect(() => {
    if (state !== "playing") return;

    const id = setInterval(() => {
      setSnake((prev) => {
        dir.current = next.current;
        const step = STEP[dir.current];
        const head = { x: prev[0].x + step.x, y: prev[0].y + step.y };

        const hitWall = head.x < 0 || head.y < 0 || head.x >= SIZE || head.y >= SIZE;
        const hitSelf = prev.some((s) => s.x === head.x && s.y === head.y);
        if (hitWall || hitSelf) {
          setState("over");
          return prev;
        }

        const ate = head.x === food.x && head.y === food.y;
        const grown = [head, ...prev];
        if (!ate) grown.pop();
        else {
          setFood(randomFood(grown));
          setScore((s) => {
            const value = s + 1;
            setBest((b) => {
              if (value <= b) return b;
              try {
                localStorage.setItem(BEST_KEY, String(value));
              } catch {
                /* not fatal */
              }
              return value;
            });
            return value;
          });
        }
        return grown;
      });
    }, TICK);

    return () => clearInterval(id);
  }, [state, food]);

  /* --------------------------------------------------------------- controls -- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        s: "down",
        a: "left",
        d: "right",
      };
      const d = map[e.key] ?? map[e.key.toLowerCase()];
      if (!d) return;
      // Only swallow the key while playing, so arrows still scroll the page
      // for anyone who is not using the game.
      if (state === "playing") {
        e.preventDefault();
        turn(d);
      }
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, [state, turn]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touchStart.current;
    if (!s) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s.x;
    const dy = t.clientY - s.y;
    if (Math.abs(dx) < 24 && Math.abs(dy) < 24) return;
    turn(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : dy > 0 ? "down" : "up");
    touchStart.current = null;
  };

  const cells = Array.from({ length: SIZE * SIZE }, (_, i) => ({
    x: i % SIZE,
    y: Math.floor(i / SIZE),
  }));

  return (
    <div className="w-full max-w-[420px]">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-semibold text-foreground/60">
          Score <span className="font-extrabold text-accent">{score}</span>
        </span>
        <span className="font-semibold text-foreground/60">
          Best <span className="font-extrabold text-foreground/80">{hydrated ? best : 0}</span>
        </span>
      </div>

      <div
        ref={boardRef}
        tabIndex={0}
        role="application"
        aria-label="Snake — use the arrow keys, or swipe"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative grid aspect-square w-full gap-[2px] rounded-2xl border border-line bg-muted/60 p-2 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:gap-[3px] sm:p-3"
        style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`, touchAction: "none" }}
      >
        {cells.map(({ x, y }) => {
          const headHit = snake[0].x === x && snake[0].y === y;
          const bodyHit = !headHit && snake.some((s) => s.x === x && s.y === y);
          const foodHit = food.x === x && food.y === y;
          return (
            <div
              key={`${x}-${y}`}
              className={`rounded-[2px] transition-colors duration-100 sm:rounded-sm ${
                headHit
                  ? "bg-accent shadow-[0_0_8px_var(--accent)]"
                  : bodyHit
                    ? "bg-accent/55"
                    : foodHit
                      ? "animate-pulse bg-accent-light"
                      : "bg-line/60"
              }`}
            />
          );
        })}

        {state !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl bg-surface/85 backdrop-blur-sm">
            <p className="px-6 text-center text-sm font-semibold">
              {state === "over" ? `Ate ${score} — nice.` : "Snake, while you are here."}
            </p>
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-[#0b3f91]"
            >
              {state === "over" ? (
                <>
                  <RotateCcw className="h-4 w-4" /> Play again
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> Play
                </>
              )}
            </button>
            <p className="text-xs text-foreground/45">Arrow keys, WASD, or swipe</p>
          </div>
        )}
      </div>

      {/* On-screen pad — the only way to play on a phone without a keyboard. */}
      <div className="mt-4 grid grid-cols-3 gap-2 sm:hidden">
        <span />
        <PadButton dir="up" onPress={turn} icon={ChevronUp} />
        <span />
        <PadButton dir="left" onPress={turn} icon={ChevronLeft} />
        <PadButton dir="down" onPress={turn} icon={ChevronDown} />
        <PadButton dir="right" onPress={turn} icon={ChevronRight} />
      </div>
    </div>
  );
}

function PadButton({
  dir,
  onPress,
  icon: Icon,
}: {
  dir: Dir;
  onPress: (d: Dir) => void;
  icon: typeof ChevronUp;
}) {
  return (
    <button
      type="button"
      onClick={() => onPress(dir)}
      aria-label={`Move ${dir}`}
      className="flex h-12 items-center justify-center rounded-xl border border-line-strong bg-surface text-foreground/70 transition active:bg-accent active:text-white"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
