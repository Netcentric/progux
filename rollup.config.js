import { terser } from 'rollup-plugin-terser';
import sass from '@astappiev/rollup-plugin-scss';

export default [
  {
    input: 'src/frontend/js/index-prod.js',
    plugins: [
      terser({
        toplevel: true,
        keep_classnames: false,
        compress: {
          arrows: true,
          arguments: false,
          booleans: true,
          booleans_as_integers: true,
          collapse_vars: true,
          comparisons: true,
          computed_props: true,
          conditionals: true,
          dead_code: true,
          directives: true,
          drop_console: true,
          drop_debugger: true,
          ecma: 5,
        },
      }),
    ],
    output: {
      file: 'dist/prod/bundle.js',
      format: 'iife',
    },
  },
  {
    input: 'src/frontend/js/index-dev.js',
    plugins: [
      terser({
        toplevel: true,
        keep_classnames: false,
        compress: {
          arrows: true,
          arguments: false,
          booleans: true,
          booleans_as_integers: true,
          collapse_vars: true,
          comparisons: true,
          computed_props: true,
          conditionals: true,
          dead_code: true,
          directives: true,
          drop_console: false,
          drop_debugger: false,
          ecma: 5,
        },
      }),
      sass({
        output: 'dist/dev/dev-bundle.css',
        outputStyle: 'compressed',
        watch: ['src/frontend/css/debugUtils'],
      }),
    ],
    output: {
      file: 'dist/dev/dev-bundle.js',
      format: 'iife',
    },
  },
];
