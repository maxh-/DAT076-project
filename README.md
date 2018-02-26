# DAT076-project
1. Installera dependencies: Kör `npm install && cd client && npm install`.
2. Starta backend-servern: kör `npm start` i rootmappen.
2. Starta react-appen: kör `npm start` i mappen `client`.
4. Sidan finns nu på http://localhost:3000 (backend körs på port 3001)

# Routes
**Path**: /user/me/  
**Method**: GET  
**RequiresAuth**: YES  
**Beskrivning**: Hämtar infon om den inloggade användaren

**Path**: /user/me/changePassword  
**Method**: POST  
**RequiresAuth**: YES  
**JSON**: 
```
{
  oldPassword: String,
  pasword: String,
  password2: String
}
```
**Beskrivning**: ändrar lösenord på den inloggade användaren.
