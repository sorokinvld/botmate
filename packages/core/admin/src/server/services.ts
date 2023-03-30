import { Schema, model } from 'mongoose';
import { createDebug } from '@botmate/utils';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const debug = createDebug('botmate:core:admin:services');

export const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model('User', UserSchema);

const services = {
  auth: ({ botmate }) => ({
    register: async (data) => {
      debug('register', data);

      const { email, password } = data;

      try {
        const user = await User.create({
          email,
          password: await bcrypt.hash(password, 10),
        });

        // TODO: get secret from config
        return { user, token: jwt.sign({ id: user.id }, 'secret') };
      } catch (e) {
        debug('register error', e);
        throw new Error('User already exists');
      }
    },
    login: async (data) => {
      const { email, password } = data;

      try {
        const userData = await User.findOne({ email });

        if (!userData) {
          throw new Error('User not found');
        }

        const isValid = await bcrypt.compare(password, userData.password);

        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          user: userData,
          token: jwt.sign(
            {
              id: userData.id,
            },
            'secret'
          ),
        };
      } catch (e) {
        debug('login error', e);
        throw new Error('User not found');
      }
    },
  }),
};

export default services;
