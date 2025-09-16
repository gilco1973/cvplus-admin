import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';

const external = [
  'react',
  'react-dom',
  'firebase',
  'firebase-admin',
  'firebase-functions',
  '@cvplus/core',
  '@cvplus/auth',
  '@cvplus/premium',
  '@cvplus/analytics',
  '@cvplus/public-profiles',
  '@cvplus/logging',
  // Firebase admin dependencies
  '@google-cloud/firestore',
  '@google-cloud/storage',
  // React dependencies
  'react-chartjs-2',
  'chart.js',
  'react-router-dom'
];

export default [
  // Main build
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
        inlineDynamicImports: true
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
        inlineDynamicImports: true
      }
    ],
    external,
    plugins: [
      json(),
      resolve({
        preferBuiltins: true,
        browser: false
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        sourceMap: true
      })
    ]
  },
  // React components build
  {
    input: 'src/react-exports.ts',
    output: [
      {
        file: 'dist/react.js',
        format: 'cjs',
        sourcemap: true,
        inlineDynamicImports: true
      },
      {
        file: 'dist/react.esm.js',
        format: 'esm',
        sourcemap: true,
        inlineDynamicImports: true
      }
    ],
    external,
    plugins: [
      json(),
      resolve({
        preferBuiltins: false,
        browser: true
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        sourceMap: true
      })
    ]
  },
  // Type definitions
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm'
    },
    external,
    plugins: [dts()]
  },
  // React type definitions
  {
    input: 'src/react-exports.ts',
    output: {
      file: 'dist/react.d.ts',
      format: 'esm'
    },
    external,
    plugins: [dts()]
  }
];