function getRandomAnimalPath()
{
	let i = Math.floor(Math.random() * (6 - 1) + 1);
	return "animal" + i + ".jpeg";
}