from flask import request, jsonify
from typing import List
import numpy as np

from utils import completions_with_backoff

MODEL = 'text-davinci-003'

mode2file = {
    'easy':'../prompts/grade_definition_easy.txt',
    'medium':'../prompts/grade_definition_medium.txt',
    'hard':'../prompts/grade_definition_hard.txt',
    'usage':'../prompts/grade_usage.txt',
}

def grade_definition(term: str, definition: str, attempt: str, mode: str='medium') -> float:
    """Grade a flashcard attempt."""
    assert mode in ['easy', 'medium', 'hard', 'usage'], f'Invalid mode: {mode}'
    template = open(mode2file[mode], 'r').read()
    prompt = template.format(term=term, definition=definition, attempt=attempt)
    completions = completions_with_backoff(
        prompt=prompt,
        engine='text-davinci-003',
        temperature=0,
        max_tokens=1,
        logprobs=3,
    )
    logprobs = completions['choices'][0]['logprobs']['top_logprobs'][0]
    if 'A' not in logprobs:
        return 0
    if 'B' not in logprobs:
        return 1
    return (np.e**logprobs['A'] / (np.e**logprobs['A'] + np.e**logprobs['B']),)