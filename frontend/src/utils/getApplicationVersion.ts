/**
 * The application version is set during build time of the frontend. If none is specified it returns 'local', meaning
 * that the application is most likely running in development mode.
 */
export const getApplicationVersion = (): string => import.meta.env.VITE_APPLICATION_VERSION ?? 'local';
