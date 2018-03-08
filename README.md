# DAT076-project
1. Installera dependencies: Kör `npm install && cd client && npm install`.
2. Starta backend-servern: kör `npm start` i r
ootmappen.
2. Starta react-appen: kör `npm start` i mappen `client`.
4. Sidan finns nu på http://localhost:3000 (backend körs på port 3001**


# Routes

## Recipe
**Path**: /recipe/create  
**Method**: POST  
**RequiresAuth**: YES  
**JSON**: 
```
{
	title: String,
	timeToComplete: Integer,
    tweet: String,
	steps: [
		{
			instruction: String,
			number: Integer
		}
		],
	tags: [ tagid ],
	ingredients: [
		{
			number: Integer,
			amount: Integer,
			UnitId: Integer,
			ingredient: String
		},{
			number: Integer,
			amount: Integer,
			UnitId: Integer,
			IngredientId: Integer
		}
	]
}
```
**Beskrivning**: Skapa recept, lyckas den så skickas code 201 tillbaka samt receptet. Man kan skicka både ingrediensens namn (Om den inte finns i databasen så skapas en ny då!) eller ingrediensens Id).


**Path**: /recipe/:id  
**Method**: Get  
**RequiresAuth**: NO  
**Beskrivning**: Hämtar ett recept

**Path**: /recipe/  
**Method**: Get  
**RequiresAuth**: NO  
**Beskrivning**: Hämtar alla recept

**Path**: /recipe/search?tags=A&q=B  
**Method**: Get  
**RequiresAuth**: NO  
**Beskrivning**: söker på ett recept. A är kommaseparerade ids ex 1,2,3. B är en sträng. För att bara söka på ena av dem så strunda i att inkludera den andra.

**Path**: /recipe/top?limit=A  
**Method**: Get  
**RequiresAuth**: NO  
**Beskrivning**: Hämtar top mest gillade recept. Ifall en limit är skickad så får man de antalet recept annars får man 12.

## User

**Path**: /user/  
**Method**: GET  
**RequiresAuth**: NO  
**Beskrivning**: Hämtar publik info om alla användare

**Path**: /user/:id  
**Method**: GET  
**RequiresAuth**: NO  
**Beskrivning**: hämtar publik info om en specifik användare

**Path**: /user/:id/recipes  
**Method**: GET  
**RequiresAuth**: NO  
**Beskrivning**: hämtar recept som en användare har skapat

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

**Path**: /user/me/update  
**Method**: POST  
**RequiresAuth**: YES  
**JSON**: 
```
{
  firstName: String,
  lastName: String

}
```
*Beskrivning**: ändrar uppgifter på den inloggade användaren. firstName och lastName får inte vara tomma! 

**Path**: /user/me/favorite  
**Method**: GET  
**RequiresAuth**: YES  
  *Beskrivning**: hämtar alla favoriter till en användare


**Path**: /user/me/favorite  
**Method**: POST  
**RequiresAuth**: YES  
**JSON**: 
```
{
  recipeId: Integer

}
```
  *Beskrivning**: Lägger till ett recept till favoriter för den inloggade användaren


**Path**: /user/me/favorite  
**Method**: DELETE  
**RequiresAuth**: YES  
**JSON**: 
```
{
  recipeId: Integer

}
```
  *Beskrivning**: Tar bort ett recept från favoriter för en inloggad användare
  
  
## Auth
**Path**: /auth/  
**Method**: GET  
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

