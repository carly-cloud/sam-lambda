npm:
	#npx browserslist@latest --update-db
	npm i
npm-update:
	npm run update
npm-audit-fix:
	npm audit fix
fix:
	npm run fix
test:
	npm run test
run-dev:
	npm run dev
watch:
	npm run watch
webpack-analyzer:
	webpack --config webpack.config.js --mode=production
