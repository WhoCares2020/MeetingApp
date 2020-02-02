from gensim.summarization.summarizer import summarize
from gensim.summarization.textcleaner import split_sentences


def get_summary_text(text, ratio=0.20):
    summary_text = summarize(text, ratio=ratio)
    return summary_text
