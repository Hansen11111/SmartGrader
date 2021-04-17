#!/usr/bin/env python
# coding: utf-8

# In[40]:


#sample_ans = 'The simple answer is that we are trying to find the “author” of a writing, so that’s the concept we are trying to learn (predict). However, depending on the domain of the problem, the approaches can be different.'
#student_ans = '"Author" of the articles is the concept and we have different approaches to this problem.'


# In[111]:


### preprocessing part###
import nltk, string
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from collections import Counter
import re
import math
nltk.download('stopwords')
nltk.download('punkt')
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

## need two strings, sample_ans and student_ans
def preprocess(raw):
    raw = raw.lower()
    raw = raw.split()
    ps = PorterStemmer()
    all_stopwords = stopwords.words('english')
    all_stopwords.remove('not')
    word_lst = [ps.stem(word) for word in raw if not word in set(all_stopwords)]
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


# In[112]:


stemmer = nltk.stem.porter.PorterStemmer()
remove_punctuation_map = dict((ord(char), None) for char in string.punctuation)

def stem_tokens(tokens):
    return [stemmer.stem(item) for item in tokens]

'''remove punctuation, lowercase, stem'''
def normalize(text):
    return stem_tokens(nltk.word_tokenize(text.lower().translate(remove_punctuation_map)))

def cosine_sim(text1, text2):
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
    vectorizer = TfidfVectorizer(tokenizer=normalize, stop_words='english')
    similarity_score2= cosine_sim(student_ans, sample_ans)
    ### final grade
    grade = 1/(1+math.exp(0-((similarity_score1+similarity_score2)/2-0.3)*4))*100
    return grade

### input string -- sample answer & student answer
predict_grade(student_ans, sample_ans)


# In[ ]:




