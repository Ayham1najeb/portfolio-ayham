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
                    mode: "grab", // Connects lines to mouse
                },
                resize: true,
            },
            modes: {
                grab: {
                    distance: 150,
                    links: {
                        opacity: 0.4,
                        color: "#4F46E5",
                    },
                },
            },
        },
        particles: {
            color: {
                value: "#4F46E5", // Professional Indigo color
            },
            links: {
                color: "#4F46E5",
                distance: 150,
                enable: true, // Connects the dots with lines!
                opacity: 0.2,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 0.5, // Even slower and calmer
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80, // Perfect balance for a network look
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 2, max: 4 }, // Slightly bigger
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
