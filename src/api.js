export async function fetchData(){
    const response = await fetch(
        `http://api.exchangeratesapi.io/v1/latest?access_key=537925e9437168886a525acd881f37de`
    );
    const data = await response.json();
    return data;
}