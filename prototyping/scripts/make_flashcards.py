from typing import List

from utils import completions_with_backoff

TOKEN_LIMIT = 1000
MODEL = 'text-davinci-003'

TEMPLATE_FILE = '../prompts/make_flashcards_v0.txt'
template = open(TEMPLATE_FILE, 'r').read()

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
    flashcard_set = {} # set of flashcards
    for note_split in split_notes(notes):
        prompt = template.format(
            subject=subject,
            notes=note_split,
        )
        completion = completions_with_backoff(
            prompt=prompt,
            temperature=0,
            model=MODEL,
            max_tokens=TOKEN_LIMIT
        )
        flashcard_text = completion['choices'][0]['text']
        for line in flashcard_text.split('\n'):
            if not line: continue
            splits = line.split(' - ')
            term = splits[0]
            definition = ' - '.join(splits[1:])
            flashcard_set[term] = definition

    return flashcard_set