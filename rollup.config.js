import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default {
  input: './dist/main.js',
  output: [
    {
      file: './dist/main.es5.js',
      format: 'es',
      plugins: [getBabelOutputPlugin({ presets: ['@babel/preset-env'] }), terser()],
    },
  ],
};
