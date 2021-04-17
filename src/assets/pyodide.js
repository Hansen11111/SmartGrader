async function main(){
	
	await languagePluginLoader
	console.log(await pyodide.runPythonAsync(`
			import micropip
			#await micropip.install('spacy')
			
			print(1)
	`));
	
}
