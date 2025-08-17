/**
 * @typedef {"admin" | "moderator" | "user" } Roles
 */

/**
 * @typedef {Object} Metadata
 * @property {Roles} [role]
 */

/**
 * @typedef {Object} CustomJwtSessionClaims
 * @property {Metadata} metadata
 */
