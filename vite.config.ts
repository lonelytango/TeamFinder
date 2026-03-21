import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc'

// GitHub Actions sets VITE_BASE=/RepoName/ to match github.io/<RepoName>/ (see deploy.yaml).
// Local builds default to relative URLs so assets resolve under any subpath.
const base = process.env.VITE_BASE ?? './'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	base,
});
