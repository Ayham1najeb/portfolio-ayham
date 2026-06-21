import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 

const ParticlesBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // loadSlim is lightweight and perfect for high performance
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options = {
        background: {
            color: {
                value: "transparent",
            },
        },
        fpsLimit: 120,
        interactivity: {
            detectsOn: "window",
            events: {
                onHover: {
                    enable: true,
                    mode: "repulse", // Gentle push away from mouse
                },
                resize: true,
            },
            modes: {
                repulse: {
                    distance: 120,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: ["#4F46E5", "#8B5CF6", "#A78BFA"], // Subtle, relaxing mix of indigo and violet
            },
            links: {
                enable: false, // No harsh lines
            },
            move: {
                direction: "top", // Gentle upward drift
                enable: true,
                outModes: {
                    default: "out",
                },
                random: true,
                speed: 0.3, // Extremely slow and relaxing
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 100, // Not too crowded
            },
            opacity: {
                value: { min: 0.1, max: 0.6 },
                animation: {
                    enable: true,
                    speed: 0.5,
                    minimumValue: 0.1,
                    sync: false
                } // Soft twinkling
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 2.5 }, // Small, dust-like particles
            },
        },
        detectRetina: true,
    };

    if (init) {
        return (
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
                <Particles id="tsparticles" options={options} />
            </div>
        );
    }

    return null;
};

export default ParticlesBackground;
