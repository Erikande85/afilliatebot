import os
import sys
from openai import OpenAI

# Set API key from environment
api_key = os.environ.get('OPENAI_API_KEY')
if not api_key:
    print("Error: OPENAI_API_KEY not set")
    sys.exit(1)

os.environ['OPENAI_API_KEY'] = api_key
client = OpenAI()

prompts = [
    "futuristic AI robot working on laptop, neon lights, cyberpunk aesthetic, dark background, digital marketing",
    "abstract network of glowing robot heads connected by circuits, blue and purple neon, dark background, tech aesthetic",
    "dashboard interface showing charts and graphs, AI agents working in background, modern UI design, dark mode"
]

for i, prompt in enumerate(prompts):
    print(f"Generating image {i+1}...")
    try:
        response = client.images.generate(
            model='gpt-image-1',
            prompt=prompt,
            n=1,
            size='1024x1024'
        )
        url = response.data[0].url
        print(f"Image {i+1}: {url}")
        
        # Save URL to file
        with open(f'C:/Users/rooster/Documents/.openclaw/workspace/afilliatebot/docs/images/image_{i+1}.txt', 'w') as f:
            f.write(url)
    except Exception as e:
        print(f"Error: {e}")
