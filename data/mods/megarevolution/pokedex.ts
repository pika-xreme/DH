export const Pokedex: {[speciesid: string]: SpeciesData} = {
	venusaur: {
		inherit: true;
		evos: ["Arbosaur"],
	},
	arbosaur: {
		num: 270001,
		species: "Arbosaur",
		types: ["Grass","Dragon"],
		baseStats: {hp: 85, atk: 93, def: 85, spa: 115, spd: 110, spe: 88},
		abilities: {0: "Overgrow", H: "Thick Fat"},
		heightm: 2.4,
		weightkg: 155.5,
		prevo: "venusaur",
	},
	charizard:  {
		inherit: true;
		evos: ["Charbarian", "Chargaryen"],
	},
	charbarian: {
		num: 270002,
		species: "Charbarian",
		types: ["Fire","Dragon"],
		baseStats: {hp: 93, atk: 114, def: 83, spa: 109, spd: 85, spe: 100},
		abilities: {0: "Blaze", H: "Tough Claws"},
		heightm: 1.7,
		weightkg: 110.5,
		prevo: "charizard",
	},
	chargaryen: {
		num: 270003,
		species: "Chargaryen",
		types: ["Fire","Dragon"],
		baseStats: {hp: 83, atk: 89, def: 93, spa: 124, spd: 95, spe: 100},
		abilities: {0: "Blaze", H: "Drought"},
		heightm: 1.7,
		weightkg: 100.5,
		prevo: "charizard",
	},
	blastoise: {
		inherit: true;
		evos: ["Galapagon"],
	},
	galapagon: {
		num: 270004,
		species: "Galapagon",
		types: ["Water","Rock"],
		baseStats: {hp: 89, atk: 93, def: 110, spa: 100, spd: 120, spe: 68},
		abilities: {0: "Blaze", H: "Mega Launcher"},
		heightm: 1.6,
		weightkg: 101.1,
		prevo: "blastoise",
	},
};
