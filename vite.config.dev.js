import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';
import checker from 'vite-plugin-checker';
import { rollup } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const templatesDir = path.resolve(__dirname, 'src/scripts/templates');
const templateFiles = fs.readdirSync(templatesDir).filter(file => file.endsWith('.ts'));

const input = {
  'scripts': './src/scripts/main.ts',
  'styles': './src/styles/main.scss',
};

const buildTemplates = () => {
  return {
    name: 'build-template',
    buildStart() {
      templateFiles.forEach(file => {
        this.addWatchFile(path.resolve(templatesDir, file));
      });
    },
    async buildEnd() {
      for (const file of templateFiles) {
        const inputPath = path.resolve(templatesDir, file);
        const templateName = path.basename(file, '.ts');
        const outputPath = path.resolve(__dirname, 'assets', `template.${templateName}.dev.js`);
        const bundle = await rollup({
          input: inputPath,
          plugins: [
            resolve(),
            typescript({ tsconfig: './tsconfig.json' }),
            terser()
          ],
        });

        if (bundle.watchFiles) {
          for (const file of bundle.watchFiles) {
            this.addWatchFile(file);
          }
        }

        await bundle.write({
          file: outputPath,
          format: 'es',
          entryFileNames: '[name].ts',
          sourcemap: true,
        });
        await bundle.close();
      }
    },
  };
};

export default defineConfig({
  root: '.',
  build: {
    sourcemap: true,
    outDir: path.resolve(__dirname, './assets/'),
    emptyOutDir: false,
    rollupOptions: {
      input,
      output: {
        entryFileNames: '[name].dev.js',
        assetFileNames: '[name].dev.css',
      },
    },
    write: true,
  },
  plugins: [
    checker({
      eslint: {
        lintCommand: 'eslint "src/**/*.ts"',
      },
    }),
    buildTemplates()
  ],
  server: false,
});
