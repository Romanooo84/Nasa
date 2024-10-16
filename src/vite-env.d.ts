/// <reference types="vite/client" />
declare module 'vite-plugin-eslint' {
  import { Plugin } from 'vite';
  export default function eslintPlugin(options?: any): Plugin;
}
