import type { Actress, Person } from "./types.ts";


const mockActress: Actress = {
  id: 1,
  name: "Emma Stone",
  birth_year: 1988,
  // death_year è opzionale e qui non presente
  biography: "Emma Stone è un'attrice americana nota per i suoi ruoli versatili in film di successo.",
  img: "https://example.com/emma-stone.jpg",
  most_famous_movies: ["La La Land", "Birdman", "Easy A"],
  awards: "Premio Oscar come miglior attrice protagonista",
  nationality: "American"
};


function isActress(dati: unknown): dati is Actress {
  if (
    dati && typeof dati === "object" &&
    "id" in dati && typeof dati.id === "number" &&
    "name" in dati && typeof dati.name === "string" &&
    "birth_year" in dati && typeof dati.birth_year === "number" &&
    (!("death_year" in dati) || typeof dati.death_year === "number") &&
    "biography" in dati && typeof dati.biography === "string" &&
    "img" in dati && typeof dati.img === "string" &&
    "most_famous_movies" in dati && Array.isArray(dati.most_famous_movies) &&
    "awards" in dati && typeof dati.awards === "string" &&
    "nationality" in dati && typeof dati.nationality === "string"
  ) {
    return true
  } else {
    return false
  }
}

async function getActress(id: number): Promise<Actress | null> {
  let res = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses/${id}`)
  //L'api fornita dall'esercizio è offline  
  let dati: unknown
  if (res.status === 500) {
    dati = mockActress
  } else {
    dati = await res.json()
  }

  if (isActress(dati)) {
    return dati
  }
  return null


}

(async function () {
  const res = await getActress(1);
  console.log(res);

})()