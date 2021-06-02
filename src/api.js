export async function fetchData(){
    const response = await fetch(
        `https://openexchangerates.org/api/latest.json?app_id=5c4bbebdb9384337a9f13aea13174b00`
    );
    const data = await response.json();
    return data;
}