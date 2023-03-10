import mongoose from "mongoose";
import config from "./config";
import Albums from "./model/Albums";
import Artists from "./model/Artists";
import Tracks from "./model/Tracks";
import Users from "./model/Users";
import {randomUUID} from "crypto";

const run = async () => {
	await mongoose.connect(config.db);
	const db = mongoose.connection;

	try {
		await db.dropCollection("artists");
		await db.dropCollection("albums");
		await db.dropCollection("tracks");
	} catch (e) {
		console.log("Collections were not present, skipping drop...");
	}

	const [user1, user2] = await Users.create(
		{
			username: 'Sasha',
			password: '12345',
			role: 'user',
			token: randomUUID(),
		},
		{
			username: 'Beka',
			password: 'qwerty',
			role: 'admin',
			token: randomUUID(),
		}
	)

	const [Eminem, Presli, Pizza] = await Artists.create(
		{
			name: "Eminem",
			description: "American rap",
			image: "fixtures/eminem.jpeg",
			isPublished: true,
		},
		{
			name: "Elvis Presli",
			description: "classic singer",
			image: "fixtures/presli.jpeg",
			isPublished: false,
		},
		{
			name: "Pizza",
			description: "Russian singer",
			image: "fixtures/pizza.jpeg",
			isPublished: true,
		}
	);

	const [ElvisP, TheEminemShow, TheMarshallMathersLP, НавсюпланетуЗемля, Завтра] =
		await Albums.create(
			{
				name: "Elvis Presley",
				year: 1956,
				artists: Presli._id,
				image: "fixtures/presliS1.jpeg",
				isPublished: false,
			},
			{
				name: "The Eminem Show",
				year: 2002,
				artists: Eminem._id,
				image: "fixtures/eminemA1.jpeg",
				isPublished: true,
			},
			{
				name: "The Marshall Mathers LP",
				year: 2000,
				artists: Eminem._id,
				image: "fixtures/eminemA2.jpeg",
				isPublished: true,
			},
			{
				name: "На всю планету Земля",
				year: 2014,
				artists: Pizza._id,
				image: "fixtures/Pizza1.jpeg",
				isPublished: true,
			},
			{
				name: "Завтра",
				year: 2016,
				artists: Pizza._id,
				image: "fixtures/Pizza2.jpeg",
				isPublished: true,
			}
		);

	await Tracks.create(
		{
			album: ElvisP._id,
			name: "Just Because",
			time: 2.34,
			number: 1,
			isPublished: false,
		},
		{
			album: ElvisP._id,
			name: "Tutti Frutti",
			time: 1.59,
			number: 2,
			isPublished: false,

		},
		{
			album: ElvisP._id,
			name: "Money Honey",
			time: 2.35,
			number: 3,
			isPublished: false,

		},
		{
			album: TheEminemShow._id,
			name: "Till I Collapse [Clean]",
			time: 4.58,
			number: 1,
			isPublished: true,
		},
		{
			album: TheEminemShow._id,
			name: "Superman [Clean]",
			time: 5.5,
			number: 2,
			isPublished: true,
		},
		{
			album: TheEminemShow._id,
			name: "Without Me",
			time: 4.5,
			number: 3,
			isPublished: true,
		},
		{
			album: TheEminemShow._id,
			name: "Cleanin' Out My Closet [Clean]",
			time: 4.58,
			number: 4,
			isPublished: true,
		},
		{
			album: TheEminemShow._id,
			name: "Say What You Say",
			time: 5.15,
			number: 5,
			isPublished: true,
		},
		{
			album: TheMarshallMathersLP._id,
			name: "Bitch Please II",
			time: 4.48,
			number: 1,
			isPublished: true,
		},
		{
			album: TheMarshallMathersLP._id,
			name: "Amityville",
			time: 4.15,
			number: 2,
			isPublished: true,
		},
		{
			album: TheMarshallMathersLP._id,
			name: "Steve Berman",
			time: 0.54,
			number: 3,
			isPublished: true,
		},
		{
			album: TheMarshallMathersLP._id,
			name: "Public Service Announcement 2000",
			time: 0.25,
			number: 4,
			isPublished: true,
		},
		{
			album: TheMarshallMathersLP._id,
			name: "Remember Me?",
			time: 3.38,
			number: 5,
			isPublished: true,
		},
		{
			album: НавсюпланетуЗемля._id,
			name: "Море, море",
			time: 3.3,
			number: 1,
			isPublished: true,
		},
		{
			album: НавсюпланетуЗемля._id,
			name: "Несколько дней",
			time: 2.53,
			number: 2,
			isPublished: true,
		},
		{
			album: НавсюпланетуЗемля._id,
			name: "Лифт",
			time: 3.18,
			number: 3,
			isPublished: true,
		},
		{
			album: НавсюпланетуЗемля._id,
			name: "На всю планету Земля",
			time: 3.36,
			number: 4,
			isPublished: true,
		},
		{
			album: НавсюпланетуЗемля._id,
			name: "Мир",
			time: 2.59,
			number: 5,
			isPublished: true,
		},
		{
			album: Завтра._id,
			name: "Отражение",
			time: 3.54,
			number: 1,
			isPublished: true,
		},
		{
			album: Завтра._id,
			name: "Аня",
			time: 3.07,
			number: 2,
			isPublished: true,
		},
		{
			album: Завтра._id,
			name: "Солнце",
			time: 3.07,
			number: 3,
			isPublished: true,
		},
		{
			album: Завтра._id,
			name: "Назад",
			time: 3.48,
			number: 4,
			isPublished: true,
		},
		{
			album: Завтра._id,
			name: "Лети",
			time: 3.38,
			number: 5,
			isPublished: true,
		}
	);

	await db.close();
};

run().catch(console.error);
