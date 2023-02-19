from flask import Flask, request, jsonify
from flask_cors import CORS

from make_flashcards import process_notes
from grade_answers import grade_definition

app = Flask(__name__)
CORS(app)

@app.route('/grade_def', methods=['POST'])
def grade_def() -> float:
    """Flask enpoint to create a set of flashcards from a set of notes."""
    term = request.json.get('term')
    definition = request.json.get('definition')
    attempt = request.json.get('attempt')
    mode = request.json.get('mode')

    grade = grade_definition(term, definition, attempt, mode)

    return jsonify(grade)

@app.route('/flashcards', methods=['POST'])
def create_flashcards():
    """Flask enpoint to create a set of flashcards from a set of notes."""
    notes = request.json.get('notes')
    subject = request.json.get('subject')
    flashcards = process_notes(notes, subject)
    return jsonify(flashcards)

if __name__ == '__main__':
    app.run()