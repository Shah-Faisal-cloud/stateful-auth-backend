import MongoStore from 'connect-mongo';
import session from 'express-session';
import mongoose from 'mongoose';
import env from './env.js';

const sessionMiddleware = () => {
	return session({
		secret: env.SESSION_SECRET,
		saveUninitialized: false,
		resave: false,
		rolling: true,
		store: MongoStore.create({
			client: mongoose.connection.getClient(),
			collectionName: 'sessions',
			stringify: false,
			autoRemove: 'native',
			ttl: 7 * 24 * 60 * 60,
			touchAfter: 24 * 60 * 60,
		}),
		cookie: {
			httpOnly: true,
			secure: env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: 7 * 24 * 60 * 60,
		},
	});
};

export default sessionMiddleware;
