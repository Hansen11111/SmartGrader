import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from collections import Counter
import re
import math
import nltk
nltk.download('stopwords')
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
stu_lst=preprocess(student_ans)
sam_lst=preprocess(sample_ans)
similarity_score = cosine_similarity_score(stu_lst, sam_lst)