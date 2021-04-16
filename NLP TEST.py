import pandas as pd
import spacy

from collections import Counter
from datetime import date
import datetime
import statistics
import xlsxwriter

# Loading NLP Object.

nlp = spacy.load('en_core_web_sm')
text  = "Did you eat the apple?"

docx = nlp(text)
ps = [token.text for token in docx if token.is_stop != True and token.is_punct != True and token.pos_ == 'NOUN']
wordFreq = Counter(ps)

print(wordFreq)
print(ps)