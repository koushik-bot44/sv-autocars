import { defineConfig } from 'vite';

// Local dev serves from '/'. For GitHub Pages set DEPLOY_BASE=/sv-autocars/
// (the deploy script does this) so built asset URLs resolve under the subpath.
export default defineConfig({
  base: process.env.DEPLOY_BASE || '/',
});
