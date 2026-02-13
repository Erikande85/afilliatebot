import { NextRequest, NextResponse } from 'next/server';

// Content generation tools for clawbots
// These APIs help clawbots create professional, human-like content

// Prompt templates for different content types
const promptTemplates = {
  product_image: (product: string, style: string = "professional") => 
    `Professional ${style} product photography of ${product}, clean white background, studio lighting, 4k resolution, e-commerce ready, high detail, clean composition`,
  
  video_ad: (product: string, duration: number = 15) =>
    `${duration}-second video ad for ${product}, professional marketing footage, dynamic camera movement, text overlay with offer, call to action, trending TikTok style`,
  
  review: (product: string, tone: string = "authentic") =>
    `Write a ${tone} product review for ${product}. Make it sound like a real person who actually used the product. Include specific details. 2-3 paragraphs.`,
  
  social_post: (product: string, platform: string = "twitter") => {
    const lengths = { twitter: "280 chars", instagram: "hashtags", linkedin: "professional" };
    return `Write a ${platform} post about ${product}. ${lengths[platform as keyof typeof lengths] || 'engaging'}. Include 3 relevant hashtags.`;
  },
  
  email_outreach: (company: string, product: string) =>
    `Write a cold outreach email to ${company} about ${product}. Personalized, value-focused, clear CTA. Under 150 words.`
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type, product, style, duration, tone, platform, company } = body;
  
  if (!type || !product) {
    return NextResponse.json(
      { error: 'Missing required fields: type, product' },
      { status: 400 }
    );
  }
  
  // Generate the appropriate prompt
  let generatedPrompt = '';
  let metadata = {};
  
  switch (type) {
    case 'product_image':
      generatedPrompt = promptTemplates.product_image(product, style || 'professional');
      metadata = { tool: 'DALL-E 3 / Midjourney', estimatedCost: '$0.04 per image' };
      break;
      
    case 'video_ad':
      generatedPrompt = promptTemplates.video_ad(product, duration || 15);
      metadata = { tool: 'Kling / Seedance 2.0', estimatedCost: '$0.10-0.50 per video' };
      break;
      
    case 'review':
      generatedPrompt = promptTemplates.review(product, tone || 'authentic');
      metadata = { tool: 'GPT-4 + Humanizer', estimatedCost: '$0.01 per review' };
      break;
      
    case 'social_post':
      generatedPrompt = promptTemplates.social_post(product, platform || 'twitter');
      metadata = { platform, estimatedCost: '$0.005 per post' };
      break;
      
    case 'email':
      if (!company) {
        return NextResponse.json(
          { error: 'company is required for email type' },
          { status: 400 }
        );
      }
      generatedPrompt = promptTemplates.email_outreach(company, product);
      metadata = { tool: 'GPT-4', estimatedCost: '$0.02 per email' };
      break;
      
    default:
      return NextResponse.json(
        { error: `Unknown content type: ${type}. Use: product_image, video_ad, review, social_post, email` },
        { status: 400 }
      );
  }
  
  return NextResponse.json({
    success: true,
    type,
    product,
    prompt: generatedPrompt,
    metadata,
    // For future: actual API call to DALL-E/Kling would happen here
    // Currently returns prompt that clawbot can use
    status: 'ready_to_generate',
    suggestion: 'Use this prompt with your preferred AI tool (DALL-E, Kling, GPT-4)'
  });
}

// Get available content types
export async function GET() {
  return NextResponse.json({
    contentTypes: [
      {
        type: 'product_image',
        description: 'Generate AI image prompts for products',
        inputs: ['product', 'style'],
        example: { product: 'Nike Air Max', style: 'minimalist' }
      },
      {
        type: 'video_ad',
        description: 'Generate video ad prompts',
        inputs: ['product', 'duration'],
        example: { product: 'Summer Collection', duration: 15 }
      },
      {
        type: 'review',
        description: 'Write human-like product reviews',
        inputs: ['product', 'tone'],
        example: { product: 'TechPro X1', tone: 'enthusiastic' }
      },
      {
        type: 'social_post',
        description: 'Create social media posts',
        inputs: ['product', 'platform'],
        example: { product: 'New App', platform: 'twitter' }
      },
      {
        type: 'email',
        description: 'Write cold outreach emails',
        inputs: ['product', 'company'],
        example: { product: 'Marketing Tool', company: 'Acme Corp' }
      }
    ]
  });
}
