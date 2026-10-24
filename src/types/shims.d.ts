// Minimal shims to silence missing type declarations in the editor
// NOTE: These are developer-time shims. Prefer installing proper types via package manager.

declare module 'react-router-dom' {
  export const Link: any;
  export const useParams: any;
  export const useNavigate: any;
  const _default: any;
  export default _default;
}

declare module 'lucide-react' {
  export const Zap: any;
  export const Globe: any;
  export const Gift: any;
  export const Smartphone: any;
  export const Code2: any;
  export const Palette: any;
  export const Database: any;
  export const Cloud: any;
  export const FileText: any;
  export const Lightbulb: any;
  export const MessageSquare: any;
  export const Info: any;
  export const GraduationCap: any;
  export const X: any;
  export const Briefcase: any;
  export const BookOpen: any;
  export const Users: any;
  export const Target: any;
  export const CheckCircle: any;
  export const Sparkles: any;
  export const TrendingUp: any;
  export const Award: any;
  export const Star: any;
  export const Send: any;
  export const Mic: any;
  const _default: any;
  export default _default;
}

declare module 'react/jsx-runtime' {
  const jsx: any;
  export { jsx };
  const _default: any;
  export default _default;
}

declare module 'react' {
  const React: any;
  export default React;
  export const useState: any;
  export const useEffect: any;
  export const useRef: any;
  export const useCallback: any;
  export const useLayoutEffect: any;
  export const Fragment: any;
}

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  // add other VITE_ vars here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};
