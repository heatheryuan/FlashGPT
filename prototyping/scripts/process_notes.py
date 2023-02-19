from flask import Flask, request, jsonify
from flask_cors import CORS
import backoff
import glob
import openai
import re
import json
from typing import List

app = Flask(__name__)
CORS(app)

TOKEN_LIMIT = 1000
MODEL = 'text-davinci-003'

TEMPLATE_FILE = '../prompts/make_flashcards_v0.txt'
template = open(TEMPLATE_FILE, 'r').read()

openai.api_key = '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' # ACCESS KEY

@backoff.on_exception(backoff.expo, openai.error.RateLimitError)
def completions_with_backoff(**kwargs):
    return openai.Completion.create(**kwargs)

def split_notes(notes: str, word_limit: int=300) -> List[str]:
    """Split a set of notes by word count."""
    lines = notes.split('\n')
    note_pieces = []
    num_words = 0
    note = ""
    for line in lines:
        words = len(line.split())
        if num_words + words > word_limit:
            note_pieces.append(note)
            note, num_words = "", 0
        note += f'\n{line}'
        num_words += words
    if note:
        note_pieces.append(note)
    return note_pieces

def process_notes(notes: str, subject: str):
    """Process a set of notes into a flashcard set."""
    flashcard_set = [] # set of flashcards
    print('processing')
    print(notes)
    print(split_notes(notes))
    for note_split in split_notes(notes):
        prompt = template.format(
            subject=subject,
            notes=note_split,
        )
        print(prompt)
        completion = completions_with_backoff(
            prompt=prompt,
            temperature=0,
            model=MODEL,
            max_tokens=TOKEN_LIMIT
        )
        flashcard_text = completion['choices'][0]['text']
        for line in flashcard_text.split('\n'):
            if not line: continue
            item = {}
            splits = line.split(' - ')
            term = splits[0]
            definition = ' - '.join(splits[1:])
            item['term'] = term
            item['definition'] = definition
            flashcard_set.append(item)

    print(type(flashcard_set))
    return flashcard_set

@app.route('/flashcards', methods=['POST'])
def create_flashcards():
    notes = request.json.get('notes')
    subject = request.json.get('subject')
    print(notes, subject)
    flashcards = process_notes(notes, subject)
    return jsonify(flashcards)

if __name__ == '__main__':
    app.run()