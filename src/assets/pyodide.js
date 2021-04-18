var correctAnswer, studentAnswer
var initialized = false
async function initPyodide(){
	await languagePluginLoader
	await pyodide.loadPackage(['nltk', 'scikit-learn'])
	pyodide.runPython(`
		### preprocessing part###
		import nltk,string
		from sklearn.feature_extraction.text import TfidfVectorizer
		from collections import Counter
		import math
		# nltk.download('stopwords')
		# from nltk.corpus import stopwords

		from nltk.stem.porter import PorterStemmer

		def splitText(text):
				split = [word.strip(""".;:,''-""") for word in text.split()]
				return split

		## need two strings, sample_ans and student_ans
		def preprocess(raw):
				raw = raw.lower()
				raw = raw.split()
				ps = PorterStemmer()
		#     all_stopwords = stopwords.words('english')
		#     print(len(all_stopwords))
		#     len(all_stopwords)
		#     all_stopwords.remove('not')
				word_lst = [ps.stem(word) for word in raw]
				return word_lst

		def cosine_similarity_score(lst1, lst2):
				v1=Counter(lst1)
				v2=Counter(lst2)
				common = set(v1.keys()) & set(v2.keys())
				num = sum([v1[x] * v2[x] for x in common])
				sum1 = sum([v1[x] ** 2 for x in list(v1.keys())])
				sum2 = sum([v2[x] ** 2 for x in list(v2.keys())])
				den = math.sqrt(sum1) * math.sqrt(sum2)
				if den==0:
						return 0.0
				else:
						return float(num) / den


		stemmer = nltk.stem.porter.PorterStemmer()
		# remove_punctuation_map = dict((ord(char), None) for char in string.punctuation)

		def stem_tokens(tokens):
				return [stemmer.stem(item) for item in tokens]

		'''remove punctuation, lowercase, stem'''
		def normalize(text):
			
				return stem_tokens(splitText(text))
				

		def cosine_sim(text1, text2):
				vectorizer = TfidfVectorizer(tokenizer=normalize, stop_words='english')
				tfidf = vectorizer.fit_transform([text1, text2])
				dict_sam=tfidf[1].todok().items()
				d_order=sorted(dict_sam,key=lambda x:x[1],reverse=True)
				
				ans = normalize(text1)
				result = ((tfidf * tfidf.T).A)[0,1]

				for i in range(5):
						if normalize(text2)[d_order[i][0][1]] in ans:
								result += 0.2 ## smoothing
				return result

		def predict_grade(student_ans, sample_ans):
				stu_lst=preprocess(student_ans)
				sam_lst=preprocess(sample_ans)
				similarity_score1= cosine_similarity_score(stu_lst, sam_lst)
				similarity_score2= cosine_sim(student_ans, sample_ans)
				### final grade
				grade = 1/(1+math.exp(0-((similarity_score1+similarity_score2)/2-0.3)*4))*100
				print(similarity_score1, similarity_score2)

				return grade
	`)
}

async function getSimilarityScore(a, b){
	correctAnswer = a	
	studentAnswer = b
	console.log(correctAnswer,studentAnswer)
	var score = await pyodide.runPythonAsync(`
			import js
			sample_ans = js.correctAnswer
			student_ans = js.studentAnswer

			### input string -- sample answer & student answer
			predict_grade(student_ans, sample_ans)
	`);

	return score;
}
