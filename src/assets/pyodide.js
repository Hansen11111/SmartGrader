async function getSimilarityScore(correctAnswer, studentAnswer){
	
	await languagePluginLoader
	console.log(await pyodide.runPythonAsync(`
			import micropip
			#await micropip.install('spacy')
			from js import correctAnswer,studentAnswer

			print(correctAnswer,studentAnswer)
	`));
	
}
