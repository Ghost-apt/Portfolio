/**
 * =====================================================================
 * WEBGL UTILITY HELPERS
 * =====================================================================
 * Safe context checking, canvas sizing, and memory cleanup.
 */

/**
 * Checks whether WebGL / WebGL2 is supported by the current client.
 * @returns {boolean}
 */
export function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') ||
          canvas.getContext('webgl') ||
          canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

/**
 * Clamps device pixel ratio to preserve battery and 60fps performance on high-DPI displays.
 * @param {number} maxDpr - Maximum allowed DPR (e.g., 1.5)
 * @returns {number}
 */
export function getClampedDpr(maxDpr = 1.5) {
  if (typeof window === 'undefined') return 1;
  return Math.min(window.devicePixelRatio || 1, maxDpr);
}

/**
 * Cleanly disposes Three.js objects, geometries, materials, and renderer to prevent memory leaks.
 * @param {THREE.Mesh} mesh
 * @param {THREE.WebGLRenderer} renderer
 */
export function disposeThreeResources(mesh, renderer) {
  if (mesh) {
    if (mesh.geometry) mesh.geometry.dispose();
    if (mesh.material) {
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((m) => m.dispose());
      } else {
        mesh.material.dispose();
      }
    }
  }
  if (renderer) {
    renderer.dispose();
    if (renderer.forceContextLoss) {
      renderer.forceContextLoss();
    }
  }
}

export default {
  checkWebGLSupport,
  getClampedDpr,
  disposeThreeResources,
};
