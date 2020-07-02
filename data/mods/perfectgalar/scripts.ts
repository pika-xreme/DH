export const BattleScripts: {[k: string]: ModdedBattleScriptsData} = {
	init() {
		// Butterfree
		this.modData('Learnsets', 'butterfree').learnset.dazzlinggleam = ['8L1'];
		this.modData('Learnsets', 'butterfree').learnset.defog = ['8L1'];
		this.modData('Learnsets', 'butterfree').learnset.moonblast = ['8L1'];
		
		// Kingler
		this.modData('Learnsets', 'kingler').learnset.closecombat = ['8L1'];
		this.modData('Learnsets', 'kingler').learnset.earthquake = ['8L1'];
		this.modData('Learnsets', 'kingler').learnset.stoneedge = ['8L1'];
		
		// Seaking
		this.modData('Learnsets', 'seaking').learnset.aquajet = ['8L1'];
		this.modData('Learnsets', 'seaking').learnset.drillpeck = ['8L1'];
		
		// Garbodor
		this.modData('Learnsets', 'garbodor').learnset.earthquake = ['8L1'];
		this.modData('Learnsets', 'garbodor').learnset.irontail = ['8L1'];
		this.modData('Learnsets', 'garbodor').learnset.knockoff = ['8L1'];
		this.modData('Learnsets', 'garbodor').learnset.stealthrock = ['8L1'];
		
		// Pikachu
		delete this.modData('Learnsets', 'pikachu').learnset.extremespeed;
		delete this.modData('Learnsets', 'pikachu').learnset.nastyplot;
		
		// Flapple
		this.modData('Learnsets', 'flapple').learnset.crunch = ['8L1'];
		this.modData('Learnsets', 'flapple').learnset.refresh = ['8L1'];
		
		// Appletun
		this.modData('Learnsets', 'appletun').learnset.calmmind = ['8L1'];
		this.modData('Learnsets', 'appletun').learnset.toxic = ['8L1'];
		
		// Qwilfish
		this.modData('Learnsets', 'qwilfish').learnset.recover = ['8L1'];
		
		// Pincurchin
		this.modData('Learnsets', 'pincurchin').learnset.spikyshield = ['8L1'];
		this.modData('Learnsets', 'pincurchin').learnset.taunt = ['8L1'];
		this.modData('Learnsets', 'pincurchin').learnset.voltswitch = ['8L1'];
		
		// Rotom
		this.modData('Learnsets', 'rotom').learnset.aurasphere = ['8L1'];
		this.modData('Learnsets', 'rotom').learnset.rapidspin = ['8L1'];
		this.modData('Learnsets', 'rotom').learnset.sludgebomb = ['8L1'];
		
		// Charizard
		this.modData('Learnsets', 'charizard').learnset.closecombat = ['8L1'];
		
		// Silvally
		this.modData('Learnsets', 'silvally').learnset.recover = ['8L1'];
		
		// Weezing-Galar
		this.modData('Learnsets', 'weezinggalar').learnset.toxicthread = ['8L1'];
		this.modData('Learnsets', 'weezinggalar').learnset.banefulbunker = ['8L1'];
		this.modData('Learnsets', 'weezinggalar').learnset.acidarmor = ['8L1'];
		this.modData('Learnsets', 'weezinggalar').learnset.wonderroom = ['8L1'];
		this.modData('Learnsets', 'weezinggalar').learnset.sunnyday = null;
		
		// Gloom
		this.modData('Learnsets', 'gloom').learnset.toxicspikes = ['8M'];
		
		// Melmetal
		delete this.modData('Learnsets', 'melmetal').learnset.superpower;
		delete this.modData('Learnsets', 'melmetal').learnset.bodypress;
		delete this.modData('Learnsets', 'melmetal').learnset.brickbreak;
		this.modData('Learnsets', 'melmetal').learnset.bulkup = ['8L1'];
		
		// Persian-Kanto
		this.modData('Learnsets', 'persian').learnset.crunch = ['8L1'];
		this.modData('Learnsets', 'persian').learnset.flamewheel = ['8L1'];
		
		// Meowstic
		this.modData('Learnsets', 'meowstic').learnset.defog = ['8L1'];
		this.modData('Learnsets', 'meowstic').learnset.taunt = ['8L1'];
		
		// Meowstic F
		this.modData('Learnsets', 'meowsticf').learnset.aurasphere = ['8L1'];
		this.modData('Learnsets', 'meowsticf').learnset.taunt = ['8L1'];
		
		// Luxray
		this.modData('Learnsets', 'luxray').learnset.zingzap = ['8L1'];
		this.modData('Learnsets', 'luxray').learnset.bulkup = ['8L1'];
		
		// Bouffalant
		this.modData('Learnsets', 'bouffalant').learnset.flareblitz = ['8L1'];
	},
	//Modded functions
	canDynamax(pokemon, skipChecks) {
		// {gigantamax?: string, maxMoves: {[k: string]: string} | null}[]
		if (!skipChecks) {
			if (!pokemon.canDynamax) return;
			if (pokemon.template.isMega || pokemon.template.isPrimal || pokemon.template.forme === "Ultra" || pokemon.getItem().zMove || this.canMegaEvo(pokemon)) {
				return;
			}
			// Some pokemon species are unable to dynamax
			const cannotDynamax = ['zacian', 'zamazenta', 'eternatus'];
			if (cannotDynamax.includes(toID(pokemon.template.baseSpecies))) {
				return;
			}
		}
		/** @type {DynamaxOptions} */
		let result = {maxMoves: []};
		for ( let moveSlot of pokemon.moveSlots ) {
			if ( !moveSlot.disabled ){
				let move = this.dex.getMove(moveSlot.id);
				let maxMove = this.getMaxMove(move, pokemon);
				if (maxMove) result.maxMoves.push({move: maxMove.id, target: maxMove.target});
			}
		}
		if (pokemon.canGigantamax) result.gigantamax = pokemon.canGigantamax;
		return result;
	},
	
	getMaxMove(move, pokemon) {
		if (typeof move === 'string') move = this.dex.getMove(move);
		if (pokemon.canGigantamax && move.category !== 'Status') {
			let gMaxTemplate = this.dex.getTemplate(pokemon.canGigantamax);
			let gMaxMove = this.dex.getMove(gMaxTemplate.isGigantamax);
			if (gMaxMove.exists && gMaxMove.type === move.type) return gMaxMove;
		}
		let maxMove = this.dex.getMove(this.maxMoveTable[move.category === 'Status' ? move.category : move.type]);
		if (maxMove.exists) return maxMove;
	},
	
	getActiveMaxMove(move, pokemon) {
		if (typeof move === 'string') move = this.dex.getActiveMove(move);
		let maxMove = this.dex.getActiveMove(this.maxMoveTable[move.category === 'Status' ? move.category : move.type]);
		if (move.category !== 'Status') {
			if (pokemon.canGigantamax) {
				let gMaxTemplate = this.dex.getTemplate(pokemon.canGigantamax);
				let gMaxMove = this.dex.getActiveMove(gMaxTemplate.isGigantamax ? gMaxTemplate.isGigantamax : '');
				if (gMaxMove.exists && gMaxMove.type === move.type) maxMove = gMaxMove;
			}
			if (!move.gmaxPower) throw new Error(`${move.name} doesn't have a gmaxPower`);
			let gmaxPower = this.newGMaxPower( move ); // new max power
			maxMove.basePower = gmaxPower; // bypass old max power
			maxMove.baseMove = move.id; // need to access this for choice lock and torment
			maxMove.category = move.category;
		}
		maxMove.maxPowered = true;
		return maxMove;
	},
	//New functions
	doMaxBoostFormeChange( pokemon, isPermanent ){
		if ( !pokemon.hasDynamaxed ) return;
		let template = this.dex.deepClone( pokemon.template );
		if ( pokemon.lastFormeBoosted !== pokemon.template.forme ){ // don't boost the same forme twice in a row
			for ( let statName in template.baseStats ){
				let boost = this.getMaxBoost( statName, pokemon );
				template.baseStats[ statName ] = template.baseStats[ statName ] + boost;
			}
		}
		pokemon.lastFormeBoosted = pokemon.template.forme;
		pokemon.formeChange(template, "dynamax", isPermanent);
	},
	
	newGMaxPower( move ){
		let oldMaxPowers = [100, 110, 120, 130, 140, 150];
		let weakMaxPowers = [75, 80, 85, 90, 95, 100];
		let maxPowers = [85, 90, 95, 100, 105, 110];
		let gmaxPower = 90;
		if (!move.basePower) {
			return gmaxPower;
		} else if ( !move.gmaxPower ){
			return null;
		} else if (['Fighting', 'Poison'].includes(move.type)) {
			return move.gmaxPower;
		} else if (['Flying'].includes(move.type)) {
			for ( const i in oldMaxPowers ){
				if ( move.gmaxPower === oldMaxPowers[i] ){
					gmaxPower = weakMaxPowers[i]
					break
				}
			}
		} else {
			for ( const i in oldMaxPowers ){
				if ( move.gmaxPower === oldMaxPowers[i] ){
					gmaxPower = maxPowers[i]
					break
				}
			}
		}
		return gmaxPower;
	},
	
	getMaxBoost( statName, pokemon ){
		let statBoosts = {
			dynamax: { hp: 0, atk: 10, def: 10, spa: 10, spd: 10, spe: 10 },
			alcremie: { hp: 0, atk: 0, def: 30, spa: 10, spd: 10, spe: 0 },
			appletun: { hp: 0, atk: 0, def: 30, spa: 20, spd: 0, spe: 0 },
			butterfree: { hp: 0, atk: 0, def: 0, spa: 10, spd: 0, spe: 40 },
			centiscorch: { hp: 0, atk: 20, def: 30, spa: 0, spd: 0, spe: 0 },
			charizard: { hp: 0, atk: 30, def: 0, spa: 10, spd: 0, spe: 10 },
			coalossal: { hp: 0, atk: 0, def: 0, spa: 35, spd: 15, spe: 0 },
			copperajah: { hp: 0, atk: 0, def: 30, spa: 0, spd: 20, spe: 0 },
			corviknight: { hp: 0, atk: 10, def: 10, spa: 0, spd: 30, spe: 0 },
			drednaw: { hp: 0, atk: 25, def: 15, spa: 0, spd: 0, spe: 10 },
			duraludon: { hp: 0, atk: 0, def: 5, spa: 20, spd: 25, spe: 0 },
			eevee: { hp: 0, atk: 50, def: 0, spa: 0, spd: 0, spe: 0 },
			flapple: { hp: 20, atk: 5, def: 10, spa: 0, spd: 10, spe: 5 },
			garbodor: { hp: 0, atk: 10, def: 25, spa: 0, spd: 25, spe: -10 },
			gengar: { hp: 0, atk: 0, def: 25, spa: 10, spd: 15, spe: 0 },
			hatterene: { hp: 0, atk: 10, def: 0, spa: 16, spd: 24, spe: 0 },
			kingler: { hp: 0, atk: 20, def: 0, spa: 0, spd: 0, spe: 30 },
			lapras: { hp: 0, atk: 0, def: 20, spa: 0, spd: 30, spe: 0 },
			machamp: { hp: 0, atk: 30, def: 0, spa: 0, spd: 0, spe: 20 },
			melmetal: { hp: 0, atk: 10, def: 10, spa: 0, spd: 0, spe: 30 },
			meowth: { hp: 0, atk: 5, def: 0, spa: 0, spd: 0, spe: 45 },
			orbeetle: { hp: 0, atk: 0, def: 0, spa: 30, spd: 0, spe: 20 },
			pikachu: { hp: 30, atk: 10, def: 10, spa: 20, spd: 10, spe: -30 },
			sandaconda: { hp: 0, atk: 0, def: 20, spa: 0, spd: 0, spe: 30 },
			toxtricity: { hp: 0, atk: 20, def: 0, spa: 4, spd: 16, spe: 10 },
		}
		let boostType = statBoosts.dynamax;
		if ( pokemon.canGigantamax ) boostType = statBoosts[ pokemon.speciesid ];
		let statBoost = boostType[ statName ];
		return statBoost;
	},
};