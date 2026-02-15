export const MOTION = {
    Duration: {
        Fast: '150ms',
        Normal: '200ms',
    },
    Timing: {
        Default: 'ease-in-out',
    },
} as const;

export const TRANSITION = `all ${MOTION.Duration.Normal} ${MOTION.Timing.Default}`;
