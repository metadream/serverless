const upstream = "https://cdn.jsdelivr.net";

const inRules = [
    { pattern: /^\/npm\//, replacement: "/" },
    { pattern: /^\/gh\/([\w\-]+)\//, replacement: "/~$1/" },
];
const outRules = [
    { pattern: /^\/~([\w\-]+)\//, replacement: "/gh/$1/" },
    { pattern: /^\//, replacement: "/npm/" },
];

Deno.serve(async (req: Request) => {
    const location = new URL(req.url);
    let path = location.pathname;

    if (path === "/") {
        return new Response(
            "Jsdelivr Proxy Usage: \n  - NPM: /package@version/file \n  - Github: /~user/repo@version/file \n\n(c) 2023-2024",
        );
    }
    if (path === "/favicon.ico") {
        return new Response(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><path d="M1 58v72c0 60 0 73 2 80 7 42 38 75 80 86 25 5 54 2 76-8l101-59c21-16 35-41 38-66l1-80V12L279 1l-79 45-1 78c0 82 0 83-5 96-3 9-3 9-12 7-25-7-47-23-57-49-6-15-5-21-5-93V12L100 1zm99 36c0 55-1 65 6 91 11 27 37 51 66 60l6 3c0 1-11 12-20 17a84 84 0 01-52 14c-33-1-62-21-76-50-9-19-8-13-9-91V69l78-45zm179-1c-1 78 0 75-9 92a79 79 0 01-57 43l3-10c6-26 3-57 3-85l1-75 58-34z" fill="#00c250"/></svg>',
            {
                headers: {
                    "content-type": "image/svg+xml",
                    "cache-control": "public, max-age=31536000",
                },
            },
        );
    }

    for (const rule of inRules) {
        if (rule.pattern.test(path)) {
            path = path.replace(rule.pattern, rule.replacement);
            return Response.redirect(location.origin + path, 302);
        }
    }
    for (const rule of outRules) {
        if (rule.pattern.test(path)) {
            path = path.replace(rule.pattern, rule.replacement);
            break;
        }
    }
    return await fetch(upstream + path, req);
});