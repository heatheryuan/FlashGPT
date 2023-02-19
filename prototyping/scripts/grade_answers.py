from flask import request, jsonify
from typing import List
import numpy as np

from utils import completions_with_backoff

MODEL = 'text-davinci-003'
FEEDBACK_TOKENS = 200

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
        engine=MODEL,
        temperature=0,
        max_tokens=1,
        logprobs=3,
    )
    logprobs = completions['choices'][0]['logprobs']['top_logprobs'][0]
    
    # convert to prob
    if 'A' not in logprobs: prob = 0
    elif 'B' not in logprobs: prob = 1
    else: prob = np.e**logprobs['A'] / (np.e**logprobs['A'] + np.e**logprobs['B'])

    prompt += completions['choices'][0]['text'] + ')\nBrief feedback:\n'

    completions = completions_with_backoff(
        prompt=prompt,
        engine=MODEL,
        temperature=0,
        max_tokens=FEEDBACK_TOKENS,
    )

    feedback = completions['choices'][0]['text'].strip()
    isCorrect = prob > 50

    return (isCorrect, feedback)