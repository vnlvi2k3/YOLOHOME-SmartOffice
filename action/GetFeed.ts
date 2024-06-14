export default async function GetFeed(feed: string, formData?: FormData) {
    const response = await fetch(`https://io.adafruit.com/api/v2/${process.env.NEXT_PUBLIC_ADA_USERNAME}/feeds/${feed}/data`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            //your adafruit active key,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    });
    return response.json()
}