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
*Beskrivning**: ändrar lösenord på den inloggade användaren.

**Path**: /auth/register  
**Method**: POST  
**RequiresAuth**: YES  
**Beskrivning**: hämtar den inloggade användaren ifall personen är inloggad

**Path**: /auth/register  
**Method**: POST  
**RequiresAuth**: NO  
**JSON**: 
```
{
  email: String,
  pasword: String,
  password2: String,
  firstName: String,
  lastName: String
}
```
**Beskrivning**: Skapar ny användare, code: 201 ifall det funkade.

**Path**: /auth/login  
**Method**: POST  
**RequiresAuth**: NO  
**JSON**: 
```
{
  email: String,
  pasword: String,
}
```
**Beskrivning**: Loggar in användaren. Får användaren som user i response.

**Path**: /auth/logout  
**Method**: GET  
**RequiresAuth**: NO/  
**Beskrivning**: Loggar in användaren. Får användaren som user i response.

**Path**: /auth/forgot  
**Method**: POST  
**RequiresAuth**: NO  
**JSON**: 
```
{
  email: String
}
```
**Beskrivning**: Skickar mail till användaren med en länk med en token i så de kan ändra sitt lösenord.

**Path**: /auth/reset/:token  
**Method**: GET  
**RequiresAuth**: NO  
**Beskrivning**: skickar code 200 om token existerar och inte gått ut och token går att hitta i response som `token`

**Path**: /auth/reset/:token  
**Method**: POST  
**RequiresAuth**: NO  
**JSON**: 
```
{
  password: String,
  password2: String
}
```
**Beskrivning**: Skickar mail till användaren ifall det fungerade. code: 200 ifall det fungerade i response;

