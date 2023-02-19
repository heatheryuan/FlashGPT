
import openai
import backoff

openai.api_key = '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' # ACCESS KEY

@backoff.on_exception(backoff.expo, openai.error.RateLimitError)
def completions_with_backoff(**kwargs):
    return openai.Completion.create(**kwargs)