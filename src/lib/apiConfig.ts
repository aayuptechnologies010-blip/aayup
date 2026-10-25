// Universal API URL helper that works across both Vite and Next.js / Node environments
export const getApiUrl = (): string => {
  // 1. Next.js public env variable
  if (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // 2. Next.js generic VITE_API_URL mapped into process.env
  if (typeof process !== "undefined" && process.env && process.env.VITE_API_URL) {
    return process.env.VITE_API_URL;
  }

  // 3. Vite import.meta.env
  try {
    // @ts-ignore
    if (typeof import.meta !== "undefined" && import.meta && import.meta.env && import.meta.env.VITE_API_URL) {
      // @ts-ignore
      return import.meta.env.VITE_API_URL;
    }
  } catch (e) {
    // ignore
  }

  // 4. Default fallback to local express backend or empty string
  return "http://localhost:5000/api";
};
