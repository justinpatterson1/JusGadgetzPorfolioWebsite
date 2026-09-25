/**
 * The coder illustration — design-system.md §7.3,
 * context/features/design/07-coder-scene.md.
 *
 * Inline SVG on a 400×460 viewBox, animated by six CSS loops declared in
 * `globals.css`. It is inline rather than a file in `public/` for one reason:
 * an inline SVG inherits the document's cascade, so `fill="var(--accent)"`
 * resolves against whatever the active palette wrote on `<html>`. The hoodie,
 * the mug band, the lens glow and half the code lines recolor with the palette
 * for free, with no JS and no re-render.
 *
 * Fixed colors that must NOT be tokenized: skin `#e8c9a8`, hair `#2a1f17`,
 * glasses and chassis `#2a2535`, mug body `#f5f2ec`, neutral code lines
 * `#a3a0b3`. They sit on a card that is dark in both themes and were chosen
 * against it — the SVG-fill exception in design-system.md §2.4.
 *
 * Drawing order is load-bearing: the arms are drawn before the laptop so the
 * hands disappear behind the screen, and the laptop base is drawn last within
 * its group so it covers the screen's lower edge.
 */
export function CoderScene() {
  return (
    <div
      className="coder-scene"
      role="img"
      aria-label="Animated illustration of a developer coding at a laptop"
    >
      <svg viewBox="0 0 400 460" preserveAspectRatio="xMidYMid meet">
        {/* Both gradients are vertical. The ids are global to the document — if
            a second instance of this scene is ever rendered on the same page,
            suffix them per instance. */}
        <defs>
          <linearGradient id="coderScreenGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1a1530" />
            <stop offset="100%" stopColor="#0a0815" />
          </linearGradient>
          <linearGradient id="coderLaptopGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#cfcad8" />
            <stop offset="100%" stopColor="#9a93a8" />
          </linearGradient>
        </defs>

        {/* contact shadow under the desk */}
        <ellipse cx="200" cy="430" rx="180" ry="14" fill="rgba(0,0,0,0.25)" />

        {/* The handle is a stroked open path rather than a filled shape, and
            the accent band at the rim is the mug's only brand color. The three
            steam paths are S-curves that cross, so the wisps interleave. */}
        <g className="mug">
          <path
            d="M70,360 L70,400 Q70,415 85,415 L115,415 Q130,415 130,400 L130,360 Z"
            fill="#f5f2ec"
          />
          <path
            d="M130,370 Q145,370 145,385 Q145,400 130,400"
            fill="none"
            stroke="#f5f2ec"
            strokeWidth="4"
          />
          <rect x="70" y="360" width="60" height="6" fill="var(--accent)" />
          <path
            className="steam s1"
            d="M85,355 Q80,340 90,325 Q100,310 92,295"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            className="steam s2"
            d="M105,355 Q112,340 102,325 Q92,310 105,295"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            className="steam s3"
            d="M120,355 Q125,340 115,325 Q105,310 118,295"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        <g className="body">
          {/* Three shading planes from one hue — full accent outside, 70% into
              black for the inner torso, 80% for the hood. Volume comes from
              value steps in a single hue, which is why the figure survives a
              palette change. */}
          <path
            d="M130,420 Q130,330 200,310 Q270,330 270,420 Z"
            fill="var(--accent)"
          />
          <path
            d="M155,420 Q160,360 200,345 Q240,360 245,420 Z"
            fill="color-mix(in oklab, var(--accent) 70%, black)"
          />
          <path
            d="M165,320 Q200,295 235,320 Q230,300 200,295 Q170,300 165,320 Z"
            fill="color-mix(in oklab, var(--accent) 80%, black)"
          />

          <g className="head">
            <ellipse cx="200" cy="270" rx="32" ry="36" fill="#e8c9a8" />
            <path
              d="M168,260 Q170,235 200,228 Q230,235 232,260 Q232,250 220,245 Q210,250 200,247 Q190,250 180,245 Q168,250 168,260 Z"
              fill="#2a1f17"
            />
            <circle
              cx="188"
              cy="270"
              r="7"
              fill="none"
              stroke="#2a2535"
              strokeWidth="1.8"
            />
            <circle
              cx="212"
              cy="270"
              r="7"
              fill="none"
              stroke="#2a2535"
              strokeWidth="1.8"
            />
            <line
              x1="195"
              y1="270"
              x2="205"
              y2="270"
              stroke="#2a2535"
              strokeWidth="1.8"
            />
            {/* Screen glow reflected in the lenses. Drawn after the frames so
                they fill the lens interior — the detail that sells the scene,
                and the one that ties the face to the accent color. */}
            <circle cx="188" cy="270" r="6" fill="var(--accent)" opacity="0.35" />
            <circle cx="212" cy="270" r="6" fill="var(--accent)" opacity="0.35" />
            <path
              d="M193,288 Q200,291 207,288"
              stroke="#2a2535"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Each arm is a 22px round-capped stroke (the sleeve) plus a small
              ellipse (the hand). Hands land at y≈402, just above the laptop
              base at y=428, so they read as resting on the keyboard. */}
          <g className="arm-l">
            <path
              d="M155,360 Q140,380 165,400"
              stroke="var(--accent)"
              strokeWidth="22"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse cx="170" cy="402" rx="9" ry="7" fill="#e8c9a8" />
          </g>
          <g className="arm-r">
            <path
              d="M245,360 Q260,380 235,400"
              stroke="var(--accent)"
              strokeWidth="22"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse cx="230" cy="402" rx="9" ry="7" fill="#e8c9a8" />
          </g>
        </g>

        <g className="laptop">
          <rect x="135" y="350" width="130" height="78" rx="6" fill="#2a2535" />
          <rect
            x="141"
            y="356"
            width="118"
            height="66"
            rx="3"
            fill="url(#coderScreenGrad)"
          />
          {/* Code lines sit on an 8px baseline grid (y = 364…412). Indentation
              alternates between x=148 flush and x=155 indented to imply
              structure, and the colors cycle accent → neutral → coral so the
              block reads as syntax highlighting rather than as stripes. */}
          <g className="code-lines">
            <rect
              className="cl c1"
              x="148"
              y="364"
              width="26"
              height="3"
              rx="1"
              fill="var(--accent)"
              opacity="0.9"
            />
            <rect
              className="cl c2"
              x="178"
              y="364"
              width="40"
              height="3"
              rx="1"
              fill="#a3a0b3"
            />
            <rect
              className="cl c3"
              x="155"
              y="372"
              width="50"
              height="3"
              rx="1"
              fill="var(--co-coral)"
              opacity="0.9"
            />
            <rect
              className="cl c4"
              x="148"
              y="380"
              width="34"
              height="3"
              rx="1"
              fill="#a3a0b3"
            />
            <rect
              className="cl c5"
              x="186"
              y="380"
              width="22"
              height="3"
              rx="1"
              fill="var(--accent)"
              opacity="0.9"
            />
            <rect
              className="cl c6"
              x="155"
              y="388"
              width="60"
              height="3"
              rx="1"
              fill="#a3a0b3"
            />
            <rect
              className="cl c7"
              x="148"
              y="396"
              width="40"
              height="3"
              rx="1"
              fill="var(--co-coral)"
              opacity="0.9"
            />
            <rect
              className="cl c8"
              x="192"
              y="396"
              width="30"
              height="3"
              rx="1"
              fill="#a3a0b3"
            />
            <rect
              className="cl c9"
              x="155"
              y="404"
              width="48"
              height="3"
              rx="1"
              fill="var(--accent)"
              opacity="0.9"
            />
            <rect
              className="cl c10"
              x="148"
              y="412"
              width="28"
              height="3"
              rx="1"
              fill="#a3a0b3"
            />
            {/* Literal white: an SVG fill on a permanently dark card, one of
                the exceptions design-system.md §2.4 allows. */}
            <rect className="cursor" x="180" y="412" width="2" height="6" fill="white" />
          </g>
          {/* The base is a trapezoid — wider at the bottom, which is what gives
              the machine its perspective. The small ellipse is the trackpad. */}
          <path d="M125,428 L275,428 L285,438 L115,438 Z" fill="url(#coderLaptopGrad)" />
          <ellipse cx="200" cy="432" rx="14" ry="2" fill="#7a7388" />
        </g>

        <g className="floaters">
          <text
            className="float f1"
            x="80"
            y="200"
            fontFamily="ui-monospace, monospace"
            fontSize="22"
            fill="var(--accent)"
            opacity="0.55"
            fontWeight="600"
          >
            &lt;/&gt;
          </text>
          <text
            className="float f2"
            x="310"
            y="180"
            fontFamily="ui-monospace, monospace"
            fontSize="18"
            fill="var(--co-coral)"
            opacity="0.6"
            fontWeight="600"
          >
            {"{ }"}
          </text>
          <text
            className="float f3"
            x="320"
            y="260"
            fontFamily="ui-monospace, monospace"
            fontSize="14"
            fill="rgba(255,255,255,0.5)"
            fontWeight="600"
          >
            npm
          </text>
          <text
            className="float f4"
            x="60"
            y="140"
            fontFamily="ui-monospace, monospace"
            fontSize="14"
            fill="rgba(255,255,255,0.5)"
            fontWeight="600"
          >
            git
          </text>
          <circle className="float f5" cx="340" cy="100" r="4" fill="var(--accent)" />
          <circle className="float f6" cx="50" cy="80" r="3" fill="var(--co-coral)" />
        </g>
      </svg>
    </div>
  );
}
