from sklearn.feature_extraction.text import TfidfVectorizer


def top_keywords(corpus):
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform([corpus])
    top_words = vectorizer.get_feature_names()
    return top_words
