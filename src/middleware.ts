import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {

    const cookieStore = await req.cookies;

    
    if (req.nextUrl.pathname == "/logout" && cookieStore.has('session')) {
        await (await cookies()).delete('session')
        
        const response = NextResponse.json({"status": 200})
        return response

    }

    
    if ((req.nextUrl.pathname == "/upload" || req.nextUrl.pathname == "/files") && !cookieStore.has('session')) {
        const response = NextResponse.redirect(new URL('/auth/signup', req.url));
        return response

    } else {
        return NextResponse.next();
    }
    
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ]
}   


    

