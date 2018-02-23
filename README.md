# DAT076-project
1. Installera dependencies: Kör `npm install && cd client && npm install`.
2. Starta backend-servern: kör `npm start` i r
ootmappen.
2. Starta react-appen: kör `npm start` i mappen `client`.
4. Sidan finns nu på http://localhost:3000 (backend körs på port 3001**


# Routes
**Path**: /recipe/create
**Method**: POST
**RequiresAuth**: YES
**JSON**: {
	"title": String,
	"timeToComplete": Integer,
	"steps": [
		{
			"instruction": String,
			"number": Integer
		}
		],
	"tags": [ 
		{"tag":String}
		],
	"ingredients": [
		{
			"number": Integer,
			"amount": Integer,
			"UnitId": Integer,
			"ingredient": String
		},{
			"number": Integer,
			"amount": Integer,
			"UnitId": Integer,
			"IngredientId": Integer
		}
	]
}
**Beskrivning**: Skapa recept, lyckas den så skickas code 201 tillbaka samt receptet. Man kan skicka både ingrediensens namn (Om den inte finns i databasen så skapas en ny då!) eller ingrediensens Id).
