import type { Actress, Person } from "./types.ts";

const mockActresses: Actress[] = [
  {
    id: 0,
    name: "Emma Stone",
    birth_year: 1988,
    biography: "Attrice americana vincitrice di un Oscar, famosa per il suo ruolo in La La Land.",
    img: "https://example.com/emma-stone.jpg",
    most_famous_movies: ["La La Land", "Easy A", "Cruella"],
    awards: "Oscar, BAFTA",
    nationality: "American",
  },
  {
    id: 1,
    name: "Penélope Cruz",
    birth_year: 1974,
    biography: "Attrice spagnola nota per i suoi ruoli in film di Pedro Almodóvar.",
    img: "https://example.com/penelope-cruz.jpg",
    most_famous_movies: ["Volver", "Vicky Cristina Barcelona", "Parallel Mothers"],
    awards: "Oscar, Goya Awards",
    nationality: "Spanish",
  },
  {
    id: 2,
    name: "Song Hye-kyo",
    birth_year: 1981,
    biography: "Attrice sudcoreana celebre per ruoli in drammi televisivi e film.",
    img: "https://example.com/song-hye-kyo.jpg",
    most_famous_movies: ["The Grandmaster", "My Brilliant Life", "Hwang Jin Yi"],
    awards: "Blue Dragon Film Award",
    nationality: "South Korean",
  }
];


function isActress(dati: unknown): dati is Actress {
  return (
    typeof dati === "object" && dati !== null &&
    "id" in dati && typeof dati.id === "number" &&
    "name" in dati && typeof dati.name === "string" &&
    "birth_year" in dati && typeof dati.birth_year === "number" &&
    (!("death_year" in dati) || typeof dati.death_year === "number") &&
    "biography" in dati && typeof dati.biography === "string" &&
    "img" in dati && typeof dati.img === "string" &&
    "most_famous_movies" in dati && dati.most_famous_movies instanceof Array && dati.most_famous_movies.length === 3 && dati.most_famous_movies.every(m => typeof m === "string") &&
    "awards" in dati && typeof dati.awards === "string" &&
    "nationality" in dati && typeof dati.nationality === "string"
  )

}

async function getActress(id: number): Promise<Actress | null> {





  let res = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses/${id}`) //L'api fornita dall'esercizio è offline  
  let dati: unknown
  if (res.status === 500) {
    dati = mockActresses[id]
  } else {
    dati = await res.json()
  }
  if (isActress(dati)) {
    return dati
  }
  return null

}

async function getAllActresses(): Promise<Actress[]> {
  let res = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses`); //L'api fornita dall'esercizio è offline  
  let dati: unknown;
  if (res.status === 500) {
    dati = mockActresses;
  } else {
    dati = await res.json();
  }

  if (Array.isArray(dati)) {
    const attriciValide: Actress[] = dati.filter(isActress)

    return attriciValide

  } else {
    return []
  }
}


async function getActresses(ids: number[]): Promise<(Actress | null)[]> {
  try {
    const promises = ids.map(id => getActress(id))
    const actresses = await Promise.all(promises)

    return actresses
  } catch (error) {
    if (error instanceof Error) {
      console.log("Errore durante il recupero delle attrici", error)
    } else {
      console.log("Errore sconosciuto", error)
    }
    return []

  }
}




(async function () {
  const res = await getActress(0);
  console.log("es1", res);
  const result = await getAllActresses();
  console.log("es2", result);
  const resultData = await getActresses([0, 1, 2]);
  console.log("es3", resultData);

})()

