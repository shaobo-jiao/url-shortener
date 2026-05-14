// methods for calling the ShortUrl API

export interface CreateShortUrlRequest {
    originalUrl: string;
}

export interface ShortUrlResponse {
    id: string, // long Id from backend
    originalUrl: string,
    shortUrl: string,
    expiresAt: string
}

const API_BASE_URL = "http://localhost:5220/api/short-urls";

export async function createShortUrl(request: CreateShortUrlRequest): Promise<ShortUrlResponse> {
    const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    });
    
    // backend should return OK only, otherwise there's error;
    if (!response.ok) 
        throw new Error(`Failed to create short URL: ${response.statusText}`);
        
    return await response.json();
}

