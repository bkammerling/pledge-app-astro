import { db, Pledge, Signee } from 'astro:db';

// https://astro.build/db/seed
export default async function() {
	const pledge = await db.insert(Pledge).values([
		{ id: 1,
			title: 'Stand with Goslings: Protect Our Feathered Friends' ,
			body: '<p>Our charity is dedicated to rescuing and protecting vulnerable goslings in our local wetlands. Each spring, countless young goslings face threats from habitat loss, pollution, and predators. We work tirelessly to provide safe nesting areas, rehabilitate injured birds, and educate the community about the importance of preserving natural habitats.</p><br><p>By supporting our mission, you help ensure that goslings have a safe start in life and that future generations can enjoy the beauty and diversity of our natural world.</p>',
			imageSrc: '/goslings.jpg',
			formintro: 'I believe in protecting goslings everywhere. Add my name:',
			target: 1000,
			isMovingTarget: true,
		},
	]);

	const signee = await db.insert(Signee).values([
		{ id: 1,
			name: 'John Doe',
			email: 'john@example.com',
			pledgeId: 1,
			dateSigned: new Date(),
		},
	]);
}
