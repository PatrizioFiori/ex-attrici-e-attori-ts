# 🎬 TypeScript Actress/Actor API Project

## 📌 Milestone 1: Type Alias `Person`

Crea un type alias `Person` per rappresentare una persona generica.

**Proprietà richieste:**

- `id`: `number` – identificativo univoco, **readonly**
- `name`: `string` – nome completo, **readonly**
- `birth_year`: `number` – anno di nascita
- `death_year`: `number` (opzionale) – anno di morte
- `biography`: `string` – breve biografia
- `image`: `string` – URL dell'immagine

---

## 📌 Milestone 2: Type Alias `Actress`

Crea un type alias `Actress` che **estende `Person`** aggiungendo:

- `most_famous_movies`: `[string, string, string]` – una **tupla** di 3 film famosi
- `awards`: `string` – premi ricevuti
- `nationality`: una stringa tra i seguenti valori:
  - `American`
  - `British`
  - `Australian`
  - `Israeli-American`
  - `South African`
  - `French`
  - `Indian`
  - `Israeli`
  - `Spanish`
  - `South Korean`
  - `Chinese`

---

## 📌 Milestone 3: Funzione `getActress`

Crea una funzione `getActress(id: number): Promise<Actress | null>` che:

- Effettua una chiamata a  
  `GET https://boolean-spec-frontend.vercel.app/freetestapi/actresses/:id`
- Restituisce un oggetto `Actress` se esiste, oppure `null` se non trovato
- Utilizza un **type guard** chiamato `isActress` per validare la struttura del dato ricevuto

---

## 📌 Milestone 4: Funzione `getAllActresses`

Crea una funzione `getAllActresses(): Promise<Actress[]>` che:

- Effettua una chiamata a  
  `GET https://boolean-spec-frontend.vercel.app/freetestapi/actresses`
- Restituisce un array di oggetti `Actress` (può essere anche vuoto)

---

## 📌 Milestone 5: Funzione `getActresses`

Crea una funzione `getActresses(ids: number[]): Promise<(Actress | null)[]>` che:

- Riceve un array di ID (`number[]`)
- Per ogni ID usa `getActress()` per recuperare l'attrice corrispondente
- Esegue tutte le richieste in **parallelo** usando `Promise.all`
- Restituisce un array contenente `Actress` oppure `null`

---

## 🎯 BONUS 1: Create & Update Actress

### `createActress(data: Omit<Actress, "id">): Actress`

- Usa `Omit` per **escludere `id`** (che verrà generato casualmente)

### `updateActress(id: number, data: Partial<Omit<Actress, "id" | "name">>): Actress`

- Usa `Partial` per **rendere opzionali tutte le proprietà aggiornabili**
- `id` e `name` **non devono essere modificabili**

---

## 🎯 BONUS 2: Type Alias `Actor`

Crea un tipo `Actor`, che estende `Person` con:

- `known_for`: `[string, string, string]` – una tupla di 3 film
- `awards`: `string[]` – array di 1 o 2 premi
- `nationality`: stessa lista di `Actress` **più**:
  - `Scottish`
  - `New Zealand`
  - `Hong Kong`
  - `German`
  - `Canadian`
  - `Irish`

Implementa anche:

- `getActor(id: number): Promise<Actor | null>`
- `getAllActors(): Promise<Actor[]>`
- `getActors(ids: number[]): Promise<(Actor | null)[]>`
- `createActor(data: Omit<Actor, "id">): Actor`
- `updateActor(id: number, data: Partial<Omit<Actor, "id" | "name">>): Actor`

---

## 🎯 BONUS 3: Funzione `createRandomCouple`

Crea una funzione `createRandomCouple(): Promise<[Actress, Actor]>` che:

- Usa `getAllActresses()` e `getAllActors()`
- Restituisce una **coppia casuale**:  
  - Primo elemento: una `Actress` a caso  
  - Secondo elemento: un `Actor` a caso
