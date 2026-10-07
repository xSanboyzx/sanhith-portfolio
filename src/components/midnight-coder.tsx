import localFont from "next/font/local";
import { useId, type CSSProperties } from "react";
import styles from "./midnight-coder.module.css";

const orbitron = localFont({
  src: "../app/fonts/orbitron-variable.ttf",
  variable: "--font-orbitron",
  weight: "400 900",
  display: "swap",
});

export function MidnightCoder() {
  const id = useId();

  return (
    <svg
      className={`${styles.artwork} ${orbitron.variable}`}
      style={{ "--coder-edge": `url(#${id}-edge)` } as CSSProperties}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      role="img"
      aria-labelledby={`${id}-title ${id}-description`}
    >
      <title id={`${id}-title`}>Midnight Coder</title>
      <desc id={`${id}-description`}>
        A curly-haired coder with one glowing violet eye behind rounded glasses
        and a calm, mouthless face. The eye sends a bright flare toward the
        viewer once before the character draws itself into view. He sits behind
        a charcoal laptop with a glowing s. mark.
      </desc>
      <defs>
        <radialGradient id={`${id}-ambient`}>
          <stop stopColor="#b78aff" stopOpacity=".12" />
          <stop offset="1" stopColor="#b78aff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-lid-fill`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#20152e" />
          <stop offset="1" stopColor="#100d17" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#dcc8ff" />
          <stop offset="1" stopColor="#9768cc" />
        </linearGradient>
        <filter
          id={`${id}-soft-glow`}
          x="-80%"
          y="-80%"
          width="260%"
          height="260%"
        >
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter
          id={`${id}-mark-glow`}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          id={`${id}-eye-glow`}
          x="-150%"
          y="-150%"
          width="400%"
          height="400%"
        >
          <feGaussianBlur stdDeviation="2.5" result="aura" />
          <feMerge>
            <feMergeNode in="aura" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id={`${id}-eye-aura`}>
          <stop stopColor="#c293ff" stopOpacity=".5" />
          <stop offset="1" stopColor="#b78aff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-burst-aura`}>
          <stop stopColor="#fffaff" stopOpacity="1" />
          <stop offset=".12" stopColor="#eee0ff" stopOpacity=".98" />
          <stop offset=".35" stopColor="#c391ff" stopOpacity=".75" />
          <stop offset=".7" stopColor="#9651ec" stopOpacity=".25" />
          <stop offset="1" stopColor="#b78aff" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={`${id}-flare-ray`}
          gradientUnits="userSpaceOnUse"
          x1="188"
          y1="162"
          x2="346"
          y2="162"
        >
          <stop stopColor="#dcc8ff" stopOpacity="0" />
          <stop offset=".35" stopColor="#dcc8ff" stopOpacity=".5" />
          <stop offset=".5" stopColor="#fffaff" stopOpacity="1" />
          <stop offset=".65" stopColor="#dcc8ff" stopOpacity=".5" />
          <stop offset="1" stopColor="#dcc8ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-lens-sheen`}>
          <stop stopColor="#dcc8ff" stopOpacity="0" />
          <stop offset=".55" stopColor="#dcc8ff" stopOpacity=".4" />
          <stop offset=".8" stopColor="#f4ecff" stopOpacity=".9" />
          <stop offset="1" stopColor="#dcc8ff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-lenses`}>
          <rect
            x="187"
            y="152"
            width="47"
            height="32"
            rx="12"
            transform="rotate(2 210 168)"
          />
          <rect
            x="245"
            y="150"
            width="45"
            height="31"
            rx="12"
            transform="rotate(-4 267 166)"
          />
        </clipPath>
      </defs>

      <g className={styles["scene"]}>
        <g className={styles["reveal"]}>
          <ellipse
            cx="265"
            cy="284"
            rx="205"
            ry="202"
            fill={`url(#${id}-ambient)`}
          />
          <ellipse
            cx="262"
            cy="422"
            rx="158"
            ry="12"
            fill="#b78aff"
            opacity=".045"
          />
        </g>

        {/* The outlined shirt and neck sit behind the laptop; hands stay concealed. */}
        <g className={styles["character"]}>
          <path
            className={[
              styles["line"],
              styles["draw"],
              styles["shirt-outline"],
            ].join(" ")}
            pathLength="1"
            d="M218 229 L217 252 Q211 259 185 264 Q159 269 151 293 L139 328 L144 384 Q145 394 161 398 L320 392 Q335 390 335 375 L338 323 Q333 284 309 269 L266 254 L263 230Z"
          />
          <path
            className={[
              styles["line"],
              styles["draw"],
              styles["fine-line"],
            ].join(" ")}
            pathLength="1"
            d="M217 253 Q239 279 266 254 M213 260 Q238 288 269 261"
          />
          <path
            className={[
              styles["line"],
              styles["draw"],
              styles["fine-line"],
            ].join(" ")}
            pathLength="1"
            d="M153 293 L176 305 M309 285 L292 302 M168 310 L161 349 M312 308 L320 345"
            opacity=".6"
          />

          <g className={styles["head"]}>
            <path
              className={[
                styles["line"],
                styles["draw"],
                styles["fine-line"],
              ].join(" ")}
              pathLength="1"
              d="M185 163 Q172 158 176 179 Q177 190 187 190 M294 160 Q308 156 304 177 Q304 188 294 189"
            />
            <path
              className={[
                styles["line"],
                styles["draw"],
                styles["head-outline"],
              ].join(" ")}
              pathLength="1"
              d="M185 154 C184 124 204 106 238 105 C273 103 294 124 296 154 L293 184 Q288 207 273 219 L245 239 Q239 242 232 237 L211 223 Q189 207 185 182Z"
            />
            <path
              className={[
                styles["line"],
                styles["draw"],
                styles["hair-outline"],
              ].join(" ")}
              pathLength="1"
              d="M184 157 C175 153 173 143 178 135 C169 125 174 112 184 109 C179 97 187 87 199 88 C201 77 214 73 224 80 C234 68 250 74 253 82 C266 72 281 81 281 92 C296 88 307 99 302 112 C314 117 313 132 304 138 C310 150 301 159 293 157 L288 143 C278 149 269 144 266 136 C257 146 245 143 241 134 C233 145 220 141 216 135 C210 144 198 145 192 138Z"
            />
            <g
              className={[
                styles["reveal"],
                styles["line"],
                styles["fine-line"],
              ].join(" ")}
              opacity=".65"
            >
              <path d="M188 111 C188 101 204 100 206 109 C209 117 198 122 194 116 M216 93 C221 85 234 91 231 99 C228 105 220 104 220 100 M245 95 C250 86 263 93 260 101 M270 114 C270 104 285 103 288 112 C290 119 281 124 277 118 M218 121 C223 113 235 119 232 126" />
            </g>
            <g className={styles["reveal"]}>
              <g
                className={styles["light"]}
                fill="#b78aff"
                filter={`url(#${id}-soft-glow)`}
                opacity=".6"
              >
                <ellipse cx="214" cy="170" rx="27" ry="15" opacity=".19" />
                <ellipse cx="268" cy="167" rx="25" ry="15" opacity=".19" />
              </g>
              <path
                className={[styles["line"], styles["fine-line"]].join(" ")}
                d="M254 147 L278 141"
              />
              <g className={styles["eyes"]}>
                {/* Only the violet eye is visible; the opposite lens stays empty. */}
                <g className={styles["eye-energy"]}>
                  <ellipse
                    cx="267"
                    cy="162"
                    rx="23"
                    ry="17"
                    fill={`url(#${id}-eye-aura)`}
                  />
                  <g
                    filter={`url(#${id}-eye-glow)`}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      d="M254 163 L266 157 L279 160 M256 166 Q267 170 277 163"
                      fill="none"
                      stroke="#c594ff"
                      strokeWidth="2"
                    />
                    <path
                      d="M267 158 L270 163 L267 168 L264 163Z"
                      fill="#eee0ff"
                      stroke="#c99aff"
                      strokeWidth="1"
                    />
                    <path
                      d="M251 164 L280 160"
                      stroke="#b78aff"
                      strokeWidth="1"
                      opacity=".45"
                    />
                  </g>
                </g>
              </g>
              <g className={[styles["line"], styles["face-line"]].join(" ")}>
                <rect
                  x="187"
                  y="152"
                  width="47"
                  height="32"
                  rx="12"
                  transform="rotate(2 210 168)"
                />
                <rect
                  x="245"
                  y="150"
                  width="45"
                  height="31"
                  rx="12"
                  transform="rotate(-4 267 166)"
                />
                <path d="M234 162 Q240 158 245 162 M177 156 L187 160 M290 158 L299 153" />
              </g>
              <g clipPath={`url(#${id}-lenses)`}>
                <g className={styles["glasses-shine"]}>
                  <path
                    d="M158 140 L180 136 L207 193 L185 197Z"
                    fill={`url(#${id}-lens-sheen)`}
                  />
                  <path
                    d="M177 137 L203 194"
                    stroke="#f4ecff"
                    strokeWidth="1.5"
                    opacity=".7"
                  />
                </g>
              </g>
              <path
                className={[styles["line"], styles["fine-line"]].join(" ")}
                d="M241 175 L238 186 Q242 189 247 186"
                opacity=".65"
              />
            </g>
          </g>
        </g>

        {/* A compact, tapered base and hinge give the laptop a distinct profile. */}
        <path
          d="M164 421 L340 411 L367 424 Q372 429 361 432 L179 441 Q170 441 164 435 L155 427 Q152 422 164 421Z"
          fill="#100d17"
        />
        <path
          className={[
            styles["line"],
            styles["draw"],
            styles["laptop-outline"],
          ].join(" ")}
          pathLength="1"
          d="M164 421 L340 411 L367 424 Q372 429 361 432 L179 441 Q170 441 164 435 L155 427 Q152 422 164 421Z"
        />
        <path
          className={[
            styles["line"],
            styles["draw"],
            styles["laptop-detail"],
          ].join(" ")}
          pathLength="1"
          d="M167 430 L357 421 M242 428 L247 432 L270 431 L273 426"
        />

        {/* A taller lid with a visible side edge keeps familiar laptop proportions. */}
        <path
          d="M169 317 L331 312 Q337 311 338 318 L349 410 Q350 417 343 418 L184 425 Q177 426 176 419 L162 326 Q161 319 169 317Z"
          fill={`url(#${id}-lid-fill)`}
        />
        <path
          className={[
            styles["line"],
            styles["draw"],
            styles["laptop-outline"],
          ].join(" ")}
          pathLength="1"
          d="M169 317 L331 312 Q337 311 338 318 L349 410 Q350 417 343 418 L184 425 Q177 426 176 419 L162 326 Q161 319 169 317Z"
        />
        <path
          className={[
            styles["line"],
            styles["draw"],
            styles["laptop-detail"],
          ].join(" ")}
          pathLength="1"
          d="M340 321 L354 412 Q355 419 347 422 L186 430"
        />
        <g className={styles["reveal"]} transform="translate(6 67) scale(.85)">
          <g className={styles["light"]}>
            <ellipse
              cx="300"
              cy="352"
              rx="43"
              ry="32"
              fill="#b78aff"
              opacity=".09"
              filter={`url(#${id}-soft-glow)`}
            />
            <g filter={`url(#${id}-mark-glow)`} transform="rotate(-4 300 352)">
              <text className={styles["laptop-mark"]} x="300" y="365">
                S.
              </text>
            </g>
          </g>
        </g>
        <g className={styles["reveal"]}>
          <path
            className={[styles["line"], styles["ground-line"]].join(" ")}
            d="M126 450 L386 450"
          />
        </g>
      </g>
      {/* A transparent, contained flare precedes the one-time character entrance. */}
      <g className={styles["eye-burst"]}>
        <circle cx="267" cy="162" r="42" fill={`url(#${id}-burst-aura)`} />
        <g filter={`url(#${id}-eye-glow)`} strokeLinecap="round">
          <path
            d="M188 162 L346 162"
            stroke={`url(#${id}-flare-ray)`}
            strokeWidth="1"
            opacity=".7"
          />
          <path
            d="M267 143 L267 181"
            stroke="#f8f0ff"
            strokeWidth="1"
            opacity=".8"
          />
          <ellipse cx="267" cy="162" rx="4.5" ry="2.8" fill="#fffaff" />
        </g>
      </g>
    </svg>
  );
}
