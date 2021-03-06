# DAT076-project
1. Installera dependencies: Kör `npm install && cd client && npm install`.
2. Starta backend-servern: kör `npm start` i r
ootmappen.
2. Starta react-appen: kör `npm start` i mappen `client`.
4. Sidan finns nu på http://localhost:3000 (backend körs på port 3001**


# Routes

## Recipe
**Path**: /api/recipe/  
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


**Path**: /api/recipe/:id  
**Method**: PUT  
**RequiresAuth**: YES  
**JSON**: 
```
{
	title: String (OPTIONAL),
	timeToComplete: Integer (OPTIONAL),
    tweet: String (OPTIONAL)
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

**Path**: /api/recipe/:id  
**Method**: Get  
**RequiresAuth**: NO  
**Beskrivning**: Hämtar ett recept

**Path**: /api/recipe/  
**Method**: Get  
**RequiresAuth**: NO  
**Beskrivning**: Hämtar alla recept

**Path**: /api/recipe/search?tags=A&q=B  
**Method**: Get  
**RequiresAuth**: NO  
**Beskrivning**: söker på ett recept. A är kommaseparerade ids ex 1,2,3. B är en sträng. För att bara söka på ena av dem så strunda i att inkludera den andra.

**Path**: /api/recipe/top?limit=A  
**Method**: Get  
**RequiresAuth**: NO  
**Beskrivning**: Hämtar top mest gillade/favoriserade recept. Ifall en limit är skickad så får man de antalet recept annars får man 12.

**Path**: /api/recipe/:id/like  
**Method**: Get  
**RequiresAuth**: NO  
**Beskrivning**: Hämtar likes för ett recept

**Path**: /api/recipe/:id/like  
**Method**: POST  
**RequiresAuth**: YES  
**Beskrivning**: Likear ett recept

**Path**: /api/recipe/:id/like  
**Method**: DELETE  
**RequiresAuth**: YES  
**Beskrivning**: Tar bort like från ett recept


## User

**Path**: /api/user/  
**Method**: GET  
**RequiresAuth**: NO  
**Beskrivning**: Hämtar publik info om alla användare

**Path**: /api/user/:id  
**Method**: GET  
**RequiresAuth**: NO  
**Beskrivning**: hämtar publik info om en specifik användare

**Path**: /api/user/:id/recipes  
**Method**: GET  
**RequiresAuth**: NO  
**Beskrivning**: hämtar recept som en användare har skapat

**Path**: /api/user/me/  
**Method**: GET  
**RequiresAuth**: YES  
**Beskrivning**: Hämtar infon om den inloggade användaren

**Path**: /api/user/me/change-password  
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

**Path**: /api/user/me/  
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

**Path**: /api/user/me/likes  
**Method**: GET  
**RequiresAuth**: YES  
  *Beskrivning**: hämtar recept som användaren har likeat

**Path**: /api/user/me/favorite  
**Method**: GET  
**RequiresAuth**: YES  
  *Beskrivning**: hämtar alla favoriter till en användare


**Path**: /api/user/me/favorite  
**Method**: POST  
**RequiresAuth**: YES  
**JSON**: 
```
{
  recipeId: Integer

}
```
  *Beskrivning**: Lägger till ett recept till favoriter för den inloggade användaren


**Path**: /api/user/me/favorite  
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
**Path**: /api/auth/  
**Method**: GET  
**RequiresAuth**: YES  
**Beskrivning**: hämtar den inloggade användaren ifall personen är inloggad

**Path**: /api/auth/register  
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

**Path**: /api/auth/login  
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

**Path**: /api/auth/forgot  
**Method**: POST  
**RequiresAuth**: NO  
**JSON**: 
```
{
  email: String
}
```
**Beskrivning**: Skickar mail till användaren med en länk med en token i så de kan ändra sitt lösenord.

**Path**: /api/auth/reset/:token  
**Method**: GET  
**RequiresAuth**: NO  
**Beskrivning**: skickar code 200 om token existerar och inte gått ut och token går att hitta i response som `token`

**Path**: /api/auth/reset/:token  
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

## Ingredient
**Path**: /api/ingredient/  
**Method**: GET  
**RequiresAuth**: NO  
**Beskrivning**: hämtar alla ingredienser

**Path**: /api/ingredient/:id  
**Method**: GET  
**RequiresAuth**: NO  
**Beskrivning**: hämta ingrediens med id 

## Tag
**Path**: /api/tag/  
**Method**: GET  
**RequiresAuth**: NO  
**Beskrivning**: hämtar alla taggar

**Path**: /api/tag/:id  
**Method**: GET  
**RequiresAuth**: NO  
**Beskrivning**: hämta tag med id

## Unit
**Path**: /api/unit/  
**Method**: GET  
**RequiresAuth**: NO  
**Beskrivning**: hämtar alla units

**Path**: /api/tag/:id  
**Method**: GET  
**RequiresAuth**: NO  
**Beskrivning**: hämta unit med id

## Upload
**Path**: /api/upload/  
**Method**: POST  
**RequiresAuth**: NO  
**FormData**:
```
file: File,
name: String
```
**Beskrivning***: laddar upp bilder 

## Welcome
**Path**: /api/welcome/  
**Method**: GET  
**RequiresAuth**: NO  
**Beskrivning**: Svara med en JSON med navia tidiga positiva tankar om framtiden för projektet.

# .env settings
## Backend
```
NODE_ENV=production/test/development
DB_FORCE_SYNC=bool (om true så droppas alla tables och sätts upp igen)
DB_FILL=bool (om true så fylls databasen med testvärden från databasefiller i config)
DB_USERNAME=string
DB_PASSWORD=string
DB_NAME=string
DB_HOSTNAME=string
clientLocation=String (hostname för vart client ligger)
```
