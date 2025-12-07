# 🎄 Nissemissionen – *Det’ Et Hårdt Job*  
**Den endelige historielogik & flowmodel (inkl. korrekt Gynther-event)**

---

## 🌍 Lokationer

### 1. Hulen (primær)
Indeholder:
- **Den Store Bog** *(starter i inventory)*
- **Bøjet propel** *(starter i inventory)*
- **Savbænk / snittemaskine*
- **Musikudstyr**
- **Øl**
- **Nøglen** *(kan findes → tilføjes inventory)*
- **Spåner** *(opstår når propellen snittes)*

### 2. Skoven
Handlinger:
- Hent træ  
- Find/bevis tabt kort  
- Hent benzin  
- Risiko for møde med Benny  

### 3. Huset (Oluf & Gertrud)
Handlinger:
- Stjæle bogen tilbage  
- Benny sover → mulighed for at hente bogen  
- Sidequests  
- Risiko for at blive opdaget  

---

## 🎒 Inventory-system

### Starter i inventory
- Den Store Bog  
- Bøjet propel  

### Kan tilføjes
- Nøglen  
- Træ  
- Benzin  
- Første mislykkede propel *(5x for lille)*  
- Perfekt propel  

### For at flyve hjem kræves
- Den Store Bog  
- Nøglen  
- Perfekt propel  
- Benzin  

---

## 🧑‍🎄 Roller & Handlinger

### 👓 Fritz
- Læse Den Store Bog  
- Skrive “gode vendinger”  
- Give instruktioner til Gynther  

### 😭 Hansi
- Hente træ  
- Hente benzin  
- Tabe kortet *(automatisk event)*  
- Finde kortet igen  
- Feje spåner op  
- Klage over smerter og hvor hårdt det er  

### 🔨 Gynther
- Snitte propellen  
- Få håndskade *(timer pause)*  
- Genoptage snittearbejdet  
- Lave en propel 5x for lille  
- Blive slået ned af Benny → begynder at tale tysk  
- Snitte den perfekte propel  

---

## ⏲ Timers

### Snitte-timer 1
- Startes af Gynther  
- Pauses ved håndskade  
- Genoptages  
- Ved slut → resultat: **For lille!**

### Snitte-timer 2
- Startes når bogen er fundet igen  
- Ingen skade denne gang  
- Ved slut → **Perfekt propel**  

---

## 🕹 Det komplette historie-flow

---

### ⭐ FASE 1 — Start i hulen  
**Mål: Find nøglen og forstå problemet**

1. Spillere joiner lobby og vælger roller  
2. De udforsker hulen → finder nøglen → inventory  
3. Propellen er bøjet → problemet opstår  
4. Hansi forsøger at læse Den Store Bog → fejler  
5. Fritz læser bogen  
   - “If your propel is so bøjet… snit en ny.”  
6. Snitteforløbet kan nu starte  

---

### ⭐ FASE 2 — Materialer + første propel  
**Mål: Snit første propel (mislykkes)**

**Hansi**
- Henter træ i skoven  
- Tilføjer træ til inventory  
- Klager konstant  

**Gynther**
- Starter snitte-timer 1  
- Spåner opstår  
- Får håndskade → timer pauses  

**Hansi**
- Fejer spåner op *(kræves for progression)*  

**Gynther**
- Genoptager arbejdet  
- Timer slutter → propel bliver 5x for lille  
- Tilføjes inventory  

---

### ⭐ FASE 3 — Kaos: Bogen forsvinder + Gynther taler tysk  
**Mål: Find Den Store Bog igen**

**Event-sekvens (korrekt):**
1. Hansi er ude i skoven  
2. Gynther møder Benny  
3. Benny slår ham ned  
4. Gynther begynder at tale tysk  
5. De vil slå op i bogen → **bogen er væk**  
6. `bookStatus = "missing"`  

**Spillernes mål:**
1. Følge spor til huset  
2. Se Benny læse i bogen  
3. Vente til han sover  
4. En spiller lister hen og trykker **“Tag bogen”**  
5. Bogen returneres til inventory  

**Achievements:**
- Gynther: Blev slået ned og talte tysk  
- Lost Den Store Bog  
- Stole bogen tilbage fra Benny  

---

### ⭐ FASE 4 — Anden (rigtige) propel  
**Mål: Snit den perfekte propel**

**Hansi**
- Henter træ igen  

**Fritz**
- Læser Den Store Bog igen  

**Gynther**
- Starter snitte-timer 2  
- Ingen skader  
- Timer slutter → **Perfekt propel** tilføjes inventory  

**Achievements:**
- Gynther: Laved perfekt propel  
- Hansi: Hard labour… igen  
- Fritz: Read in the book… again  

---

### ⭐ FASE 5 — Finale: Flyv hjem til Gammel Nok  
**Krav for flyvning:**
- Perfekt propel  
- Nøglen  
- Den Store Bog  
- Benzin  

Når alle dele er i inventory:
- “Flyv hjem” aktiveres  
- Mission complete  
- Spilledåsen reddes  
- Gammel Nok lever  

---

## 🎖 Achievements (komplet liste)

### Fritz
- Read Den Store Bog  
- That’s a good vending…  
- Can you gentake that, Hansi?  

### Hansi
- Hent træ (x2)  
- Hent benzin  
- Tabte kortet i skoven  
- Fandt kortet igen  
- Fejede spåner op  
- Det er hårdt at være nissemand!  

### Gynther
- Start snittearbejde  
- Fik håndskade!  
- Talte tysk efter slag  
- Laved propel 5x for lille  
- Laved perfekt propel  

### Story achievements
- Found Den Store Bog  
- Lost Den Store Bog  
- Stole bogen tilbage fra Benny  
- Completed Mission – Gammel Nok saved  

---

## 🔌 Sockets og lobbies

Hver lobby har sin egen:
- Missionfase (1–5)  
- Bog-status *(inHulen / missing / hosBenny / tilbageIgen)*  
- Propelfremgang  
- Snitte-timer  
- Inventory state  
- Spilledåse-timer  
- Event-stream (fx Gynther slået ned)  

Alt opdateres live for alle spillere.  

---

## 🧭 Det korte pitch (eksamen-klar)

En samarbejdsmission baseret på **The Julekalender**, hvor spillerne som Fritz, Hansi og Gynther skal:  
1. Find nøglen,  
2. Læse instruktioner i Den Store Bog,  
3. Snitte en propel (første mislykkes),  
4. Miste bogen,  
5. Stjæle den tilbage fra Benny,  
6. Snitte den perfekte propel,  
7. Flyve hjem og redde Gammel Nok.  

Alt foregår live via socket-lobbies med timers, achievements, inventory og rollebaserede handlinger.

---

# 📁 Projektstruktur (komplet)

project/
│
├── src/
│ ├── app.js
│ ├── server.js
│ ├── config/
│ │ ├── env.js
│ │ └── database.js
│ │
│ ├── models/
│ │ ├── User.js
│ │ ├── Lobby.js
│ │ ├── LobbyParticipant.js
│ │ ├── LobbyState.js
│ │ ├── Item.js
│ │ ├── SnitteTimer.js
│ │ ├── Achievement.js
│ │ ├── UserAchievement.js
│ │ └── ActionLog.js
│ │
│ ├── controllers/
│ │ ├── authController.js
│ │ ├── lobbyController.js
│ │ ├── itemController.js
│ │ ├── actionController.js
│ │ ├── achievementController.js
│ │ └── userController.js
│ │
│ ├── services/
│ │ ├── authService.js
│ │ ├── lobbyService.js
│ │ ├── inventoryService.js
│ │ ├── actionService.js
│ │ ├── snitteService.js
│ │ ├── bookService.js
│ │ ├── achievementService.js
│ │ └── timerService.js
│ │
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── lobbyRoutes.js
│ │ ├── itemRoutes.js
│ │ ├── actionRoutes.js
│ │ ├── achievementRoutes.js
│ │ └── userRoutes.js
│ │
│ ├── sockets/
│ │ ├── lobbySocket.js
│ │ ├── snitteTimerSocket.js
│ │ ├── eventTypes.js
│ │ └── socketAuth.js
│ │
│ ├── middleware/
│ │ ├── authMiddleware.js
│ │ ├── roleMiddleware.js
│ │ └── errorMiddleware.js
│ │
│ ├── utils/
│ │ ├── logger.js
│ │ ├── response.js
│ │ ├── validation.js
│ │ ├── missionPhases.js
│ │ ├── itemTypes.js
│ │ ├── achievementList.js
│ │ └── randomEvents.js
│ │
│ └── db/
│ ├── prisma.schema
│ ├── migrations/
│ └── seed.js
│
├── public/
│ ├── css/
│ ├── js/
│ ├── images/
│ └── index.html
│
├── package.json
├── .env
└── README.md

---

## 📌 Forklaring af projektets mappestruktur

### 🔧 `src/app.js`
- Konfigurerer Express  
- Loader middleware  
- Registrerer routes  
- Starter database  

### 🔧 `src/server.js`
- Starter HTTP-server  
- Opsætter WebSocket (Socket.IO eller ws)  
- Binder socket-funktioner  

### 🧱 `config/`
- `.env` loader  
- Database konfiguration  

### 🧱 `models/`
Database-entiteter, fx:
- **User**, **Lobby**, **LobbyState**, **Item**, **SnitteTimer**, **ActionLog**  

### 🎮 Controllers
Håndterer HTTP-routes som:
- createLobby  
- joinLobby  
- handleFindKey  
- handleReadBook  
- handleStartSnit  
- handleFlyHome  

### 🧠 Services
Projektets logiske kerne:
- **snitteService** – håndterer timere & resultater  
- **bookService** – bog-tekst, adgang, manglende bog  
- **lobbyService** – state-machine  
- **achievementService** – giver achievements  
- **timerService** – spilledåse-timer  

### 🚦 Routes
REST endpoints opdelt efter domæne:
- `/auth`, `/users`, `/lobbies`, `/actions`, `/items`, `/achievements`  

### 📡 Sockets
Live-opdatering af:
- State  
- Items  
- Timers  
- Achievements  
- Events (fx “gynther_speaks_german”)  

### 🧩 Middleware
- Token-validering  
- Rolle-tjek (Fritz/Hansi/Gynther)  
- Global fejl-håndtering  

### 🛠 Utils
Hjælpebiblioteker:
- missionPhases  
- itemTypes  
- achievements  
- random events  

### 🗄 `db/`
- Migrations  
- Prisma/Sequelize schema  
- Seeds  

---

📁 public/ 
- Frontend-filer hvis du kører server-side bundling eller ren HTML/SvelteKit.  