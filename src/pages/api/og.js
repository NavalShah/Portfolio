import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Get parameters from URL
    const title = searchParams.get('title');
    const date = searchParams.get('date');
    const banner = searchParams.get('banner');
    const timecode = searchParams.get('timecode');
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            backgroundImage: `url(${banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          {/* Dark overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
            }}
          />
          
          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '80px',
              color: 'white',
              position: 'relative',
              width: '100%',
            }}
          >
            {/* Title */}
            <h1
              style={{
                fontSize: '60px',
                fontWeight: 'bold',
                lineHeight: 1.2,
                marginBottom: '30px',
                maxWidth: '90%',
              }}
            >
              {title}
            </h1>
            
            {/* Divider */}
            <div
              style={{
                width: '50px',
                height: '4px',
                background: 'white',
                marginBottom: '30px',
              }}
            />
            
            {/* Author and date row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '40px',
              }}
            >
              {/* Author section */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://your-domain.com'}/static/avatar.jpg`}
                  alt="Naval Shah"
                  width="50"
                  height="50"
                  style={{
                    borderRadius: '50%',
                  }}
                />
                <span style={{ fontSize: '24px' }}>Naval Shah</span>
              </div>
              
              {/* Date */}
              <span style={{ fontSize: '24px', opacity: 0.8 }}>
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              
              {/* Reading time */}
              {timecode && (
                <span style={{ fontSize: '24px', opacity: 0.8 }}>
                  {timecode} read
                </span>
              )}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.error(`Failed to generate OG image: ${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}