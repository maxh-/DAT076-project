# DAT076-project
1. Installera dependencies: Kör `npm install && cd client && npm install`.
2. Starta backend-servern: kör `npm start` i rootmappen.
2. Starta react-appen: kör `npm start` i mappen `client`.
4. Sidan finns nu på http://localhost:3000 (backend körs på port 3001)

# Routes
**Path**: /user/all  
**Method**: GET  
**RequiresAuth**: NO  
**Beskrivning**: Hämtar publik info om alla användare

**Path**: /user/:id  
**Method**: GET  
**RequiresAuth**: NO  
**Beskrivning**: hämtar publik info om en specifik användare
