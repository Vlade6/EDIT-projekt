Ova stranica koju sam napravio omogućuje korisnicima pregled popularnih TV serija pomoću TVMaze API-ja kojeg sam implementirao. Na stranici možemo pretraživati i pregledavati serije kao i njihove epizode i glumce kao i dodati seriju u favorite ako nam se svidi.

## Funkcionalnosti ove stranice
    Početna stranica sa prikazom serija
    Serije se mogu pretraživati po njihovom nazivu
    Koriste se dinamičke rute za prikaz dodatnih detalja serije
    Prikazuju se epizode i glumci po seriji
    Možemo dodavati i brisati serije iz favorita te se spremaju u favorites
    Koristili smo LocalStorage za trajnu pohranu favorita
    Imamo `404 not-found.js` i `loading.js` stranice
    Na kraju stranicu deployali na Vercel

## Za pokretanje projekta lokalno
    git clone https://github.com/korisnik/ime-repozitorija.git
    cd ime-repozitorija
    npm install
    npm run dev

## Za pokretanje Build & Deploy
    npm run build
    npm start
    link: 

## Poznate greške/ TODO
    Izmješao sam css te sam cijeli svoj projekt, na novo napravio, prebacia kodove bez css/tailwinda te na kraju to riješio zadnje 
    Nisam implementirao filtriranje po žanrovima 
    Favoriti se spremaju samo lokalno 

