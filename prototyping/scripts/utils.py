
import openai
import backoff

openai.api_key = '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' # ACCESS KEY

@backoff.on_exception(backoff.expo, openai.error.RateLimitError)
def completions_with_backoff(**kwargs):
    return openai.Completion.create(**kwargs)