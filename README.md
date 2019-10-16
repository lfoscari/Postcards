[![Netlify Status](https://api.netlify.com/api/v1/badges/0163e8a1-bc34-42f0-b905-04ee12de9501/deploy-status)](https://app.netlify.com/sites/confident-leakey-2d5618/deploys)

#### TODO
[x] Seguire [questa guida](https://itnext.io/vuex-made-simple-getting-started-6bf229d432cf) per impelmentare vuex correttamente. Tutti i dati vanno spostati all'interno di vuex insieme alle funzioni per manipolarli. Questi attributi e funzioni possono poi essere usate all'interno dei componenti.
[ ] Mettere a posto il draggable in Lingot (si è rotto con vuex)

# postcards

PWA che permette di creare template in html, pronti per essere utilizzati in mail builder. Le componenti sono chiamate Nugget, l'insieme di questi che compone un template è chiamato Ingot.

### Prima versione
L'utente può selezionare dei template HTML e inserirli in un array, l'export prende il markup dei componenti e li concatena, poi lo stampa. Successivamente si potrebbero rappresentare a schermo l'insieme dei componenti (slot?).

### Seconda versione
Introduzione dei componenti avanzati, l'utente può personalizzare i componenti in base a delle variabili, queste saranno definite all'interno del componente in Vue.

### Terza versione
Introduzione stili globali, l'utente potrà fissare delle variabili comuni a tutti i componenti, quindi velocizzando l'unificazione dello stile e delle variabili.

---

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
