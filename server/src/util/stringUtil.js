export function randomString(length) {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
}

export function randomThreeWordName() {
    const adjectives = [
        "Happy",
        "Frosty",
        "Lazy",
        "Jolly",
        "Brave",
        "Sneaky",
        "Cozy",
        "Silent",
        "Wild",
        "Clever"
    ];

    const nouns = [
        "Nisse",
        "Potato",
        "Propeller",
        "Forest",
        "Hule",
        "Book",
        "Goose",
        "Snow",
        "Machine",
        "Lamp"
    ];

    const extras = [
        "Club",
        "Crew",
        "Squad",
        "Gang",
        "Team",
        "Party",
        "Group",
        "Mission"
    ];

    function pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    return `${pick(adjectives)} ${pick(nouns)} ${pick(extras)}`;
}
