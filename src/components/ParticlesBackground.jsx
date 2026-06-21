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
                    mode: "bubble", 
                },
                resize: true,
            },
            modes: {
                bubble: {
                    distance: 200,
                    duration: 2,
                    size: 3, 
                    opacity: 0.8,
                },
            },
        },
        particles: {
            color: {
                value: "#ffffff",
            },
            links: {
                enable: false, // No links, just stars
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "out",
                },
                random: true,
                speed: 0.2, // Very calm and slow movement
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 120, 
            },
            opacity: {
                value: { min: 0.1, max: 0.8 },
                animation: {
                    enable: true,
                    speed: 0.5,
                    minimumValue: 0.1,
                    sync: false
                } // Twinkling effect
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 0.5, max: 2 }, // Small stars
            },
        },
        detectRetina: true,
    };

    if (init) {
        return (
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -10 }}>
                <Particles id="tsparticles" options={options} />
            </div>
        );
    }

    return null;
};

export default ParticlesBackground;
