import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

const input = './lib/index.js';
const name = 'AlgebraicActions';
const globals = {
  react: 'React'
};

// treat as external "module/path" modules and reserved rollup paths
const external = id =>
  !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/');

const getBabelOptions = ({ useESModules }) => ({
  exclude: '**/node_modules/**',
  runtimeHelpers: true,
  plugins: [['@babel/transform-runtime', { useESModules }]]
});

const commonjsOptions = {
  include: '**/node_modules/**'
};

export default [
  {
    input,
    output: {
      file: 'dist/algebraic-actions.js',
      format: 'umd',
      name,
      globals
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(getBabelOptions({ useESModules: true })),
      commonjs(commonjsOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') })
    ]
  },

  {
    input,
    output: {
      file: 'dist/algebraic-actions.min.js',
      format: 'umd',
      name,
      globals
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(getBabelOptions({ useESModules: true })),
      commonjs(commonjsOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      uglify()
    ]
  },

  {
    input,
    output: { file: pkg.module, format: 'esm' },
    external,
    plugins: [babel(getBabelOptions({ useESModules: true }))]
  },

  {
    input,
    output: { file: pkg.main, format: 'cjs' },
    external,
    plugins: [babel(getBabelOptions({ useESModules: false }))]
  }
];
