import * as esbuild from 'esbuild';

const env = process.env.NODE_ENV;
const isDev = env === 'dev';
const options = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  target: 'esnext',
  platform: 'browser',
  loader: { '.ts': 'ts' },
  minify: !isDev,
  logLevel: 'info',
  outfile: 'dist/main.js',
};

async function watch() {
  const ctx = await esbuild.context(options);
  await ctx.watch();
}
async function build() {
  await esbuild.build(options);
}

if (isDev) {
  watch();
} else {
  build();
}
