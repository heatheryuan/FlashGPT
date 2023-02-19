
import openai
import backoff

openai.api_key = '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' # ACCESS KEY

@backoff.on_exception(backoff.expo, openai.error.RateLimitError)
def completions_with_backoff(**kwargs):
    return openai.Completion.create(**kwargs)