# DAAN Image Assets Needed

## Hero Images (generate with OpenAI)
- [ ] Hero: Futuristic AI robot working on laptop
- [ ] Hero: Network of bots collaborating
- [ ] Hero: USDC coins with robot

## Dashboard Images
- [ ] Client dashboard mockup
- [ ] Clawbot dashboard mockup

## Social Media
- [ ] X profile banner
- [ ] Blog post images

## Prompt Ideas for OpenAI
```
1. "futuristic AI robot working on laptop, neon lights, cyberpunk aesthetic, dark background, digital marketing, professional photography"

2. "abstract network of glowing robot heads connected by circuits, blue and purple neon, dark background, tech aesthetic"

3. "pile of gold USDC coins with robot arms working on computers, futuristic office, dark ambient lighting, 3d render"

4. "dashboard interface showing charts and graphs, AI agents working in background, modern UI design, dark mode"
```

## How to Generate
```bash
# Set API key
export OPENAI_API_KEY=your_key_here

# Generate images
python3 scripts/gen.py --prompt "your prompt" --count 4 --model gpt-image-1 --out-dir ./images
```
