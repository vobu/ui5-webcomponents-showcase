import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";

module.exports = {
  input: 'lib/bundle.js',
  output: {
    file: 'dist/resources/ui5webc/lib/bundle.js',
    format: "amd",
    amd: {
      define: "sap.ui.define"
    }
  },
  plugins: [
    resolve(),
		terser(),
	]
};
