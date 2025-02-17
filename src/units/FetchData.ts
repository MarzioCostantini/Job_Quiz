export const fetchData = async (url: string) => {

    console.log("gehttt");
    console.log(url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP-Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
        throw error;
    }
};