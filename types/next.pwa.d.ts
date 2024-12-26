declare module 'next-pwa' {
  import { NextConfig } from 'next';

  declare function withPWA(config: NextConfig): NextConfig;

  export default withPWA;
}
