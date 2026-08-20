"use client";

const ReactionAnimation = ({ animations, reducedMotion }) => {
  if (!animations.length || reducedMotion) return null;

  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {animations.map((anim) => {
          if (anim.type === "burst") {
            return (
              <div
                key={anim.id}
                className="absolute"
                style={{ left: `${anim.x}px`, top: `${anim.y}px` }}
              >
                <span className="absolute -translate-x-1/2 -translate-y-1/2 animate-[reactPulse_780ms_cubic-bezier(0.2,0.9,0.2,1)_forwards] text-4xl md:text-5xl drop-shadow-[0_0_22px_rgba(252,69,138,0.6)]">
                  {anim.emoji}
                </span>
                {anim.particles.map((particle) => (
                  <span
                    key={particle.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 animate-[reactParticle_1150ms_cubic-bezier(0.2,0.9,0.2,1)_forwards] font-semibold"
                    style={{
                      color: particle.color,
                      fontSize: `${particle.size + 8}px`,
                      "--rx": `${particle.dx * 3.2}px`,
                      "--ry": `${particle.dy * 3.2}px`,
                    }}
                  >
                    {particle.symbol}
                  </span>
                ))}
              </div>
            );
          }

          return (
            <span
              key={anim.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-4xl md:text-5xl animate-[reactFly_1250ms_cubic-bezier(0.2,0.8,0.2,1)_forwards] drop-shadow-[0_0_20px_rgba(69,153,252,0.6)]"
              style={{
                left: `${anim.x}px`,
                top: `${anim.y}px`,
                "--fx": `${anim.tx - anim.x}px`,
                "--fy": `${anim.ty - anim.y}px`,
              }}
            >
              {anim.emoji}
            </span>
          );
        })}
      </div>

      <div className="pointer-events-none fixed inset-0 z-[140] overflow-hidden">
        {animations.map((anim) => (
          <div key={`global_${anim.id}`}>
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 animate-[reactScreenPulse_1100ms_cubic-bezier(0.2,0.9,0.2,1)_forwards] text-7xl md:text-8xl drop-shadow-[0_0_34px_rgba(252,69,138,0.85)]"
              style={{ left: `${anim.vx}px`, top: `${anim.vy}px` }}
            >
              {anim.emoji}
            </span>

            {anim.type === "burst"
              ? anim.particles.map((particle) => (
                  <span
                    key={`global_particle_${anim.id}_${particle.id}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2 animate-[reactScreenBurst_1300ms_cubic-bezier(0.2,0.9,0.2,1)_forwards] font-bold"
                    style={{
                      left: `${anim.vx}px`,
                      top: `${anim.vy}px`,
                      color: particle.color,
                      fontSize: `${particle.size + 18}px`,
                      "--sx": `${particle.dx * 9}px`,
                      "--sy": `${particle.dy * 9}px`,
                    }}
                  >
                    {particle.symbol}
                  </span>
                ))
              : null}

            {anim.type === "fly"
              ? Array.from({ length: 10 }).map((_, index) => (
                  <span
                    key={`trail_${anim.id}_${index}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2 animate-[reactTrail_1200ms_ease-out_forwards]"
                    style={{
                      left: `${anim.vx}px`,
                      top: `${anim.vy}px`,
                      color: "#FDE7EF",
                      fontSize: `${16 + (index % 3) * 4}px`,
                      "--tx": `${(anim.vtx - anim.vx) * (0.25 + index * 0.08)}px`,
                      "--ty": `${(anim.vty - anim.vy) * (0.25 + index * 0.08)}px`,
                      animationDelay: `${index * 40}ms`,
                    }}
                  >
                    ✦
                  </span>
                ))
              : null}
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes reactPulse {
          0% {
            transform: translate(-50%, -50%) scale(0.8) rotate(0deg);
          }
          50% {
            transform: translate(-50%, -50%) scale(2.2) rotate(-16deg);
          }
          100% {
            transform: translate(-50%, -50%) scale(1.2) rotate(0deg);
          }
        }
        @keyframes reactParticle {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--rx)), calc(-50% + var(--ry)))
              scale(0.25);
            opacity: 0;
          }
        }
        @keyframes reactFly {
          0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translate(
                calc(-50% + var(--fx)),
                calc(-50% + var(--fy))
              )
              scale(0.8) rotate(22deg);
            opacity: 0;
          }
        }
        @keyframes reactScreenPulse {
          0% {
            transform: translate(-50%, -50%) scale(0.4);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.4);
            opacity: 0;
          }
        }
        @keyframes reactScreenBurst {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--sx)), calc(-50% + var(--sy)))
              scale(0.2);
            opacity: 0;
          }
        }
        @keyframes reactTrail {
          0% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0.9;
          }
          100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty)))
              scale(0.2);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default ReactionAnimation;
