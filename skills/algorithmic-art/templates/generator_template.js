/**
 * ═══════════════════════════════════════════════════════════════════════════
 *                  P5.JS GENERATIVE ART - BEST PRACTICES
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This file shows STRUCTURE and PRINCIPLES for p5.js generative art.
 * It does NOT prescribe what art you should create.
 *
 * Your algorithmic philosophy should guide what you build.
 * These are just best practices for how to structure your code.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ============================================================================
// 1. PARAMETER ORGANIZATION
// ============================================================================
let params = {
    seed: 12345,
};

// ============================================================================
// 2. SEEDED RANDOMNESS (Critical for reproducibility)
// ============================================================================

function initializeSeed(seed) {
    randomSeed(seed);
    noiseSeed(seed);
}

// ============================================================================
// 3. P5.JS LIFECYCLE
// ============================================================================

function setup() {
    createCanvas(800, 800);
    initializeSeed(params.seed);
}

function draw() {
    // Generation logic here
}

// ============================================================================
// 4. CLASS STRUCTURE
// ============================================================================

class Entity {
    constructor() {
        // Initialize entity properties
    }

    update() {
        // Update entity state
    }

    display() {
        // Render the entity
    }
}

// ============================================================================
// 6. UTILITY FUNCTIONS
// ============================================================================

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function colorFromPalette(index) {
    return params.colorPalette[index % params.colorPalette.length];
}

function mapRange(value, inMin, inMax, outMin, outMax) {
    return outMin + (outMax - outMin) * ((value - inMin) / (inMax - inMin));
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function wrapAround(value, max) {
    if (value < 0) return max;
    if (value > max) return 0;
    return value;
}

// ============================================================================
// 7. PARAMETER UPDATES
// ============================================================================

function updateParameter(paramName, value) {
    params[paramName] = value;
}

function regenerate() {
    initializeSeed(params.seed);
}

// ============================================================================
// 8. COMMON P5.JS PATTERNS
// ============================================================================

function fadeBackground(opacity) {
    fill(250, 249, 245, opacity);
    noStroke();
    rect(0, 0, width, height);
}

function getNoiseValue(x, y, scale = 0.01) {
    return noise(x * scale, y * scale);
}

function vectorFromAngle(angle, magnitude = 1) {
    return createVector(cos(angle), sin(angle)).mult(magnitude);
}

// ============================================================================
// 9. EXPORT FUNCTIONS
// ============================================================================

function exportImage() {
    saveCanvas('generative-art-' + params.seed, 'png');
}
